import * as THREE from 'three';
import gsap from 'gsap';

const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 'lightgreen',
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = .7;
mesh.position.y = -.6;
mesh.position.z = -1;

mesh.rotation.y = Math.PI * .4;

scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);

// Axis
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

gsap.to(mesh.position, {
  duration: 1,
  delay: 1.5,
  x: -1,
});


const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = Math.sin(elapsedTime * Math.PI * 2);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();