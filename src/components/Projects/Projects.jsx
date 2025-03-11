import React, { useState } from 'react'
import HeaderProjects from '../Header/HeaderProjects';
import CardNormal from '../Cards/CardNormal';
import CardLitle from '../Cards/CardLitle';

const Projects = () => {

    const [activeSection, setActiveSection] = useState('principales');

  return (
    <>
        <HeaderProjects onSectionChange={setActiveSection}/>

        <div className="py-8 container mx-auto">
            {activeSection === "principales" ? (
                <CardNormal/>
                // <h2>Principales</h2>
            ) : activeSection === "otros" ? (
                <CardLitle/>
                // <h2>Otros</h2>
            ) : (
                <div>
                    <h1>Sección no encontrada.</h1>
                </div>
            )}
        </div>
    </>
  )
}

export default Projects
