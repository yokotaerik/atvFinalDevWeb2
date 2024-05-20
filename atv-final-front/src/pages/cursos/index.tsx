import CadastrarCursoForm from "@/components/cadastrarCurso";
import useCurso from "@/hooks/useCurso.";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Cursos: React.FC = () => {
  const { cursos } = useCurso();

  return (
    <div className="flex ">
      <div>
        <h1>Lista de cursos</h1>
        <ul>
          {cursos.length > 0
            ? cursos.map((curso) => (
                <Link href={`/cursos/${curso.id}`}>
                  <li key={curso.id}>{curso.nome}</li>
                </Link>
              ))
            : "Carregando os cursos..."}
        </ul>
      </div>
      <div>
        <CadastrarCursoForm />
      </div>
    </div>
  );
};

export default Cursos;
