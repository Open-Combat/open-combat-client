let renderer = new THREE.WebGLRenderer();
let scene  = new THREE.Scene();

export function resetViewSize () { renderer.setSize( window.innerWidth, window.innerHeight ); }
export function registerThreeObject ( item ) { scene.add( item ) }

function create_light ( x, y, z ) {
        
    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( x, y, z );
    scene.add( light );

}

// Initialization

resetViewSize()
create_light( 1, 1, 1 );
create_light( -1, - 0.5, -1 );

window.addEventListener( 'resize', resetViewSize );
document.body.appendChild( renderer.domElement );

// For system update calls

export const target = 'camera'
export function process ( entity ) { 

    renderer.render( scene, entity.camera )

}
