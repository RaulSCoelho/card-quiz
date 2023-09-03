'use client'

import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { LuPlus } from 'react-icons/lu'

import { UpdateGlossary } from '@/@types/glossary'
import { Authorize } from '@/components/Authorize'
import { Button } from '@/components/Buttons'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'
import { useGlossary } from '@/hooks/useGlossary'
import { GlossaryWithTerms } from '@/server/prisma/glossary'

import { GlossaryModal } from './GlossaryModal'

export function Glossary() {
  const { glossary, updateGlossary } = useGlossary()
  const { open: openConfirmationModal } = useConfirmationModal()
  const [newGlossaryModalOpen, setNewGlossaryModalOpen] = useState(false)
  const terms = glossary?.terms || []

  function onSubmit(glossary: GlossaryWithTerms) {
    useGlossary.setState({ glossary })
  }

  const handleRemoveTerm = (term: GlossaryWithTerms['terms'][number]) => () => {
    if (glossary) {
      const updatedGlossary: UpdateGlossary = {
        id: glossary.id,
        terms: [],
        termsToDelete: [{ id: term.id }]
      }
      openConfirmationModal({
        question: 'Tem certeza que deseja remover esse termo?',
        onConfirm: () => updateGlossary(updatedGlossary)
      })
    }
  }

  return (
    <div>
      <div>
        {terms.length > 0 && (
          <div className="space-y-2">
            {terms.map(term => (
              <div
                className="flex items-center divide-x divide-slate-400 rounded-lg border border-slate-400 p-2"
                key={term.id}
              >
                <p className="p-2">{term.term}</p>
                <p className="grow hyphens-auto p-2">{term.definition}</p>
                <Authorize admin>
                  <div className="p-2">
                    <BiTrash size={24} className="cursor-pointer hover:text-red-600" onClick={handleRemoveTerm(term)} />
                  </div>
                </Authorize>
              </div>
            ))}
          </div>
        )}
      </div>
      <Authorize admin>
        <div className="mt-2 flex justify-end">
          <Button className="flex gap-2 pl-2" onClick={() => setNewGlossaryModalOpen(true)}>
            <LuPlus size={24} />
            Adicionar Termos
          </Button>
          <GlossaryModal
            open={newGlossaryModalOpen}
            onClose={() => setNewGlossaryModalOpen(false)}
            onSubmit={onSubmit}
            glossaryId={glossary?.id}
          />
        </div>
      </Authorize>
    </div>
  )
}
