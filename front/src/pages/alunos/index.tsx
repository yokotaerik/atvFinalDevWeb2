import api from "@/api/axios";
import CadastrarAlunoForm from "@/components/cadastroAluno";
import useAlunos, { AlunoDTO } from "@/hooks/useAlunos";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";

const Alunos: React.FC = () => {
  const { fetchStudents, deleteAluno } = useAlunos();
  const [alunos, setAlunos] = useState<AlunoDTO[]>([]);

  const handleDelete = (id: number) => {
    deleteAluno(id).then(() => {
      updateAlunos();
    });
  } 

  const updateAlunos = async () => {
    fetchStudents().then((data) => {
      console.log(data);
      setAlunos(data);
    });
  };

  useEffect(() => {
    updateAlunos();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <CadastrarAlunoForm onRequest={updateAlunos} />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de alunos</h1>
        <div>
          {alunos.length > 0 ? (
            alunos.map((aluno) => (
              <div className="flex justify-between bg-slate-100 p-2 rounded-md shadow-md">
                <Link href={`/alunos/${aluno.id}`} key={aluno.id}>
                  <div className="mb-2 cursor-pointer">
                    <span className="text-blue-500">{aluno.nome}</span> -
                    {aluno.curso ? (
                      <span> Curso: {aluno.curso.nome}</span>
                    ) : (
                      <span> Não matriculado em nenhum curso</span>
                    )}
                  </div>
                </Link>
                <button
                  className="p-1 bg-red-500 rounded-md"
                  onClick={() => handleDelete(aluno.id)}
                >
                  Deletar aluno
                </button>
              </div>
            ))
          ) : (
            <p>Carregando os alunos...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alunos;
