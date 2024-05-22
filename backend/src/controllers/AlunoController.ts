import { AlunoService } from "../services/AlunoService";
import { Request, Response } from "express";

const alunoService = new AlunoService();

export class AlunoController {
  deleteAluno(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      alunoService.deleteAluno(id);
      res.status(200).send("Aluno deletado com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const aluno = await alunoService.findById(id);
      res.status(200).send(aluno);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async cadastrarAluno(req: Request, res: Response) {
    try {
      const { nome, cpf } = req.body;
      await alunoService.criarAluno(nome, cpf);
      res.status(201).send("Aluno cadastrado com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async matricularAlunoNoCurso(req: Request, res: Response) {
    try {
      const { idAluno, idCurso } = req.body;
      await alunoService.matricularAluno(idAluno, idCurso);
      res.status(200).send("Aluno matriculado com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async matricularAlunoNaDisciplina(req: Request, res: Response) {
    try {
      const { idAluno, disciplinas } = req.body;
      await alunoService.adicionarDisciplinaAoAluno(
        idAluno,
        disciplinas,
        "Matriculado"
      );
      res.status(200).send("Aluno matriculado na disciplina com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async todosAlunos(req: Request, res: Response) {
    try {
      const alunos = await alunoService.todosAlunos();
      res.status(200).send(alunos);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async atualizarStatusDisciplina(req: Request, res: Response) {
    try {
      const { id, status } = req.body;
      await alunoService.atualizarStatusDisciplina(id, status);
      res.status(200).send("Status da disciplina atualizado com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}
