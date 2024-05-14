import * as THREE from 'three';

////////////////////////
/*  GLOBAL VARIABLES  */
////////////////////////

let camera, scene, renderer;
let vector_cargas = [[5,0,-5],[-5,0,5], [4,0,0],[-4,0,-4],[0,0,5]];
let geometries = [THREE.BoxGeometry,THREE.DodecahedronGeometry,THREE.IcosahedronGeometry,THREE.TorusGeometry,THREE.TorusKnotGeometry];
var isBright_15 = false; // toggle variable for key '7'
var rot_cont = 0;
var cont = 0;
var rot_direction = 0;

// Variables for computing objects' movement
var G_Superior = new THREE.Object3D();
var Cabo_Da_Garra =  new THREE.Object3D();
var Garra = new THREE.Object3D();
var Carrinho = new THREE.Object3D();
var rot = 0;
var desce_cabo = 10.375;
var move_carrinho = 0;
var desce_garra_teste = 0;
var altura_cabo = 2.25;
var cont = 0;

var strings = ["Q/q - Rodar Contra-Lança", "A/a - Rodar Contra-Lança", "W/w - Transladar Carrinho",
                "S/s - Transladar carrinho", "E/e - Subir Garra", "D/d - Descer Garra", "R/r - Abrir Garra",
                "F/f - Fechar Garra", "1 - Vista Frontal", "2 - Vista Lateral", "3 - Vista de Topo", 
                "4 - Ortogonal Fixa", "5 - Perspetiva Fixa", "6 - Perspetiva Móvel", "7 - Alternar Wireframe"];

class Manager {

    constructor() {
        this.materialsVector = [];
    }

    addToVector(material) {
        this.materialsVector.push(material);
    }

    toggleWireframe() {
        this.materialsVector.forEach(material => {
            material.wireframe = !material.wireframe;
        });
    }

}

let manager = new Manager();

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
function toggleBrightness_1(pressed) {
    var hudElement = document.getElementById("string1");
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    }
}

function toggleBrightness_2(pressed) {
    var hudElement = document.getElementById("string2");
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    }
}

function toggleBrightness_3(pressed) {
    var hudElement = document.getElementById("string3");
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    }
}

function toggleBrightness_4(pressed) {
    var hudElement = document.getElementById("string4");
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    }
}

function toggleBrightness_5(pressed) {
    var hudElement = document.getElementById("string5");
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    }
}

function toggleBrightness_6(pressed) {
    var hudElement = document.getElementById("string6");
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    }
}

function toggleBrightness_7(pressed) {
    var hudElement = document.getElementById("string7");
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    }
}

function toggleBrightness_8(pressed) {
    var hudElement = document.getElementById("string8");
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
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

var G_Superior = new THREE.Object3D();
var Cabo_Da_Garra =  new THREE.Object3D();
var Garra = new THREE.Object3D();
var Carrinho = new THREE.Object3D();
var DenteGarra1 = new THREE.Object3D();
var DenteGarra2 = new THREE.Object3D();
var Base_Garra = new THREE.Object3D();
var rot = 0;
var rotacaoGarra = 0;
var desce_cabo = 10.375;
var move_carrinho = 0;
var desce_garra_teste = 0;
var altura_cabo = 2.25;
var alturaGarra=0;
var cont = 0;


function addBase(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(3, 1, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh); 

    manager.addToVector(material);
}

function addBaseContentor(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(3, 1, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh); 

    manager.addToVector(material);
}

function addLadosContentores_dir_esq(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 2, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh); 

    manager.addToVector(material);
}

function addLadosContentores_frente_tras(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(5, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh); 

    manager.addToVector(material);
}

function addCarga(obj, position_number) {
    'use strict';
    const randomIndex = Math.floor(Math.random() * geometries.length);
    const selectedGeometry = geometries[randomIndex];
    const dimension = THREE.MathUtils.randInt(1, 2);
    let geometry;

    switch (selectedGeometry) {
        case THREE.BoxGeometry:
            geometry = new THREE.BoxGeometry(dimension, dimension, dimension);
            break;
        case THREE.DodecahedronGeometry:
            geometry = new THREE.DodecahedronGeometry(dimension);
            break;
        case THREE.IcosahedronGeometry:
            geometry = new THREE.IcosahedronGeometry(dimension);
            break;
        case THREE.TorusGeometry:
            geometry = new THREE.TorusGeometry(dimension / 2, dimension / 4, 16, 100);
            break;
        case THREE.TorusKnotGeometry:
            geometry = new THREE.TorusKnotGeometry(dimension / 2, dimension / 4, 100, 16);
            break;
        default:
            console.error('Tipo de geometria não suportado');
            return;
    }

    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(vector_cargas[position_number][0], vector_cargas[position_number][1]+dimension, vector_cargas[position_number][2]);
    vector_cargas[position_number][3] = dimension;
    obj.add(mesh);

    manager.addToVector(material);
}

