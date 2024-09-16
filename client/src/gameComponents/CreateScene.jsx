import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CreateScene = () => {
  const refContainer = useRef(null);
  const cameraRef = useRef(null);
  let cameraRadius = 4;
  let cameraAzimuth = 0;
  let cameraElevation = 0;
  let isMouseDown = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const updateCameraPosition = () => {
      camera.position.x =
        cameraRadius * Math.sin((cameraAzimuth * Math.PI) / 180) * Math.sin((cameraElevation * Math.PI) / 180);
      camera.position.y =
        cameraRadius * Math.cos((cameraElevation * Math.PI) / 180);
      camera.position.z =
        cameraRadius * Math.cos((cameraAzimuth * Math.PI) / 180) * Math.sin((cameraElevation * Math.PI) / 180);
      camera.lookAt(0, 0, 0);
      camera.updateMatrix();
    };

    const onMouseDown = () => {
      isMouseDown = true;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event) => {
      if (isMouseDown) {
        cameraAzimuth -= (event.clientX - prevMouseX) * 0.5;
        cameraElevation -= (event.clientY - prevMouseY) * 0.5;
        cameraElevation = Math.min(180, Math.max(0, cameraElevation));
        updateCameraPosition();
      }
      prevMouseX = event.clientX;
      prevMouseY = event.clientY;
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      window.removeEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div ref={refContainer} className="h-2/5 w-3/6"></div>;
};

export default CreateScene;