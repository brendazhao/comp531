/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Nothing to change in this file
	
	
	var _particle = __webpack_require__(/*! ./particle */ 1);
	
	var _particle2 = _interopRequireDefault(_particle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getLogger = function getLogger(c, height) {
	    var log = function log(msg) {
	        if (!msg) {
	            log.x = 30;
	            log.y = height;
	        }
	        var pt = 16;
	        c.font = pt + 'px Courier';
	        c.fillStyle = "white";
	        c.fillText(msg, log.x, log.y);
	        log.y = log.y - (4 + pt);
	    };
	    return log;
	};
	
	var frameUpdate = function frameUpdate(cb) {
	    var rAF = function rAF(time) {
	        requestAnimationFrame(rAF);
	        var diff = ~~(time - (rAF.lastTime || 0)); // ~~ is like floor
	        cb(diff);
	        rAF.lastTime = time;
	    };
	    rAF(); // go!
	};
	
	window.onload = function () {
	    var canvas = document.getElementById('app');
	    var c = canvas.getContext("2d");
	    var particles = Array(5).fill(true).map(function () {
	        return (0, _particle2.default)();
	    });
	    var log = getLogger(c, canvas.height);
	    frameUpdate(function (dt) {
	        particles = particles.map(function (p) {
	            return (0, _particle.update)(p, dt, canvas);
	        });
	
	        log();
	        c.fillStyle = '#000';
	        c.fillRect(0, 0, canvas.width, canvas.height);
	
	        particles.forEach(function (_ref) {
	            var position = _ref.position,
	                mass = _ref.mass;
	
	            var _position = _slicedToArray(position, 2),
	                x = _position[0],
	                y = _position[1];
	
	            c.fillStyle = 'red';
	            c.beginPath();
	            c.arc(x, y, mass, 0, 2 * Math.PI);
	            c.fill();
	            log('(' + mass.toFixed(2) + ') @ (' + x.toFixed(6) + ', ' + y.toFixed(6) + ')');
	        });
	    });
	};

/***/ },
/* 1 */
/*!*************************!*\
  !*** ./src/particle.js ***!
  \*************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	var random = function random() {
					var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
					var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
					return Math.random() * (max - min) + min;
	};
	
	// default values
	var particle = function particle() {
					var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
					    _ref$mass = _ref.mass,
					    mass = _ref$mass === undefined ? random(5, 30) : _ref$mass,
					    _ref$position = _ref.position,
					    position = _ref$position === undefined ? [random(), random()] : _ref$position,
					    _ref$velocity = _ref.velocity,
					    velocity = _ref$velocity === undefined ? [random(-0.1, 0.1), random(-0.1, 0.1)] : _ref$velocity,
					    _ref$acceleration = _ref.acceleration,
					    acceleration = _ref$acceleration === undefined ? [0, 0] : _ref$acceleration;
	
					return { acceleration: acceleration, velocity: velocity, position: position, mass: mass };
	};
	
	var update = function update(_ref2, delta, canvas) {
					var acceleration = _ref2.acceleration,
					    velocity = _ref2.velocity,
					    position = _ref2.position,
					    mass = _ref2.mass;
	
					position[0] = velocity[0] * delta + position[0];
					position[1] = velocity[1] * delta + position[1];
					velocity[0] = acceleration[0] * delta + velocity[0];
					velocity[1] = acceleration[1] * delta + velocity[1];
	
					if (position[0] > 800 || position[0] < 0) {
									position[0] = 400;
					}
					if (position[1] > 800 || position[1] < 0) {
									position[1] = 400;
					}
					return { mass: mass, acceleration: acceleration, velocity: velocity, position: position };
	};
	
	exports.default = particle;
	exports.update = update;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map