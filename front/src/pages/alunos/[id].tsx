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
  const [editar, setEditar] = useState(false);

  const handleDeleteAluno = async (id: number) => {
    try {
      const response = await api.delete(`/aluno/deletar/${id}`);
      if (response.status === 200) {
        alert("Aluno deletado com sucesso");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.response.data);
    }
  };

  const findAlunoById = async (id: number) => {
    try {
      if (id === undefined) return;
      const response = await api.get(`/aluno/porId/${id}`);
      setAluno(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao buscar");
    }
  };

  const updateAluno = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.put(`/aluno/editar/${id}`, aluno);
      if (response.status === 200) {
        setEditar(false);
      }
    } catch (error) {
      alert("Erro ao atualizar aluno");
    }
  };

  const trancarDisciplina = async (id: number) => {
    try {
      const response = await api.put("/aluno/trancarDisciplina", {
        idAluno: aluno?.id,
        disciplinaId: id,
      });
      if (response.status === 200) {
        alert("Disciplina trancada com sucesso");
        if (aluno) {
          findAlunoById(aluno.id);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao trancar disciplina");
    }
  };

  const concluirDisciplina = async (id: number) => {
    try {
      const response = await api.put("/aluno/concluirDisciplina", {
        idAluno: aluno?.id,
        disciplinaId: id,
      });
      if (response.status === 200) {
        alert("Disciplina concluída com sucesso");
        if (aluno) {
          findAlunoById(aluno.id);
        }
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
  }, []);

  if (!aluno) {
    return <div>Carregando ...</div>;
  }

  return (
    <div className="flex gap-4 ">
      <div className="w-3/5">
        <form className="flex flex-col" onSubmit={updateAluno}>
          <h1 className="">Nome: </h1>
          <input
            value={aluno.nome}
            className="border border-gray-300 rounded p-2 text-2xl font-bold"
            onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
            disabled={!editar}
          />
          <label htmlFor="">CPF: </label>
          <input
            className="border border-gray-300 rounded p-2"
            value={aluno.cpf}
            onChange={(e) => setAluno({ ...aluno, cpf: e.target.value })}
            disabled={!editar}
          />
          <label htmlFor="">E-mail: </label>
          <input
            className="border border-gray-300 rounded p-2"
            value={aluno.email}
            onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
            disabled={!editar}
          />
          <button
            className={`${
              !editar
                ? "hidden"
                : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            }`}
            type="submit"
            disabled={!editar}
          >
            Salvar
          </button>
        </form>
        <div className="flex gap-2 my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (editar ? setEditar(false) : setEditar(true))}
          >
            {editar ? "Cancelar" : "Editar"}
          </button>
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDeleteAluno(aluno.id)}
          >
            Deletar
          </button>
        </div>

        <p className="mb-2">
          {" "}
          {aluno.curso?.nome
            ? "Curso: " + aluno.curso.nome
            : "Não está matriculado a nenhum curso"}
        </p>
        <h2 className="text-lg font-bold mb-2">Disciplinas matriculadas:</h2>
        <ul className="mb-4">
          {aluno.disciplinasMatriculado
            ? aluno.disciplinasMatriculado
                .map((disciplina) => (
                  <li
                    key={disciplina.id}
                    className="mb-2 bg-gray-100 rounded-md p-2 flex gap-2 flex-col"
                  >
                    <div>
                      {disciplina.disciplina.nome}
                      <br /> Matriculado em:{" "}
                      {new Date(disciplina.data).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => concluirDisciplina(disciplina.disciplina.id)}
                      >
                        Concluir
                      </button>
                      <button
                        className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => trancarDisciplina(disciplina.disciplina.id)}
                      >
                        Trancar
                      </button>
                    </div>
                  </li>
                ))
            : "Nenhuma disciplina cursada ou matriculada"}
        </ul>
        <h2 className="text-lg font-bold mb-2">Disciplinas cursadas:</h2>
        <ul className="mb-4">
          {aluno.disciplinasCursado
            ? aluno.disciplinasCursado
                .map((disciplina) => (
                  <li
                    key={disciplina.id}
                    className="mb-2 bg-gray-100 rounded-md p-2"
                  >
                    {disciplina.disciplina.nome}
                    <br /> Matriculado em:{" "}
                    {new Date(disciplina.data).toLocaleDateString()}
                  </li>
                ))
            : "Nenhuma disciplina cursada ou matriculada"}
        </ul>
        <h2 className="text-lg font-bold mb-2">Disciplinas trancadas:</h2>
        <ul className="mb-4">
          {aluno.disciplinasTrancado
            ? aluno.disciplinasTrancado
                .map((disciplina) => (
                  <li
                    key={disciplina.id}
                    className="mb-2 bg-gray-100 rounded-md p-2"
                  >
                    {disciplina.disciplina.nome} <br />
                    Matriculado em:{" "}
                    {new Date(disciplina.data).toLocaleDateString()}
                  </li>
                ))
            : "Nenhuma disciplina cursada ou matriculada"}
        </ul>
      </div>
      <div className="w-2/5 flex flex-col gap-5">
        {!aluno.curso && (
          <MatricularAlunoNoCurso
            idAluno={aluno.id}
            onRequest={() => findAlunoById(aluno.id)}
          />
        )}
        <MatricularAlunoNaDisciplina
          alunoId={aluno.id}
          onRequest={() => findAlunoById(aluno.id)}
        />
      </div>
    </div>
  );
};

export default AlunoDetails;
