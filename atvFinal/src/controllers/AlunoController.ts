import { AlunoService } from "../services/AlunoService";
import { ProfessorService } from "../services/ProfessorService";
import { Request, Response } from "express";

const alunoService = new AlunoService();

export class AlunoController {
  cadastrarAluno(req: Request, res: Response) {
    const { nome } = req.body;
    alunoService.criarAluno(nome);
    res.status(201).send("Aluno cadastrado com sucesso!");
  }

  matricularAlunoNoCurso(req: Request, res: Response) {
    const { idAluno, idCurso } = req.body;
    alunoService.matricularAluno(idAluno, idCurso);
    res.status(200).send("Aluno matriculado com sucesso!");
  }

  matricularAlunoNaDisciplina(req: Request, res: Response) {
    const { idAluno, idDisciplina } = req.body;
    alunoService.matricularAlunoNaDisciplina(idAluno, idDisciplina);
    res.status(200).send("Aluno matriculado na disciplina com sucesso!");
  }

  todosAlunos(req: Request, res: Response) {
    res.status(200).send(alunoService.todosAlunos());
  }
}
