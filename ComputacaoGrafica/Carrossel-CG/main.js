import * as THREE from 'three';

////////////////////////
/*  GLOBAL VARIABLES  */
////////////////////////

let camera;
let scene = new THREE.Scene();
let renderer;

let clock = new THREE.Clock();
let current_time;

const keyState = {};

/* Control variables for the carousel */

let _cylinder  = new THREE.Mesh();
let cilinder_radius = 2; // the rings will be constructed adjacent to the cilinder and eachother

let ringWidth = 3; // defined to be the same for every ring
let numberOfRings = 3;
let ringDepth = 1; // depth ( or height ) of every ring
const ringsArray = [];

let numberOfFigures = 8; // number of figures per ring
const figuresMatrix = [];

/* Control variables for movement, smaller ring is number 1, bigger ring is number 3 */

let UP = 1;
let DOWN = -1;

let should_rotate_1 = false;
let should_rotate_2 = false;
let should_rotate_3 = false;

let maxHeight1 = 1;
let minHeight1 = -1;

let maxHeight2 = 2;
let minHeight2 = -2;

let maxHeight3 = 3;
let minHeight3 = -3;

let direction1 = UP;
let direction2 = UP;
let direction3 = UP;

let ring_speed = 1;
let cylinder_speed = 1;

/* normal Map definition for material normalMaterial */
const textureLoader = new THREE.TextureLoader();
// const normalMap = textureLoader.load('some/path/example');

/* Materials of choice */
const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 });
const toonMaterial = new THREE.MeshToonMaterial({ color: 0x0000ff });
// const normalMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, normalMap: normalMap });

class Manager {

    constructor() {
        this.meshVector = [];
    }

    addToVector(mesh) {
        this.meshVector.push(mesh);
    }

    toggleWireframe() {
        this.meshVector.forEach(element => {
            element.material.wireframe = !element.material.wireframe;
        });
    }

    changeMaterial(choice) {

        let newMaterial;

        switch (choice) {

            case '0':
                newMaterial = lambertMaterial;
                console.log("case 0");
                break;
            case '1':
                newMaterial = phongMaterial;
                console.log("case 1");
                break;
            case '2':
                newMaterial = toonMaterial;
                console.log("case 2");
                break;
            case '3':
                console.log("case 3");
                // newMaterial = normalMaterial;
                return;
                break;
            default:
                return;

        }

        this.meshVector.forEach(element => {
            element.material = newMaterial;
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
    'use strict';
    // the first ring to be constructed is the smallest, next rings are adjacent
    let initialOuterRadius = cilinder_radius + ringWidth;
    let initialYCoordinate = 0;

    let yCoordinateinterval = ringDepth;

    let previousYCoordinate = initialYCoordinate + yCoordinateinterval;
    let previousOuterRing = initialOuterRadius - ringWidth;

    const extrudeSettings = {
        steps: 1,
        depth: yCoordinateinterval,
        bevelEnabled: false,
        curveSegments: 28,
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

function addCylinder(current_object) {
    'use strict';

    let height = 10;
    let radius = cilinder_radius;

    const extrudeSettings = {
        steps: 1,
        depth: height,
        bevelEnabled: false,
        curveSegments: 28,
    };

    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ color: Colors.PURPLE, side: THREE.DoubleSide });
    
    current_object.geometry = geometry;
    geometry.rotateX( - Math.PI / 2);

    current_object.material = material;

    manager.addToVector(material);

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

function addFigures() {
    'use strict';

    let figure_angle = ( 2 * Math.PI ) / numberOfFigures;
    let figure_height = ringDepth + 0.5;
    let distanceToCenter;
    let current_radius;

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

            manager.addToVector(figuresMatrix[i][j].material);
        }
    }

}

function createScene() {
    'use strict';

    scene.background = new THREE.Color(0xffffff);
    scene.add(new THREE.AxesHelper(10));
    
    // add objects hierarchically
    addCylinder(_cylinder);
    addRings(_cylinder);
    addFigures();
    
    scene.add(_cylinder);
    
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
    'use strict';

    // outer for loop: initialize ringsArray with the previously defined number of rings
    // inner for loop: initialize figuresMatrix with the previously defined number of figures per ring
    for ( let t = 0; t < numberOfRings; t++ ) {
        
        const mesh = new THREE.Mesh();
        ringsArray.push(mesh);
        manager.addToVector(mesh);

        figuresMatrix[t] = [];

        for (let k = 0; k < numberOfFigures; k++ ) {
            const mesh = new THREE.Mesh();
            figuresMatrix[t].push(mesh);
            manager.addToVector(mesh);
        }
    }
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    manager.addToVector(_cylinder);

    initArrays();

    createScene();

    setActiveCamera('Frontal');

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
}

function onKeyDown(event) {

    /* keyState[event.key] = true;

    if (keyState['ArrowUp']) {
        cube.position.y += speed;
    }
    if (keyState['ArrowDown']) {
        cube.position.y -= speed;
    }
    if (keyState['ArrowLeft']) {
        cube.position.x -= speed;
    }
    if (keyState['ArrowRight']) {
        cube.position.x += speed;
    }
    */


    switch (event.key) {
        case '1':
            should_rotate_1 = !should_rotate_1;
            setActiveCamera('Frontal');
            break;
        case '2':
            should_rotate_2 = !should_rotate_2;
            setActiveCamera('Lateral');
            break;
        case '3':
            should_rotate_3 = !should_rotate_3;
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
        case 'q':
        case 'Q':
            manager.changeMaterial('0');
            break;
        case 'e':
        case 'E':
            manager.changeMaterial('2');
            break;
        case 'w':
        case 'W':
            manager.changeMaterial('1');
            break;
        case 'r':
        case 'R':
            manager.changeMaterial('3');
            break;
        case 'p':
        case 'P':
            // TODO: ligar / desligar luzes pontuais e spotlight
            break;
        case 'd':
        case 'D':
            //TODO: desligar / ligar fonte de luz
            break;
        case 't':
        case 'T':
            // TODO: desactivar o calculo da iluminacao
            break;
    }
    render();
}

function update() {
    'use strict';
    
    current_time = clock.getDelta();

    if (should_rotate_1) {    
        if (ringsArray[0].position.y > maxHeight1 ) {
            direction1 = DOWN;
        }
        
        if (ringsArray[0].position.y < minHeight1 ) {
            direction1 = UP;
        }

        ringsArray[0].position.y += ring_speed * direction1 * current_time;
    }
    
    if (should_rotate_2) {
        if (ringsArray[1].position.y > maxHeight2 ) {
            direction2 = DOWN;
        }

        if (ringsArray[1].position.y < minHeight2 ) {
            direction2 = UP;
        }
        
        ringsArray[1].position.y += ring_speed * direction2 * current_time;
    }

    if (should_rotate_3) {
        if (ringsArray[2].position.y > maxHeight3 ) {
            direction3 = DOWN;
        }

        if (ringsArray[2].position.y < minHeight3 ) {
            direction3 = UP;
        }
    
        ringsArray[2].position.y += ring_speed * direction3 * current_time;
    }
    
        _cylinder.rotation.y += cylinder_speed * current_time;
    
}

function animate() {
    'use strict';

    update();
    render();
    requestAnimationFrame(animate);
}

init();
animate();