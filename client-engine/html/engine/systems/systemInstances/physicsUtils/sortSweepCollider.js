
/* Sort sweep colider */

import * as UTIL from '../../../utils/utils.js'

export class SortSweepCollider {

    dimensions  ;  //Number
    keyPointsByAxis ; // Object < number, ObjectKeyPoint [] > ; 
    objects ; // Object < number, ObjectInformation > 

    lastId = 0;

    constructor ( dimensions ) {

        this.dimensions = dimensions;
        this.keyPointsByAxis = {}
        this.objects = {}

        for ( ; dimensions > 0; dimensions -- )
            this.keyPointsByAxis [ dimensions - 1 ] = []


    }

    /* private utils */

    // Used to assign each block its own unique id
    
    get nextId () {
        return ++ this.lastId ;
    }

    // Returns a blank object representing data on a object
    // Indexes : the locations of the points in each axis
    // Overlaps : what the object is currently hitting
    newBlankBlockObject () {
        return { 
            indexes : UTIL.newArray( this.dimensions, [0,0] ),
            overlaps : {}
        }
    }

    // Returns a new key point for an object
    // An object should have dimentions * 2 key points
    // Stored in axises and pointed to by Indexes above
    newObjectKeyPoint ( id , value , open ) {
        return {
            value : value,  // Numeric position
            id : id,        // Id from nextId
            open : open     // Bookean representing first or seccond instance on axis
        }
    }

    // Adjusts where a point is on an axis by a certain delta
    // Shorthand for complex oppertation
    setKeyPointIndex ( axis , { id, open }, delta  ) {
        this.objects[id].indexes[ axis ][ open ? 0 : 1 ] += delta ;
    }
    shiftKeyPoints ( index , axis , delta  ) {

        let targetAxis = this.keyPointsByAxis[ axis ]

        for ( ; index < targetAxis.length; index ++ ){
        
            let item = targetAxis[index];
            this.setKeyPointIndex( axis, { id : item.id , open : item.open }, delta )

        }
    }

    // Shorhand for complex opperation
    // Makes code more readable
    getObjectAxisIndexes ( axis, id  ) {
        return this.objects[id].indexes[ axis ]
    }

    // Register that an object is now hitting another one on 
    // atleast one more axis than before 
    addCollision ( id1, id2 ) {

        this.addOneWayCollision ( id1, id2 )
        this.addOneWayCollision ( id2, id1 )
    }
    addOneWayCollision ( id1, id2 ) {

        let obj = this.objects[id1]

        if ( obj.overlaps[id2] )
            obj.overlaps[id2] = obj.overlaps[id2] + 1
        else
            obj.overlaps[id2] = 1
    }
    removeCollision ( id1, id2 ) {

        this.removeOneWayCollision ( id1, id2 )
        this.removeOneWayCollision ( id2, id1 )
    }
    removeOneWayCollision ( id1, id2 ) {
        
        let obj = this.objects[id1]
        let value = obj.overlaps[id2]

        if ( value == 1 )
            delete obj.overlaps[id2]
        else
            obj.overlaps[id2] = value - 1

    }

    // Determines if two objects are at a point where one more intersections
    // Would lead to them actually hittin eachother on all axies
    isCriticalId ( id1, id2 ){
        return this.objects[id1].overlaps[id2] >= this.dimensions - 1;
    }

    /* Insert new blocks */

    // Returnes an ID representing that block
    insertBlock ( ... values  ) {

        let id = this.nextId
        let newBlockObject =  this.newBlankBlockObject()
        
        this.objects[id] = newBlockObject

        for ( let axis = 0 ; axis < this.dimensions; axis ++ ) {
            this.insertValueOnAxis ( axis, this.newObjectKeyPoint( id, values[ axis ], true ) )
            this.insertValueOnAxis ( axis, this.newObjectKeyPoint( id, values[ axis + this.dimensions ], false ) )
            this.registerNewIdOnAxis ( axis, id )
        }

        return id 

    }
    // Register a new point on an axis
    insertValueOnAxis ( axis , point  ) {

        let targetAxis = this.keyPointsByAxis[axis]
        let insertionIndex = UTIL.binarySearch( targetAxis, point.value, e => e.value )

        this.setKeyPointIndex( axis, point, insertionIndex )
        this.shiftKeyPoints ( insertionIndex, axis, 1 );

        targetAxis.splice( insertionIndex, 0, point )
    }
    // Once points are inserted, they need to check for initial
    // collisions with all other objects ( one time, costly opperation )
    registerNewIdOnAxis ( axis , id  ) {

        let targetAxis = this.keyPointsByAxis[axis]
        let inSpan = false;

        let openSpans = new Set () 

        for ( let i = 0 ; i < targetAxis.length; i ++ ){

            let item = targetAxis[ i ]

            if ( item.open ) { 

                if ( item.id == id ) {
                    openSpans.forEach( e => this.addCollision ( e, id ) )
                    inSpan = true;
                }
                else if ( inSpan ) {
                    this.addCollision( id, item.id )
                }

                openSpans.add( item.id )

            }

            else {
                
                if ( item.id == id )
                    break;

                openSpans.delete( item.id )

            }

        }
    }

