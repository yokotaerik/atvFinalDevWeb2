import { Professor } from "@prisma/client";
import { prisma } from "../prisma/prisma";

export class AlunoService {
  async todosAlunos() {
    return await prisma.aluno.findMany({
      include: {
        curso: true,
      },
    });
  }
  
  async matricularAlunoNaDisciplina(idAluno: number, idDisciplina: number) {
    await prisma.aluno.update({
      where: {
        id: idAluno,
      },
      data: {
        disciplinas: {
          connect: {
            id: idDisciplina,
          },
        },
      },
    });
  }
  async matricularAluno(idAluno: number, idCurso: number) {
    await prisma.aluno.update({
      where: {
        id: idAluno,
      },
      data: {
        curso: {
          connect: {
            id: idCurso,
          },
        },
      },
    });
  }
  criarAluno = async (nome: string) => {
    await prisma.aluno.create({
      data: {
        nome,
      },
    });
  };
}
