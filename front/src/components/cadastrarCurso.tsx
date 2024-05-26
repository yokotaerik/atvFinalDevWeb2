import useCurso from "@/hooks/useCurso.";
import React, { useState } from "react";

const CadastrarCursoForm = ({ onRequest }: any) => {
  const { cadastrarCurso } = useCurso();
  const [nomeCurso, setNomeCurso] = useState("");
  const [duracao, setDuracao] = useState("");
  const [horasTotais, setHorasTotais] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleNomeCursoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNomeCurso(event.target.value);
  };

  const handleDuracaoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDuracao(event.target.value);
  };

  const handleHorasTotaisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHorasTotais(event.target.value);
  };

  const handleDescricaoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricao(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await cadastrarCurso(nomeCurso, Number(duracao), Number(horasTotais), descricao);
    onRequest();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label className="mb-4">
        Nome do Curso:
        <input
          type="text"
          value={nomeCurso}
          onChange={handleNomeCursoChange}
          className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="mb-4">
        Duração:
        <input
          type="text"
          value={duracao}
          onChange={handleDuracaoChange}
          className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="mb-4">
        Horas Totais:
        <input
          type="text"
          value={horasTotais}
          onChange={handleHorasTotaisChange}
          className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="mb-4">
        Descrição:
        <input
          type="text"
          value={descricao}
          onChange={handleDescricaoChange}
          className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default CadastrarCursoForm;
