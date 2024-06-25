import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote } from '@shared/types'
import { ensureDir, readdir, stat, readFile } from 'fs-extra'

import path from 'path'

// export const getRootDir = () => {
//   return `${homedir()}/${appDirectoryName}`
// }

export const getRootDir = () => {
  return `${path.resolve(process.cwd())}/${appDirectoryName}`
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
  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)
  return {
    title: filename.replace(/\.md/, ''),
    lastEditTime: fileStats.mtimeMs,
  }
}

export const readNote: ReadNote = async filename => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${filename}.md`, {
    encoding: fileEncoding,
  })
}
