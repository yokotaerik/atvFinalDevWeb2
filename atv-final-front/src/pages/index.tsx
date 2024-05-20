import Link from "next/link";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <Link href="/alunos">
        <p className="text-3xl">Alunos</p>
      </Link>
      <Link href="/cursos">
        <p className="text-3xl">Cursos</p>
      </Link>
      <Link href="/disciplinas">
        <p className="text-3xl">Disciplinas</p>
      </Link>
    </main>
  );
}
