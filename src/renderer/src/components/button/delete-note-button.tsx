import { FaRegTrashCan } from 'react-icons/fa6'
import { ActionButton, ActionButtonProps } from './action-button'
import { useSetAtom } from 'jotai'
import { deleteNoteAtom } from '@renderer/store'
export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleCreation = () => {
    deleteNote()
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <FaRegTrashCan className="size-4 text-zinc-300 " />
    </ActionButton>
  )
}
