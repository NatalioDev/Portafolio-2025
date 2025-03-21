import React, { useState } from 'react'

const HeaderProjects = ({ onSectionChange }) => {

  const [activeSection, setActiveSection] = useState("principales");

  const handleSectionChange = (section) => {
    setActiveSection(section); // Actualiza el estado
    onSectionChange(section) // Notifica al componente padre
  };


  return (
    <header className='flex justify-center rounded-b-full border-b-2 border-green-700 items-center py-5 mt-2 w-full bg-black/80 mx-auto shadow-lg shadow-black/70'>
      <nav className="flex flex-row gap-x-10 opacity-80 font-semibold uppercase ">
        <a 
          href="#principales" 
          onClick={(e) =>{
            e.preventDefault();
            handleSectionChange('principales');
          }}
          className={`mx-10 relative
            tracking-wider hover:text-green-500 hover:font-bold ${
            activeSection === "principales" ? " text-lg font-bold text-green-500" : ""
          }`}
        >
          Principales
        </a>
        <a 
          href="#otros" 
          onClick={(e) =>{
            e.preventDefault();
            handleSectionChange('otros');
          }}
          className={`mx-10 relative tracking-wider hover:text-green-500 hover:font-bold ${
            activeSection === "otros" ? "text-lg font-bold text-green-500" : ""
          }`}
        >
          Otros
        </a>
      </nav>
    </header>
  )
}

export default HeaderProjects
