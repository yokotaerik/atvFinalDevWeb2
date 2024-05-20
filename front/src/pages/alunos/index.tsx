import api from "@/api/axios";
import CadastrarAlunoForm from "@/components/cadastroAluno";
import useAlunos from "@/hooks/useAlunos";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Alunos: React.FC = () => {
  const { alunos } = useAlunos();

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <CadastrarAlunoForm />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de alunos</h1>
        <ul>
          {alunos.length > 0 ? (
            alunos.map((aluno) => (
              <Link href={`/alunos/${aluno.id}`} key={aluno.id}>
                <li className="mb-2 cursor-pointer">
                  <span className="text-blue-500">{aluno.nome}</span> -
                  {aluno.curso ? (
                    <span> Curso: {aluno.curso.nome}</span>
                  ) : (
                    <span> Não matriculado em nenhum curso</span>
                  )}
                </li>
              </Link>
            ))
          ) : (
            <p>Carregando os alunos...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Alunos;