    /* Test collision */

    // Determins if a single, axis confined, movement 
    // would result in the object hitting another object
    // Returns two values:
    //      [ id of object hit / undefined, distance that it is safe to move ]
    checkFreeMovement ( id , axis , delta  ) {

        if ( delta == 0 ) return [ undefined, 0 ]

        let [ low, high ] = this.getObjectAxisIndexes ( axis, id )
        let targetAxis = this.keyPointsByAxis[axis]

        if ( delta > 0 ) {
            let targetValue = targetAxis[ high ].value + delta;
            return this.checkFreeMovementSweepOnAxis ( axis, high, targetValue, delta, 1, id ) 
        }
        else {
            let targetValue = targetAxis[ low ].value + delta;
            return this.checkFreeMovementSweepOnAxis ( axis, low, targetValue, delta, -1, id ) 
        }


    }
    // Actually do the check
    checkFreeMovementSweepOnAxis ( axis , index , target , delta , increment , id  ) {

        let targetAxis = this.keyPointsByAxis[axis]

        let end = increment > 0 ? targetAxis.length : -1 ;
        let start = index + increment;

        return UTIL.forLoop ( start, increment, end, [ undefined, delta ] ,
            _index => {

                let item = targetAxis[ _index ]

                if ( increment > 0 ) {

                    if (item.value > target ) 
                        return [ undefined, delta ] 
                    if ( item.open && this.isCriticalId( item.id, id ) ){

                        let freeSpace = ( delta - ( target - item.value) ) + ( delta > 0 ? -0.001 : +0.001)
                        return [ item.id, freeSpace ]
                    }
                }

                else {
                    if (  item.value < target )
                        return [ undefined, delta ] 
                    if ( !item.open && this.isCriticalId( item.id, id ) ){

                        let freeSpace = ( delta - ( target - item.value) ) + ( delta > 0 ? -0.001 : +0.001)
                        return [ item.id, freeSpace ]
                    }
                }

            }    
        )

    }

    /* Do movement */

    // Do movement on an axis
    // This can overide any hits and collitions
    // IE: This is not safe unless checked before with checkFreeMovement
    doMovement ( id , axis , delta  ) {
        
        if ( delta == 0 ) return []

        let [ low, high ] = this.getObjectAxisIndexes ( axis, id )
        let targetAxis = this.keyPointsByAxis[axis]

        let targetLow = targetAxis[ low ].value + delta;
        let targetHigh = targetAxis[ high ].value + delta;

        if ( delta > 0 ) {
            this.movementOnAxis ( axis, low, targetLow, 1, id )
            this.movementOnAxis ( axis, high, targetHigh, 1, id ) 
        }
        else {
            this.movementOnAxis ( axis, low, targetLow, -1, id )
            this.movementOnAxis ( axis, high, targetHigh, -1, id ) 
        }

    }
    // Actually do the movement
    movementOnAxis ( axis , index , target , increment , id  ) {

        let targetAxis = this.keyPointsByAxis[axis]

        let movingItem = targetAxis [ index ]

        let end = increment > 0 ? targetAxis.length : -1 ;
        let start = index + increment;

        let final = UTIL.forLoop ( start, increment, end, undefined ,
            _index => {

                let item = targetAxis[ _index ]

                if ( increment > 0 ) {
                    
                    if ( item.value > target ) return _index - increment 

                    if ( movingItem.open && ! item.open ) {
                        this.removeCollision( movingItem.id, item.id)
                    }
                    else if ( ! movingItem.open && item.open ){
                        this.addCollision ( movingItem.id, item.id )

                    }
                }

                else {

                    if ( item.value < target ) return _index - increment 

                    if ( movingItem.open && ! item.open ) {
                        this.addCollision( movingItem.id, item.id)
                    }
                    else if ( ! movingItem.open && item.open ){
                        this.removeCollision ( movingItem.id, item.id )
                    }
                }

                UTIL.swapValues( targetAxis, _index, _index - increment ) 
                this.setKeyPointIndex( axis, item, - increment )

            }
        )

        final = final == undefined ? end - increment : final

        targetAxis[ final ].value = target;
        this.objects[id].indexes[ axis ][ movingItem.open ? 0 : 1 ] = final

    }

    /* Combined */

    // Does the check on movement
    // Then: does what movement would be valid
    // Returns: the distance actually moved
    checkAndDoMovement ( id , axis , amount  ) {

        let [hit, limit] = this.checkFreeMovement( id, axis, amount );
        this.doMovement( id, axis, limit )

        return limit 

    }

    /* Debuging 

    debugLog ( ) {
        console.log( 'item 1 hits', this.objects.get(1) )
        console.log( 'axises x', this.keyPointsByAxis.get( 0 ) )
        console.log( 'axises z', this.keyPointsByAxis.get( 2 ) )
    }*/

}
