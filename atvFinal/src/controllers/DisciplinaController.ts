import { DisciplinaService } from "../services/DisciplinaService";
import { ProfessorService } from "../services/ProfessorService";
import { Request, Response } from "express";
const disciplinaController = new DisciplinaService();
export class DisciplinaController {
    
  todosDisciplinas(req: Request, res: Response) {
    const disciplinas = new DisciplinaService().listarDisciplinas();
    res.status(200).send(disciplinas);
  }

  cadastrarDisciplina(req: Request, res: Response) {
    const { nome, cargaHoraria, ementa } = req.body;
    disciplinaController.criarDisciplina(nome, cargaHoraria, ementa);
    res.status(201).send("Disciplina cadastrada com sucesso!");
  }

  editarDisciplina(req: Request, res: Response) {
    const { id } = req.params;
    const { cargaHoraria, ementa } = req.body;
    disciplinaController.editarDisciplina(Number(id), cargaHoraria, ementa);
    res.status(200).send("Disciplina editada com sucesso!");
  }

  adicionarProfessorNaDisciplina(req: Request, res: Response) {
    const { idProfessor, idDisciplina } = req.body;
    disciplinaController.adicionarProfessorNaDisciplina(
      idProfessor,
      idDisciplina
    );
    res.status(200).send("Professor adicionado à disciplina com sucesso!");
  }
}
