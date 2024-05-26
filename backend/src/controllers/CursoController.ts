import { CursoService } from "../services/CursoService";
import { Request, Response } from "express";

const cursoService = new CursoService();
export class CursoController {
  async todosCursos(req: Request, res: Response) {
    const cursos = await cursoService.todosCursos();
    res.status(200).send(cursos);
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id;
    const curso = await cursoService.findById(Number(id));
    res.status(200).send(curso);
  }
  
  async cadastrarCurso(req: Request, res: Response) {
    const { nome, descricao, duracao, horasTotais} = req.body;
    await cursoService.criarCurso(nome, descricao, duracao, horasTotais);
    res.status(201).send("Curso cadastrado com sucesso!");
  }

  async adicionarDisciplinaAoCurso(req: Request, res: Response) {
    const { idCurso, disciplinas } = req.body;
    await cursoService.adicionarDisciplinaAoCurso(idCurso, disciplinas);
    res.status(200).send("Disciplina adicionada ao curso com sucesso!");
  }

  async deleteCursoById(req: Request, res: Response) {
    const id = req.params.id;
    await cursoService.deleteCurso(Number(id));
    res.status(200).send("Curso deletado com sucesso!");
  }
}
