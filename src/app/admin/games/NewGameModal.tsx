import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuPlus } from 'react-icons/lu'

import { CreateGame, createGameSchema } from '@/@types/games'
import { Button } from '@/components/Buttons'
import { IconButton } from '@/components/Buttons/IconButton'
import { Input } from '@/components/Input'
import { InputLabel } from '@/components/Input/InputLabel'
import { Modal } from '@/components/Modal'
import { useAxios } from '@/hooks/useAxios'
import { useSnackbar } from '@/hooks/useSnackbar'
import { GameWithCards } from '@/server/prisma/games'
import { zodResolver } from '@hookform/resolvers/zod'

import { CardModal } from './CardModal'

interface NewGameModalProps {
  open: boolean
  onClose(): void
  onCreate?(game: GameWithCards): void
}

type Card = CreateGame['cards'][number]

export function NewGameModal({ open, onClose, onCreate }: NewGameModalProps) {
  const {
    register,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateGame>({ resolver: zodResolver(createGameSchema) })
  const [newCardModalOpen, setNewCardModalOpen] = useState(false)
  const [cardToEdit, setCardToEdit] = useState<Card>()
  const { open: openSnackbar } = useSnackbar()
  const cards = watch('cards') || []

  async function onSubmit(newGame: CreateGame) {
    const { data: game, error } = await useAxios.post<GameWithCards>('api/games', newGame)
    if (typeof error === 'string') {
      openSnackbar({
        message: error,
        type: 'error',
        position: 'mid-top'
      })
    } else if (game) {
      openSnackbar({
        message: 'Jogo criado com sucesso',
        type: 'success',
        position: 'mid-top'
      })
      onCreate?.(game)
      onClose()
    }
  }

  function closeNewCardModal() {
    setNewCardModalOpen(false)
  }

  function addCard(card: Card) {
    if (cards.length === 0) {
      setError('cards', { message: undefined })
    }
    setValue('cards', [...cards, card])
  }

  function editCard(card: Card, old: Card) {
    const index = cards.findIndex(c => c.question === old.question)
    cards[index] = card
    setValue('cards', [...cards])
  }

  function removeCard() {
    const newCards = cards.filter(c => c.question !== cardToEdit?.question)
    setValue('cards', newCards)
  }

  return (
    <Modal open={open} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
      <Modal.Content className="min-w-[min(442px,calc(100vw-64px))] max-w-[442px] pb-0">
        <h2 className="mb-4 text-center text-3xl font-extrabold">Criar um jogo</h2>
        <div className="mb-4 space-y-2">
          <Input label="nome do jogo" error={errors.name?.message} {...register('name')} />
          <Input label="descrição" error={errors.description?.message} {...register('description')} />
        </div>
        <InputLabel>
          Cartas <span className="text-[8px]">(você poderá adicionar mais depois)</span>
        </InputLabel>
        <div className="flex items-end rounded-xl border-2 border-dashed border-slate-400 p-2">
          <div className="max-w flex grow flex-wrap gap-2">
            {cards.map((card, i) => (
              <div
                className="p- flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full bg-indigo-400 font-mono text-white shadow shadow-black/50 active:shadow-sm"
                onClick={() => setCardToEdit(card)}
                key={i}
              >
                {i + 1}
              </div>
            ))}
            {cardToEdit && (
              <CardModal
                open={!!cardToEdit}
                onClose={() => setCardToEdit(undefined)}
                defaultValues={cardToEdit}
                onConfirmCard={editCard}
                onRemoveCard={removeCard}
              />
            )}
          </div>
          <div>
            <IconButton icon={LuPlus} rippleColor="#818cf8" onClick={() => setNewCardModalOpen(true)} />
            <CardModal open={newCardModalOpen} onClose={closeNewCardModal} onConfirmCard={addCard} />
          </div>
        </div>
        {errors.cards && <p className="text-red-500">{errors.cards.message}</p>}
      </Modal.Content>
      <Modal.Actions>
        <Button type="submit" loading={isSubmitting}>
          Criar
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
