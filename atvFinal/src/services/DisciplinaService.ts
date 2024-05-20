import { prisma } from "../prisma/prisma";

export class DisciplinaService {
  async adicionarProfessorNaDisciplina(
    idProfessor: number,
    idDisciplina: number
  ) {
    await prisma.disciplina.update({
      where: {
        id: idDisciplina,
      },
      data: {
        professor: {
          connect: {
            id: idProfessor,
          },
        },
      },
    });
  }
  async editarDisciplina(id: number, cargaHoraria: number, ementa: string) {
    await prisma.disciplina.update({
      where: {
        id: id,
      },
      data: {
        cargaHoraria: cargaHoraria,
        ementa: ementa,
      },
    });
  }
  criarDisciplina = async (
    nome: string,
    cargaHoraria: number,
    ementa: string
  ) => {
    await prisma.disciplina.create({
      data: {
        nome,
        cargaHoraria,
        ementa,
      },
    });
  };
}
