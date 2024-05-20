import { DisciplinaDTO } from "@/hooks/useCurso.";
import React from "react";

const Disciplina: React.FC<DisciplinaDTO> = ({
  nome,
  ementa,
  cargaHoraria,
  id,
}) => {
  return (
    <div>
      <h2>Disciplina: {nome}</h2>
      <p>Ementa: {ementa}</p>
      <p>Carga Horária: {cargaHoraria}</p>
    </div>
  );
};

export default Disciplina;
