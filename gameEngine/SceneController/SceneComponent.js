/* Template for an object to be added to the scene */

class SceneComponent {

    constructor( renderObj, scene ){

        this.renderObj = renderObj;
        scene.add( renderObj )
    
    }


}

export { SceneComponent }