import api from "@/api/axios";
import { DisciplinaDTO } from "@/hooks/useCurso.";
import useDisciplina from "@/hooks/useDisciplina";
import React, { useEffect, useState } from "react";

interface AdicionarisciplinaAoCursoProps {
  idCurso: number;
  onRequest: any
}

const AdicionarisciplinaAoCurso: React.FC<AdicionarisciplinaAoCursoProps> = ({
  idCurso, onRequest}) => {
  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState<string[]>([]);
  const { buscarDisciplinas } = useDisciplina();
  const [disciplinas, setDisciplinas] = useState<DisciplinaDTO[]>([]);

  const updateDisciplinas = async () => {
    const disciplinas = await buscarDisciplinas();
    setDisciplinas(disciplinas);
  };

  useEffect(() => {
    updateDisciplinas();
  }, []);

  const handleMudancaDisciplina = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const idDisciplinaSelecionada = event.target.value;
    setDisciplinasSelecionadas((disciplinasAnteriores) => {
      if (disciplinasAnteriores.includes(idDisciplinaSelecionada)) {
        return disciplinasAnteriores.filter(
          (id) => id !== idDisciplinaSelecionada
        );
      } else {
        return [...disciplinasAnteriores, idDisciplinaSelecionada];
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (disciplinasSelecionadas.length === 0) {
        return;
      }
      const response = await api.post("/curso/adicionar_disciplina", {
        idCurso: idCurso,
        disciplinas: disciplinasSelecionadas.map(Number),
      });
      if (response.status === 200) {
        alert("Disciplina adicionada com sucesso");
        onRequest();
      }
    } catch (error) {
      alert(
        "Erro ao adicionar disciplina ao curso, verifique se a disciplina já não foi adicionada ao curso ou se o servidor está funcionando corretamente. Se o erro persistir, contate o administrador do sistema para mais informaçõe"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="disciplina" className="text-lg font-bold">
          Escolha uma disciplina:
        </label>
        <select
          id="disciplina"
          onChange={handleMudancaDisciplina}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecione uma disciplina</option>
          {disciplinas.map((disciplina) => (
            <option key={disciplina.id} value={disciplina.id}>
              {disciplina.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="text-lg font-bold">Disciplinas selecionadas:</label>
        <div className="mt-2">
          {disciplinasSelecionadas.map((idDisciplina) => (
            <span
              key={idDisciplina}
              className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-white bg-blue-500 rounded-full"
            >
              {
                disciplinas.find(
                  (disciplina) => disciplina.id === Number(idDisciplina)
                )?.nome
              }
              {"    "}	
              <button
              onClick={() =>
                setDisciplinasSelecionadas((disciplinasAnteriores) =>
                  disciplinasAnteriores.filter((id) => id !== idDisciplina)
                )
              }
              >X</button>
            </span>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Adicionar
      </button>
    </form>
  );
};

export default AdicionarisciplinaAoCurso;
