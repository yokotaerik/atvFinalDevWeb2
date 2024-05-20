import { Professor } from "@prisma/client";
import { prisma } from "../prisma/prisma";

export class ProfessorService {
  criarProfessor = async (nome: string, especialidade: string) => {
    await prisma.professor.create({
      data: {
        nome,
        especialidade,
      },
    });
  };
}
