import useCurso, { CursoDTO } from "@/hooks/useCurso.";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/axios";
import AdicionarisciplinaAoCurso from "@/components/adicionarDisciplinaAoCurso";

const CursoDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const [curso, setCurso] = useState<CursoDTO | null>(null);
  const [editar, setEditar] = useState(false);

  const updateCurso = async (e: React.FormEvent ) => {
    e.preventDefault();
    try {
      const response = await api.put(`/curso/editar/${id}`, curso);
      if (response.status === 200) {
        setEditar(false);
      }
    } catch (error) {
      alert("Erro ao atualizar curso");
    }
  };

  const deleteCurso = async () => {
    try {
      const response = await api.delete(`/curso/${id}`);
      if (response.status === 200) {
        router.push("/cursos");
      }
    } catch (error) {
      alert("Erro ao deletar curso");
    }
  }

  const findById = async (id: number) => {
    try {
      if (id == undefined) return;
      const response = await api.get(`/curso/porId/${id}`);
      console.log(response.data);
      setCurso(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao buscar");
    }
  };

  const handleDeleteDisciplina = async (cursoId: number, disciplinaId: number) => {
    try {
      const response = await api.delete(`/curso/disciplina/delete`, {
        data: {
          cursoId,
          disciplinaId,
        },
      });
      if (response.status === 200) {
        findById(Number(id));
      }
    } catch (error) {
      alert("Erro ao deletar disciplina");
    }
  }

  useEffect(() => {
    if (id != undefined) {
      findById(Number(id));
    }
  }, [id]);

  if (!curso) {
    return <div>Loading...</div>;
  }

  async function handleDesmatricularAluno(alunoId: number) {
    try {
      await api.put(`/curso/desmatricular/${alunoId}`);
      await findById(Number(id))
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao desmatricular aluno");
    }
  }

  return (
    <div className="container mx-auto px-4">
      <form className="flex flex-col" onSubmit={updateCurso}>
        <input
          value={curso.nome}
          className="border border-gray-300 rounded p-2 text-2xl font-bold"
          onChange={(e) => setCurso({ ...curso, nome: e.target.value })}
          disabled={!editar}
        />
        <label htmlFor="">Horas totais: </label>
        <input
          className="border border-gray-300 rounded p-2"
          value={curso.horasTotais}
          onChange={(e) =>
            setCurso({ ...curso, horasTotais: Number(e.target.value) })
          }
          disabled={!editar}
        />
        <label htmlFor="">Duração em semestres: </label>
        <input
          className="border border-gray-300 rounded p-2"
          value={curso.duracao}
          onChange={(e) =>
            setCurso({ ...curso, duracao: Number(e.target.value) })
          }
          disabled={!editar}
        />
        <label htmlFor="">Descricao</label>
        <textarea
          className="border border-gray-300 rounded p-2"
          value={curso.descricao}
          onChange={(e) => setCurso({ ...curso, descricao: e.target.value })}
          disabled={!editar}
        />
        <button
          className={`${
            !editar
              ? "hidden"
              : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          }`}
          disabled={!editar}
          type="submit"
        >
          Salvar
        </button>
      </form>
      <div className="flex gap-2 my-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => editar ? setEditar(false) : setEditar(true)}
        >
          {editar ? "Cancelar" : "Editar"}
        </button>
        <button
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            window.confirm("Deseja realmente deletar esse curso?") && deleteCurso()
          }
        >
          Deletar
        </button>
      </div>
      <AdicionarisciplinaAoCurso idCurso={Number(id)} onRequest={findById} />
      <h2 className="text-xl font-bold mt-4">Disciplinas:</h2>
      <ul className="flex flex-col gap-2">
        {curso.disciplinas.map((disciplina) => (
          <li key={disciplina.id} 
          className="flex justify-between bg-gray-200 rounded-md px-2 py-1">
          {disciplina.disciplina.nome} 
          <button
          className="bg-red-500 text-white rounded-md px-2 py-1"
           onClick={() => {window.confirm("Deseja excluir essa disciplina?") && handleDeleteDisciplina(disciplina.cursoId, disciplina.disciplinaId)}}
          > Excluir disciplina 
          </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold">Alunos:</h2>
      <ul className="list-disc pl-6">
        {curso.alunos.map((aluno) => (
          <li key={aluno.id}
          className="flex justify-between bg-gray-200 rounded-md px-2 py-1">
          {aluno.nome}
          <button
          className="bg-red-500 text-white rounded-md px-2 py-1"
           onClick={() => {window.confirm("Deseja desmatricular esse aluno?") && handleDesmatricularAluno(aluno.id)}}
          > Desmatricular 
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CursoDetails;
