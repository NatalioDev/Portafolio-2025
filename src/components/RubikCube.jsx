// src/components/RubikCube.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const RubikCube = () => {
  const mountRef = useRef(null);

  console.log('RubikCube component rendered');

  useEffect(() => {
    console.log('RubikCube component mounted'); // Verifica que el componente se esté ejecutando

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const container = mountRef.current;
    if (!container) {
      console.error('Container not found'); // Verifica que el contenedor exista
      return;
    }
    container.appendChild(renderer.domElement);
    console.log('Canvas added to DOM:', renderer.domElement); // Verifica que el canvas se haya agregado

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
      console.log('Rendering frame'); // Verifica que la animación esté funcionando
    }

    animate();

      // Función para rotar una cara sin perder cubos
  function rotateFace(axis, layer, direction) {
    const angle = (Math.PI / 2) * direction;
    const rotationGroup = new THREE.Group();

    const selectedCubes = cubes.filter(cube => Math.abs(cube.position[axis] - layer * spacing) < 0.01);

    selectedCubes.forEach(cube => {
      rubikGroup.remove(cube);
      rotationGroup.add(cube);
    });

    rubikGroup.add(rotationGroup);

    let progress = 0;

    function rotateStep() {
      if (progress < 1) {
        requestAnimationFrame(rotateStep);
        progress += 0.05;
        rotationGroup.rotation[axis] = angle * progress;
      } else {
        rubikGroup.remove(rotationGroup);
        selectedCubes.forEach(cube => {
          cube.position.copy(rotateVector(cube.position, axis, direction * 90));
          cube.rotation.set(0, 0, 0);
          rubikGroup.add(cube);
        });
      }
    }
    rotateStep();
  }

  // Función para rotar posiciones correctamente
  function rotateVector(position, axis, angle) {
    const rad = THREE.MathUtils.degToRad(angle);
    const matrix = new THREE.Matrix4();

    if (axis === "x") {
      matrix.makeRotationX(rad);
    } else if (axis === "y") {
      matrix.makeRotationY(rad);
    } else if (axis === "z") {
      matrix.makeRotationZ(rad);
    }

    return position.clone().applyMatrix4(matrix);
  }

  // Rotar una cara aleatoria cada 3 segundos
  setInterval(() => {
    if (!isTabActive) return; // No rotar caras si la pestaña no está activa
    const axes = ["x", "y", "z"];
    const axis = axes[Math.floor(Math.random() * axes.length)];
    const layer = [-1, 0, 1][Math.floor(Math.random() * 3)];
    const direction = Math.random() > 0.5 ? 1 : -1;
    rotateFace(axis, layer, direction);
  }, 3000);

  // Ajustar tamaño al cambiar ventana
  function resize() {
    const scaleFactor = Math.min(window.innerWidth, window.innerHeight) / 600;
    rubikGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }
  resize();  // Inicializa la escala del cubo cuando la página se carga

  // Debounce para el evento resize
  let resizeTimeout;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() =>{
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Actualizar el tamaño del renderizador
      renderer.setSize(width, height);

      // Actualizar la relación de aspecto de la cámara
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Ajustar la escala del cubo
      resize();
    }, 500)
  });

  // Gestión de animación cuando se cambia de pestaña
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // La pestaña está inactiva
      isTabActive = false; // Marcar como inactivo
      cancelAnimationFrame(animationFrameId); // Detener la animación
    } else {
      // La pestaña está activa
      isTabActive = true; // Marcar como activo
      animate();  // Reiniciar la animación
    }
  });
  }, []);

  return <div ref={mountRef} />;
};

export default RubikCube;