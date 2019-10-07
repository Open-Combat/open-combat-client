/* ============================================================ */
/* ======================= Game Object ======================== */
/* ============================================================ */

import { Orientation } from '../properties/Orientation.js'

// Parent object for all gameobjects
class GameObject {


    /* ====================== Variables ======================= */

    scene = {}
    render_object = {}
    orientation = {}

    rendered = false


    
    /* =================== Setup Function ==================== */

    constructor ( scene, object, render = true ){

        // Link scene
        this.scene = scene
        this.scene.addGameObject( this )

        // Ser render object and if it is shown
        this.render_object = object;
        this.rendered = render;
        if ( this.rendered ) this.scene.addRenderedObject( object )

        // Links orientation to obj
        this.orientation = new Orientation( object )
    }



    /* ================= Orientation Changes ================== */

    moveDelta ( x, y, z ) {
        this.orientation.moveDelta( x, y, z )
    }

    rotateDelta (x, y, z) {
        this.orientation.rotateDelta( x, y, z )
    }

    /* =================== Update Function ==================== */

    updateRenderObjectPosition ( ) {
        if ( ! this.rendered ) return;
        this.orientation.applyThreeObjectPosition( this.render_object )
    }

    updateRenderObjectRotation () {
        if ( ! this.rendered ) return;
        this.orientation.applyTheeObjectRotation( this.render_object )
    }

    // Called every frame with input info and time delta in ms
    update( player_inputs, time_delta) {}
}

export { GameObject }