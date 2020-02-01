
export const implementedComponents = [ 'deltaMovement', 'canMove', 'velocity' ]

export function constructor ( entity, data ) {

    entity.deltaMovement = new THREE.Vector3()
    entity.velocity = new THREE.Vector3() 

}
