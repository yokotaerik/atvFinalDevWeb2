import useCurso, { CursoDTO } from "@/hooks/useCurso.";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/axios";

const CursoDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const [curso, setCurso] = useState<CursoDTO | null>(null);

  const findById = async (id: number) => {
    try {
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
    <div>
      <h1>{curso.nome}</h1>
      <p>Horas Totais: {curso.horasTotais}</p>
      <h2>Disciplinas:</h2>
      <ul>
        {curso.disciplinas.map((disciplina) => (
          <li key={disciplina.id}>{disciplina.nome}</li>
        ))}
      </ul>
      <h2>Alunos:</h2>
      <ul>
        {curso.alunos.map((aluno) => (
          <li key={aluno.id}>{aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default CursoDetails;
