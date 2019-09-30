/* Scene for the game, controlls what shows up on screen */

import * as THREE from '../three.min.js';

// these needs to be changed at some point
import { CreateSceneRenderer } from './WebGLRenderer.js'
import * as StandardObjects from './StandardObjects/_standardObjects.js'

var GameScene = function () {

    //Sets up the scene 
    var scene = new THREE.Scene();
    var renderer = CreateSceneRenderer();

    // Again, this is temporary
    var player = new StandardObjects.FirstPersonPlayer(scene)
    
    let floor = new StandardObjects.Plane( scene );
    let light = new StandardObjects.DirectionalLight( scene );
    

    animate();

    function animate() {

        requestAnimationFrame( animate );
        player.render( renderer )

    }
}

export { GameScene }

