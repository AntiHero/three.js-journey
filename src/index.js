import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", function (ev) {
  cursor.x = ev.clientX / sizes.width - 0.5;
  cursor.y = -ev.clientY / sizes.height + 0.5;
});

const scene = new THREE.Scene();
const canvas = document.querySelector(".webgl");

const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({
  color: "lightgreen",
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
);

const aspectRatio = sizes.width / sizes.height;

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

//gsap.to(mesh.position, {
//  duration: 1,
//  delay: 1.5,
//  x: -1,
//});

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
