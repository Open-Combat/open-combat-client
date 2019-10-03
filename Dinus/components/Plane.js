/* ============================================================ */
/* ==================== Plane Game Object ===================== */
/* ============================================================ */

import * as THREE from '../util/three.min.js';
import { GameObject } from './_gameObject.js'

/* ==================== Static Properties ===================== */

let geometry = new THREE.PlaneGeometry( 100, 100 );
let material = new THREE.MeshBasicMaterial( {   
    color: {r: 1, b: 1, g: 1}, 
    side: THREE.DoubleSide
});


class Plane extends GameObject {

    constructor (scene) {
        super()
        
        // Create plane
        let plane = new THREE.Mesh( geometry, material );
        plane.rotation.x =  Math.PI / 2;

        // Add it to the scene
        scene.addGameObject( this )
        scene.addRenderedObject( plane )

    }
}

export { Plane }