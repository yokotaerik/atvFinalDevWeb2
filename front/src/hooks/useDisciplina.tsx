import api from "@/api/axios";
import { useState, useEffect } from "react";
import { DisciplinaDTO } from "./useCurso.";

const useDisciplina = () => {
  const [disciplinas, setDisciplinas] = useState<DisciplinaDTO[]>([]);

  const buscarDisciplinas = async () => {
    try {
      const resposta = await api.get("/disciplina/todos");
      setDisciplinas(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar disciplinas:", erro);
    }
  };
  useEffect(() => {
    buscarDisciplinas();
  }, []);

  const cadastrarDisciplina = async (
    nome: string,
    ementa: string,
    cargaHoraria: number
  ) => {
    try {
      const response = await api.post("/disciplina/criar", {
        nome,
        ementa,
        cargaHoraria,
      });
      if (response.status === 201) {
        alert("Disciplina cadastrada com sucesso!");
        await buscarDisciplinas();
      }
    } catch (error) {
      alert("Erro ao cadastrar disciplina");
    }
  };

  return { disciplinas, cadastrarDisciplina };
};

export default useDisciplina;
