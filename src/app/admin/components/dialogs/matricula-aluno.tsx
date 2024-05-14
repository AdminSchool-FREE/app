import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  FormularioMatriculaAluno,
  FormularioMatriculaAlunoProps,
} from '../forms/Turma/FormularioMatriculaAluno'

export function MatriculaAlunoDialog({
  idTurma,
}: FormularioMatriculaAlunoProps) {
  return (
    <DialogContent className="max-w-6xl">
      <DialogHeader>
        <DialogTitle>Matricular aluno</DialogTitle>
        <DialogDescription>
          Matricule o aluno e vincule ele à turma correta
        </DialogDescription>
      </DialogHeader>
      <FormularioMatriculaAluno idTurma={idTurma} />
    </DialogContent>
  )
}
