import { prisma } from "../prisma/prisma";

export class DisciplinaService {
  async deleteDisciplina(id: number) {
    try {
      await prisma.disciplina.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      // Trate o erro aqui
    }
  }
  
  async findById(id: number) {
    try {
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
      });
    } catch (error) {
      // Trate o erro aqui
    }
  }

  async listarDisciplinas() {
    try {
      return await prisma.disciplina.findMany();
    } catch (error) {
      // Trate o erro aqui
    }
  }

  async editarDisciplina(id: number, cargaHoraria: number, ementa: string) {
    try {
      await prisma.disciplina.update({
        where: {
          id: id,
        },
        data: {
          cargaHoraria: cargaHoraria,
          ementa: ementa,
        },
      });
    } catch (error) {
      // Trate o erro aqui
    }
  }

  criarDisciplina = async (
    nome: string,
    cargaHoraria: number,
    ementa: string
  ) => {
    try {
      await prisma.disciplina.create({
        data: {
          nome,
          cargaHoraria,
          ementa,
        },
      });
    } catch (error) {
      // Trate o erro aqui
    }
  };
}
