import { CursoService } from "../services/CursoService";
import { Request, Response } from "express";

const cursoService = new CursoService();
export class CursoController {
  async todosCursos(req: Request, res: Response) {
    try {
      const cursos = await cursoService.todosCursos();
      res.status(200).send(cursos);
    } catch (error) {
      res.status(500).send("Erro ao buscar todos os cursos");
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send("ID não fornecido");
        return;
      }
      const curso = await cursoService.findById(Number(id));
      res.status(200).send(curso);
    } catch (error) {
      res.status(500).send("Erro ao buscar curso por ID");
    }
  }

  async cadastrarCurso(req: Request, res: Response) {
    try {
      const { nome, descricao, duracao, horasTotais } = req.body;
      if (!nome || !descricao || !duracao || !horasTotais) {
        res.status(400).send("Campos obrigatórios não fornecidos");
        return;
      }
      await cursoService.criarCurso(nome, duracao, descricao, horasTotais);
      res.status(201).send("Curso cadastrado com sucesso!");
    } catch (error) {
      res.status(500).send("Erro ao cadastrar curso");
    }
  }

  async adicionarDisciplinaAoCurso(req: Request, res: Response) {
    try {
      const { idCurso, disciplinas } = req.body;
      if (!idCurso || !disciplinas) {
        res.status(400).send("Campos obrigatórios não fornecidos");
        return;
      }
      await cursoService.adicionarDisciplinaAoCurso(idCurso, disciplinas);
      res.status(200).send("Disciplina adicionada ao curso com sucesso!");
    } catch (error) {
      res.status(500).send("Erro ao adicionar disciplina ao curso");
    }
  }

  async deleteCursoById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send("ID não fornecido");
        return;
      }
      await cursoService.deleteCurso(Number(id));
      res.status(200).send("Curso deletado com sucesso!");
    } catch (error) {
      res.status(500).send("Erro ao deletar curso");
    }
  }
}
