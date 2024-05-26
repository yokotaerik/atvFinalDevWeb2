import api from "@/api/axios";
import useCurso, { CursoDTO } from "@/hooks/useCurso.";
import React, { useEffect, useState } from "react";

interface MatricularNoCursoProps {
  idAluno: number;
  onRequest: any;
}

const MatricularAlunoNoCurso = ({ idAluno, onRequest }: MatricularNoCursoProps) => {
  const [selectedCurso, setSelectedCurso] = useState<number | null>(null);
  const [cursos, setCursos] = useState<CursoDTO[]>();
  const { fetchCursos } = useCurso();

  useEffect(() => {
    fetchCursos().then((data) => setCursos(data));
  }, []);

  const handleCursoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cursoId = parseInt(event.target.value);
    setSelectedCurso(cursoId);
  };

  const handleMatricular = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCurso) {
      alert("Selecione um curso");
      return;
    }
    try {
      const response = await api.post("/aluno/matricular/curso", {
        idAluno,
        idCurso: selectedCurso,
      });
      if(response.status === 200) {
        alert("Aluno matriculado no curso com sucesso");
        onRequest();
      }
    } catch (error) {
      alert("Erro ao matricular aluno no curso");
    }

    console.log("Matricular aluno no curso", idAluno, selectedCurso);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="w-64 p-4 bg-white rounded shadow" onSubmit={handleMatricular}>
        <h2 className="text-xl font-bold mb-4">Matricular Aluno no Curso</h2>
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={selectedCurso || ""}
          onChange={handleCursoChange}
        >
          <option value="">Selecione um curso</option>
          {cursos ? cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          )) : null}
        </select>
        <button
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="submit"
        >
          Matricular
        </button>
      </form>
    </div>
  );
};

export default MatricularAlunoNoCurso;
