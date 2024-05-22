// import { AlunoService } from "../services/AlunoService";
// import { Request, Response } from "express";

// const professorService = new ProfessorService();

// export class ProfessorController {
//     async findById(req: Request, res: Response) {
//         try {
//             const id = Number(req.params.id);
//             const professor = await professorService.findById(id);
//             res.status(200).send(professor);
//         } catch (error: any) {
//             res.status(500).send(error.message);
//         }
//     }

//     async cadastrarProfessor(req: Request, res: Response) {
//         try {
//             const { nome, cpf } = req.body;
//             await professorService.criarProfessor(nome, cpf);
//             res.status(201).send("Professor cadastrado com sucesso!");
//         } catch (error: any) {
//             res.status(500).send(error.message);
//         }
//     }

//     async matricularProfessorNoCurso(req: Request, res: Response) {
//         try {
//             const { idProfessor, idCurso } = req.body;
//             await professorService.matricularProfessor(idProfessor, idCurso);
//             res.status(200).send("Professor matriculado com sucesso!");
//         } catch (error: any) {
//             res.status(500).send(error.message);
//         }
//     }

//     async matricularProfessorNaDisciplina(req: Request, res: Response) {
//         try {
//             const { idProfessor, disciplinas } = req.body;
//             await professorService.adicionarDisciplinaAoProfessor(
//                 idProfessor,
//                 disciplinas,
//                 "Matriculado"
//             );
//             res.status(200).send("Professor matriculado na disciplina com sucesso!");
//         } catch (error: any) {
//             res.status(500).send(error.message);
//         }
//     }

//     async todosProfessores(req: Request, res: Response) {
//         try {
//             const professores = await professorService.todosProfessores();
//             res.status(200).send(professores);
//         } catch (error: any) {
//             res.status(500).send(error.message);
//         }
//     }

//     async atualizarStatusDisciplina(req: Request, res: Response) {
//         try {
//             const { id, status } = req.body;
//             await professorService.atualizarStatusDisciplina(id, status);
//             res.status(200).send("Status da disciplina atualizado com sucesso!");
//         } catch (error: any) {
//             res.status(500).send(error.message);
//         }
//     }
// }
