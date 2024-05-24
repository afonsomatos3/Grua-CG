import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

////////////////////////
/*  GLOBAL VARIABLES  */
////////////////////////

let camera;
let scene = new THREE.Scene();
let renderer;

let clock = new THREE.Clock();
let delta_time;
let iteration_value = 0;

let elapsed_time_1 = 0;
let elapsed_time_2 = 0;
let elapsed_time_3 = 0;
let initial_ring_height_1;
let initial_ring_height_2;
let initial_ring_height_3;

/* Control variables for the carousel */

let _cylinder  = new THREE.Mesh();
let cilinder_radius = 2; // the rings will be constructed adjacent to the cilinder and eachother

let ringWidth = 3; // defined to be the same for every ring
let numberOfRings = 3;
let ringDepth = 1; // depth ( or height ) of every ring
const ringsArray = [];

let numberOfFigures = 8; // number of figures per ring
const figuresMatrix = [];
const figuresRotationValues = [1, 2, 3, 4, 1 ,3, 1 ,4];

/* Control variables for movement, smaller ring is number 1, bigger ring is number 3 */

let should_rotate_1 = false;
let should_rotate_2 = false;
let should_rotate_3 = false;

let ring_speed = 1.3;
let cylinder_speed = 1;

/* normal Map definition for material normalMaterial */
const textureLoader = new THREE.TextureLoader();
// const normalMap = textureLoader.load('some/path/example');

/* Materials of choice */
const lambertMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100, side: THREE.DoubleSide});
const toonMaterial = new THREE.MeshToonMaterial({ color: 0x0000ff , side : THREE.DoubleSide });
const normalMaterial = new THREE.MeshNormalMaterial({ side: 0x0000ff, side : THREE.DoubleSide});
const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xFFA500, side: THREE.DoubleSide,wireframe: false });

/*Lights */
const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
const parametricLights = [];
const pointLights = [];
const AmbientLight = new THREE.AmbientLight( 0xff7f00, 10); 


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
                break;
            case '1':
                newMaterial = phongMaterial;
                break;
            case '2':
                newMaterial = toonMaterial;
                break;
            case '3':
                newMaterial = normalMaterial;
                break;
            case '4':
                newMaterial = basicMaterial;
                break;
            default:
                return;

        }

        this.meshVector.forEach(element => {
            newMaterial.color = element.material.color;
            element.material = newMaterial;
        });
    
    }

}

const Colors = {
    RED: 0xFF0000,
    GREEN: 0x00ff00,
    BLUE: 0x0000FF,
    PURPLE: 0x800080,
    ORANGE: 0xFFA500,
};

let manager = new Manager();

/* For debug purposes only */
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

/* For debug purposes only */
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

class Figure {
    
    constructor(index) {
        return this.getParametricGeometry(index);
    }

    getParametricGeometry(index) {
        
        let real_index = (index % 8);
        let geometry;
        let material = new THREE.MeshBasicMaterial({ color: Colors.ORANGE, wireframe: true });
        let scale_value = 1;

        switch(real_index) {
            case 0:
                geometry = new ParametricGeometry( parametric_espanta_espiritos, 15, 15);
                scale_value = 0.5;
                break;
            case 1:
                geometry = new ParametricGeometry( parametric_paper, 15, 15);
                scale_value = 0.6;
                break;
            case 2:
                geometry = new ParametricGeometry( parametricHelix, 15, 15);
                scale_value = 0.8;
                break;
            case 3:
                geometry = new ParametricGeometry( parametric_thing, 15, 15);
                scale_value = 0.5;
                break;
            case 4:
                geometry = new ParametricGeometry( parametric_eight, 25, 25);
                scale_value = 0.2;
                break;
            case 5:
                geometry = new ParametricGeometry( parametric_globe, 15, 15);
                scale_value = 0.5;
                break;
            case 6:
                geometry = new ParametricGeometry( parametricWave_2, 25, 25);
                scale_value = 0.2;
                break;
            case 7:
                geometry = new ParametricGeometry( parametric_espanta_espiritos, 15, 15);
                scale_value = 0.5;
                break;
        }

        let mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(scale_value, scale_value, scale_value);
        return mesh;
    }
}

