import { prisma } from "../prisma/prisma";

export class CursoService {
  editarCurso(id: number, nome: string, duracao: number, descricao: string, horasTotais: number) {
    try {
      prisma.curso.update({
        where: {
          id,
        },
        data: {
          nome,
          duracao,
          descricao,
          horasTotais,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  async todosCursos() {
    try {
      return await prisma.curso.findMany();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      return await prisma.curso.findFirst({
        where: {
          id,
        },
        include: {
          disciplinas: {
            include: {
              disciplina: true,
            },
          },
          alunos: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async adicionarDisciplinaAoCurso(idCurso: number, disciplinas: number[]) {
    console.log(idCurso, disciplinas);
    for (const idDisciplina of disciplinas) {
      try {
        await prisma.cursoDisciplina.create({
          data: {
            cursoId: idCurso,
            disciplinaId: idDisciplina,
          },
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  criarCurso = async (nome: string, duracao: number, descricao: string, horasTotais: number) => {
    try {
      await prisma.curso.create({
        data: {
          nome,
          duracao,
          descricao,
          horasTotais,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  
  deleteCurso = async (id: number) => {
    try {
      await prisma.aluno.updateMany({
        where: {
          cursoId: id,
        },
        data: {
          cursoId: null,
        },
      });

      await prisma.cursoDisciplina.deleteMany({
        where: {
          cursoId: id,
        },
      });

      await prisma.curso.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  
}
