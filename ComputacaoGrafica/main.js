import * as THREE from 'three';


let camera, scene, renderer;

function addBase(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(3, 1, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh); 
}

function addLanca(obj, x, y, z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 1, 11);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+11 , z+2.5);
    obj.add(mesh); 
}
function addCabine(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x-1, y+10 , z);
    obj.add(mesh); 
}

function addCabosDeAço(x,y,z){
}

function addCaboTirante(obj, x1, y1, z1, x2, y2, z2) {
    'use strict';
    // Calcular a posição central 
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const centerZ = (z1 + z2) / 2;

    // Calcular a altura 
    const height = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));

    // Calcular a direção 
    const direction = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1);
    direction.normalize();

    // Calcular o ângulo de rotação 
    const angle = Math.acos(direction.y);

    // Calcular o eixo de rotação
    const axis = new THREE.Vector3();
    axis.crossVectors(new THREE.Vector3(0, 1, 0), direction);
    axis.normalize();

    const geometry = new THREE.CylinderGeometry(0.05, 0.05, height, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 , wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(centerX, centerY, centerZ);
    mesh.rotateOnAxis(axis, angle);

    obj.add(mesh);
}

function addCarrinhoTranslacao(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 0.25, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+10.375 , z+5.5);
    obj.add(mesh); 
}

function addContraPeso(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 0.5, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+10.25 , z-2);
    obj.add(mesh); 
}

function addGarraArticulada(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 0.5, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+8.125 , z+4);
    obj.add(mesh);
}

function addPortaLanca(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.ConeGeometry(0.5, 3, 4); // 0.5 é o raio da base
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 13, z);
    obj.add(mesh);
}


function addTorreMetalica(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 11, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 6, z);
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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(x, y, z);
    camera.lookAt(scene.position);
    camera.name = name;
    return camera;
}

function createBaseGrua(x, y, z) {
    const gruaBase = new THREE.Object3D();
    addBase(gruaBase, 0, 0, 0);
    scene.add(gruaBase);
}

//Braço vertical
function createTorreComPortaLancas(x,y,z){
    const TorreComPortaLancas = new THREE.Object3D();
    addTorreMetalica(TorreComPortaLancas,0,0,0);
    addPortaLanca(TorreComPortaLancas,0,0,0);
    scene.add(TorreComPortaLancas);
}

function createContraPeso(obj,x,y,z){
    const ContraPeso = new THREE.Object3D();
    addContraPeso(ContraPeso,0,0,0);
    scene.add(ContraPeso);
}

//Braço horizontal
function createTirantesContraLanca(obj,x,y,z){
    const Lanca = new THREE.Object3D();
    addLanca(Lanca,0,0,0);
    addCaboTirante(Lanca,-0.5,11.5,-3,0,14.5,0);
    addCaboTirante(Lanca,0.5,11.5,-3,0,14.5,0);
    addCaboTirante(Lanca,0,11.5,4,0,14.5,0);
    obj.add(Lanca);
}

function createCabine(obj,x,y,z){
    const Cabine = new THREE.Object3D();
    addCabine(Cabine,0,0,0);
    obj.add(Cabine);
}

function createCarrinhoTranslacao(obj,x,y,z){
    const Carrinhotranslacao = new THREE.Object3D();
    addCarrinhoTranslacao(Carrinhotranslacao,0,0,0);
    createGarraArticuladaDe4(0,0,0);
    obj.add(Carrinhotranslacao);

}

function createCaboDeAcoDoGancho(obj,x,y,z){
}

function createGarraArticuladaDe4(obj,x,y,z){ 
    const GarraArticulada = new THREE.Object3D();
    addGarraArticulada(GarraArticulada,0,0,0);
    obj.add(GarraArticulada);
}

function createGrua_Superior(obj,x,y,z){
    createCabine(obj,0,0,0);
    createTirantesContraLanca(obj,0,0,0);
    createContraPeso(obj,0,0,0);
    //createCarrinho_E_Garra(obj,0,0,0);
    
}

function createCarrinho_E_Garra(Carrinho_E_Garra,x,y,z){
    
    createCarrinhoTranslacao(Carrinho_E_Garra,0,0,0);
    
    createMovimentoGarra(x,y,z);
}

function createMovimentoGarra(x,y,z){
    
}
function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.add(new THREE.AxesHelper(10));
    //Create Topo 
    //Create Carrinho+Garra 
    //Create Base da Grua
    var Grua_Superior = new THREE.Object3D();
    var Carrinho_E_Garra = new THREE.Object3D();
    var Movimento_Garra = new THREE.Object3D();
    //Cria Base da Grua
    createBaseGrua(0, 0, 0);
    createTorreComPortaLancas(0,0,0);
    //Cria a Parte superior da grua
    createGrua_Superior(Grua_Superior,0,0,0);

    scene.add(Grua_Superior);
    //scene.add(Carrinho_E_Garra);
    //scene.add(Movimento_Garra);
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
    //Extra Camara, nao necessaria na enterega final
    const cameraPerspectivaLateral = createPerspectiveCamera(10, 20, 3, 'PerspectivaLateral');

    scene.add(cameraPerspectivaLateral)
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

    setActiveCamera('PerspectivaLateral');

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
            setActiveCamera('PerspectivaLateral')
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
