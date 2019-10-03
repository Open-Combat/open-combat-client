/* ============================================================ */
/* =================== First Person Camera ==================== */
/* ============================================================ */

import * as THREE from '../util/three.min.js';
import { GameObject } from './_gameObject.js'



class FirstPersonCamera extends GameObject {

    constructor (scene) {
        super()

        let view_ratio = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(120, view_ratio, 1, 1000 );
        this.camera.position.y = 10;

        scene.addGameObject( this )
    }

    /* =================== Update function ==================== */

    // Called automaticly every frame with update info
    update ( player_inputs, time_delta ){

        if (player_inputs.isDown('forward'))
            this.camera.position.z -= 100 * time_delta

        if (player_inputs.isDown('backward'))
            this.camera.position.z += 100 * time_delta

        if (player_inputs.isDown('left'))
            this.camera.position.x -= 100 * time_delta

        if (player_inputs.isDown('right'))
            this.camera.position.x += 100 * time_delta

    }

}

export { FirstPersonCamera }