/* ============================================================ */
/* ====================== Input Manager ======================= */
/* ============================================================ */

import { ApplyBasicBindings } from './KeyBindings.js'



class InputManager {

    // Sets up empty tracking
    constructor () {

        // Sets up maps for inputs and events
        this.outputEventBindings = {}   // actionName -> KeyInputTracker[]
        this.inputTrackerBindings = {}  // key_code -> KeyInputTracker
        
        // Bind Events Handlers
        let down = this.onKeyDown.bind(this)
        let up = this.onKeyUp.bind(this)
        document.addEventListener( 'keydown', down, false );
        document.addEventListener( 'keyup', up, false );

        // Setup Basic Events
        ApplyBasicBindings( this )
    }

    /* =================== Tracker Creation =================== */

    addTracking ( key, name ) {

        // New tracker for the key
        let new_tracker = new KeyInputTracker( key );

        // Add new action if it is not defined
        if ( ! ( name in this.outputEventBindings )) 
            this.outputEventBindings[name] = []
        this.outputEventBindings[name].push( new_tracker )

        // Adds a new map for the key
        this.inputTrackerBindings[key] = new_tracker

    }

    /* ====================== Listeners ======================= */

    onKeyDown (event) {

        // Look for keycodes that you are tracking
        if ( ! (event.key in this.inputTrackerBindings) ) return;

        // If you are up, now you down
        if (this.inputTrackerBindings[event.key].isUp())
            this.inputTrackerBindings[event.key].down()

    }

    onKeyUp (event) {

        // Look for keycodes that you are tracking
        if ( ! (event.key in this.inputTrackerBindings) ) return;

        // If you down, now you up
        this.inputTrackerBindings[event.key].up()

    }


    /* ====================== New Frame ======================= */

    // Called when listening period for a frame ends
    newFrame () {
        for (let code in this.inputTrackerBindings)
            this.inputTrackerBindings[ code ].newFrame()
    }


    /* =================== Get Event States =================== */

    // Any input target is down
    isDown( event_name ){
        return this.outputEventBindings[event_name].reduce( 
            (acc, elm) => acc || elm.isDown(), false
        )
    }

    // All input targets are up
    isUp( event_name ){
        return this.outputEventBindings[event_name].reduce( 
            (acc, elm) => acc && elm.isUp(), true
        )
    }

    // One input pressed and all else are up
    isPressed ( event_name ){
        return this.outputEventBindings[event_name].reduce( 
            (acc, elm) => acc && (elm.isUp() || elm.pressed), true
        ) && this.outputEventBindings[event_name].reduce( 
            (acc, elm) => acc || elm.pressed, false
        )
    }

    // One input released and all else are up
    isReleased ( event_name ){
        return this.outputEventBindings[event_name].reduce( 
            (acc, elm) => acc && elm.isUp(), true
        ) && this.outputEventBindings[event_name].reduce( 
            (acc, elm) => acc || elm.released, false
        )
    }

}


/* ==================== Key Input Tracker ===================== */

// Internal class to track a single key
class KeyInputTracker {

    // Given single character as key
    constructor (key){
        
        // If the key is currently down
        // how long is has been in that state
        this.is_down = false;
        this.state_length = 0;

    }

    /* ===================== Update calls ===================== */

    down () {
        this.is_down = true;
        this.state_length = 1;
    }

    up () {
        this.is_down = false;
        this.state_length = 1;
    }

    newFrame () {
        this.state_length ++;
    }

    /* ==================== State Requests ==================== */

    isDown () { return this.is_down }
    isUp () { return !this.is_down }
    pressed () { return this.is_down && this.state_length == 1 }
    released () { return !this.is_down && this.state_length == 1  }

}

export { InputManager }