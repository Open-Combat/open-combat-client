/* Creates a plane to be added to the scene */

import * as THREE from '../../three.min.js';
import { SceneComponent } from '../SceneComponent.js'

class DirectionalLight extends SceneComponent {
    
    constructor( scene ){

        // Static values
        if ( firstLoad(DirectionalLight) ){
        
        }

        // Set up the Light
        let obj = new THREE.DirectionalLight( 0xFFFFFF, 1 );
        obj.castShadow = true;

        super( obj, scene )
   
    }

}

export { DirectionalLight }