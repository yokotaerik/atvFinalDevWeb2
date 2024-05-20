import { ProfessorService } from "../services/ProfessorService"
import { Request, Response } from 'express'
export class ProfessorController {
    professorService = new ProfessorService()
    cadastrarProfessor(req: Request, res: Response) {
        const { nome, especialidade } = req.body
        this.professorService.criarProfessor(nome, especialidade)
        res.status(201).send('Professor cadastrado com sucesso!')

    }
}