import React from 'react';
import ProjectsLitle from '../../data/projectLitle.json';

const Card = ({ image, title, description, isImageOnLeft }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-8 border-b-2 border-black/30 pb-8">
      {/* Imagen siempre primero en móvil, orden alternado en desktop */}
      <div
        className={`w-full md:w-1/2 order-1 ${
          isImageOnLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        <img
          src={image}
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Contenido siempre después en móvil, orden alternado en desktop */}
      <div
        className={`w-full md:w-1/2 order-2 ${
          isImageOnLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors">
          Ver más
        </button>
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