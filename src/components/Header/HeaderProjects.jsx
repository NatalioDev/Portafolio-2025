import React, { useState } from 'react'

const HeaderProjects = ({ onSectionChange }) => {

  const [activeSection, setActiveSection] = useState("principales");

  const handleSectionChange = (section) => {
    setActiveSection(section); // Actualiza el estado
    onSectionChange(section) // Notifica al componente padre
  };


  return (
    <header className='flex justify-center rounded-b-full border-b-2 border-green-700 items-center py-4 mt-2 w-full bg-black/80 mx-auto shadow-lg shadow-black/70'>
      <nav className="flex flex-row gap-x-2 opacity-80 font-bold uppercase ">
        <a 
          href="#principales" 
          onClick={(e) =>{
            e.preventDefault();
            handleSectionChange('principales');
          }}
          className={`mx-5 relative
            tracking-wider hover:text-green-500 hover:font-bold ${
            activeSection === "principales" ? " font-bold text-green-500 drop-shadow-[-2px_-2px_1px_rgba(0,0,0,1)]" : ""
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
          className={`mx-5 relative tracking-wider hover:text-green-500 hover:font-bold ${
            activeSection === "otros" ? "font-bold text-green-500 drop-shadow-[-2px_-2px_1px_rgba(0,0,0,1)]" : ""
          }`}
        >
          Otros
        </a>
      </nav>
    </header>
  )
}

export default HeaderProjects
