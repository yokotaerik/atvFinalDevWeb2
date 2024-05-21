import React, { useState, useEffect } from "react";
import api from "@/api/axios";
import { DisciplinaDTO } from "@/hooks/useCurso.";
import { Router, useRouter } from "next/router";
import { AlunoDTO } from "@/hooks/useAlunos";

const Disciplina: React.FC = () => {
  const router = useRouter();
  const [disciplinas, setDisciplinas] = useState<DisciplinaDTO>();
  const id = router.query.id;

  const fetchDisciplinas = async () => {
    try {
      const response = await api.get(`/disciplina/porId/${id}`);
      setDisciplinas(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao buscar disciplinas");
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, [id]);

return (
    <div className="container mx-auto flex flex-col">
        <h1 className="text-2xl font-bold mb-4">{disciplinas?.nome}</h1>
        <p className="mb-2">Carga Horária: {disciplinas?.cargaHoraria}</p>
        <p className="mb-4">Ementa: {disciplinas?.ementa}</p>
        <h2 className="text-xl font-bold mb-2">Alunos:</h2>
        {disciplinas?.alunos?.map((relacao: any) => (
            <div key={relacao.id} className="border border-gray-300 rounded p-4 mb-4">
                <p className="mb-2">Nome: {relacao.aluno.nome}</p>
                <p>
                    Curso: {relacao.aluno.curso.nome ? relacao.aluno.curso.nome : "Não está matriculado em nenhum curso"}
                </p>
            </div>
        ))}
    </div>
);
};

export default Disciplina;
