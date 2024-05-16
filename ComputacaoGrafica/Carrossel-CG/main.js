import * as THREE from 'three';
import { colorSpaceToLinear, distance, materialIridescence } from 'three/examples/jsm/nodes/Nodes.js';

////////////////////////
/*  GLOBAL VARIABLES  */
////////////////////////

let camera;
let scene = new THREE.Scene();
let renderer;
let clock = new THREE.Clock();
let current_time;
let should_rotate = false;

/* Control variables for the carousel */
let cilinder_radius = 2; // cilinder radius, the rings will be constructed adjacent to the cilinder
let ringWidth = 3; // the ring width is defined to be the same for every ring
let numberOfRings = 3; // number of rings to be around the carousel
let numberOfFigures = 8; // number of figures per ring
let ringsArray = []; // array of rings, DO NOT CHANGE
let figuresMatrix = []; // matrix of figuras parametricas, DO NOT CHANGE
let ringDepth = 1; // depth ( or height ) of every ring, they all have the same height

// max and min height for each ring translation: smaller to bigger (1 ,2 3)
let maxHeight1 = 1;
let minHeight1 = -1;

let maxHeight2 = 2;
let minHeight2 = -2;

let maxHeight3 = 3;
let minHeight3 = -3;

// direction values for rings movement, initially goes upwards
let direction1 = 1;
let direction2 = 1;
let direction3 = 1;

/*
console.log(matrix[1][2]); // Output: 6 (element at second row, third column)
for (let i = 0; i < rows; i++) {
    matrix[i] = [];
*/

//////////////////
/*     HUD      */
//////////////////

/* old hud functions
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

/* notes
// parametricas sao THREE.ParametricGeometry devem consistir em 8 formas diferentes, incluindo superfícies regradas (e.g.,

//hiperbolóide de 1 folha). Colocar múltiplas instâncias destas 8 superfícies sobre os restantes
//anéis, tendo cada instância dimensões e orientações distintas.


MeshLambertMaterial, MeshPhongMaterial,
MeshToonMaterial, MeshNormalMaterial
aneis, pararmetrticas, faixa de mobius, cilindro sao os 4 objetos??


// Devem recorrer às geometrias THREE.RingGeometry -> Clickbait, THREE.TubeGeometry ou
// THREE.ExtrudeGeometry.

// usar o THREE.Clock()

//extrude geometry ( tem q ter uma shape )-> aneis
*/

