import { Professor } from "@prisma/client";
import { prisma } from "../prisma/prisma";

export class CursoService {
  async todosCursos() {
    return await prisma.curso.findMany();
  }

  async findById(id: number) {
    return await prisma.curso.findFirst({
      where: {
        id,
      },
      include: {
        disciplinas: true,
        alunos: true,
      },
    });
  }

  async adicionarDisciplinaAoCurso(idCurso: number, idDisciplina: number) {
    await prisma.curso.update({
      where: {
        id: idCurso,
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
  criarCurso = async (nome: string) => {
    await prisma.curso.create({
      data: {
        nome,
      },
    });
  };
}
