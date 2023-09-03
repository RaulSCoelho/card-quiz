import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuPlus } from 'react-icons/lu'

import { CreateGlossary, UpdateGlossary, createGlossarySchema, updateGlossarySchema } from '@/@types/glossary'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Buttons'
import { IconButton } from '@/components/Buttons/IconButton'
import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
import { useAxios } from '@/hooks/useAxios'
import { useGlossary } from '@/hooks/useGlossary'
import { GlossaryWithTerms } from '@/server/prisma/glossary'
import { zodResolver } from '@hookform/resolvers/zod'

type Term = CreateGlossary['terms'][number]

interface NewGlossaryModalProps {
  open: boolean
  onClose(): void
  glossaryId?: string
  onSubmit?(term: GlossaryWithTerms): void
}

export function GlossaryModal({ open, onClose, glossaryId, onSubmit: handleOnSubmit }: NewGlossaryModalProps) {
  const schema = glossaryId ? updateGlossarySchema : createGlossarySchema
  const {
    watch,
    setValue,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateGlossary | UpdateGlossary>({ resolver: zodResolver(schema) })
  const [newTerm, setNewTerm] = useState<Term>({ term: '', definition: '' })
  const { glossary } = useGlossary()
  const terms = watch('terms') || []

  useEffect(() => {
    if (glossaryId) {
      setValue('id', glossaryId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glossaryId])

  async function onSubmit(glossary: CreateGlossary | UpdateGlossary) {
    let newGlossary: GlossaryWithTerms | undefined
    let error: any
    if (glossaryId) {
      const { data, error: postError } = await useAxios.put<GlossaryWithTerms>(`api/glossary/${glossaryId}`, glossary)
      newGlossary = data
      error = postError
    } else {
      const { data, error: postError } = await useAxios.post<GlossaryWithTerms>('api/glossary', glossary)
      newGlossary = data
      error = postError
    }
    if (typeof error === 'string') {
      setError('terms', { message: error })
    } else if (newGlossary) {
      handleOnSubmit?.(newGlossary)
      onClose()
      reset()
    }
  }

  const handleSetNewTerm = (field: keyof Term) => (e: ChangeEvent<HTMLInputElement>) => {
    setNewTerm(prev => ({ ...prev, [field]: e.target.value }))
  }

  function addTerm() {
    if (!newTerm.term || !newTerm.definition) {
      setError('terms', { message: 'Termo inválido' })
      return
    }

    if ([...(glossary?.terms || []), ...terms].some(term => term.term === newTerm.term)) {
      setError('terms', { message: 'Já existe esse termo' })
      return
    }

    setValue('terms', [...terms, newTerm])
    setNewTerm({ term: '', definition: '' })
    setError('terms', {})
  }

  return (
    <Modal open={open} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
      <Modal.Content className="min-w-[min(442px,calc(100vw-64px))] space-y-4 pb-0">
        <h2 className="text-center text-3xl font-extrabold">Adicionar termos</h2>
        <Alert message={errors.terms?.message || ''} type="error" onClose={() => setError('terms', {})} />
        <div className="space-y-2">
          <Input placeholder="termo" value={newTerm.term} onChange={handleSetNewTerm('term')} />
          <Input placeholder="definição" value={newTerm.definition} onChange={handleSetNewTerm('definition')} />
          <div className="flex justify-end">
            <IconButton icon={LuPlus} size={24} onClick={addTerm} />
          </div>
        </div>
        {terms.length > 0 && (
          <div className="space-y-2">
            {terms.map(({ term, definition }) => (
              <div
                className="flex items-center divide-x divide-slate-400 rounded-lg border border-slate-400 p-2"
                key={term}
              >
                <p className="p-2">{term}</p>
                <p className="hyphens-auto p-2">{definition}</p>
              </div>
            ))}
          </div>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button type="submit" loading={isSubmitting}>
          Adicionar
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
