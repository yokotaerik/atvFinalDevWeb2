import { prisma } from "../prisma/prisma";
import { AlunoService } from "../services/AlunoService";
import { Request, Response } from "express";

const alunoService = new AlunoService();

export class AlunoController {
  async deleteAluno(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const alunoDeletado = await prisma.aluno.findUnique({
        where: {
          id,
        },
        include: {
          curso: true,
          disciplinasMatriculado: {},
        },
      });

      if (!alunoDeletado) res.status(404).send("Aluno não encontrado.");

      if (
        alunoDeletado?.disciplinasMatriculado === undefined
      ) {
        res
          .status(400)
          .send(
            "Aluno não pode ser deletado pois está matriculado em uma disciplina."
          );
      } else {
        await prisma.aluno.delete({
          where: {
            id,
          },
        });
        res.status(200).send("Aluno deletado com sucesso!");
      }
    } catch (error) {
      res.status(500).send("Erro ao deletar aluno");
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const aluno = await alunoService.findById(id);
      res.status(200).send(aluno);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async cadastrarAluno(req: Request, res: Response) {
    try {
      const { nome, cpf, email } = req.body;
      await alunoService.criarAluno(nome, cpf, email);
      res.status(201).send("Aluno cadastrado com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async matricularAlunoNoCurso(req: Request, res: Response) {
    try {
      const { idAluno, idCurso } = req.body;
      await alunoService.matricularAluno(idAluno, idCurso);
      res.status(200).send("Aluno matriculado com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async matricularAlunoNaDisciplina(req: Request, res: Response) {
    try {
      const { idAluno, disciplinas } = req.body;

      for (const disciplina of disciplinas) {
        const jaCursou = await prisma.alunoDisciplinaCursado.findFirst({
          where: {
            alunoId: idAluno,
            disciplinaId: disciplina
          }
        })
        const estaCursando = await prisma.alunoDisciplinaMatriculado.findFirst({
          where: {
            alunoId: idAluno,
            disciplinaId: disciplina
          }
        })
        if(jaCursou || estaCursando){
          res.status(400).send("Aluno já concluiu essa disciplina")
          return
        }
      }


      await alunoService.adicionarDisciplinaAoAluno(
        idAluno,
        disciplinas,
        "Matriculado"
      );
      res.status(200).send("Aluno matriculado na disciplina com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async concluirDisciplina(req: Request, res: Response){
    try {
      const { idAluno, disciplinaId } = req.body;
      await prisma.alunoDisciplinaMatriculado.deleteMany({
        where: {
            disciplinaId,
            alunoId: idAluno
          }
        })
        await prisma.alunoDisciplinaCursado.create({
          data: {
            alunoId: idAluno,
            disciplinaId,
          }
        })
        res.status(200).send("Disciplina concluída com sucesso")
    } catch (error) {
      console.log(error)
      res.status(500).send("Erro ao concluir disciplina")
    }
  }

  async trancarDisciplina(req: Request, res: Response){
    try {
      const { idAluno, disciplinaId } = req.body;
      await prisma.alunoDisciplinaMatriculado.deleteMany({
        where: {
            disciplinaId,
            alunoId: idAluno
          }
        })
        await prisma.alunoDisciplinaTrancado.create({
          data: {
            alunoId: idAluno,
            disciplinaId,
          }
        })
        res.status(200).send("Disciplina trancada com sucesso")
    } catch (error) {
      res.status(500).send("Erro ao concluir disciplina")
    }
  }

  async todosAlunos(req: Request, res: Response) {
    try {
      const alunos = await alunoService.todosAlunos();
      res.status(200).send(alunos);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  async editarAluno(req: Request, res: Response) {
    try {
      const { id, nome, email, cpf } = req.body;
      await alunoService.editarAluno(id, nome, email, cpf);
      res.status(200).send("Aluno editado com sucesso!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}
