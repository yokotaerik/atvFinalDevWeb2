import { CursoService } from "../services/CursoService";
import { ProfessorService } from "../services/ProfessorService";
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
    const { nome } = req.body;
    await cursoService.criarCurso(nome);
    res.status(201).send("Curso cadastrado com sucesso!");
  }

  async adicionarDisciplinaAoCurso(req: Request, res: Response) {
    const { idCurso, idDisciplina } = req.body;
    await cursoService.adicionarDisciplinaAoCurso(idCurso, idDisciplina);
    res.status(200).send("Disciplina adicionada ao curso com sucesso!");
  }
}
