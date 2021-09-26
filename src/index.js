import './css/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const torusColorTexture = textureLoader.load('./textures/matcaps/3.png');
const colorTexture = textureLoader.load('./textures/door/color.jpg');

const alphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const heightTexture = textureLoader.load('./textures/door/height.jpg');
const ambientOcclusionTexture = textureLoader.load(
  './textures/door/ambientOcclusion.jpg'
);

const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg');
const normalTexture = textureLoader.load('./textures/door/normal.jpg');


colorTexture.magFilter = THREE.NearestFilter;
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// const material = new THREE.MeshNormalMaterial({
//   // map: colorTexture
//   flatShading: true,
// });

// const material = new THREE.MeshMatcapMaterial();
// const material = new THREE.MeshPhongMaterial();
const material = new THREE.MeshStandardMaterial();

material.shininess = 100;
material.color.set('#ffffff');
material.wireframe = true;

const doorMaterial = new THREE.MeshStandardMaterial();
doorMaterial.map = colorTexture;
doorMaterial.metalness = 0;
doorMaterial.roughness = 1;
doorMaterial.aoMap = ambientOcclusionTexture;
doorMaterial.aoMapIntensity = 1;
doorMaterial.displacementMap = heightTexture;
doorMaterial.displacementScale = 0.05;
doorMaterial.roughnessMap = roughnessTexture;
doorMaterial.metalnessMap = metalnessTexture;
doorMaterial.normalMap = normalTexture;
doorMaterial.normalScale.set(0.5, 0.5);
doorMaterial.alphaMap = alphaTexture;
doorMaterial.transparent = true;

gui.add(doorMaterial, 'metalness').min(0).max(1).step(0.0001);
gui.add(doorMaterial, 'roughness').min(0).max(1).step(0.0001);
gui.add(doorMaterial, 'aoMapIntensity').min(1).max(10).step(1);
gui.add(doorMaterial, 'transparent').onChange();

// material.matcap = torusColorTexture;
// material.color.set('white');

// sets visibility of texture on both sides
// material.side = THREE.DoubleSide;

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 32, 16),
  material
);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.z = 4;
pointLight.position.y = 3;
scene.add(pointLight);

// const torus = new THREE.Mesh(
//   new THREE.TorusBufferGeometry(2.5, 1, 4, 4),
//   material
// );
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  doorMaterial
);
const uvArray = plane.geometry.getAttribute('uv').array;

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(uvArray, 2));

sphere.position.setX(-1.5);

scene.add(sphere, plane /* , torus */);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  // plane.rotation.y = -2 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
