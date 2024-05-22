import api from "@/api/axios";
import useAlunos from "@/hooks/useAlunos";
import React, { useState } from "react";

interface CadastrarAlunoFormProps {
  onRequest: any;
}

const CadastrarAlunoForm = ({ onRequest }: CadastrarAlunoFormProps) => {
  const { handleAddAluno } = useAlunos();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleAddAluno(nome, cpf);
    onRequest();
  };

  return (
    <div className="w-full">
      <h2 className="font-bold text-2xl">Cadastrar um novo aluno</h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label className="font-semibold">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={handleNomeChange}
          className="border border-gray-300 rounded-md p-1"
        />
         <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="border border-gray-300 rounded-md p-1"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-1"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastrarAlunoForm;
