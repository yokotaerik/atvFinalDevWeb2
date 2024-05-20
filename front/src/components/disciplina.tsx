import { DisciplinaDTO } from "@/hooks/useCurso.";
import React from "react";

const Disciplina: React.FC<DisciplinaDTO> = ({
  nome,
  ementa,
  cargaHoraria,
  id,
}) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Disciplina: {nome}</h2>
      <p className="text-lg mb-2">Ementa: {ementa}</p>
      <p className="text-lg">Carga Horária: {cargaHoraria}</p>
    </div>
  );
};

export default Disciplina;
