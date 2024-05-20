import useCurso from "@/hooks/useCurso.";
import React, { useState } from "react";

const CadastrarCursoForm = () => {
  const { cadastrarCurso } = useCurso();
  const [nomeCurso, setNomeCurso] = useState("");

  const handleNomeCursoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNomeCurso(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await cadastrarCurso(nomeCurso);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome do Curso:
        <input type="text" value={nomeCurso} onChange={handleNomeCursoChange} />
      </label>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastrarCursoForm;
