import { DisciplinaService } from "../services/DisciplinaService";
import { Request, Response } from "express";
const disciplinaService = new DisciplinaService();
export class DisciplinaController {
  async todosDisciplinas(req: Request, res: Response) {
    const disciplinas = await disciplinaService.listarDisciplinas();
    res.status(200).send(disciplinas);
  }

  async cadastrarDisciplina(req: Request, res: Response) {
    const { nome, cargaHoraria, ementa } = req.body;
    await disciplinaService.criarDisciplina(nome, cargaHoraria, ementa);
    res.status(201).send("Disciplina cadastrada com sucesso!");
  }

  async editarDisciplina(req: Request, res: Response) {
    const { id } = req.params;
    const { cargaHoraria, ementa } = req.body;
    await disciplinaService.editarDisciplina(Number(id), cargaHoraria, ementa);
    res.status(200).send("Disciplina editada com sucesso!");
  }
}