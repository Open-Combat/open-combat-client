/* Some utility functions */

// Returns true if the object has not been loaded before
function firstLoad ( obj ) {

    if ( !this.loaded )
        this.loaded = {}
    if ( this.loaded[obj] )
        return false;

    this.loaded[obj] = true;
    return true;

}