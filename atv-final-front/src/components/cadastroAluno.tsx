import api from "@/api/axios";
import useAlunos from "@/hooks/useAlunos";
import React, { useState } from "react";

const CadastrarAlunoForm: React.FC = () => {
  const { handleAddAluno } = useAlunos();
  const [nome, setNome] = useState("");

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddAluno(nome);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={handleNomeChange} />
      </label>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastrarAlunoForm;
