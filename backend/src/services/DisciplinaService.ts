import { prisma } from "../prisma/prisma";

export class DisciplinaService {
  async listarDisciplinas() {
    return await prisma.disciplina.findMany();
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
