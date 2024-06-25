import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar,
} from '@/components'
import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scroll(0, 0)
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout className="bg-zinc-900/30 ">
        <Sidebar className="p-2 relative flex flex-col  ">
          <ActionButtonsRow className="flex justify-between w-full pr-3  " />
          <NotePreviewList className="mt-2 pr-1 space-y-1 h-full overflow-y-scroll " onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20  ">
          <FloatingNoteTitle className="pt-2 " />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
