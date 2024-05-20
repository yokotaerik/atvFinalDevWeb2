import { AlunoService } from "../services/AlunoService";
import { ProfessorService } from "../services/ProfessorService";
import { Request, Response } from "express";

const alunoService = new AlunoService();

export class AlunoController {
  async cadastrarAluno(req: Request, res: Response) {
    const { nome } = req.body;
    await alunoService.criarAluno(nome);
    res.status(201).send("Aluno cadastrado com sucesso!");
  }

  async matricularAlunoNoCurso(req: Request, res: Response) {
    const { idAluno, idCurso } = req.body;
    await alunoService.matricularAluno(idAluno, idCurso);
    res.status(200).send("Aluno matriculado com sucesso!");
  }

  async matricularAlunoNaDisciplina(req: Request, res: Response) {
    const { idAluno, idDisciplina } = req.body;
    await alunoService.matricularAlunoNaDisciplina(idAluno, idDisciplina);
    res.status(200).send("Aluno matriculado na disciplina com sucesso!");
  }

  async todosAlunos(req: Request, res: Response) {
    const alunos = await alunoService.todosAlunos();

    res.status(200).send(alunos);
  }
}
