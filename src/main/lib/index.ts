import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash-es'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return path.join(homedir(), appDirectoryName)
  // return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const notesFilenames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false,
  })

  const notes = notesFilenames.filter(filename => filename.endsWith('.md'))
  notes

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomeNoteFile, {
      encoding: fileEncoding,
    })

    // create the welcome note
    await writeFile(path.join(rootDir, welcomeNoteFilename), content, {
      encoding: fileEncoding,
    })

    notes.push(welcomeNoteFilename)
  }
  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const rootDir = getRootDir()

  const fileStats = await stat(path.join(rootDir, filename))
  return {
    title: filename.replace(/\.md/, ''),
    lastEditTime: fileStats.mtimeMs,
  }
}

export const readNote: ReadNote = async filename => {
  const rootDir = getRootDir()
  return readFile(path.join(rootDir, `${filename}.md`), {
    encoding: fileEncoding,
  })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  console.info(`Writing note ${filename}`)

  return writeFile(path.join(rootDir, `${filename}.md`), content, {
    encoding: fileEncoding,
  })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: path.join(rootDir, 'Untitled.md'),
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [
      {
        name: 'Markdow',
        extensions: ['md'],
      },
    ],
  })

  if (canceled || !filePath) {
    console.info('Note creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved unde ${rootDir}. Avoid using other directories!`,
    })

    return false
  }

  console.info(`Creating note: ${filePath}`)

  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async filename => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1,
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${filename}`)

  await remove(path.join(rootDir, `${filename}.md`))

  return true
}
