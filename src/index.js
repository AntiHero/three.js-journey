import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import './css/style.css';
import gsap from 'gsap';

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log('onStart');
};
loadingManager.onLoaded = () => {
  console.log('onLoaded');
};
loadingManager.onProgress = () => {
  console.log('onProgress');
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/textures/minecraft.png');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// we don't need this when using magFilter = NearestFilter
colorTexture.generateMipmaps = false;
colorTexture.magFilter = THREE.NearestFilter;

/**
 * Debug
 */
const gui = new dat.GUI({ width: 300 });
// gui.hide();

const params = {
  color: 0xee00aa,
  spin: () => {},
};

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
};

const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');

const geometry = new THREE.BoxGeometry();
// const geometry = new THREE.BufferGeometry();

// const verticies = new Float32Array(9);

// verticies[0] = 0;
// verticies[1] = 0;
// verticies[2] = 0;
// verticies[3] = 0;
// verticies[4] = 1;
// verticies[5] = 0;
// verticies[6] = 1;
// verticies[7] = 0;
// verticies[8] = 0;

// geometry.setAttribute('position', new THREE.BufferAttribute(verticies, 3));
const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
});
const mesh = new THREE.Mesh(geometry, material);

params.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
};

scene.add(mesh);

gui.add(mesh.position, 'y', -3, 3, 0.1).name('elevation');
gui.add(mesh.position, 'x', -3, 3, 0.1);
gui.add(mesh, 'visible');
gui.add(mesh.material, 'wireframe');
gui.addColor(params, 'color').onChange(() => {
  material.color.set(params.color);
});
gui.add(params, 'spin');

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio);

camera.position.z = 2;
camera.position.y = 2;
camera.position.x = 2;
scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Axis
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// gsap.to(mesh.position, {
//  duration: 1,
//  delay: 1.5,
//  x: -1,
// });
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);

  // set pixel ration
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('mousemove', (ev) => {
  cursor.x = ev.clientX / sizes.width - 0.5;
  cursor.y = -ev.clientY / sizes.height + 0.5;
});

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // mesh.rotation.y = Math.sin(elapsedTime * Math.PI * 2);
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position)

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
