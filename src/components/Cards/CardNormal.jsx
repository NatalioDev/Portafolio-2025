import React from "react";

// import Api from "../Icons/Api";
// import AstroJS from "../Icons/AstroJS";
// import CSS from "../Icons/CSS";
// import HeadlessUI from "../Icons/HeadlessUI";
// import JavaScript from "../Icons/JavaScript";
// import NextJS from "../Icons/NextJS";
// import ReactJS from "../Icons/ReactJS";
// import Tailwind from "../Icons/Tailwind";
// import TypeScript from "../Icons/TypeScript";
// import ViteJS from "../Icons/ViteJS";
import data from "../../data/project";
// import SocialPill from "../SocialPill";

// Definir un tipo para las claves de iconComponents
// const iconComponents = {
//   AstroJS,
//   CSS,
//   JavaScript,
//   NextJS,
//   ReactJS,
//   Tailwind,
//   TypeScript,
//   ViteJS,
//   HeadlessUI,
//   Api,
// };

// const TAGS = Object.fromEntries(
//   Object.entries(data.TAGS).map(([key, tag]) => [
//     key,
//     {
//       ...tag,
//       icon: iconComponents[tag.icon],
//     },
//   ])
// );

// const PROJECTS = data.PROJECTS.map((project) => ({
//   ...project,
//   tags: project.tags.map((tagKey) => TAGS[tagKey]),
// }));

const CardNormal = () => {
  return (
    <>
      {data.PROJECTS.map(({ image, title, description, tags, link, github }) => (
        <article key={title} className="py-8">
          <h3 
            style={{
              textShadow:
                "-1px -1px 0px rgba(94, 209, 80, 0.3), -1px -1px 0px rgba(0, 0, 0, 0.4)",
            }}
            className="text-3xl lg:text-4xl font-extrabold text-black inset-text-effect-card mb-2">
            {title}
          </h3>
          <p className="text-base lg:text-lg mb-4 mt-2 text-pretty">{description}</p>
          <p className="text-base lg:text-lg mb-4 text-pretty">
            Visita el{" "}
            <a
              className="text-[#5ed150] font-semibold"
              target="_blank"
              rel="noreferrer noopener"
              href={link}
            >
              sitio aquí
            </a>{" "}
            o revisa el código en{" "}
            <a
              className="text-[#5ed150] font-semibold"
              target="_blank"
              rel="noreferrer noopener"
              href={github}
            >
              GitHub.
            </a>
          </p>
          {/* <ul className="flex flex-wrap gap-x-2 flex-row mb-2 px-2 max-w-full overflow-hidden z-50">
            {tags.map((tag) => (
              <li key={tag.name} className="my-4">
                  <tag.icon className="size-4 md:size-6 lg:size-8" />
                  {tag.name}
              </li>
            ))}
          </ul> */}
          <img
            className="rounded-xl shadow-lg shadow-black/60 pt-4 max-h-[450px]"
            src={image}
            alt={`Captura de pantalla del proyecto ${image}`}
          />
        </article>
      ))}
    </>
  );
};

export default CardNormal;