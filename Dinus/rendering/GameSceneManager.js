/* ============================================================ */
/* ==================== Game Scene Manager ==================== */
/* ============================================================ */



/* ========================= Imports ========================== */

import * as THREE from '../util/three.min.js';



class GameScene {

    constructor ( ) { 

        // Scene 
        this.scene = new THREE.Scene();

        // Canvas & Renderer
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        // Record of all objects on the 

        this.gameobjects = []
    }

    /* ==================== Adding Objects ==================== */

    addRenderedObject ( render_object ) { this.scene.add(render_object) }
    addGameObject ( game_object ){ this.gameobjects.push( game_object ) }


    /* ==================== Scene Updates ===================== */

    
    update ( playerInputs, time_delta ) {

        let updateObject = 
            gameObject => gameObject.update ( playerInputs, time_delta )

        this.gameobjects.forEach( updateObject )
    }
 

    /* ===================== Scene Render ===================== */
    
    render ( player ) {

        this.renderer.render( this.scene, player.camera );
        
    }

}

export { GameScene }