function createMobiusStrip(positionX, positionY, positionZ) {
    const numU = 50;
    const numV = 100;

    const vertices = [];
    const indices = [];

    // Gerar os vértices
    for (let i = 0; i < numU; i++) {
        const u = 2 * Math.PI * i / (numU - 1);
        for (let j = 0; j < numV; j++) {
            const v = 2 * j / (numV - 1) - 1;
            const x = (1 + v / 2 * Math.cos(u / 2)) * Math.cos(u);
            const y = (1 + v / 2 * Math.cos(u / 2)) * Math.sin(u);
            const z = v / 2 * Math.sin(u / 2);
            vertices.push(new THREE.Vector3(x, y, z));
        }
    }

    // Gerar as faces
    for (let i = 0; i < numU - 1; i++) {
        for (let j = 0; j < numV - 1; j++) {
            const v0 = i * numV + j;
            const v1 = v0 + 1;
            const v2 = v0 + numV;
            const v3 = v2 + 1;

            indices.push(v0, v1, v2);
            indices.push(v1, v3, v2);
        }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

    const mobiusStrip = new THREE.Mesh(geometry, material);
    mobiusStrip.rotation.x = Math.PI / 2;

    // Add Pontual Lights
    for (let i = 0; i < 8; i++) {
        const angle = (2 * Math.PI * i) / 8; 
        const x = Math.cos(angle)* 1.5;
        const y = Math.sin(angle) * 1.5;
        const z = -1.5; 

        const pointLight = new THREE.PointLight(0xffffff, 1,);
        pointLight.position.set(x, y, z); 
        const target = new THREE.Object3D(); 
        target.position.set(x, 20, z); // Define light's target
        pointLight.target = target; 
        mobiusStrip.add(pointLight); 
        pointLights.push(pointLight); 
    }
    
    mobiusStrip.position.set(positionX, positionY, positionZ);
    mobiusStrip.scale.set(1.5, 1.5, 1.5);
    manager.addToVector(mobiusStrip);
    scene.add(mobiusStrip);
}
function addSkyDome() {
    'use strict';
    //ADD A SKYDOME: a big concave half sphere on top of the cylinder
    const skyDome = new THREE.Mesh();
    const skyDomeGeometry = new THREE.SphereGeometry( 50, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2 );
    const skyDomeMaterial = new THREE.MeshBasicMaterial({ color: Colors.BLUE, side: THREE.DoubleSide });
    //skyDome.material.wireframe = true;
    //add texture to the skyDome
    const texture = new THREE.TextureLoader().load('2024-05-23.png');

    skyDomeMaterial.map = texture;
    skyDomeMaterial.side = THREE.DoubleSide;

    skyDome.geometry = skyDomeGeometry;
    skyDome.material = skyDomeMaterial;
    skyDome.position.set(0, 0, 0);

    manager.addToVector(skyDome.material); //what does this do?


    scene.add(skyDome);


}

function addLights(scene) {
    let light_angle = ( 2 * Math.PI ) / numberOfFigures;
    let light_height = ringDepth + 0.5;
    
// Parametric Spot Lights
for (let i = 0; i < numberOfRings; i++) {
    parametricLights[i] = [];
    let current_radius = cilinder_radius + (i * ringWidth);
    let distanceToCenter = current_radius + (ringWidth / 2);

    for (let j = 0; j < numberOfFigures; j++) {
        const spotLight = new THREE.SpotLight(0xffffff, 5);
        const angle = (j * light_angle);

        spotLight.position.set(
            distanceToCenter * Math.cos(angle),
            light_height + 1,
            distanceToCenter * Math.sin(angle)
        );

        // Define orientation of lights, (0,1,0)
        const target = new THREE.Object3D();
        target.position.set(
            distanceToCenter * Math.cos(angle),
            light_height,
            distanceToCenter * Math.sin(angle)
        );
        ringsArray[i].add(target); 
        spotLight.target = target; 

        
        parametricLights[i].push(spotLight);
        ringsArray[i].add(spotLight); 
    }
    }
    DirectionalLight.position.set(10,3,2);
    scene.add(DirectionalLight);

    scene.add( AmbientLight );
}

/* parametric functions */ 

function parametric_eight(u, v, target) {
    const coils = 4;
    const radius = 1;
    const height = 2;
    const theta = u * coils * 2 * Math.PI;
    const x = radius * Math.cos(theta + 5);
    const y = height * u;
    const z = radius * Math.sin(theta / 2);
    target.set(x, y, z);
}

function parametricHelix(u, v, target) {
    const coils = 4;
    const radius = 1;
    const height = 2;
    const theta = u * coils * 2 * Math.PI;
    const x = radius * Math.cos(theta);
    const y = height * u;
    const z = radius * Math.sin(theta);
    target.set(x, y, z);
}

function parametricWave_2(u, v, target) {
    const x = Math.E ** v;
    const y = Math.cos( u + v ) + Math.cos( u + v);
    const z = Math.LN2;
    target.set(x, y, z);
}

function parametric_paper(u, v, target) {

    u *= - 2 * Math.PI;
    v += 0.5;

    let y = v;
    const x = Math.cos(u);
    const z = x -y;

    target.set(x, y, z);
}

function parametric_thing(u, v, target) {
    let R = 3;
    let r = 1;

    u = Math.exp(v*3);
    v *= 2 * Math.PI;

    const x = (R * r++ * Math.cos(v)) * Math.cos(u);
    const y = r * Math.sin(v);
    const z = (R-- / r * Math.cos(v)) * Math.sin(u);
    
    target.set(x, y, z);
}

function parametric_globe(u, v, target) {
    let R = 3;
    let r = 1;

    u *= 2 * Math.PI;
    v *= 2 * Math.PI;

    const x = (R * r++ * Math.cos(v)) * Math.cos(u);
    const y = r * Math.sin(v);
    const z = (R-- / r * Math.cos(v)) * Math.sin(u);
    
    target.set(x, y, z);
}

function parametric_espanta_espiritos(u, v, target) {
    const R = 3;
    const r = 1;

    u *= 2 * Math.PI;
    v *= 2 * Math.PI;

    const x = (R * r * Math.cos(v)) * Math.cos(u);
    const y = r * Math.sin(v);
    const z = (R / r * Math.cos(v)) * Math.sin(u);
    
    target.set(x, y, z);
}

/* END OF parametric functions */ 

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

}

