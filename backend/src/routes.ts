import { Router } from "express";
import { AlunoController } from "./controllers/AlunoController";
import { CursoController } from "./controllers/CursoController";
import { DisciplinaController } from "./controllers/DisciplinaController";

export const routes = Router()

const alunoController = new AlunoController();
const cursoController = new CursoController();
const disciplinaController = new DisciplinaController();


routes.post("/api/aluno/cadastrar", alunoController.cadastrarAluno)
routes.post("/api/aluno/matricular/disciplina", alunoController.matricularAlunoNaDisciplina)
routes.post("/api/aluno/matricular/curso", alunoController.matricularAlunoNoCurso)
routes.get("/api/aluno/todos", alunoController.todosAlunos)
routes.get("/api/aluno/porId/:id", alunoController.findById)
routes.put("/api/aluno/atualizar/status/disciplina", alunoController.atualizarStatusDisciplina)

routes.get("/api/curso/porId/:id", cursoController.findById)
routes.get("/api/curso/todos", cursoController.todosCursos)
routes.post("/api/curso/criar", cursoController.cadastrarCurso)
routes.post("/api/curso/adicionar_disciplina", cursoController.adicionarDisciplinaAoCurso)

routes.get("/api/disciplina/porId/:id", disciplinaController.findById)
routes.get("/api/disciplina/todos", disciplinaController.todosDisciplinas)
routes.post("/api/disciplina/criar", disciplinaController.cadastrarDisciplina)
routes.put("/api/disciplina/editar/:id", disciplinaController.editarDisciplina)