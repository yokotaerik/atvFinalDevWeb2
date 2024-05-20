import api from "@/api/axios";
import useDisciplina from "@/hooks/useDisciplina";
import React, { use, useState } from "react";

const CadastrarDisciplina: React.FC = () => {
  const [nome, setNome] = useState("");
  const [ementa, setEmenta] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState(0);
  const { cadastrarDisciplina } = useDisciplina();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await cadastrarDisciplina(nome, ementa, cargaHoraria);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Disciplina</h2>
      <form onSubmit={handleSubmit} className="w-64">
        <div className="mb-4">
          <label htmlFor="nome" className="block mb-2 font-medium">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="codigo" className="block mb-2 font-medium">
            Ementa:
          </label>
          <input
            type="text"
            id="codigo"
            value={ementa}
            onChange={(e) => setEmenta(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="codigo" className="block mb-2 font-medium">
            Carga Horaria:
          </label>
          <input
            type="text"
            id="codigo"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastrarDisciplina;
