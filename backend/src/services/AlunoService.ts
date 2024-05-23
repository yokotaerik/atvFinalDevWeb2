import { prisma } from "../prisma/prisma";

export class AlunoService {
  async deleteAluno(id: number) {
    const alunoDeletado = await prisma.aluno.findUnique({
      where: {
        id,
      },
      include: {
        curso: true,
        disciplinas: {},
      },
    });

    if (!alunoDeletado) throw new Error("Aluno não encontrado.");

    if (
      alunoDeletado?.disciplinas.some(async (disciplina) => {
        disciplina.status = "Matriculado";
      })
    ) {
      throw new Error(
        "Aluno não pode ser deletado pois está matriculado em uma disciplina."
      );
    } else {
      await prisma.aluno.delete({
        where: {
          id,
        },
      });
    }
  }

  async findById(id: number) {
    return await prisma.aluno.findUnique({
      where: {
        id,
      },
      include: {
        curso: true,
        disciplinas: {
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
        const alunoDisciplinaStatus = await prisma.alunoDisciplinaStatus.create(
          {
            data: {
              aluno: {
                connect: { id: alunoId },
              },
              disciplina: {
                connect: { id: disciplinaId },
              },
              status: status,
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

  async atualizarStatusDisciplina(id: number, status: string) {
    await prisma.alunoDisciplinaStatus.update({
      where: {
        id,
      },
      data: {
        status,
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
  criarAluno = async (nome: string, cpf: string, email: string) => {
    await prisma.aluno.create({
      data: {
        nome,
        cpf,
        email,
      },
    });
  };

  editarAluno = async (id: number, nome: string, email: string) => {
    await prisma.aluno.update({
      where: {
        id,
      },
      data: {
        nome,
        email,
      },
    });
  };
}
