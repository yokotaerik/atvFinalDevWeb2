import { Professor } from "@prisma/client";
import { prisma } from "../prisma/prisma";

export class CursoService {
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
