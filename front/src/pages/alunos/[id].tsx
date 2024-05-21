import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/axios";
import { AlunoDTO } from "@/hooks/useAlunos";
import MatricularAlunoNoCurso from "@/components/matricularAlunoNoCurso";
import MatricularAlunoNaDisciplina from "@/components/matricularAlunoNaDisciplina";

const AlunoDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const [aluno, setAluno] = useState<AlunoDTO | null>(null);

  const findAlunoById = async (id: number) => {
    try {
      if(id === undefined) return;
      const response = await api.get(`/aluno/porId/${id}`);
      setAluno(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao buscar");
    }
  };

  const trancarDisciplina = async (id: number) => {
    try {
      const response = await api.put("/aluno/atualizar/status/disciplina", {
        id,
        status: "Trancada",
      });
      if (response.status === 200) {
        alert("Disciplina trancada com sucesso");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao trancar disciplina");
    }
  };

  const concluirDisciplina = async (id: number) => {
    try {
      const response = await api.put("/aluno/atualizar/status/disciplina", {
        id,
        status: "Cursada",
      });
      if (response.status === 200) {
        alert("Disciplina concluída com sucesso");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao concluir disciplina");
    }
  };

  useEffect(() => {
    if (id != undefined) {
      findAlunoById(Number(id));
    }
  }, [id]);

  if (!aluno) {
    return <div>Carregando ...</div>;
  }

  return (
    <div className="flex gap-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">{aluno.nome}</h1>
        <p className="mb-2">Curso: {aluno.curso?.nome}</p>
        <h2 className="text-lg font-bold mb-2">Disciplinas matriculadas:</h2>
        <ul className="mb-4">
          {aluno.disciplinas
            ? aluno.disciplinas
                .filter((disciplina) => disciplina.status === "Matriculado")
                .map((disciplina) => (
                  <li
                    key={disciplina.id}
                    className="mb-2 bg-gray-100 rounded-md p-2 flex justify-between items-center"
                  >
                    {disciplina.disciplina.nome}
                    <div>
                      <button
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => concluirDisciplina(disciplina.id)}
                      >
                        Marcar como cursada
                      </button>
                      <button
                        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => trancarDisciplina(disciplina.id)}
                      >
                        Marcar como trancada
                      </button>
                    </div>
                  </li>
                ))
            : "Nenhuma disciplina cursada ou matriculada"}
        </ul>
        <h2 className="text-lg font-bold mb-2">Disciplinas cursadas:</h2>
        <ul className="mb-4">
          {aluno.disciplinas
            ? aluno.disciplinas
                .filter((disciplina) => disciplina.status === "Cursada")
                .map((disciplina) => (
                  <li
                    key={disciplina.id}
                    className="mb-2 bg-gray-100 rounded-md p-2"
                  >
                    {disciplina.disciplina.nome}
                  </li>
                ))
            : "Nenhuma disciplina cursada ou matriculada"}
        </ul>
        <h2 className="text-lg font-bold mb-2">Disciplinas trancadas:</h2>
        <ul className="mb-4">
          {aluno.disciplinas
            ? aluno.disciplinas
                .filter((disciplina) => disciplina.status === "Trancada")
                .map((disciplina) => (
                  <li
                    key={disciplina.id}
                    className="mb-2 bg-gray-100 rounded-md p-2"
                  >
                    {disciplina.disciplina.nome}
                  </li>
                ))
            : "Nenhuma disciplina cursada ou matriculada"}
        </ul>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        {!aluno.curso && <MatricularAlunoNoCurso idAluno={aluno.id} />}
        <MatricularAlunoNaDisciplina alunoId={aluno.id} />
      </div>
    </div>
  );
};

export default AlunoDetails;
