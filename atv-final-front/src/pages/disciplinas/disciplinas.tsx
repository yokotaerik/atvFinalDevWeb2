import React, { useState, useEffect } from "react";
import axios from "axios";

interface Discipline {
    id: number;
    name: string;
    credits: number;
}

const Disciplinas: React.FC = () => {
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);

    useEffect(() => {
        const fetchDisciplines = async () => {
            try {
                const response = await axios.get("/api/disciplines");
                setDisciplines(response.data);
            } catch (error) {
                console.error("Error fetching disciplines:", error);
            }
        };

        fetchDisciplines();
    }, []);

    return (
        <div>
            <h1>List of Disciplines</h1>
            <ul>
                {disciplines.map((discipline) => (
                    <li key={discipline.id}>
                        {discipline.name} - Credits: {discipline.credits}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Disciplinas;