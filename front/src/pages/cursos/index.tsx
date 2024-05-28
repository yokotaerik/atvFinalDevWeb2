import CadastrarCursoForm from "@/components/cadastrarCurso";
import useCurso, { CursoDTO } from "@/hooks/useCurso.";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Cursos: React.FC = () => {
  const { fetchCursos } = useCurso();
  const [cursos, setCursos] = useState<CursoDTO[]>([]);

  useEffect(() => {
    updateCursos();
  }, []);

  const updateCursos = async () => {
    fetchCursos().then((data) => {
      setCursos(data);
    });
  }

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de cursos</h1>
        <ul>
          {cursos && cursos.length > 0 ? (
            cursos.map((curso) => (
              <Link href={`/cursos/${curso.id}`} key={curso.id}>
                <li className="cursor-pointer hover:text-blue-500">
                  {curso.nome}
                </li>
              </Link>
            ))
          ) : (
            <p>Carregando os cursos...</p>
          )}
        </ul>
      </div>
      <div className="w-1/2 p-4">
        <CadastrarCursoForm onRequest={updateCursos}  />
      </div>
    </div>
  );
};

export default Cursos;
 