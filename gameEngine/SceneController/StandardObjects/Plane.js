/* Creates a plane to be added to the scene */

import * as THREE from '../../three.min.js';
import { SceneComponent } from '../SceneComponent.js'

class Plane extends SceneComponent {
    
    constructor( scene ){

        // Static values
        if ( firstLoad(Plane) ){
            
            Plane.geometry = new THREE.PlaneGeometry( 100, 100 );
            Plane.material = new THREE.MeshBasicMaterial( 
                {   
                    color: {r: 1, b: 1, g: 1}, 
                    side: THREE.DoubleSide
                } 
            );
          
        }

        // Set up the plane
        let obj = new THREE.Mesh( Plane.geometry, Plane.material );
        obj.rotation.x =  Math.PI / 2;

        super( obj, scene )

    }

}

export { Plane }