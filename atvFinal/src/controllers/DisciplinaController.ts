import { DisciplinaService } from "../services/DisciplinaService"
import { ProfessorService } from "../services/ProfessorService"
import { Request, Response } from 'express'
export class DisciplinaController {
    disciplinaController = new DisciplinaService()
    cadastrarDisciplina(req: Request, res: Response) {
        const { nome, cargaHoraria, ementa } = req.body
        this.disciplinaController.criarDisciplina(nome, cargaHoraria, ementa)
        res.status(201).send('Disciplina cadastrada com sucesso!')
    }

    editarDisciplina(req: Request, res: Response) {
        const { id } = req.params
        const { cargaHoraria, ementa } = req.body
        this.disciplinaController.editarDisciplina(Number(id), cargaHoraria, ementa)
        res.status(200).send('Disciplina editada com sucesso!')
    }

    adicionarProfessorNaDisciplina(req: Request, res: Response) {
        const { idProfessor, idDisciplina } = req.body
        this.disciplinaController.adicionarProfessorNaDisciplina(idProfessor, idDisciplina)
        res.status(200).send('Professor adicionado à disciplina com sucesso!')
    }
}