function addLanca(obj, x, y, z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 1, 11);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+11 , z+2.5);
    obj.add(mesh); 

    manager.addToVector(material);
}

function addCabine(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh); 

    manager.addToVector(material);
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

    manager.addToVector(material);
}

function addCarrinhoTranslacao(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 0.25, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true  }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
    
    manager.addToVector(material);
}

function addContraPeso(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 0.5, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+10.25 , z-2);
    obj.add(mesh); 

    manager.addToVector(material);
}

function addDenteGarra(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 0.5, 0.2);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh); 

    manager.addToVector(material);
}

function addGarraArticulada(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 0.5, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe:true }); 
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);

    manager.addToVector(material);
}

function addPortaLanca(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.ConeGeometry(0.5, 3, 4); // 0.5 é o raio da base
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 13, z);
    obj.add(mesh);

    manager.addToVector(material);
}

function addTorreMetalica(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 11, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 6, z);
    obj.add(mesh);

    manager.addToVector(material);
}

function createOrthographicCamera(x, y, z, viewSize, name) {
    'use strict';
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
    'use strict';
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(x, y, z);
    camera.lookAt(scene.position);
    camera.name = name;
    return camera;
}

function createCameraWithinGarra(obj,x,y,z) {
    'use strict';
    // Criar a câmera ortográfica
    const camera = new THREE.OrthographicCamera(
        -5, // left
        5, // right
        5, // top
        -5, // bottom
        1, // near
        1000 // far
    );
    camera.name = "Garra";
    // Definir a posição da câmera dentro da garra
    camera.position.set(x,y,z); // Posição relativa à garra

    // Definir a direção de visualização da câmera
    camera.lookAt(x, 0, z); // A câmera aponta para baixo

    obj.add(camera);
}

function createBaseGrua() {
    'use strict';
    const gruaBase = new THREE.Object3D();
    addBase(gruaBase, 0, 0, 0);
    scene.add(gruaBase);
}

function createContenedor_e_Carga(x, y, z) {
    const ContenedorDeCarga = new THREE.Object3D();
    let xPos = THREE.MathUtils.randFloat(6, 5);  //random x position
    let zPos = THREE.MathUtils.randFloat(6, 5);  //random z position
    addBaseContentor(ContenedorDeCarga, xPos, 0, zPos); 
    addLadosContentores_dir_esq(ContenedorDeCarga, xPos+2, 0.5, zPos);   //direito.
    addLadosContentores_dir_esq(ContenedorDeCarga, xPos-2, 0.5, zPos);   //esquerdo 
    addLadosContentores_frente_tras(ContenedorDeCarga, xPos, 0.5, zPos+2);   //frente 
    addLadosContentores_frente_tras(ContenedorDeCarga, xPos, 0.5, zPos-2);   //tras 
    scene.add(ContenedorDeCarga);
}

function createCargas() {
    'use strict';
    const Carga0 = new THREE.Object3D();
    const Carga1 = new THREE.Object3D();
    const Carga2 = new THREE.Object3D();
    const Carga3 = new THREE.Object3D();
    const Carga4 = new THREE.Object3D();
    addCarga (Carga0,0); //pode mexer
    scene.add(Carga0);
    addCarga (Carga1,1); //pode mexer
    scene.add(Carga1);
    addCarga (Carga2,2); //pode mexer
    scene.add(Carga2);
    addCarga (Carga3,3); //pode mexer
    scene.add(Carga3);
    addCarga (Carga4,4); //pode mexer
    scene.add(Carga4);
}

//Braço vertical
function createTorreComPortaLancas(){
    'use strict';
    const TorreComPortaLancas = new THREE.Object3D();
    addTorreMetalica(TorreComPortaLancas,0,0,0);
    addPortaLanca(TorreComPortaLancas,0,0,0);
    scene.add(TorreComPortaLancas);
}

