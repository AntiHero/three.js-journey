import './css/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.4;
ambientLight.color = new THREE.Color(0xffffff);
scene.add(ambientLight);

// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.setX(1.5);

directionalLight.castShadow = true;
directionalLight.shadow.camera.right = 3;
directionalLight.shadow.camera.left = -3;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 4.5;
directionalLight.shadow.radius = 10;

const directionalCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);

// directionalLight.visible = false;
scene.add(directionalLight);
// scene.add(directionalCameraHelper);

const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10);

spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
spotLight.shadow.camera.far = 5;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);
scene.add(spotLight.target);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false;
scene.add(spotLightCameraHelper);

const pointLight = new THREE.PointLight(0xffffff, 0.5);

pointLight.castShadow = true;
pointLight.position.set(2, 2, 2);
pointLight.shadow.mapSize.set(1024, 1024);
pointLight.shadow.camera.far = 8;

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
pointLightCameraHelper.visible = false;
scene.add(pointLightCameraHelper);

scene.add(pointLight);
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.3;
material.roughness = 0.3;

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 32, 32),
  material
);

sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material);
plane.receiveShadow = true;

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);
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
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * 
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

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

tick();