function onResize() {
    'use strict';
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
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


function createPerspectiveCamera(x, y, z, name) {
    'use strict';
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(x, y, z);
    camera.lookAt(scene.position);
    camera.name = name;
    return camera;
}

function createVirtualCamera(positionX, positionY, positionZ, fov = 70, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) {
    
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(positionX, positionY, positionZ);

    const stereoCamera = new THREE.StereoCamera();
    stereoCamera.aspect = aspect;

    return { camera, stereoCamera };
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

            // give shape to each figure
            figuresMatrix[i][j] = new Figure(i+j);

            //  calculate and apply the correct posicion/orientation for each figure
            figuresMatrix[i][j].position.set( distanceToCenter * Math.cos( ( j * figure_angle ) ), figure_height , distanceToCenter * Math.sin( ( j * figure_angle ) ));
            figuresMatrix[i][j].rotation.set(0, - j * figure_angle, 0);

            ringsArray[i].add(figuresMatrix[i][j]);

        }
    }

}

function createScene() {
    'use strict';

    scene.background = new THREE.Color(0xffffff);
    // scene.add(new THREE.AxesHelper(10));
    
    // add objects hierarchically
    addSkyDome();
    addCylinder(_cylinder);
    addRings(_cylinder);
    addFigures();
    createMobiusStrip(0,11,0);
    addLights(scene);
    scene.add(_cylinder);
    
    // Câmeras com projeção perspectiva
    const cameraPerspectiva = createPerspectiveCamera(20, 20, 8, 'Perspectiva');
    scene.add(cameraPerspectiva);
    /*
    const { camera, stereoCamera } = createVirtualCamera(0, 1.6, 3);
    window.camera = camera;

    // Adicionar o botão VR à página
    document.body.appendChild(VRButton.createButton(renderer));

    // Habilitar o renderizador para XR
    renderer.xr.enabled = true;

    // Ajustar o tamanho da janela quando redimensionada
    window.addEventListener('resize', onResize(), false);

    // Iniciar o loop de animação
    renderer.setAnimationLoop(function () {
        // renderizar a cena usando a câmera estéreo
        stereoCamera.update(camera);
        renderer.render(scene, camera);
    });

    scene.add(camera);
    */
    

}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function 
initArrays() {
    'use strict';

    // outer for loop: initialize ringsArray with the previously defined number of rings
    // inner for loop: initialize figuresMatrix with the previously defined number of figures per ring
    for ( let t = 0; t < numberOfRings; t++ ) {
        
        const mesh = new THREE.Mesh();
        ringsArray.push(mesh);
        manager.addToVector(mesh);

        figuresMatrix[t] = [];
        parametricLights[t] = [];

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
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    document.body.appendChild( VRButton.createButton( renderer ) );

    manager.addToVector(_cylinder);

    initArrays();

    createScene();

    initial_ring_height_1 = ringsArray[0].position.y;
    initial_ring_height_2 = ringsArray[1].position.y;
    initial_ring_height_3 = ringsArray[2].position.y;

    setActiveCamera('Perspectiva');

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
}

function onKeyDown(event) {

    switch (event.key) {
        case '1':
            setActiveCamera('Perspectiva');
            break;
        case '2':
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
            pointLights.forEach((pointLight) => {
                    pointLight.visible = !pointLight.visible;  
            });
            break;
        case 's':
        case 'S': 
            parametricLights.forEach((parametricLight) => {
            parametricLight.forEach((parametricLights) => {
                parametricLights.visible = !parametricLights.visible;  
            })
            });
            break;
        case 'd':
        case 'D':
            DirectionalLight.visible = !DirectionalLight.visible;
            break;
        case 't':
        case 'T':
            manager.changeMaterial('4');
            break;
    }
}

function update() {
    'use strict';
    
    delta_time = clock.getDelta();
    

    if (should_rotate_1) {    
        ringsArray[0].position.y = Math.sin( (initial_ring_height_1 + elapsed_time_1) * ring_speed );
        elapsed_time_1 += delta_time;
    }
    
    if (should_rotate_2) {
        ringsArray[1].position.y = Math.sin( (initial_ring_height_2 + elapsed_time_2) * ring_speed );
        elapsed_time_2 += delta_time;
    }

    if (should_rotate_3) {
        ringsArray[2].position.y = Math.sin( (initial_ring_height_3 + elapsed_time_3) * ring_speed );
        elapsed_time_3 += delta_time;
    }
    
    _cylinder.rotation.y += cylinder_speed * delta_time;

    figuresMatrix.forEach(vector => {
        vector.forEach(element => {
            element.rotation.y += figuresRotationValues[iteration_value++] * delta_time;
            iteration_value = iteration_value % numberOfFigures;
        }) 
    });

}

function animate() {
    'use strict';

    update();
    render();
    requestAnimationFrame(animate);
}

init();
animate();
