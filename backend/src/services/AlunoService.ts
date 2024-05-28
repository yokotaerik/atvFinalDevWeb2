import { prisma } from "../prisma/prisma";

export class AlunoService {
  async deleteAluno(id: number) {
    try {
      const alunoDeletado = await prisma.aluno.findUnique({
        where: {
          id,
        },
        include: {
          curso: true,
          disciplinasMatriculado: {},
        },
      });
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
    }
  }

  async findById(id: number) {
    return await prisma.aluno.findUnique({
      where: {
        id,
      },
      include: {
        curso: true,
        disciplinasCursado: {
          include: {
            disciplina: true,
          },
        },
        disciplinasMatriculado: {
          include: {
            disciplina: true,
          },
        },
        disciplinasTrancado: {
          include: {
            disciplina: true,
          },
        },
      },
    });
  }
  
  async todosAlunos() {
    return await prisma.aluno.findMany({
      include: {
        curso: true,
      },
    });
  }

  async adicionarDisciplinaAoAluno(
    alunoId: number,
    disciplinaIds: number[],
    status: string
  ) {
    try {
      // Encontrar o aluno pelo ID
      const aluno = await prisma.aluno.findUnique({
        where: {
          id: alunoId,
        },
      });

      if (!aluno) {
        throw new Error("Aluno não encontrado.");
      }

      // Ensure disciplinaIds is properly typed as an array of numbers
      if (!Array.isArray(disciplinaIds)) {
        throw new Error("disciplinaIds não é um array.");
      }

      for (let disciplinaId of disciplinaIds) {
        // Encontrar a disciplina pelo ID
        const disciplina = await prisma.disciplina.findUnique({
          where: {
            id: disciplinaId,
          },
        });

        if (!disciplina) {
          throw new Error(`Disciplina com ID ${disciplinaId} não encontrada.`);
        }

        // Criar uma nova entrada na tabela AlunoDisciplinaStatus
        const alunoDisciplinaStatus = await prisma.alunoDisciplinaMatriculado.create(
          {
            data: {
              aluno: {
                connect: { id: alunoId },
              },
              disciplina: {
                connect: { id: disciplinaId },
              },
            },
          }
        );

        console.log(
          "Disciplina adicionada ao aluno com sucesso:",
          alunoDisciplinaStatus
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar disciplina ao aluno:", error);
    } finally {
      await prisma.$disconnect();
    }
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
  criarAluno = async (nome: string, cpf: string, email: string) => {
    await prisma.aluno.create({
      data: {
        nome,
        cpf,
        email,
      },
    });
  };

  editarAluno = async (id: number, nome: string, email: string, cpf: string) => {
    await prisma.aluno.update({
      where: {
        id,
      },
      data: {
        nome,
        email,
        cpf,
      },
    });
  };
}
