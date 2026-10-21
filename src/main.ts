import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(3, 2, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.enableDamping = true;


const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x333333 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

function addBox(x: number, z: number, h: number, color: number) {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, h, 1),
    new THREE.MeshStandardMaterial({ color })
  );
  box.position.set(x, h / 2, z);
  box.castShadow = true;
  scene.add(box);
  return box;
}

addBox(0, 0, 1, 0x4488ff);
addBox(-2, -1, 2, 0xff6644);
addBox(2, 1, 1.5, 0x44cc88);
addBox(1, -3, 3, 0xdddd44);

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5, 8, 5);
sun.castShadow = true;
scene.add(sun, new THREE.AmbientLight(0xffffff, 0.4));


function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();