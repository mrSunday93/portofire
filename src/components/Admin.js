import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const Admin = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '', link: ''});
    const [isEditing, setIsEditing] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsAdmin(!!user);
        });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password);
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const querySnapshot = await getDocs(collection(db, "projects"));
            setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchProjects();
    }, [isAdmin]);

    const handleAddProject = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'projects'), newProject);
        setProjects([...projects, newProject]);
        setNewProject({ name: '', description: '', link: ''});
    };

    const handleDeleteProject = async (id) => {
        await deleteDoc(doc(db, 'projects', id));
        setProjects(projects.filter(project => project.id !== id));
    };

    const startEditingProject = (project) => {
        setIsEditing(true);
        setNewProject({ name: project.name, description: project.description, link: project.link});
        setCurrentProjectId(project.id);
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        const projectRef = doc(db, 'projects', currentProjectId);
        await updateDoc(projectRef, newProject);

        setProjects(projects.map((project) => (project.id === currentProjectId ? { id: currentProjectId, ...newProject } : project)));
        setIsEditing(false);
        setNewProject({ name: '', description: '', link: '' });
        setCurrentProjectId(null);
    };

    return (
        <div className="p-8">
            <h1 className="flex justify-center m-auto text-3xl mb-10">Only Admin</h1>
            {!isAdmin ? (
                <form onSubmit={handleLogin} className="space-y-4">
                    <h2>Projects</h2>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded"/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border"/>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
                </form>
            ) : (
                <div>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded mb-4">Logout</button>

                    <form onSubmit={isEditing ? handleUpdateProject : handleAddProject} className="space-y-4">
                        <h1 className="text-2xl">Insert Your Project</h1>
                        <input type="text" placeholder="Project Name" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="w-full p-2 border rounded" required />
                        <input type="text" placeholder="Project Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value})} className="w-full p-2 border rounded" required/>
                        <input type="text" placeholder="Project Link" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value})} className="w-full p-2 border rounded" required/>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">{isEditing ? 'Update Project' : 'Add Project'}</button>
                        {isEditing && (
                            <button type="button" onClick={() => { setIsEditing(false); setNewProject({ name: '', link: '' }); }} className="px-4 py-2 bg-gray-500 text-white rounded ml-2">Cancel</button>
                        )}
                    </form>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Project</h2>
                        <ul>
                            {projects.map(project => (
                                <li key={project.id} className="flex justify-between items-center border-b py-2">
                                    <span>{project.name}</span>
                                    <div>
                                        <button onClick={() => startEditingProject(project)} className="px-4 py-1 bg-yellow-500 text-white rounded me-2">Edit</button>
                                        <button onClick={() => handleDeleteProject(project.id)} className="px-4 py-1 bg-red-500 text-white rounded">Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;