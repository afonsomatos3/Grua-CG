import * as THREE from 'three';

let camera, scene, renderer;

function addBase(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(3, 1, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh); 
}

function addBracoHorizontal(obj, x, y, z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 1, 11);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+11 , z+2.5);
    obj.add(mesh); 
}

function addTorso(obj, x , y ,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 11, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+6 , z);
    obj.add(mesh); 
}


function createOrthographicCamera(x, y, z, viewSize, name) {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
        -aspectRatio * viewSize / 2,
        aspectRatio * viewSize / 2,
        viewSize / 2,
        -viewSize / 2,
        1,
        1000
    );
    camera.position.set(x, y, z);
    camera.lookAt(scene.position);
    camera.name = name;
    return camera;
}

function createPerspectiveCamera(x, y, z, name) {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(x, y, z);
    camera.lookAt(scene.position);
    camera.name = name;
    return camera;
}

function createBaseGrua(x, y, z) {
    const gruaBase = new THREE.Object3D();
    
    addBase(gruaBase, 0, 0, 0);
    addTorso(gruaBase,0, 0, 0);
    scene.add(gruaBase);
}

function createSuperiorGrua(x, y, z) {
    const gruaSuperior = new THREE.Object3D(); // Criar um novo objeto grua para o braço superior
    addBracoHorizontal(gruaSuperior, x, y, z); // Adicionar o braço horizontal ao objeto grua superior
    scene.add(gruaSuperior); // Adicionar o objeto grua superior à cena
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.add(new THREE.AxesHelper(10));

    createBaseGrua(0, 0, 0);
    createSuperiorGrua(0,0,0);
    // Câmeras ortográficas
    const viewSize = 30;
    const cameraFrontal = createOrthographicCamera(0, 0, 50, viewSize, 'Frontal');
    const cameraLateral = createOrthographicCamera(-50, 0, 0, viewSize, 'Lateral');
    const cameraTopo = createOrthographicCamera(0, 50, 0, viewSize, 'Topo');

    scene.add(cameraFrontal);
    scene.add(cameraLateral);
    scene.add(cameraTopo);

    // Câmeras com projeção perspectiva
    const cameraPerspectiva = createPerspectiveCamera(0, 20, 20, 'Perspectiva');
    const cameraMovel = createPerspectiveCamera(0, 15, 25, 'Movel');

    scene.add(cameraPerspectiva);
    scene.add(cameraMovel);
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();

    // Definindo a câmera inicialmente ativa
    setActiveCamera('Frontal');

    render();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case '1':
            setActiveCamera('Frontal');
            break;
        case '2':
            setActiveCamera('Lateral');
            break;
        case '3':
            setActiveCamera('Topo');
            break;
        case '4':
            setActiveCamera('Perspectiva');
            break;
        case '5':
            setActiveCamera('Movel');
            break;
        case '6':
            //TODO: Implementar lógica para alternar para a câmera móvel
            break;
        default:
            break;
    }

    render(); // Renderizar a cena após mudar a câmera
});

function setActiveCamera(name) {
    scene.traverse((object) => {
        if (object.isCamera) {
            object.layers.disable(1);
        }
    });
    const activeCamera = scene.getObjectByName(name);
    if (activeCamera) {
        activeCamera.layers.enable(1);
        camera = activeCamera;
    }
}

init();
