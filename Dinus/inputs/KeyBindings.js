/* ============================================================ */
/* ======================= Key Bindings ======================= */
/* ============================================================ */

function ApplyBasicBindings ( InputManager ) {

    /* ================== Movement Controlls ================== */
    
    InputManager.addTracking('w', 'forward')
    InputManager.addTracking('s', 'backward')
    InputManager.addTracking('a', 'left')
    InputManager.addTracking('d', 'right')

    InputManager.addTracking('ArrowUp', 'forward')
    InputManager.addTracking('ArrowDown', 'backward')
    InputManager.addTracking('ArrowLeft', 'left')
    InputManager.addTracking('ArrowRight', 'right')

}

export { ApplyBasicBindings }