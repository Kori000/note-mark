import { createNote, deleteNote, getNotes, readNote, writeNote } from '@/lib'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { ipcMain } from 'electron'

export function initializeIpcHandlers(): void {
  // 用于处理异步请求并返回一个结果, 返回一个 Promise
  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))

  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))

  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))

  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))

  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))
}
