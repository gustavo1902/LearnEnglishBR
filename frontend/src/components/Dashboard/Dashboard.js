import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ReadingMaterials from '../LearningContent/ReadingMaterials';
import Exercises from '../LearningContent/Exercises';
import ExternalResources from '../LearningContent/ExternalResources';
import Progress from '../LearningContent/Progress';

const Dashboard = () => {
    const { userInfo } = useAuth();
    const [activeSection, setActiveSection] = useState('leitura');

    return (
        <div style={dashboardContainerStyle}>
            <h2 style={welcomeStyle}>Bem-vindo ao seu Dashboard, {userInfo?.name}!</h2>
            <div style={dashboardContentStyle}>
                <nav style={navStyle}>
                    <ul style={ulStyle}>
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
                                style={activeSection === 'exercicios' ? activeLinkStyle : navLinkStyle}
                                onClick={() => setActiveSection('exercicios')}
                            >
                                Exercícios
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
                        <li style={liStyle}>
                            <button
                                style={activeSection === 'progresso' ? activeLinkStyle : navLinkStyle}
                                onClick={() => setActiveSection('progresso')}
                            >
                                Meu Progresso
                            </button>
                        </li>
                    </ul>
                </nav>
                <div style={mainContentStyle}>
                    {activeSection === 'leitura' && <ReadingMaterials />}
                    {activeSection === 'exercicios' && <Exercises />}
                    {activeSection === 'recursos' && <ExternalResources />}
                    {activeSection === 'progresso' && <Progress />}
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
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

const welcomeStyle = {
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center'
};

const dashboardContentStyle = {
    display: 'flex',
    width: '100%'
};

const navStyle = {
    flex: '0 0 200px',
    paddingRight: '20px',
    borderRight: '1px solid #eee'
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
    padding: '10px 15px',
    textDecoration: 'none',
    color: '#007bff',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.2s, color 0.2s'
};

const activeLinkStyle = {
    ...navLinkStyle,
    backgroundColor: '#007bff',
    color: '#fff',
};

const mainContentStyle = {
    flex: 1,
    paddingLeft: '30px'
};

export default Dashboard;
