import React, { useState } from 'react';
import ProjectsLitle from '../../data/projectLitle.json';
import { FaGithub } from 'react-icons/fa';
import { LuLink } from 'react-icons/lu';
import { Menu, Transition } from '@headlessui/react';


const Card = ({ image, title, description, isImageOnLeft, link, link2, github, github2 }) => {

  // Verifica si hay multiples enlaces
  const hasMultipleLinks = link2 || github2

  // Estados para manejar los Menú
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [isGithubMenuOpen, setIsGithubkMenuOpen] = useState(false);

  // Funciones para manejar los Menú
  const openLinkMenu = () =>{
    setIsLinkMenuOpen(true);
    setIsGithubkMenuOpen(false);
  }

  const openGithubMenu = () =>{
    setIsLinkMenuOpen(false);
    setIsGithubkMenuOpen(true);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-16 border-b-2 border-black/30 pb-12">
      {/* Imagen siempre primero en móvil, orden alternado en desktop */}
      <div
        className={`w-full md:w-1/2 shadow-lg shadow-black/50 rounded-lg group order-1 ${
          isImageOnLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        <img
          src={image}
          className="w-full h-64 md:h-96 object-cover group-hover:scale-110 duration-300 rounded-lg block shadow-lg"
        />
      </div>

      {/* Contenido siempre después en móvil, orden alternado en desktop */}
      <div
        className={`w-full md:w-1/2 order-2 ${
          isImageOnLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="flex gap-4">
          {/* Dropdown para múltiples enlaces */}
          {hasMultipleLinks ? (
            <Menu as="div" className="relative">
              <Menu.Button
                onClick={openLinkMenu}
                className="bg-white/5 
                border border-white/10 rounded-full
                flex justify-center items-center gap-x-2
                py-2 px-4 md:py-2 md:px-4
                text-base md:text-base
                transition
                hover:scale-110 hover:bg-white/10"
              >
                <LuLink/>
              </Menu.Button>
              <Transition
                show={isLinkMenuOpen}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Menu.Items
                  className="absolute left-0 mt-2 w-48 origin-top-left bg-white/5 border border-white/5 rounded-lg focus:outline-none"
                >
                  <div className="p-1">
                    {link && (
                      <Menu.Item>
                        {({active}) => (
                          <a 
                            href={link} 
                            target='_blank'
                            rel='noopener noreferrer'
                            className={`${
                              active ? 'bg-black/50' : ''
                            } block px-4 py-2 text-sm text-white rounded-lg hover:scale-100 hover:bg-black/50`}
                          >
                            Versión 1
                          </a>
                        )}
                      </Menu.Item>
                    )}
                    {link2 &&(
                      <Menu.Item>
                      {({active}) => (
                        <a 
                          href={link2} 
                          target='_blank'
                          rel='noopener noreferrer'
                          className={`${
                            active ? 'bg-black/50' : ''
                          } block px-4 py-2 text-sm text-white rounded-lg hover:scale-100 hover:bg-black/50`}
                        >
                          Versión 2
                        </a>
                      )}
                    </Menu.Item>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ):(
          //Solo si hay un enlace
          <a 
            href={link}
            target='_blank'
            rel="noopener noreferrer"
            className="bg-white/5 
                      border border-white/10 rounded-full
                      flex justify-center items-center gap-x-2
                      py-2 px-4 md:py-2 md:px-4
                      text-base md:text-base
                      transition
                      hover:scale-110 hover:bg-white/10"
          >
            <LuLink />
          </a>
          )}

          {/* Dropdown para múltiples repositorios de GitHub */}
          {hasMultipleLinks ? (
            <Menu as="div" className="relative">
            <Menu.Button
              onClick={openGithubMenu}
              className="bg-white/5 
              border border-white/10 rounded-full
              flex justify-center items-center gap-x-2
              py-2 px-4 md:py-2 md:px-4
              text-base md:text-base
              transition
              hover:scale-110 hover:bg-white/10"
            >
              <FaGithub/>
            </Menu.Button>
            <Transition
              show={isGithubMenuOpen}
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Menu.Items
                className="absolute left-0 mt-2 w-48 origin-top-left bg-white/5 border border-white/5 rounded-lg focus:outline-none"
              >
                <div className="p-1">
                  {github && (
                    <Menu.Item>
                      {({active}) => (
                        <a 
                          href={github} 
                          target='_blank'
                          rel='noopener noreferrer'
                          className={`${
                            active ? 'bg-white/10' : ''
                          } block px-4 py-2 text-sm text-white rounded-lg hover:bg-black/50`}
                        >
                          Repositorio 1
                        </a>
                      )}
                    </Menu.Item>
                  )}
                  {github2 &&(
                    <Menu.Item>
                    {({active}) => (
                      <a 
                        href={github2} 
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`${
                          active ? 'bg-white/10' : ''
                        } block px-4 py-2 text-sm text-white rounded-lg hover:bg-black/50`}
                      >
                        Repositorio 2
                      </a>
                    )}
                  </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          ):(
            <a 
            href={github}
            target='_blank'
            rel="noopener noreferrer"
            className="bg-white/5 
                      border border-white/10 rounded-full
                      flex justify-center items-center gap-x-2
                      py-2 px-4 md:py-2 md:px-4
                      text-base md:text-base
                      transition
                      hover:scale-110 hover:bg-white/10"
          >
            <FaGithub/>
          </a>
          )}
          
        </div>
      </div>
    </div>
  );
};

const CardLitle = () => {
  return (
    <div className="container mx-auto px-4 ">
      {ProjectsLitle.map((projects, index) => (
        <Card
          key={index}
          {...projects}
          isImageOnLeft={index % 2 === 0} // Alterna la posición de la imagen en desktop
        />
      ))}
    </div>
  );
};

export default CardLitle;