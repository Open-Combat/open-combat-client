/* ============================================================ */
/* =================== First Person Camera ==================== */
/* ============================================================ */

import * as THREE from '../util/three.min.js';
import { GameObject } from './_gameObject.js';


class FirstPersonCamera extends GameObject {

    // Temporary
    velocity = 0;

    constructor (scene) {

        let view_ratio = window.innerWidth / window.innerHeight;
        let camera_object = new THREE.PerspectiveCamera(120, view_ratio, 1, 1000 );

        // Sets camera_object to be this.render_object
        super(scene, camera_object, false)

        // Position Camera
        this.moveDelta( 0, 10, 0)

    }

    /* =================== Update function ==================== */

    // Called automaticly every frame with update info
    update ( player_inputs, time_delta ){

        // Camera Motion
        let x = player_inputs.mouse_x * 0.01
        let y = player_inputs.mouse_y * 0.01
        if ( x != 0 || y != 0)
            this.rotateDelta( -y, -x, 0)

        // Walking
        if (player_inputs.isDown('forward') || player_inputs.isDown('backward'))
        {
            let forwards = this.orientation.forward.multiplyScalar( time_delta * 50)
            
            if (player_inputs.isDown('forward'))
                this.moveDelta( forwards.x, 0, forwards.z )
            if (player_inputs.isDown('backward'))
                this.moveDelta( -forwards.x, 0, -forwards.z )
        }

        if (player_inputs.isDown('right') || player_inputs.isDown('left')){

            let right = this.orientation.right.multiplyScalar( time_delta * 50 )
            if (player_inputs.isDown('right'))
                this.moveDelta( right.x, right.y, right.z )
            if (player_inputs.isDown('left'))
                this.moveDelta( -right.x, right.y, -right.z )
        }

        // Jumping
        this.velocity += 0.1;
        this.moveDelta(0, -this.velocity, 0)
        if ( this.orientation.position.y < 10 )
        {
            this.velocity = 0
            this.orientation.position.y = 10
        }

        if ( player_inputs.isPressed('jump'))
            this.velocity -= 2;



    }

    /* ======================== Access ======================== */

    get camera () {

        return this.render_object

    }

}

export { FirstPersonCamera }