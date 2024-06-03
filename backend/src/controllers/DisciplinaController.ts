import { DisciplinaService } from "../services/DisciplinaService";
import { Request, Response } from "express";

const disciplinaService = new DisciplinaService();
export class DisciplinaController {
  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const disciplina = await disciplinaService.findById(Number(id));
      res.status(200).send(disciplina);
    } catch (error) {
      res.status(500).send("Erro ao buscar disciplina por ID");
    }
  }

  async todosDisciplinas(req: Request, res: Response) {
    try {
      const disciplinas = await disciplinaService.listarDisciplinas();
      res.status(200).send(disciplinas);
    } catch (error) {
      res.status(500).send("Erro ao listar disciplinas");
    }
  }

  async cadastrarDisciplina(req: Request, res: Response) {
    try {
      const { nome, cargaHoraria, ementa } = req.body;
      await disciplinaService.criarDisciplina(nome, cargaHoraria, ementa);
      res.status(201).send("Disciplina cadastrada com sucesso!");
    } catch (error) {
      res.status(500).send("Erro ao cadastrar disciplina");
    }
  }

  async editarDisciplina(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { cargaHoraria, ementa } = req.body;
      await disciplinaService.editarDisciplina(Number(id), cargaHoraria, ementa);
      res.status(200).send("Disciplina editada com sucesso!");
    } catch (error) {
      res.status(500).send("Erro ao editar disciplina");
    }
  }

  async deleteDisciplinaById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const ok = await disciplinaService.deleteDisciplina(Number(id));
      if(ok){
        res.status(200).send("Disciplina deletada com sucesso!");
      } else {
        res.status(500).send("Erro ao deletar disciplina");
      }
    } catch (error) {
      res.status(500).send("Erro ao deletar disciplina");
    }
  }
}
