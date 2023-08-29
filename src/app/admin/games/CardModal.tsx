import { ChangeEvent, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { LuCheck, LuPlus } from 'react-icons/lu'

import { CreateGame } from '@/@types/games'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Buttons'
import { TextArea } from '@/components/Input/TextArea'
import { ModalBase } from '@/components/Modal/ModalBase'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'

type Card = CreateGame['cards'][number]

interface CardModalProps {
  open: boolean
  onClose(): void
  onConfirmCard(card: Card, defaultValues?: Card): void
  onRemoveCard?(): void
  defaultValues?: Card
}

export function CardModal({ open, onClose, onConfirmCard, onRemoveCard, defaultValues }: CardModalProps) {
  const { open: openConfirmationModal } = useConfirmationModal()
  const [newCard, setNewCard] = useState<Card>(defaultValues || { question: '', answer: '' })
  const [error, setError] = useState('')

  const cardChange = (field: keyof Card) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCard(prev => ({ ...prev, [field]: e.target.value }))
  }

  function reset() {
    setNewCard({ question: '', answer: '' })
    onClose()
    setError('')
  }

  function handleConfirmCard() {
    if (newCard.question && newCard.answer) {
      try {
        onConfirmCard(newCard, defaultValues)
        reset()
      } catch (err: any) {
        if (typeof err.message === 'string') setError(err.message)
      }
    }
  }

  function removeCard() {
    openConfirmationModal({
      title: 'Remover Carta',
      question: 'Tem certeza que deseja remover esta carta?',
      onConfirm: () => {
        onRemoveCard?.()
        reset()
      }
    })
  }

  return (
    <ModalBase open={open} onClose={onClose} fullScreen={false}>
      <div className="p-4 pb-0">
        <Alert message={error} type="error" onClose={() => setError('')} />
      </div>
      <div className="min-w-[min(500px,calc(100vw-64px))] space-y-2 p-4">
        <TextArea
          label="pergunta"
          value={newCard.question}
          className="resize-none"
          rows={5}
          onChange={cardChange('question')}
        />
        <TextArea
          label="resposta"
          value={newCard.answer}
          className="resize-none"
          rows={5}
          onChange={cardChange('answer')}
        />
        <div className="flex justify-end gap-2">
          {defaultValues && (
            <Button className="aspect-square bg-red-500 p-1 text-white dark:bg-red-500">
              <BiTrash size={24} onClick={removeCard} />
            </Button>
          )}
          <Button className="aspect-square p-1" onClick={handleConfirmCard}>
            {defaultValues ? <LuCheck size={24} /> : <LuPlus size={24} />}
          </Button>
        </div>
      </div>
    </ModalBase>
  )
}