function createContraPeso(obj){
    'use strict';
    const ContraPeso = new THREE.Object3D();
    addContraPeso(ContraPeso,0,0,0);
    obj.add(ContraPeso);
}

//Braco horizontal
function createTirantesContraLanca(obj){
    'use strict';
    const Lanca = new THREE.Object3D();

    addLanca(Lanca,0,0,0);
    addCaboTirante(Lanca,0.5,11.5,-3,0,14.5,0);
    addCaboTirante(Lanca,-0.5,11.5,-3,0,14.5,0);
    addCaboTirante(Lanca,0,11.5,4,0,14.5,0);
    obj.add(Lanca);
}

function createCabine(obj){
    'use strict';
    const Cabine = new THREE.Object3D();
    addCabine(Cabine,-1,10,0);
    obj.add(Cabine);
}

function createCarrinho_E_Garra(obj){
    'use strict';
    addCarrinhoTranslacao(Carrinho,0,10.375,5.5);
    createGarra_Sobe_Desce(Carrinho);
    obj.add(Carrinho);

}

function createGarra_Sobe_Desce(obj){
    'use strict';
    addCaboTirante(Cabo_Da_Garra,0,8.125,5.5,0,10.375,5.5);
    createGarraArticulada(Garra);
    obj.add(Garra);
    obj.add(Cabo_Da_Garra);
}

function createGarraArticulada(obj){
    'use strict';
    createCameraWithinGarra(Base_Garra,0,8.125,5.5)
    addGarraArticulada(Base_Garra,0,8.125,5.5);
    addDenteGarra(DenteGarra1,0,7.625,5.125);
    addDenteGarra(DenteGarra2,0,7.625,5.875);
    obj.add(Base_Garra);
    obj.add(DenteGarra1);
    obj.add(DenteGarra2);
}

function createGrua_Superior(obj, r){
    'use strict';
    var Grua_Superior = new THREE.Object3D();
    Grua_Superior.rotation.set(0, r, 0)  // rotation value is in radians
    Grua_Superior.rotation.set(0, r, 0);  //add value for rotation in rad (Math.PI)
    createCabine(Grua_Superior);
    createTirantesContraLanca(Grua_Superior);
    createContraPeso(Grua_Superior);
    createCarrinho_E_Garra(Grua_Superior);   //add translation for garra
    obj.add(Grua_Superior); 
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.add(new THREE.AxesHelper(10));
    //Cria Base da Grua
    createBaseGrua();
    //Cria Contentor e Carga
    createContenedor_e_Carga(0,0,0); 
    //Cria Torre com Porta Lanças
    createTorreComPortaLancas();
    createCargas();
    //Cria a Parte superior da grua
    createGrua_Superior(G_Superior, rot);  //add rot (rotation)
    scene.add(G_Superior);




    // Câmeras ortográficas
    const viewSize = 30;
    const cameraFrontal = createOrthographicCamera(0, 0, 50, viewSize, 'Frontal');
    const cameraLateral = createOrthographicCamera(-50, 0, 0, viewSize, 'Lateral');
    const cameraTopo = createOrthographicCamera(0, 50, 0, viewSize, 'Topo');


    scene.add(cameraFrontal);
    scene.add(cameraLateral);
    scene.add(cameraTopo);  

    // Câmeras com projeção perspectiva
    const cameraPerspectiva = createPerspectiveCamera(10, 20, 3,'Perspectiva');
    const cameraMovel = createPerspectiveCamera(0, 15, 25, 'Movel');
    const cameraOrtograficaDinamica = createOrthographicCamera(10, 20, 34,viewSize, 'OrtograficaDinamica');

    scene.add(cameraOrtograficaDinamica)
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

    setActiveCamera('Frontal');
    
    window.addEventListener('resize', onResize);
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
            setActiveCamera('OrtograficaDinamica');
            toggleBrightness_13();
            break;
        case '6':
            setActiveCamera('Garra');
            toggleBrightness_14();
            break;
        case '7':
            manager.toggleWireframe();
            toggleBrightness_15();
            break;
        case 'q':
        case 'Q':
            toggleBrightness_1(true);
            rot+= 0.06;
            break;
        case 'a':
        case 'A':
            toggleBrightness_2(true);
            rot -= 0.06;
            break;
        case 'w':
        case 'W':
            if(Carrinho.position.z < 2){
                move_carrinho = +0.05;
            }
            toggleBrightness_3(true);
            break;
        case 's':
        case 'S':
            if(Carrinho.position.z > -3.5){
                move_carrinho = -0.05;
            }
            toggleBrightness_4(true);
            break;
        case 'e':
        case 'E':
            if (Garra.position.y > -7.125){
                Cabo_Da_Garra.scale.y += 0.1;
                Cabo_Da_Garra.position.y -= 0.1* desce_cabo; //aumentar baixar o cabo
            
                cont+=1;
                desce_garra_teste = (1 + cont*0.1)*2.25;
                altura_cabo = 2.25-desce_garra_teste;
                Garra.position.y = altura_cabo;             //baixar garra
            }
            toggleBrightness_5(true);
            break;
        case 'd':
        case 'D':
            if (Garra.position.y < 1.5){
                Cabo_Da_Garra.scale.y -= 0.1;
                Cabo_Da_Garra.position.y += 0.1* desce_cabo;   //diminuir e subir cabo

                cont-=1;
                desce_garra_teste = (1 + cont*0.1)*2.25;
                altura_cabo = 2.25-desce_garra_teste;
                Garra.position.y = altura_cabo;          //baixar garra
            }
            toggleBrightness_6(true);            
            break;
        case 'r':
        case 'R':
            toggleBrightness_7(true);
            rot_direction = -1;
                rotationIncrement = 0.05
                ;
                alturaGarra += 0.01;
            break;
        case 'f':
        case 'F':
            rot_direction = 1;
            toggleBrightness_8(true);
                rotationIncrement -= 0.05;
                alturaGarra -=0.01;
            break;
        default:
            break;
    }
    render(); // Renderizar a cena após mudar a câmera
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'q':
        case 'Q':
            toggleBrightness_1(false);
            break;
        case 'a':
        case 'A':
            toggleBrightness_2(false);
            break;
        case 'w':
        case 'W':
            toggleBrightness_3(false);
            break;
        case 's':
        case 'S':
            toggleBrightness_4(false);
            break;
        case 'e':
        case 'E':
            toggleBrightness_5(false);
            break;
        case 'd':
        case 'D':
            toggleBrightness_6(false);
            break;
        case 'r':
        case 'R':
            toggleBrightness_7(false);
            break;
        case 'f':
        case 'F':
            toggleBrightness_8(false);
            break;
        default:
            break;
    }
});

