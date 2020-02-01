import { registerThreeObject } from '../../systems/systemInstances/RenderSystem.js'

let baseMaterial  = new THREE.MeshPhongMaterial( );

export const implementedComponents = ['rendered', 'position'];

export function constructor ( entity, data ) {

    let baseGeometry = new THREE.CubeGeometry( data.width, data.height, data.depth );
    let mesh = new THREE.Mesh( baseGeometry, baseMaterial );

    mesh.position.x = data.x;
    mesh.position.y = data.y;
    mesh.position.z = data.z;

    entity.position = mesh.position;
    entity.rendered = mesh;

    registerThreeObject( mesh )

}
