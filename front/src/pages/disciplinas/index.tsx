import React, { useState, useEffect } from "react";
import axios from "axios";
import { DisciplinaDTO } from "@/hooks/useCurso.";
import Disciplina from "@/components/disciplina";
import api from "@/api/axios";
import CadastrarDisciplina from "@/components/cadastrarDisciplina";
import useDisciplina from "@/hooks/useDisciplina";

const Disciplinas: React.FC = () => {
  const { disciplinas } = useDisciplina();

  return (
    <div className="container mx-auto">
      <CadastrarDisciplina />

      <h1 className="text-3xl font-bold mb-4">Lista de Disciplinas</h1>
      <ul className="space-y-4">
        {disciplinas.length > 0 ? (
          disciplinas.map((disciplina) => (
            <li key={disciplina.id}>
              <Disciplina
                id={disciplina.id}
                nome={disciplina.nome}
                ementa={disciplina.ementa}
                cargaHoraria={disciplina.cargaHoraria}
              />
            </li>
          ))
        ) : (
          <p className="text-gray-500">Carregando disciplinas</p>
        )}
      </ul>
    </div>
  );
};

export default Disciplinas;
