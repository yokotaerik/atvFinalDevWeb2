import React, { useState, useEffect } from "react";
import Disciplina from "@/components/disciplina";
import CadastrarDisciplina from "@/components/cadastrarDisciplina";
import useDisciplina from "@/hooks/useDisciplina";
import Link from "next/link";

const Disciplinas: React.FC = () => {
  const { disciplinas } = useDisciplina();

  return (
    <div className="container mx-auto flex">
      <div className="w-1/3">
        <CadastrarDisciplina />
      </div>

      <div className="w-2/3">
        <h1 className="text-3xl font-bold mb-4">Lista de Disciplinas</h1>
        <ul className="space-y-4">
          {disciplinas.length > 0 ? (
            disciplinas.map((disciplina) => (
              <Link href={`/disciplinas/${disciplina.id}`} key={disciplina.id}>
                <li key={disciplina.id}>
                  <Disciplina
                    id={disciplina.id}
                    nome={disciplina.nome}
                    ementa={disciplina.ementa}
                    cargaHoraria={disciplina.cargaHoraria}
                    alunos={null}
                  />
                </li>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">Carregando disciplinas</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Disciplinas;
