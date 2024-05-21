import React, { useState, useEffect } from "react";
import api from "@/api/axios";
import { DisciplinaDTO } from "@/hooks/useCurso.";
import { Router, useRouter } from "next/router";
import { AlunoDTO } from "@/hooks/useAlunos";

const Disciplina: React.FC = () => {
  const router = useRouter();
  const [disciplina, setDisciplina] = useState<DisciplinaDTO>();
  const [novoCargaHoraria, setNovoCargaHoraria] = useState<number>();
  const [novaEmenta, setNovaEmenta] = useState<string>();

  const id = router.query.id;
  const [editar, setEditar] = useState(false);

  const fetchDisciplinas = async () => {
    try {
      const response = await api.get(`/disciplina/porId/${id}`);
      setDisciplina(response.data);
      setNovaEmenta(response.data.ementa);
      setNovoCargaHoraria(response.data.cargaHoraria);
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao buscar disciplinas");
    }
  };

  const updateDisciplina = async () => {
    try {
      const response = await api.put(`/disciplina/editar/${id}`, {
        cargaHoraria: novoCargaHoraria,
        ementa: novaEmenta,
      });
      if (response.status === 200) {
        setEditar(false);
      }
      fetchDisciplinas();
    } catch (error) {
      alert("Erro ao atualizar disciplina");
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{disciplina?.nome}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setEditar(true)}
      >
        Editar
      </button>
      <form className="flex flex-col mt-4">
        <label className="mb-2">Carga Horária:</label>
        <input
          className="border border-gray-300 rounded p-2"
          type="text"
          value={novoCargaHoraria}
          onChange={(e) => {
            const value = Number(e.target.value);
            setNovoCargaHoraria(value);
          }}
          disabled={!editar}
        />
        <label className="mb-2">Ementa:</label>
        <textarea
          className="border border-gray-300 rounded p-2"
          value={novaEmenta}
          onChange={(e) => setNovaEmenta(e.target.value)}
          disabled={!editar}
        />
      </form>
      <button
        className={`${!editar ? "hidden" : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"}`}
        onClick={() => updateDisciplina()}
        disabled={!editar}
      >
        Salvar
      </button>
      <h2 className="text-xl font-bold mt-4">Alunos:</h2>
      {disciplina?.alunos?.map((relacao: any) => (
        <div
          key={relacao.id}
          className="border border-gray-300 rounded p-4 mb-4"
        >
          <p className="mb-2">Nome: {relacao.aluno.nome}</p>
          <p>
            Curso:
            {relacao.aluno.curso.nome
              ? relacao.aluno.curso.nome
              : "Não está matriculado em nenhum curso"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Disciplina;
