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
    // Calcular a posição do centro do cilindro
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const centerZ = (z1 + z2) / 2;

    // Calcular a altura do cilindro
    const height = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));

    // Calcular a direção do cilindro
    const direction = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1);
    direction.normalize();

    // Calcular o ângulo de rotação do cilindro
    const angle = Math.acos(direction.y);

    // Calcular o eixo de rotação do cilindro
    const axis = new THREE.Vector3();
    axis.crossVectors(new THREE.Vector3(0, 1, 0), direction);
    axis.normalize();

    // Criar o cilindro
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, height, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 , wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);

    // Posicionar e rotacionar o cilindro
    mesh.position.set(centerX, centerY, centerZ);
    mesh.rotateOnAxis(axis, angle);

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

function createContraPeso(x,y,z){
    const ContraPeso = new THREE.Object3D();
    addContraPeso(ContraPeso,0,0,0);
    scene.add(ContraPeso);
}

//Braço horizontal
function createTirantesContraLanca(x,y,z){
    const Lanca = new THREE.Object3D();
    addLanca(Lanca,0,0,0);
    addCaboTirante(Lanca,-0.5,11.5,-3,0,14.5,0);
    scene.add(Lanca);
}

function createCabine(x,y,z){
    const Cabine = new THREE.Object3D();
    addCabine(Cabine,0,0,0);
    scene.add(Cabine);
}

function createCarrinhoTranslacao(x,y,z){

}

function createCaboDeAcoDoGancho(x,y,z){
}

function createGarraArticuladaDe4(x,y,z){

}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.add(new THREE.AxesHelper(10));

    createBaseGrua(0, 0, 0);
    createTorreComPortaLancas(0,0,0);
    createCabine(0,0,0);
    createTirantesContraLanca(0,0,0);
    createContraPeso(0,0,0);
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

    // Definindo a câmera inicialmente ativa
    setActiveCamera('PerspectivaLateral');

    render();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case '1':
            setActiveCamera('Frontal');
            //TODO: alternar entre grid e opaco ( objetos )
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
        case 'q':
        case 'Q':
            //TODO: roda eixo de rotacao da seccao superior incluindo cabine
            break;
        case 'a':
        case 'A':
            //TODO: roda eixo de rotacao da seccao superior incluindo cabine
            break;
        case 'w':
        case 'W':
            //TODO: controlar deslocamento que translada o carrinho de translacao
            break;
        case 's':
        case 'S':
            //TODO: controlar deslocamento que translada o carrinho de translacao
            break;
        case 'e':
        case 'E':
            //TODO: controlar deslocamento que translada a seccao composta pelo bloco do gancho e a garra, subir/descer
            break;
        case 'd':
        case 'D':
            //TODO: controlar deslocamento que translada a seccao composta pelo bloco do gancho e a garra, subir/descer
            break;
        case 'r':
        case 'R':
            //TODO: controlar angulo de abertura/fecho da garra
            break;
        case 'f':
        case 'F':
            //TODO: controlar angulo de abertura/fecho da garra
            break;
        default:
            break;
        // NOTA:
        // podem carregar em varios botoes ao mesmo tempo
        // os valores de rotacao/translacao estao bounded
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
