import { useNotesList } from '@/hooks/use-notes-list'
import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'
import { NotePreview } from './note-preview'
import { isEmpty } from 'lodash-es'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ className, onSelect, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, hanldeNoteSelect } = useNotesList({
    onSelect,
  })

  if (!notes) return null

  if (isEmpty(notes)) {
    return (
      <ul className={cn('text-center pt-4', className)} {...props}>
        <span>No Note Yet!</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notes.map((item, index) => {
        return (
          <NotePreview
            key={item.title + item.lastEditTime}
            isActive={index === selectedNoteIndex}
            onClick={hanldeNoteSelect(index)}
            {...item}
          >
            {item.title}
          </NotePreview>
        )
      })}
    </ul>
  )
}
