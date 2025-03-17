// src/components/RubikCube.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const RubikCube = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const container = mountRef.current;
    if (!container) return;
    container.appendChild(renderer.domElement);

    const rubikGroup = new THREE.Group();
    scene.add(rubikGroup);

    const cubeSize = 0.6;
    const spacing = 0.5;
    const cornerRadius = 0.1;

    const material = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.1, metalness: 0.1 });

    const cubes = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new RoundedBoxGeometry(cubeSize, cubeSize, cubeSize, 5, cornerRadius);
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(x * spacing, y * spacing, z * spacing);
          rubikGroup.add(cube);
          cubes.push(cube);
        }
      }
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 9);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    let animationFrameId;
    let isTabActive = true;

    function animate() {
      if (!isTabActive) return;
      animationFrameId = requestAnimationFrame(animate);
      rubikGroup.rotation.y += 0.010;
      rubikGroup.rotation.x += 0.006;
      renderer.render(scene, camera);
    }

    animate();

    // Función para ajustar la escala del cubo
    function resize() {
      const scaleFactor = Math.min(window.innerWidth, window.innerHeight) / 600;
      rubikGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    // Ajustar la escala inicial
    resize();

    // Debounce para el evento resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        resize(); // Ajustar la escala del cubo
      }, 100); // Ajusta el tiempo de debounce según sea necesario
    });

    // Gestión de animación cuando se cambia de pestaña
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        isTabActive = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isTabActive = true;
        animate();
      }
    });

    // Limpieza al desmontar el componente
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", () => {});
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default RubikCube;