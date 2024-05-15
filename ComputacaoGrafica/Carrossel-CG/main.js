import * as THREE from 'three';

////////////////////////
/*  GLOBAL VARIABLES  */
////////////////////////

let camera;
let scene = new THREE.Scene();
let renderer;


/* Variables for computing objects' movement
var rot_cont = 0;
var cont = 0;
var rot_direction = 0;
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
var DenteGarra1 = new THREE.Object3D();
var DenteGarra2 = new THREE.Object3D();
var Base_Garra = new THREE.Object3D();
var alturaGarra=0;
*/

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

const Colors = {
    RED: 0xFF0000,
    GREEN: 0x00ff00,
    BLUE: 0x0000FF,
    PURPLE: 0x800080,
  };

let manager = new Manager();


function addRings() {

    // Outer Radiuses: big ring = 5, small = 2, width = 3
    let initialOuterRadius = 5; // valor inical para o diametro do menor ring
    let initialYCoordinate = 0;

    let ringWidth = 3; // igual para todos
    let yCoordinateinterval = 1;

    let previousYCoordinate = initialYCoordinate + yCoordinateinterval;
    let previousOuterRing = initialOuterRadius - ringWidth;

    let numberOfRings = 3;

    const extrudeSettings = {
        steps:   1,   
        depth:  yCoordinateinterval,  
        bevelEnabled: false, 
        curveSegments: 28,  // number of discrete segments describing the curve aka how smooth it is 
    };

    let ringColors = [Colors.BLUE, Colors.GREEN, Colors.RED]; 

    for ( let i = 0; i < numberOfRings ; i++) {
        
        const shape = new THREE.Shape();
        shape.absarc(0, 0, previousOuterRing + ringWidth, 0, Math.PI * 2, false);
        
        const innerCircle = new THREE.Path();
        innerCircle.absarc(0, 0, previousOuterRing, 0, Math.PI * 2, true);
        
        shape.holes.push(innerCircle);
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial({ color: ringColors[i], side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.set( Math.PI / 2, 0, 0);
        mesh.position.set(0, previousYCoordinate - yCoordinateinterval, 0);
        scene.add(mesh);

        //update variable values for the next ring
        previousOuterRing += ringWidth;
        previousYCoordinate -= yCoordinateinterval;

    }

}

function addCilinder() {

    let height = 10;
    let radius = 2;
    let color = Colors.PURPLE;

    const extrudeSettings = {
        steps:   1,   
        depth:  height,  
        bevelEnabled: false, 
        curveSegments: 28,  // number of discrete segments describing the curve aka how smooth it is 
    };

    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.set( Math.PI / 2, 0, 0);
    mesh.position.set(0, height - 3, 0);
    scene.add(mesh);

}

//////////////////
/*     HUD      */
//////////////////

/*
var strings = ["Q/q - Rodar Contra-Lança", "A/a - Rodar Contra-Lança", "W/w - Transladar Carrinho",
                "S/s - Transladar carrinho", "E/e - Subir Garra", "D/d - Descer Garra", "R/r - Abrir Garra",
                "F/f - Fechar Garra", "1 - Vista Frontal", "2 - Vista Lateral", "3 - Vista de Topo", 
                "4 - Ortogonal Fixa", "5 - Perspetiva Fixa", "6 - Perspetiva Móvel", "7 - Alternar Wireframe"];


function initHUD(strings) {
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
function toggleBrightness(pressed, stringID) {
    var hudElement = document.getElementById(stringID);
    if (!pressed) {
        hudElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
    } else {
        hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
    }
}

function toggleCameraButtonBrightness(stringID) {
var hudElement = document.getElementById(stringID);
resetCameraHUD();
hudElement.style.backgroundColor = "rgba(5, 5, 255, 0.5)";
}

function toggleBrightness_15(stringID) {
var hudElement = document.getElementById(stringID);
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

/*

////////////////////////////////////
/*  AUXILIARY BUILDING FUNCTIONS  */
////////////////////////////////////

// parametricas sao THREE.ParametricGeometry devem consistir em 8 formas diferentes, incluindo superfícies regradas (e.g.,
//hiperbolóide de 1 folha). Colocar múltiplas instâncias destas 8 superfícies sobre os restantes
//anéis, tendo cada instância dimensões e orientações distintas.

/*
MeshLambertMaterial, MeshPhongMaterial,
MeshToonMaterial, MeshNormalMaterial
aneis, pararmetrticas, faixa de mobius, cilindro sao os 4 objetos??
*/

// Devem recorrer às geometrias THREE.RingGeometry -> Clickbait, THREE.TubeGeometry ou
// THREE.ExtrudeGeometry.

// usar o THREE.Clock()

//extrude geometry ( tem q ter uma shape )-> aneis

/*

function addBase(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(3, 1, 3);
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

function addTorreMetalica(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.BoxGeometry(1, 11, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 6, z);
    obj.add(mesh);

    manager.addToVector(material);
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

*/

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

function createScene() {
    'use strict';
    scene.background = new THREE.Color(0xffffff);
    scene.add(new THREE.AxesHelper(10));

    // outerRadius values, smaller to bigger: 5, 10, 15
    // y coordinates for rings, smaller to bigger: 0 -3 -6
    addRings();
    addCilinder();

    // add objects




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
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

function onKeyDown(event) {
    
    switch (event.key) {
        case '1':
            setActiveCamera('Frontal');
            //toggleCameraButtonBrightness("string9");
            break;
        case '2':
            setActiveCamera('Lateral');
            //toggleCameraButtonBrightness("string10");
            break;
        case '3':
            setActiveCamera('Topo');
            //toggleCameraButtonBrightness("string11");
            break;
        case '4':
            setActiveCamera('Perspectiva');
            //toggleCameraButtonBrightness("string12");
            break;
        case '5':
            setActiveCamera('OrtograficaDinamica');
            //toggleCameraButtonBrightness("string13");
            break;
        case '6':
            setActiveCamera('Garra');
            //toggleCameraButtonBrightness("string14");
            break;
        case '7':
            manager.toggleWireframe();
            //toggleBrightness_15("string15");
            break;
        case 'q':
        case 'Q':
            //toggleBrightness(true, "string1");
            //rot+= 0.06;
            break;
        case 'a':
        case 'A':
            toggleBrightness(true, "string2");
            //rot -= 0.06;
            break;
        case 'w':
        case 'W':
            
            //if(Carrinho.position.z < 2){
            //    move_carrinho = +0.05;
            //}
            toggleBrightness(true, "string3");
            break;
        case 's':
        case 'S':
            //if(Carrinho.position.z > -3.5){
            //    move_carrinho = -0.05;
            //}
            toggleBrightness(true, "string4");
            break;
        case 'e':
        case 'E':
            /* if (Garra.position.y > -7.125){
                Cabo_Da_Garra.scale.y += 0.1;
                Cabo_Da_Garra.position.y -= 0.1* desce_cabo; //aumentar baixar o cabo
            
                cont+=1;
                desce_garra_teste = (1 + cont*0.1)*2.25;
                altura_cabo = 2.25-desce_garra_teste;
                Garra.position.y = altura_cabo;             //baixar garra
            } */
            toggleBrightness(true, "string5");
            break;
        case 'd':
        case 'D':
            /* if (Garra.position.y < 1.5){
                Cabo_Da_Garra.scale.y -= 0.1;
                Cabo_Da_Garra.position.y += 0.1* desce_cabo;   //diminuir e subir cabo

                cont-=1;
                desce_garra_teste = (1 + cont*0.1)*2.25;
                altura_cabo = 2.25-desce_garra_teste;
                Garra.position.y = altura_cabo;          //baixar garra
            } */
            toggleBrightness(true, "string6");            
            break;
        case 'r':
        case 'R':
            toggleBrightness(true, "string7");
            /* rot_direction = -1;
                rotationIncrement = 0.05
                ;
                alturaGarra += 0.01; */
            break;
        case 'f':
        case 'F':
            /* rot_direction = 1; */
            toggleBrightness(true, "string8");
            // rotationIncrement -= 0.05;
            // alturaGarra -=0.01;
            break;
        default:
            break;
    }
    render(); // Renderizar a cena após mudar a câmera
};

function onKeyUp(event) {
    
    switch (event.key) {
        case 'q':
        case 'Q':
            //toggleBrightness(true, "string1");
            break;
        case 'a':
        case 'A':
            //toggleBrightness(true, "string2");
            break;
        case 'w':
        case 'W':
            //toggleBrightness(true, "string3");
            break;
        case 's':
        case 'S':
            //toggleBrightness(true, "string4");
            break;
        case 'e':
        case 'E':
            //toggleBrightness(true, "string5");
            break;
        case 'd':
        case 'D':
            //toggleBrightness(true, "string6");
            break;
        case 'r':
        case 'R':
            //toggleBrightness(true, "string7");
            break;
        case 'f':
        case 'F':
            //toggleBrightness(true, "string8");
            break;
        default:
            break;
    }
};

function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

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

/*
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
*/

function update(){
    /* updateSuperior();
    if (rot_direction != 0){
       updateDentesGarra(); 
       rot_direction = 0;
    }
    Carrinho.translateZ(move_carrinho);
    move_carrinho = 0; */
}

function animate() {
    'use strict';
    update();
    render();
    requestAnimationFrame(animate);
}

init();
animate();