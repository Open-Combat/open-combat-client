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
        
        // Create plane
        let plane = new THREE.Mesh( geometry, material );

        super(scene, plane)
        
        this.rotateDelta( Math.PI / 2, 0, 0)

    }
}

export { Plane }