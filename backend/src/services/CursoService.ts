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

  async adicionarDisciplinaAoCurso(idCurso: number, disciplinas: number[]) {
    console.log(idCurso, disciplinas)
    for (const idDisciplina of disciplinas) {
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
  }

  criarCurso = async (nome: string, duracao: number, descricao: string, horasTotais: number) => {
    await prisma.curso.create({
      data: {
        nome,
        duracao,
        descricao,
        horasTotais,
      },
    });
  };

  deleteCurso = async (id: number) => {
    await prisma.curso.delete({
      where: {
        id,
      },
    });
  }
}
