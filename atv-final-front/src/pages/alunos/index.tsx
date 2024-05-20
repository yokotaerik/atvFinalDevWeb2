import api from "@/api/axios";
import CadastrarAlunoForm from "@/components/cadastroAluno";
import useAlunos from "@/hooks/useAlunos";
import React, { useState, useEffect } from "react";

const Alunos: React.FC = () => {
  const { alunos } = useAlunos();

  return (
    <div className="flex ">
      <div>
        <h1>Lista de alunos</h1>
        <ul>
          {alunos.length > 0
            ? alunos.map((alunos) => (
                <li key={alunos.id}>
                  {alunos.nome} -
                  {alunos.curso
                    ? ` Curso: ${alunos.curso.nome}`
                    : " Não matriculado em nenhum curso"}
                </li>
              ))
            : "Carregando os alunos..."}
        </ul>
      </div>
      <div>
        <CadastrarAlunoForm />
      </div>
    </div>
  );
};

export default Alunos;
