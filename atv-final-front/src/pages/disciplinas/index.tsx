import React, { useState, useEffect } from "react";
import axios from "axios";
import { DisciplinaDTO } from "@/hooks/useCurso.";
import Disciplina from "@/components/disciplina";
import api from "@/api/axios";
import CadastrarDisciplina from "@/components/cadastrarDisciplina";

const Disciplinas: React.FC = () => {
  const [disciplinas, setDisciplinas] = useState<DisciplinaDTO[]>([]);

  useEffect(() => {
    const buscarDisciplinas = async () => {
      try {
        const resposta = await api.get("/disciplina/todos");
        setDisciplinas(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar disciplinas:", erro);
      }
    };

    buscarDisciplinas();
  }, []);

  

  return (
    <div>
      <h1>Lista de Disciplinas</h1>
      <ul>
        {disciplinas.length > 0 ? disciplinas.map((disciplina) => (
          <li key={disciplina.id}>
            <Disciplina
              id={disciplina.id}
              nome={disciplina.nome}
              ementa={disciplina.ementa}
              cargaHoraria={disciplina.cargaHoraria}
            />
          </li>
        )): "Carregando disciplinas"}
      </ul>
      <CadastrarDisciplina/>
    </div>
  );
};

export default Disciplinas;
