import useCurso, { CursoDTO } from "@/hooks/useCurso.";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/axios";
import AdicionarisciplinaAoCurso from "@/components/adicionarDisciplinaAoCurso";

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
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">{curso.nome}</h1>
      <p className="mb-2">Horas Totais: {curso.horasTotais}</p>
      <AdicionarisciplinaAoCurso idCurso={Number(id)} />
      <h2 className="text-xl font-bold mt-4">Disciplinas:</h2>
      <ul className="list-disc pl-6 mb-4">
        {curso.disciplinas.map((disciplina) => (
          <li key={disciplina.id}>{disciplina.nome}</li>
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