/* old functions

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

class Box {

    constructor() {
        this.mesh = new THREE.Mesh();
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.material = material;
        mesh.geometry = geometry;

        return mesh;
    }

}

class SmallBox {

    constructor() {
        this.mesh = new THREE.Mesh();
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.material = material;
        mesh.geometry = geometry;

        return mesh;
    }

}

function addRings(father_reference) {

    // the first ring is the smallest, the third ring is the biggest
    // Outer Radiuses: , small = 2, width = 3, big ring = 5
    let initialOuterRadius = cilinder_radius + ringWidth; // valor inical para o diametro do menor ring
    let initialYCoordinate = 0;

    let yCoordinateinterval = ringDepth;

    let previousYCoordinate = initialYCoordinate + yCoordinateinterval;
    let previousOuterRing = initialOuterRadius - ringWidth;

    const extrudeSettings = {
        steps: 1,
        depth: yCoordinateinterval,
        bevelEnabled: false,
        curveSegments: 28,  // number of discrete segments describing the curve aka how smooth it is 
    };

    let ringColors = [Colors.BLUE, Colors.GREEN, Colors.RED];

    for (let i = 0; i < numberOfRings; i++) {

        const shape = new THREE.Shape();
        shape.absarc(0, 0, previousOuterRing + ringWidth, 0, Math.PI * 2, false);

        const innerCircle = new THREE.Path();
        innerCircle.absarc(0, 0, previousOuterRing, 0, Math.PI * 2, true);

        shape.holes.push(innerCircle);

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshBasicMaterial({ color: ringColors[i], side: THREE.DoubleSide });
 
        ringsArray[i].geometry = geometry;
        ringsArray[i].geometry.rotateX( - Math.PI / 2);
        
        ringsArray[i].material = material;

        ringsArray[i].position.set(0, previousYCoordinate - yCoordinateinterval, 0);

        //update variable values for the next ring
        previousOuterRing += ringWidth;
        previousYCoordinate -= yCoordinateinterval;

        father_reference.add(ringsArray[i]);

    }

}

function addCilinder(current_object) {

    let height = 10;
    let radius = cilinder_radius;

    const extrudeSettings = {
        steps: 1,
        depth: height,
        bevelEnabled: false,
        curveSegments: 28,  // number of discrete segments describing the curve aka how smooth it is 
    };

    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: Colors.PURPLE, side: THREE.DoubleSide });
    
    current_object.geometry = geometry;
    geometry.rotateX( - Math.PI / 2);

    current_object.material = material;

}

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

let object0 = new Box();
let object1 = new Box();
let object2 = new Box();
let object3 = new Box();
let object4 = new Box();

// figs parametricas
let smallObject1 = new SmallBox();
let smallObject2 = new SmallBox();

let smallObject3 = new SmallBox();
let smallObject4 = new SmallBox();

let smallObject5 = new SmallBox();
let smallObject6 = new SmallBox();

let _cilinder = new THREE.Mesh();

let smallObjects = [];
smallObjects.push(smallObject1);
smallObjects.push(smallObject2);
smallObjects.push(smallObject3);
smallObjects.push(smallObject4);
smallObjects.push(smallObject5);
smallObjects.push(smallObject6);

function addFigures() {

    let figure_angle = ( 2 * Math.PI ) / numberOfFigures;
    let figure_height = ringDepth + 0.5;
    let distanceToCenter;
    let current_radius;
    let previous_radius = cilinder_radius;

    for (let i = 0; i < numberOfRings; i++) {

        current_radius = cilinder_radius + ( i * ringWidth );
        distanceToCenter = current_radius + ( ringWidth / 2 );

        for (let j = 0; j < numberOfFigures; j++) {

            // dar a forma ao elemento
            let _tmpBox = new Box();
            figuresMatrix[i][j].geometry = _tmpBox.geometry;
            figuresMatrix[i][j].material = _tmpBox.material;
            
            // posicionar cada figura com a posicao e orientacao correta
            figuresMatrix[i][j].position.set( distanceToCenter * Math.cos( ( j * figure_angle ) ), figure_height , distanceToCenter * Math.sin( ( j * figure_angle ) ));
            figuresMatrix[i][j].rotateY( j * figure_angle );

            ringsArray[i].add(figuresMatrix[i][j]);
        }
        previous_radius = current_radius;
    }

}

function createScene() {
    'use strict';

    scene.background = new THREE.Color(0xffffff);
    scene.add(new THREE.AxesHelper(10));
    
    addCilinder(_cilinder);
    addRings(_cilinder);
    addFigures();
    
    scene.add(_cilinder);

    // o vetor posica é CONSTANTEMENT CALCULADO A PARTIR DO REFERNCIAL DO PAI !!!

    /*
    // outerRadius values, smaller to bigger: 5, 10, 15
    // y coordinates for rings, smaller to bigger: 0 -3 -6
    addRings(cilinder);

    // add objects
    */

    /*
    _cilinder.add(object1); // aneis 
    _cilinder.add(object2); // aneis 
    _cilinder.add(object3); // aneis

    // afastamento dos aneis, é feito na funcao addRings
    object1.position.set(3, 0, 0);
    object2.position.set(6, 0, 0);
    object3.position.set(9, 0, 0);

    // adicionar figuras parametricas
    object1.add(smallObject1);
    object1.add(smallObject2);

    object2.add(smallObject3);
    object2.add(smallObject4);
    
    object3.add(smallObject5);
    object3.add(smallObject6);

    // altura das figuras parametricas
    smallObjects.forEach( smallObject => {
        smallObject.position.set(0, 10, 0);    
    });

    /*
    let number_of_objects = smallObjects.length;
    let tmp = Math.PI / number_of_objects;

    for (let j = 0; j < number_of_objects; j++) {
        smallObjects[j].position.x = Math.cos( ( j * tmp ) ) ;
        smallObjects[j].position.z = Math.sin( ( j * tmp ) ) ;
        smallObjects[j].rotateY( j * tmp ) ;  
    }
    */

    /*
    //IRRELEVANT
    let obj = new THREE.Object3D();
    obj.rotateOnAxis.y = 1; // object space
    obj.rotateOnWorldAxis(new THREE.Vector3(0,1,0), 1); // world space
    obj.rotateY(1); // local space

    obj.rotation.set(0,1,0);

    */


    
    // Câmeras ortográficas
    const viewSize = 30;
    const cameraFrontal = createOrthographicCamera(0, 0, 50, viewSize, 'Frontal');
    const cameraLateral = createOrthographicCamera(-50, 0, 0, viewSize, 'Lateral');
    const cameraTopo = createOrthographicCamera(0, 50, 0, viewSize, 'Topo');


    scene.add(cameraFrontal);
    scene.add(cameraLateral);
    scene.add(cameraTopo);

    // Câmeras com projeção perspectiva
    const cameraPerspectiva = createPerspectiveCamera(10, 20, 3, 'Perspectiva');
    const cameraMovel = createPerspectiveCamera(0, 15, 25, 'Movel');
    const cameraOrtograficaDinamica = createOrthographicCamera(10, 20, 34, viewSize, 'OrtograficaDinamica');

    scene.add(cameraOrtograficaDinamica);
    scene.add(cameraPerspectiva);
    scene.add(cameraMovel);

}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function initArrays() {
    
    // outer for loop: initialize ringsArray with the previously defined number of rings
    // inner for loop: initialize figuresMatrix with the previously defined number of figures per ring
    for ( let t = 0; t < numberOfRings; t++ ) {
        
        const mesh = new THREE.Mesh();
        ringsArray.push(mesh);
        figuresMatrix[t] = [];

        for (let k = 0; k < numberOfFigures; k++ ) {
            const mesh = new THREE.Mesh();
            figuresMatrix[t].push(mesh);
        }

    }

}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    initArrays();

    createScene();

    setActiveCamera('Frontal');

    window.addEventListener('resize', onResize);
}

