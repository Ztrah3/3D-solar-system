import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

// initialze pane 
const pane = new Pane();

// initialize the scene 
const scene = new THREE.Scene();

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff700
})

const sun = new THREE.Mesh(
    sphereGeometry,
    sunMaterial
)

sun.scale.setScalar(5)

const earthMaterial = new THREE.MeshBasicMaterial({
    color: 'blue'
})

const earth = new THREE.Mesh(
    sphereGeometry,
    earthMaterial
)
earth.position.x = 10

const moonMaterial = new THREE.MeshBasicMaterial({
    color: 'grey'
})

const moon = new THREE.Mesh(
    sphereGeometry,
    moonMaterial
)
moon.scale.setScalar(0.3)
moon.position.x = 2
earth.add(moon)

scene.add(earth)
scene.add(sun)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    400
)
camera.position.y = 100;
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// instantiate the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 200;
controls.minDistance = 20;

// add resize listener
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// render the scene
const renderloop = () => {
    controls.update()
    controls.update(); renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop)
}


renderloop()