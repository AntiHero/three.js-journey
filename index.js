const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 'blue',
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 1;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);