/* ============================================================ */
/* ======================= Orientation ======================== */
/* ============================================================ */

import { Vector3, Euler } from '../util/three.min.js';


/* =========================== Math =========================== */
var PI_2 = Math.PI / 2;
var forward_direction = new Vector3(0, 0, -1)
var right_direction = new Vector3(1, 0, 0)

class Orientation {

    position = new Vector3()
    rotation = new Euler( 0, 0, 0, 'YXZ' )

    
    /* ========================= Init ========================= */

    constructor ( object ) {
        this.object = object
    }


    /* ======================= Updates ======================== */

    moveDelta ( x, y, z ) {
        
        // Move position value then update object
        this.position.add( new Vector3(x, y, z) )
        this.object.position.copy( this.position )
    }

    rotateDelta (x, y, z){
        
        // Get rotation, change it, then re-set it
        this.rotation.setFromQuaternion( this.object.quaternion );

		this.rotation.x += x;
		this.rotation.y += y;
        this.rotation.z += z;
        
        this.rotation.x = Math.max( - PI_2, Math.min( PI_2, this.rotation.x ) );

        this.object.quaternion.setFromEuler( this.rotation )
    }


    /* ======================= Getters ======================== */

    // Gets directions
    get forward ( ) {
        return this.get_rotatedDirection( forward_direction ) 
    }
    get right ( ) {
        return this.get_rotatedDirection( right_direction )            
    }
    get_rotatedDirection (dir) {
        return dir.clone().applyQuaternion( this.object.quaternion ).setY(0).normalize()
    }

}

export { Orientation }