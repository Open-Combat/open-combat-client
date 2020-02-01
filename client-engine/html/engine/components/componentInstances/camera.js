import { registerThreeObject } from '../../systems/systemInstances/RenderSystem.js'

let FOV = 100 ;

export const implementedComponents = ['camera', 'position', 'rotation'];

export function constructor ( entity, data ) {
    
    let camera = new THREE.PerspectiveCamera( FOV, window.innerWidth / window.innerHeight, 0.01, 1000 );

    let yawObject = new THREE.Object3D();
    let pitchObject = new THREE.Object3D();

    yawObject.position.y += 10

    pitchObject.add( camera );
    yawObject.add( pitchObject );

    registerThreeObject( yawObject )

    // Register the components on the entity
    entity.position = yawObject.position 
    entity.rotation = { pitch : pitchObject, yaw : yawObject }
    entity.camera = camera;

}
