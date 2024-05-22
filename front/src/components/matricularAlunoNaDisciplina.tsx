import api from '@/api/axios';
import useDisciplina from '@/hooks/useDisciplina';
import React, { useState } from 'react';

interface MatricularAlunoNaDisciplinaProps {
    alunoId: number;
    onRequest: any;
}

const MatricularAlunoNaDisciplina: React.FC<MatricularAlunoNaDisciplinaProps> = ({ alunoId , onRequest }) => {
    const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState<string[]>([]);
    const { disciplinas } = useDisciplina();

    const handleMudancaDisciplina = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const idDisciplinaSelecionada = event.target.value;
        setDisciplinasSelecionadas((disciplinasAnteriores) => {
            if (disciplinasAnteriores.includes(idDisciplinaSelecionada)) {
                return disciplinasAnteriores.filter((id) => id !== idDisciplinaSelecionada);
            } else {
                return [...disciplinasAnteriores, idDisciplinaSelecionada];
            }
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if(disciplinasSelecionadas.length === 0) {
                return
            }
            const response = await api.post('/aluno/matricular/disciplina', {
                idAluno: alunoId,
                disciplinas: disciplinasSelecionadas.map(Number),
            });
            if (response.status === 200) {
                alert('Aluno matriculado na disciplina com sucesso');
                onRequest();
            }
        } catch (error) {
            alert('Erro ao matricular aluno nas disciplinas');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <label className='mb-2'>Disciplinas selecionadas: </label>
            <div className='mb-4'>
                {disciplinasSelecionadas.map((idDisciplina) => (
                    <span key={idDisciplina} className='bg-gray-200 px-2 py-1 rounded-md mr-2'>
                        {disciplinas.find((disciplina) => disciplina.id === Number(idDisciplina))?.nome}
                    </span>
                ))}
            </div>
            <label htmlFor="disciplina" className='mb-2'>Escolha uma disciplina:</label>
            <select id="disciplina" onChange={handleMudancaDisciplina} className='mb-4 p-2 border border-gray-300 rounded-md'>
                <option value="">Selecione uma disciplina</option>
                {disciplinas.map((disciplina) => (
                    <option key={disciplina.id} value={disciplina.id}>
                        {disciplina.nome}
                    </option>
                ))}
            </select>
            <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-md'>Matricular</button>
        </form>
    );
};

export default MatricularAlunoNaDisciplina;