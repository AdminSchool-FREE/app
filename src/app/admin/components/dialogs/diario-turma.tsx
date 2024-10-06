'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { buscarAlunosTurma } from '../../api/turma'
import { DisciplinaEscolaType } from '../../escola/disciplinas/schemas/disciplina'
import { FormularioDiarioClasse } from '../forms/Turma/FormularioDiarioTurma'

interface DiarioTurmaDialogProps {
  turmaId: string
}

export function DiarioTurmaDialog({ turmaId }: DiarioTurmaDialogProps) {
  const queryClient = useQueryClient()

  const { data: alunosTurma, isLoading: carregandoAlunos } = useQuery({
    queryKey: ['alunosTurma', turmaId],
    queryFn: () => buscarAlunosTurma(turmaId),
    enabled: !!turmaId,
    staleTime: Infinity,
  })

  const disciplinas: Array<DisciplinaEscolaType> | undefined =
    queryClient.getQueryData(['disciplinasEscola'])

  return (
    <DialogContent className="w-full max-h-full md:min-w-[800px]">
      <DialogHeader>
        <DialogTitle>Lançamento de nota</DialogTitle>
        <DialogDescription>
          {`Aqui você pode lançar nota de atividades da turma de uma disciplina específica`}
        </DialogDescription>
      </DialogHeader>
      {carregandoAlunos ? (
        <div className="flex-1 justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <FormularioDiarioClasse
          idTurma={turmaId}
          alunosTurma={alunosTurma ?? []}
          listaDisciplinas={disciplinas ?? []}
        />
      )}
    </DialogContent>
  )
}
