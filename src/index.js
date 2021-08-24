import * as THREE from 'three';

const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 'blue',
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

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);