import api from "@/api/axios";
import React, { useState } from "react";

const CadastrarDisciplina: React.FC = () => {
  const [nome, setNome] = useState("");
  const [ementa, setEmenta] = useState("");

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };
  const handleEmentaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmenta(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post("/disciplina/criar", { nome, ementa });
      if (response.status === 201) {
        alert("Disciplina cadastrada com sucesso!");
        setNome("");
        setEmenta("");
      }
    } catch (error) {
      alert("Erro ao cadastrar disciplina");
    }
  };

  return (
    <div>
      <h2>Cadastrar Disciplina</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={handleNomeChange}
          />
        </div>
        <div>
          <label htmlFor="codigo">Ementa:</label>
          <input
            type="text"
            id="codigo"
            value={ementa}
            onChange={handleEmentaChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarDisciplina;
