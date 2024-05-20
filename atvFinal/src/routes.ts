import { Router } from "express";
import { AlunoController } from "./controllers/AlunoController";
import { ProfessorController } from "./controllers/ProfessorController";
import { CursoController } from "./controllers/CursoController";
import { DisciplinaController } from "./controllers/DisciplinaController";

export const routes = Router()

const alunoController = new AlunoController();
const professorController = new ProfessorController();
const cursoController = new CursoController();
const disciplinaController = new DisciplinaController();


routes.post("/aluno/cadastrar", alunoController.cadastrarAluno)
routes.post("/aluno/matricular/disciplina", alunoController.matricularAlunoNaDisciplina)
routes.post("/aluno/matricular/curso", alunoController.matricularAlunoNoCurso)

routes.post("/professores/cadastrar", professorController.cadastrarProfessor)

routes.post("/curso/criar", cursoController.cadastrarCurso)
routes.post("/curso/adicionar_disciplina", cursoController.cadastrarCurso)

routes.post("/disciplina/criar", disciplinaController.cadastrarDisciplina)
routes.post("/disciplina/editar/:id", disciplinaController.editarDisciplina)
routes.post("/disciplina/adicionar_professor", disciplinaController.adicionarProfessorNaDisciplina)