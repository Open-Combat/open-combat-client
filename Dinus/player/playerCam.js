/* First person player */
/* Needs to be changed at some point */

import {
	Euler,
	EventDispatcher,
	Vector3
} from "../util/three.min.js";
import * as THREE from '../util/three.min.js';

var FirstPersonPlayer = function ( scene ){

    var scene = scene;
    var camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 10;
    this.camera = camera;
    var elm = document.body;
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;

    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var direction = new THREE.Vector3();
    var vertex = new THREE.Vector3();
    var color = new THREE.Color();
    
	var euler = new Euler( 0, 0, 0, 'YXZ' );
	var PI_2 = Math.PI / 2;
    var vec = new Vector3();
    
    
    var onKeyDown = function ( event ) {
        document.body.requestPointerLock();

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    var onKeyUp = function ( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
    document.addEventListener( 'mousemove', onMouseMove, false );

	function onMouseMove( event ) {

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		euler.setFromQuaternion( camera.quaternion );

		euler.y -= movementX * 0.001;
		euler.x -= movementY * 0.001;

		euler.x = Math.max( - PI_2, Math.min( PI_2, euler.x ) );

		camera.quaternion.setFromEuler( euler );

		//this.dispatchEvent( changeEvent );

    }
    
    
	this.getDirection = function () {

		var direction = new Vector3( 0, 0, - 1 );

		return function ( v ) {

			return v.copy( direction ).applyQuaternion( camera.quaternion );

		};

    }();
    
    
	this.moveForward = function ( distance ) {

		// move forward parallel to the xz-plane
		// assumes camera.up is y-up

		vec.setFromMatrixColumn( camera.matrix, 0 );

		vec.crossVectors( camera.up, vec );

		camera.position.addScaledVector( vec, distance );

	};

	this.moveRight = function ( distance ) {

		vec.setFromMatrixColumn( camera.matrix, 0 );

		camera.position.addScaledVector( vec, distance );

	};


    this.render = function( renderer, s ) {

        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        this.moveRight( - velocity.x * delta );
        this.moveForward( - velocity.z * delta );

        camera.position.y += ( velocity.y * delta ); // new behavior

        if ( camera.position.y < 10 ) {

            velocity.y = 0;
            camera.position.y = 10;

            canJump = true;

        }

        prevTime = time;
    
        
        renderer.render( s, camera );
    }


}

FirstPersonPlayer.prototype = Object.create( EventDispatcher.prototype );

export { FirstPersonPlayer }