import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js';

let scene, camera, renderer, controls;

init();
animate();

function init() {
    const container = document.getElementById('three-container');




    // Alle Variablen zum austauschen des Modells

    let collectionMTL = './modell/collection.mtl';
    let collectionOBJ = './modell/collection.obj';
    let dachMTL = './modell/dach_weiss.mtl';
    let dachOBJ = './modell/dach_weiss.obj';
    let dachtraegerMTL = './modell/dachtraeger.mtl';
    let dachtraegerOBJ = './modell/dachtraeger.obj';
    let fensterMTL = './modell/fensterhinten_20.mtl';
    let fensterOBJ = './modell/fensterhinten_20.obj';
    let gehaeuseMTL = './modell/gehaeuse_gelb.mtl';
    let gehaeuseOBJ = './modell/gehaeuse_gelb.obj';
    let motorhaubeMTL = './modell/motorhaube_gelb.mtl';
    let motorhaubeOBJ = './modell/motorhaube_gelb.obj';

    

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(95, 50, 70);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = 0; // Kein Scrollen nach unten
    controls.maxPolarAngle = Math.PI / 2,1; // Beschränkung auf horizontale Bewegung
    controls.maxDistance = 150; // Maximaler Zoom-Abstand, anpassen nach Bedarf



    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);


    


    const textureLoader = new THREE.TextureLoader();
    const planeTexture = textureLoader.load('./skybox/ny.jpg'); // Pfad zur Textur

    // Boden hinzufügen
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshStandardMaterial({ 
        map: planeTexture,
        roughness: 0.1, // Glätte der Oberfläche
        metalness: 0.5, // Metallischer Glanz
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10; // Position anpassen, je nach Bedarf
    scene.add(plane);

    renderer.shadowMap.enabled = true;
    directionalLight.castShadow = true; // Stellen Sie sicher, dass Ihre Lichtquelle Schatten wirft
    plane.receiveShadow = true; // Ermöglicht dem Boden, Schatten zu empfangen


    // Schatten
    renderer.shadowMap.enabled = true;
    directionalLight.castShadow = true; // Stellen Sie sicher, dass Ihre Lichtquelle Schatten wirft
    plane.receiveShadow = true; // Ermöglicht dem Boden, Schatten zu empfangen
    

    // Skybox erstellen--------------------------------------------------------------
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './skybox/px.jpg', // positive x
        './skybox/nx.jpg', // negative x
        './skybox/py.jpg', // positive y
        './skybox/ny.jpg', // negative y
        './skybox/pz.jpg', // positive z
        './skybox/nz.jpg'  // negative z
    ]);
    scene.background = texture;


    // Objekte zusammengefast die Pfad Variablen stehen oben----------------------------------------------------
    // Collention geladen alles was nicht zu verändern ist
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    function loadObjModel(objPath, mtlPath, objectVar) {
        mtlLoader.load(mtlPath, function (materials) {
            materials.preload();

            (function(_objPath, _objectVar) {
                const _objLoader = new OBJLoader(); // Neue Instanz für jedes Modell
                _objLoader.setMaterials(materials);
                _objLoader.load(_objPath, function (object) {
                    if (window[_objectVar]) {
                        scene.remove(window[_objectVar]);
                    }
                    window[_objectVar] = object;
                    scene.add(object);
                });
            })(objPath, objectVar);
        }, undefined, function (error) {
            console.error('Fehler beim Laden des Objekts:', error);
        });
    }

    // Lade die Objekte
    loadObjModel(collectionOBJ, collectionMTL, 'collectionObject');
    loadObjModel(dachOBJ, dachMTL, 'dachObject');
    loadObjModel(motorhaubeOBJ, motorhaubeMTL, 'motorhaubeObject');
    loadObjModel(dachtraegerOBJ, dachtraegerMTL, 'dachtraegerObject');
    loadObjModel(fensterOBJ, fensterMTL, 'fensterObject');
    loadObjModel(gehaeuseOBJ, gehaeuseMTL, 'gehaeuseObject');


    // Event-Listener für Farbänderungen
    document.getElementById('dachColor').addEventListener('change', function(event) {
        loadObjModel(dachOBJ, './modell/dach_' + event.target.value + '.mtl', 'dachObject');
    });
    document.getElementById('motorhaubeColor').addEventListener('change', function(event) {
        loadObjModel(motorhaubeOBJ, './modell/motorhaube_' + event.target.value + '.mtl', 'motorhaubeObject');
    });
    document.getElementById('gehaeuseColor').addEventListener('change', function(event) {
        loadObjModel(gehaeuseOBJ, './modell/gehaeuse_' + event.target.value + '.mtl', 'gehaeuseObject');
    });
    document.getElementById('fensterColor').addEventListener('change', function(event) {
        loadObjModel(fensterOBJ, './modell/fensterhinten_' + event.target.value + '.mtl', 'fensterObject');
    });

    // Event-Listener für die Sichtbarkeit des Dachträgers
    document.getElementById('dachtraegerVisible').addEventListener('change', function(event) {
        dachtraegerObject.visible = event.target.checked;
    });



    window.addEventListener('resize', () => onWindowResize(container), false);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize(container) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}