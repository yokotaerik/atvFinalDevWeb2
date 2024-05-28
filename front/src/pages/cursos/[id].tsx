import useCurso, { CursoDTO } from "@/hooks/useCurso.";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/axios";
import AdicionarisciplinaAoCurso from "@/components/adicionarDisciplinaAoCurso";

const CursoDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const [curso, setCurso] = useState<CursoDTO | null>(null);
  const [editar, setEditar] = useState(false);

  const updateCurso = async () => {
    console.log(curso);
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
      setCurso(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao buscar");
    }
  };

  useEffect(() => {
    if (id != undefined) {
      findById(Number(id));
    }
  }, [id]);

  if (!curso) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <form className="flex flex-col">
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
          onClick={() => updateCurso()}
          disabled={!editar}
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
      <ul className="list-disc pl-6 mb-4">
        {curso.disciplinas.map((disciplina) => (
          <li key={disciplina.id}>{disciplina.disciplina.nome}</li>
        ))}
      </ul>
      <h2 className="text-xl font-bold">Alunos:</h2>
      <ul className="list-disc pl-6">
        {curso.alunos.map((aluno) => (
          <li key={aluno.id}>{aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default CursoDetails;
