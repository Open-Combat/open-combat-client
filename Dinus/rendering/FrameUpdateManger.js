/* ============================================================ */
/* =================== Frame Update Manager =================== */
/* ============================================================ */

class FrameUpdateManager {

    constructor ( ) { 

        this.time = performance.now();
        this.frameRate = 1000 / 30;

    }

    /* ================= Game Loop Controller ================= */

    startGameLoop ( game_loop ) {
        
        let gameLoop = setInterval( () => {

            // Calculates time delta
            let now = performance.now();
            let time_delta = (now - this.time) / 1000 ;
            this.time = now

            // Updates provided game loop with time delta
            game_loop( time_delta )

        }, this.frameRate )

    }

}

export { FrameUpdateManager }

