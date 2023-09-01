'use client'

import { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

import { useMatch } from '@/hooks/useMatch'

import { Alert } from '../Alert'
import { Button } from '../Buttons'
import { IconButton } from '../Buttons/IconButton'
import { Input } from '../Input'
import { Modal } from '../Modal'

interface StartGameModalProps {
  open: boolean
  onClose(): void
}

export function StartGameModal({ open, onClose }: StartGameModalProps) {
  const { players, addPlayer, removePlayer, start, error, clearError } = useMatch()
  const [newPlayer, setNewPlayer] = useState('')

  function handleStart() {
    start()
    if (!error) {
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} className="rounded-2xl sm:w-96" fullScreen={false} noCloseButton>
      <Modal.Content className="max-h-96">
        <Alert message={error || ''} type="error" onClose={clearError} className="mb-4" />
        <div className="mb-4 flex items-center gap-2">
          <Input
            placeholder="Adicione um jogador"
            wrapperClassName="grow"
            className="rounded-2xl"
            value={newPlayer}
            onChange={e => setNewPlayer(e.target.value)}
          />
          <IconButton icon={MdAdd} size={24} className="h-fit" onClick={() => addPlayer(newPlayer)} />
        </div>
        <div className="flex w-fit flex-wrap gap-2">
          {players.map(({ id, username }) => (
            <div key={id} className="relative pr-2 pt-2">
              <span
                className="absolute right-0 top-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-white bg-red-500 text-white active:scale-90"
                onClick={() => removePlayer(username)}
              >
                <MdClose />
              </span>
              <span className="rounded-full bg-gradient-to-br from-sky-500 via-violet-500 to-fuchsia-500 px-3 py-1 font-medium text-white">
                {username}
              </span>
            </div>
          ))}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button className="rounded-2xl" onClick={handleStart}>
          Start
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
