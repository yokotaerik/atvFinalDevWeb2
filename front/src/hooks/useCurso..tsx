import api from "@/api/axios";
import { useState, useEffect } from "react";
import { AlunoDTO } from "./useAlunos";
import { useRouter } from "next/router";

export interface CursoDTO {
  id: number;
  nome: string;
  disciplinas: any[];
  horasTotais: number;
  duracao: number;
  descricao: string;
  alunos: AlunoDTO[];
}

export interface DisciplinaDTO {
  id: number;
  nome: string;
  cargaHoraria: number;
  ementa: string;
  alunos: AlunoDTO[] | null;
}

const useCurso = () => {

  const fetchCursos = async () => {
    try {
      const response = await api.get("/curso/todos");
      return response.data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const cadastrarCurso = async (nomeCurso: string, duracao: number, horasTotais: number, descricao: string) => {
    try {
      const response = await api.post("/curso/criar", { nome: nomeCurso, duracao, horasTotais, descricao });
      if (response.status == 201) {
        alert("Curso cadastrado com sucesso");
        await fetchCursos();
      }
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  };

  return { fetchCursos, cadastrarCurso };
};

export default useCurso;