function setActiveCamera(name) {
    'use strict';
    const cameras = scene.children.filter(object => object.isCamera);
    cameras.forEach(camera => {
        camera.layers.disable(1);
    });
    const activeCamera = scene.getObjectByName(name);
    if (activeCamera && activeCamera.isCamera) {
        activeCamera.layers.enable(1);
        camera = activeCamera;
    }
}

function updateSuperior(){
    G_Superior.rotation.set(0, rot, 0);
}

function updateDentesGarra() {


    //Ângulo mínimo (0 graus)
    //Ângulo máximo (~45 graus)
    const max_rot = 5;

    // Atualiza o ângulo de rotação com base na direção
    // Incremento de rotação
    if ((rot_cont < max_rot) && (rot_direction==-1)){
        DenteGarra1.rotateX(Math.PI/16 * rot_direction);
        DenteGarra1.translateZ(1.39);
        DenteGarra1.translateY(-1.15);

        DenteGarra2.rotateX(-Math.PI/16 * rot_direction);
        DenteGarra2.translateZ(-1.6);
        DenteGarra2.translateY(1);
        rot_cont+=1;
    }
    else if ((rot_cont > 0) && (rot_direction==1)){
        DenteGarra1.translateZ(-1.39);
        DenteGarra1.translateY(1.15);
        DenteGarra1.rotateX(Math.PI/16 * rot_direction);

        DenteGarra2.translateZ(1.6);
        DenteGarra2.translateY(-1);
        DenteGarra2.rotateX(-Math.PI/16 * rot_direction);
        rot_cont-=1;
    }

};

function update(){
    updateSuperior();
    if (rot_direction != 0){
       updateDentesGarra(); 
       rot_direction = 0;
    }
    Carrinho.translateZ(move_carrinho);
    move_carrinho = 0;
}

function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

function animate() {
    'use strict';
    update();
    render();
    requestAnimationFrame(animate);
}

updateHUD(strings);
init();
animate();