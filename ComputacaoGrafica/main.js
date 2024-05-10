import * as THREE from 'three';


////////////////////////
/*  GLOBAL VARIABLES  */
////////////////////////

let camera, scene, renderer;

var isBright_1 = false; // q
var isBright_2 = false; // a
var isBright_3 = false; // w
var isBright_4 = false; // s
var isBright_5 = false; // e
var isBright_6 = false; // d
var isBright_7 = false; // r
var isBright_8 = false; // f
var isBright_15 = false; // 7

var strings = ["Q/q - Rodar Contra-Lança", "A/a - Rodar Contra-Lança", "W/w - Transladar Carrinho",
                "S/s - Transladar carrinho", "E/e - Subir Garra", "D/d - Descer Garra", "R/r - Abrir Garra",
                "F/f - Fechar Garra", "1 - Vista Frontal", "2 - Vista Lateral", "3 - Vista de Topo", 
                "4 - Ortogonal Fixa", "5 - Perspetiva Fixa", "6 - Perspetiva Móvel", "7 - Alternar Wireframe"];

//////////////////
/*     HUD      */
//////////////////

function updateHUD(strings) {
    document.getElementById("hud").innerHTML = "<span id='string1'>" + strings[0] + "</span><br><span id='string2'>"
    + strings[1] + "</span><br><span id='string3'>" + strings[2] + "</span><br><span id='string4'>"
    + strings[3] + "</span><br><span id='string5'>" + strings[4] + "</span><br><span id='string6'>"
    + strings[5] + "</span><br><span id='string7'>" + strings[6] + "</span><br><span id='string8'>"
    + strings[7] + "</span><br><span id='string9'>" + strings[8] + "</span><br><span id='string10'>"
    + strings[9] + "</span><br><span id='string11'>" + strings[10] + "</span><br><span id='string12'>"
    + strings[11] + "</span><br><span id='string13'>" + strings[12] + "</span><br><span id='string14'>"
    + strings[13] + "</span><br><span id='string15'>" + strings[14] + "</span>";
}

// Functions that modify brightness of each HUD element
function toggleBrightness_1() {
var hudElement = document.getElementById("string1");
if (isBright_1) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_1 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_1 = true;
}
}

function toggleBrightness_2() {
var hudElement = document.getElementById("string2");
if (isBright_2) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_2 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_2 = true;
}
}

function toggleBrightness_3() {
var hudElement = document.getElementById("string3");
if (isBright_3) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_3 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_3 = true;
}
}

function toggleBrightness_4() {
var hudElement = document.getElementById("string4");
if (isBright_4) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_4 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_4 = true;
}
}

function toggleBrightness_5() {
var hudElement = document.getElementById("string5");
if (isBright_5) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_5 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_5 = true;
}
}

function toggleBrightness_6() {
var hudElement = document.getElementById("string6");
if (isBright_6) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_6 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_6 = true;
}
}

function toggleBrightness_7() {
var hudElement = document.getElementById("string7");
if (isBright_7) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_7 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_7 = true;
}
}

function toggleBrightness_8() {
var hudElement = document.getElementById("string8");
if (isBright_8) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_8 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_8 = true;
}
}

function toggleBrightness_9() {
var hudElement = document.getElementById("string9");
resetCameraHUD();
hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
}

function toggleBrightness_10() {
var hudElement = document.getElementById("string10");
resetCameraHUD();
hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
}

function toggleBrightness_11() {
var hudElement = document.getElementById("string11");
resetCameraHUD();
hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
}

function toggleBrightness_12() {
var hudElement = document.getElementById("string12");
resetCameraHUD();
hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
}

function toggleBrightness_13() {
var hudElement = document.getElementById("string13");
resetCameraHUD();
hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
}

function toggleBrightness_14() {
var hudElement = document.getElementById("string14");
resetCameraHUD();
hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
}

function toggleBrightness_15() {
var hudElement = document.getElementById("string15");
if (isBright_15) {
    hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    isBright_15 = false;
} else {
    hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    isBright_15 = true;
}
}

// resets HUD's camera elements' brightness once another camera key is pressed
function resetCameraHUD() {

var hudElement_9 = document.getElementById("string9");
var hudElement_10 = document.getElementById("string10");
var hudElement_11 = document.getElementById("string11");
var hudElement_12 = document.getElementById("string12");
var hudElement_13 = document.getElementById("string13");
var hudElement_14 = document.getElementById("string14");

hudElement_9.style.backgroundColor = "rgba(0, 0, 0, 0)";
hudElement_10.style.backgroundColor = "rgba(0, 0, 0, 0)";
hudElement_11.style.backgroundColor = "rgba(0, 0, 0, 0)";
hudElement_12.style.backgroundColor = "rgba(0, 0, 0, 0)";
hudElement_13.style.backgroundColor = "rgba(0, 0, 0, 0)";
hudElement_14.style.backgroundColor = "rgba(0, 0, 0, 0)";

}

////////////////////////////////////
/*  AUXILIARY BUILDING FUNCTIONS  */
////////////////////////////////////

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
            toggleBrightness_9();
            break;
        case '2':
            setActiveCamera('Lateral');
            toggleBrightness_10();
            break;
        case '3':
            setActiveCamera('Topo');
            toggleBrightness_11();
            break;
        case '4':
            setActiveCamera('Perspectiva');
            toggleBrightness_12();
            break;
        case '5':
            setActiveCamera('Movel');
            toggleBrightness_13();
            break;
        case '6':
            setActiveCamera('PerspectivaLateral')
            toggleBrightness_14();
            //TODO: Implementar lógica para alternar para a câmera móvel
            break;
        case '7':
            toggleBrightness_15();
            //TODO: alternar entre grid e opaco ( objetos )
            break;
        case 'q':
        case 'Q':
            toggleBrightness_1();
            //TODO: roda eixo de rotacao da seccao superior incluindo cabine
            break;
        case 'a':
        case 'A':
            toggleBrightness_2();
            //TODO: roda eixo de rotacao da seccao superior incluindo cabine
            break;
        case 'w':
        case 'W':
            toggleBrightness_3();
            //TODO: controlar deslocamento que translada o carrinho de translacao
            break;
        case 's':
        case 'S':
            toggleBrightness_4();
            //TODO: controlar deslocamento que translada o carrinho de translacao
            break;
        case 'e':
        case 'E':
            toggleBrightness_5();
            //TODO: controlar deslocamento que translada a seccao composta pelo bloco do gancho e a garra, subir/descer
            break;
        case 'd':
        case 'D':
            toggleBrightness_6();
            //TODO: controlar deslocamento que translada a seccao composta pelo bloco do gancho e a garra, subir/descer
            break;
        case 'r':
        case 'R':
            toggleBrightness_7();
            //TODO: controlar angulo de abertura/fecho da garra
            break;
        case 'f':
        case 'F':
            toggleBrightness_8();
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

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'q':
        case 'Q':
            toggleBrightness_1();
            break;
        case 'a':
        case 'A':
            toggleBrightness_2();
            break;
        case 'w':
        case 'W':
            toggleBrightness_3();
            break;
        case 's':
        case 'S':
            toggleBrightness_4();
            break;
        case 'e':
        case 'E':
            toggleBrightness_5();
            break;
        case 'd':
        case 'D':
            toggleBrightness_6();
            break;
        case 'r':
        case 'R':
            toggleBrightness_7();
            break;
        case 'f':
        case 'F':
            toggleBrightness_8();
            break;
        default:
            break;
    }
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

updateHUD(strings);
init();
