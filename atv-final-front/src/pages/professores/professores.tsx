import React, { useState, useEffect } from "react";
import axios from "axios";

interface Professor {
    id: number;
    name: string;
    subject: string;
}

const Professores: React.FC = () => {
    const [professors, setProfessors] = useState<Professor[]>([]);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const response = await axios.get("/api/professors");
                setProfessors(response.data);
            } catch (error) {
                console.error("Error fetching professors:", error);
            }
        };

        fetchProfessors();
    }, []);

    return (
        <div>
            <h1>List of Professors</h1>
            <ul>
                {professors.map((professor) => (
                    <li key={professor.id}>
                        {professor.name} - Subject: {professor.subject}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Professores;