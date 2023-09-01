import { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiTrash } from 'react-icons/bi'
import { LuPlus } from 'react-icons/lu'

import { UpdateGame, updateGameSchema } from '@/@types/games'
import { Button } from '@/components/Buttons'
import { IconButton } from '@/components/Buttons/IconButton'
import { Input } from '@/components/Input'
import { InputLabel } from '@/components/Input/InputLabel'
import { Modal } from '@/components/Modal'
import { useAxios } from '@/hooks/useAxios'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'
import { useLoading } from '@/hooks/useLoading'
import { useSnackbar } from '@/hooks/useSnackbar'
import { GameWithCards } from '@/server/prisma/games'
import { zodResolver } from '@hookform/resolvers/zod'

import { CardModal } from './CardModal'
import { EmojiPicker } from './EmojiPicker'

interface EditGameModalProps {
  game: GameWithCards
  open: boolean
  onClose(): void
  onSave?(game: GameWithCards): void
  onRemove?(game: GameWithCards): void
}

type Card = NonNullable<UpdateGame['cards']>[number]

export function EditGameModal({ game, open, onClose, onSave, onRemove }: EditGameModalProps) {
  const {
    register,
    reset,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UpdateGame>({ resolver: zodResolver(updateGameSchema), defaultValues: game as UpdateGame })
  const [editCardModalOpen, setEditCardModalOpen] = useState(false)
  const [cardToEdit, setCardToEdit] = useState<Card>()
  const { open: openSnackbar } = useSnackbar()
  const { open: openConfirmationModal } = useConfirmationModal()
  const { setLoading } = useLoading()
  const cards = watch('cards') || []
  const cardsToDelete = watch('cardsToDelete') || []
  const logo = watch('logo')

  async function onSubmit(editedGame: UpdateGame) {
    const { data: game, error } = await useAxios.put<GameWithCards>(`api/games/${editedGame.id}`, editedGame)
    if (typeof error === 'string') {
      openSnackbar({
        message: error,
        type: 'error',
        position: 'mid-top'
      })
    } else if (game) {
      openSnackbar({
        message: 'Jogo salvo com sucesso',
        type: 'success',
        position: 'mid-top'
      })
      onSave?.(game)
    }
  }

  function closeEditCardModal() {
    setEditCardModalOpen(false)
  }

  function addCard(card: Card) {
    if (cards.some(c => c.question === card.question)) {
      throw new Error('Não é possível adicionar duas cartas com a mesma pergunta.')
    }
    if (cards.length === 0) {
      setError('cards', { message: undefined })
    }
    setValue('cards', [...cards, card])
  }

  function editCard(card: Card, old: Card) {
    if (cards.some(c => c.question === card.question && card.question !== old.question)) {
      throw new Error('Não é possível adicionar duas cartas com a mesma pergunta.')
    }
    const index = cards.findIndex(c => c.question === old.question)
    cards[index] = card
    setValue('cards', [...cards])
  }

  function removeCard() {
    if (cardToEdit) {
      const editCards = cards.filter(c => c.question !== cardToEdit.question)
      setValue('cards', editCards)
      if (cardToEdit.id && !cardsToDelete.find(c => c.id === cardToEdit.id)) {
        cardsToDelete.push({ id: cardToEdit.id })
        setValue('cardsToDelete', cardsToDelete)
      }
    }
  }

  async function handleRemoveGame(e: MouseEvent) {
    e.stopPropagation()
    openConfirmationModal({
      title: 'Remover Jogo',
      question: `Tem certeza que deseja remover o jogo ${game.name}?`,
      onConfirm: async () => {
        setLoading(true)
        const { ok } = await useAxios.delete(`/api/games/${game.id}`)
        ok && onRemove?.(game)
        setLoading(false)
      }
    })
  }

  function onSelectEmoji({ unified }: { unified: string }) {
    setValue('logo', unified)
  }

  return (
    <Modal open={open} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
      <Modal.Content className="mb-2 pb-0 sm:min-w-[min(442px,calc(100vw-64px))] sm:max-w-[442px]">
        <div className="mb-4 space-y-2">
          <EmojiPicker emoji={logo} onSelect={onSelectEmoji} error={errors.logo?.message} />
          <Input label="nome do jogo" error={errors.name?.message} {...register('name')} />
          <Input label="descrição" error={errors.description?.message} {...register('description')} />
        </div>
        <InputLabel>Cartas</InputLabel>
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
            <IconButton icon={LuPlus} onClick={() => setEditCardModalOpen(true)} />
            <CardModal open={editCardModalOpen} onClose={closeEditCardModal} onConfirmCard={addCard} />
          </div>
        </div>
        {errors.cards && <p className="text-red-500">{errors.cards.message}</p>}
      </Modal.Content>
      <Modal.Actions>
        <IconButton
          icon={BiTrash}
          size={20}
          className="cursor-pointer hover:text-red-500 dark:hover:text-red-600"
          onClick={handleRemoveGame}
        />
        <Button
          className="bg-slate-500 dark:bg-slate-500"
          loading={isSubmitting}
          onClick={() => reset(game as UpdateGame)}
        >
          Cancelar
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Salvar
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
