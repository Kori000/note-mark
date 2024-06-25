import { getNotes, readNote } from '@/lib'
import { GetNotes, ReadNote } from '@shared/types'
import { ipcMain } from 'electron'

export function initializeIpcHandlers(): void {
  // 用于处理异步请求并返回一个结果, 返回一个 Promise
  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))

  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
}
