import { CursoService } from "../services/CursoService";
import { ProfessorService } from "../services/ProfessorService";
import { Request, Response } from "express";

const cursoService = new CursoService()
;
export class CursoController {
  cadastrarCurso(req: Request, res: Response) {
    const { nome } = req.body;
    cursoService.criarCurso(nome);
    res.status(201).send("Curso cadastrado com sucesso!");
  }

  adicionarDisciplinaAoCurso(req: Request, res: Response) {
    const { idCurso, idDisciplina } = req.body;
    cursoService.adicionarDisciplinaAoCurso(idCurso, idDisciplina);
    res.status(200).send("Disciplina adicionada ao curso com sucesso!");
  }
}