let rotation_value = Math.PI / 8;

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
            setActiveCamera('OrtograficaDinamica');
            break;
        case '6':
            setActiveCamera('Garra');
            break;
        case '7':
            manager.toggleWireframe();
            break;
        case 'z':
            object0.position.x += 1;
            break;
        case 'x':
            object0.position.x -= 1;
            break;
        case 'a':
        case 'A':
            object0.position.z += 1;
            toggleBrightness(true, "string2");
            break;
        case 'q':
        case 'Q':
            object0.rotateY(rotation_value); // NOT ROTATING THE OBJECT, ITS ROTATING THE AXIS ITSELF, WHICH MEANS CHILDREN MOVE, BUT FATHER STAYS THE SAME, pivot is father
            break;
        case 'w':
        case 'W':
            object0.rotateOnWorldAxis(new THREE.Vector3(0,rotation_value,0), 1); //ROTATE THE FATHER, AND BY CONSEQUENCE, THE CHILDREN, pivot is father
            toggleBrightness(true, "string3");
            break;
        case 's':
        case 'S':
            object0.position.z -= 1;
            toggleBrightness(true, "string4");
            break;
        case 'e':
        case 'E':    
            object0.rotation.y += rotation_value;
            toggleBrightness(true, "string5");
            break;
        case 'd':
        case 'D':
            object0.add(new THREE.AxesHelper(3));
            toggleBrightness(true, "string6");
            break;
        case 'r':
        case 'R':
            object0.rotateY(rotation_value);
            toggleBrightness(true, "string7");
            break;
        case 'f':
        case 'F':
            toggleBrightness(true, "string8");
            break;
        default:
            break;
        case 'p':
            should_rotate = !should_rotate;
    }
    render();
});

function update() {
    
    current_time = clock.getDelta();

    if (should_rotate) {    
    
        if (object1.position.y > maxHeight1 ) {
            direction1 *= -1;
        }
    
        if (object2.position.y > maxHeight2 ) {
            direction2 *= -1;
        }
    
        if (object3.position.y > maxHeight3 ) {
            direction3 *= -1;
        }
    
        if (object1.position.y < minHeight1 ) {
            direction1 *= -1;
        }
    
        if (object2.position.y < minHeight2 ) {
            direction2 *= -1;
        }
    
        if (object3.position.y < minHeight3 ) {
            direction3 *= -1;
        }
    
        object1.position.y += 1 * direction1 * current_time;
        object2.position.y += 1 * direction2 * current_time;
        object3.position.y += 1 * direction3 * current_time;
    
        object0.rotation.y += 1 * current_time;
    }
}

function animate() {
    'use strict';

    //update();
    render();
    requestAnimationFrame(animate);
}

init();
animate();