import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const Projects = () => { // Hilangkan tanda kurung ekstra di sini
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchProjects();
    }, []);

    return (
        <section id="project" className="p-8 bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => ( // Perbaikan di sini
                        <div key={project.id} className="p-4 bg-gray-200 rounded shadow-md">
                            <h3 className="text-xl font-bold">{project.name}</h3>
                            <p className="text-gray-600">{project.description}</p>
                            <a href={project.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                                {project.link}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
