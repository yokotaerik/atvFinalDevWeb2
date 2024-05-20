import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col w-full h-screen">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-white text-2xl font-bold">Sistema de Controle Acadêmico</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/alunos">
                <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Alunos</p>
              </Link>
              <Link href="/disciplinas">
                <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Disciplinas</p>
              </Link>
              <Link href="/cursos">
                <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Cursos</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center  flex-grow m-8">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
