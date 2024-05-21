import { prisma } from "../prisma/prisma";

export class DisciplinaService {
  async findById(id: number) {
    return await prisma.disciplina.findFirst({
      where:{
        id
      },
      include:{
        alunos: {
          where: {
            status: "Matriculado"
          },
          include: {
            aluno: {
              include: {
                curso: true
              }
            }
          },
        },
        cursos: true
      }
    })
  }

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
