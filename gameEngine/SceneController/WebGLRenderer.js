/* Created the scene renderer and puts it into the dom */

import { WebGLRenderer } from '../three.min.js';

function CreateSceneRenderer () {
    
    var renderer = new WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    return renderer
}

export { CreateSceneRenderer }