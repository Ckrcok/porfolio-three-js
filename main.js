import './style.css'
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas:document.getElementById('bg'),

})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera. position.setZ(10);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347,
});



const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10,10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( ambientLight ,pointLight)


//helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 5);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24 , 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z]= Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100)) 

  star.position.set(x, y, z);
  scene.add(star)

}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const dorTexture = new THREE.TextureLoader().load('Dor.jpg');

const dor = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: dorTexture})
)

scene.add(dor);


//moon 

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32,32),
  new THREE.MeshStandardMaterial({
    map :moonTexture,
    normalMap: normalTexture,
  }),
)

scene.add(moon);


moon.position.z = 20;
moon.position.setX(-10);

function moveCamera() {
const t = document.body.getBoundingClientRect().top;
moon.rotation.x += 0.005;
moon.rotation.y += 0.0075;
moon.rotation.z += 0.005;

dor.rotation.y += 0.01;
dor.rotation.z += 0.01;

camera.position.x = t * -0.0002;
camera.position.y = t * -0.0002;
camera.position.z = t * -0.01;

}

document.body.onscroll = moveCamera
moveCamera();


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  renderer.render(scene,camera);
}

animate();