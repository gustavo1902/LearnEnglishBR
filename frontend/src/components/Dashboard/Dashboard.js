import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

import ReadingMaterials from '../LearningContent/ReadingMaterials';
import Exercises from '../LearningContent/Exercises';
import ExternalResources from '../LearningContent/ExternalResources';
import Progress from '../LearningContent/Progress';

const Dashboard = () => {
    const { userInfo } = useAuth();
    const [activeSection, setActiveSection] = useState('exercicios');

    return (
        <div style={dashboardContainerStyle}>
            <h2 style={welcomeStyle}>Bem-vindo ao Dashboard!</h2>
            <p style={subtitleStyle}>Aqui você pode explorar o conteúdo e praticar seu inglês.</p>

            <div style={dashboardContentStyle}>
                <nav style={navStyle}>
                    <ul style={ulStyle}>
                        <li style={liStyle}>
                            <button
                                style={activeSection === 'exercicios' ? activeLinkStyle : navLinkStyle}
                                onClick={() => setActiveSection('exercicios')}
                            >
                                Exercícios
                            </button>
                        </li>
                        <li style={liStyle}>
                            <button
                                style={activeSection === 'leitura' ? activeLinkStyle : navLinkStyle}
                                onClick={() => setActiveSection('leitura')}
                            >
                                Materiais de Leitura
                            </button>
                        </li>
                        <li style={liStyle}>
                            <button
                                style={activeSection === 'recursos' ? activeLinkStyle : navLinkStyle}
                                onClick={() => setActiveSection('recursos')}
                            >
                                Recursos Externos
                            </button>
                        </li>
                        {userInfo && (
                            <li style={liStyle}>
                                <button
                                    style={activeSection === 'progresso' ? activeLinkStyle : navLinkStyle}
                                    onClick={() => setActiveSection('progresso')}
                                >
                                    Meu Progresso
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
                <div style={mainContentStyle}>
                    {activeSection === 'leitura' && <ReadingMaterials />}
                    {activeSection === 'exercicios' && <Exercises />}
                    {activeSection === 'recursos' && <ExternalResources />}
                    {activeSection === 'progresso' && (userInfo ? <Progress /> : <p className="message error">Faça login para ver seu progresso!</p>)}
                </div>
            </div>
        </div>
    );
};

const dashboardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '1200px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
};

const welcomeStyle = {
    fontSize: '2.5em',
    color: '#2c3e50',
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: '700'
};

const subtitleStyle = {
    fontSize: '1.2em',
    color: '#555',
    marginBottom: '30px',
    textAlign: 'center'
};

const dashboardContentStyle = {
    display: 'flex',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    minHeight: '500px'
};

const navStyle = {
    flex: '0 0 220px',
    padding: '20px',
    borderRight: '1px solid #eee',
    backgroundColor: '#ecf0f1',
    borderRadius: '8px 0 0 8px'
};

const ulStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
};

const liStyle = {
    marginBottom: '10px'
};

const navLinkStyle = {
    display: 'block',
    padding: '12px 15px',
    textDecoration: 'none',
    color: '#34495e',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1.1em',
    transition: 'background-color 0.2s, color 0.2s'
};

const activeLinkStyle = {
    ...navLinkStyle,
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
};

const mainContentStyle = {
    flex: 1,
    padding: '30px'
};

export default Dashboard;
