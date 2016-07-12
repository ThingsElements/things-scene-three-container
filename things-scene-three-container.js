(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var extObj;

function init() {
  if (init.done) return;

  init.done = true;

  var objLoader = new THREE.OBJLoader();
  var mtlLoader = new THREE.MTLLoader();

  objLoader.setPath('./obj/Fork_lift/');
  mtlLoader.setPath('./obj/Fork_lift/');

  mtlLoader.load('ForkLift.mtl', function (materials) {
    materials.preload();
    objLoader.setMaterials(materials);
    materials.side = THREE.frontSide;

    objLoader.load('ForkLift.obj', function (obj) {
      extObj = obj;
    });
  });
}

var ForkLift = function (_THREE$Object3D) {
  _inherits(ForkLift, _THREE$Object3D);

  function ForkLift(model, canvasSize) {
    _classCallCheck(this, ForkLift);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ForkLift).call(this));

    _this._model = model;

    _this.createObject(model, canvasSize);

    return _this;
  }

  _createClass(ForkLift, [{
    key: 'createObject',
    value: function createObject(model, canvasSize) {

      if (!ForkLift.extObject) {
        setTimeout(this.createObject.bind(this, model, canvasSize), 50);
        return;
      }

      var cx = model.left + model.width / 2 - canvasSize.width / 2;
      var cy = model.top + model.height / 2 - canvasSize.height / 2;
      var cz = 0.5 * model.depth;

      var left = model.left - canvasSize.width / 2;
      var top = model.top - canvasSize.height / 2;

      var rotation = model.rotation;

      this.type = 'forklift';

      this.add(ForkLift.extObject.clone());
      this.scale.set(10, 10, 10);
      this.position.set(cx, 0, cy);
      this.rotation.y = model.rotation || 0;
    }
  }], [{
    key: 'extObject',
    get: function get() {
      if (!extObj) init();

      return extObj;
    }
  }]);

  return ForkLift;
}(THREE.Object3D);

exports.default = ForkLift;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _threeContainer = require('./three-container');

Object.defineProperty(exports, 'ThreeContainer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_threeContainer).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./three-container":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var extObj;

function init() {
  if (init.done) return;

  init.done = true;

  var tgaLoader = new THREE.TGALoader();

  THREE.Loader.Handlers.add(/\.tga$/i, tgaLoader);

  var objLoader = new THREE.OBJLoader();
  var mtlLoader = new THREE.MTLLoader();

  objLoader.setPath('./obj/Casual_Man_02/');
  mtlLoader.setPath('./obj/Casual_Man_02/');

  mtlLoader.load('Casual_Man.mtl', function (materials) {
    materials.preload();
    objLoader.setMaterials(materials);
    materials.side = THREE.frontSide;

    objLoader.load('Casual_Man.obj', function (obj) {
      extObj = obj;
    });
  });
}

var Person = function (_THREE$Object3D) {
  _inherits(Person, _THREE$Object3D);

  function Person(model, canvasSize) {
    _classCallCheck(this, Person);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Person).call(this));

    _this._model = model;

    _this.createObject(model, canvasSize);

    return _this;
  }

  _createClass(Person, [{
    key: 'createObject',
    value: function createObject(model, canvasSize) {

      if (!Person.extObject) {
        setTimeout(this.createObject.bind(this, model, canvasSize), 50);
        return;
      }

      var cx = model.left + model.width / 2 - canvasSize.width / 2;
      var cy = model.top + model.height / 2 - canvasSize.height / 2;
      var cz = 0.5 * model.depth;

      var left = model.left - canvasSize.width / 2;
      var top = model.top - canvasSize.height / 2;

      var rotation = model.rotation;

      this.type = 'person';
      this.add(Person.extObject.clone());
      this.scale.set(10, 10, 10);
      // this.scale.set(model.width, model.depth, model.height)
      this.position.set(cx, 0, cy);
      this.rotation.y = model.rotation || 0;
    }
  }], [{
    key: 'extObject',
    get: function get() {
      if (!extObj) init();

      return extObj;
    }
  }]);

  return Person;
}(THREE.Object3D);

exports.default = Person;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stock = require('./stock');

var _stock2 = _interopRequireDefault(_stock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rack = function (_THREE$Object3D) {
  _inherits(Rack, _THREE$Object3D);

  function Rack(model, canvasSize) {
    _classCallCheck(this, Rack);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rack).call(this));

    _this._model = model;

    _this.createObject(model, canvasSize);
    return _this;
  }

  _createClass(Rack, [{
    key: 'createObject',
    value: function createObject(model, canvasSize) {

      var scale = 0.7;

      var cx = model.left + model.width / 2 - canvasSize.width / 2;
      var cy = model.top + model.height / 2 - canvasSize.height / 2;
      var cz = 0.5 * model.depth * model.shelves;

      var rotation = model.rotation;

      this.type = model.type;

      var frame = this.createRackFrame(model.width, model.height, model.depth * model.shelves);

      this.add(frame);

      for (var i = 0; i < model.shelves; i++) {

        var bottom = -model.depth * model.shelves * 0.5;
        if (i > 0) {
          var board = this.createRackBoard(model.width, model.height);
          board.position.set(0, bottom + model.depth * i, 0);
          board.rotation.x = Math.PI / 2;
          board.material.opacity = 0.5;
          board.material.transparent = true;

          this.add(board);
        }

        var stock = new _stock2.default({
          width: model.width * scale,
          height: model.height * scale,
          depth: model.depth * scale
        });

        var stockDepth = model.depth * scale;

        stock.position.set(0, bottom + model.depth * i + stockDepth * 0.5, 0);
        stock.name = model.location + "-" + (i + 1);

        this.add(stock);
      }

      this.position.set(cx, cz, cy);
      this.rotation.y = rotation || 0;
    }
  }, {
    key: 'createRackFrame',
    value: function createRackFrame(w, h, d) {

      this.geometry = this.cube({
        width: w,
        height: d,
        depth: h
      });

      return new THREE.LineSegments(this.geometry, new THREE.LineDashedMaterial({ color: 0xcccccc, dashSize: 3, gapSize: 1, linewidth: 1 }));
    }
  }, {
    key: 'createRackBoard',
    value: function createRackBoard(w, h) {

      // var boardTexture = new THREE.TextureLoader().load('textures/textured-white-plastic-close-up.jpg');
      // boardTexture.wrapS = boardTexture.wrapT = THREE.RepeatWrapping;
      // boardTexture.repeat.set( 100, 100 );

      // var boardMaterial = new THREE.MeshBasicMaterial( { map: boardTexture, side: THREE.DoubleSide } );
      var boardMaterial = new THREE.MeshBasicMaterial({ color: '#dedede', side: THREE.DoubleSide });
      var boardGeometry = new THREE.PlaneGeometry(w, h, 1, 1);
      var board = new THREE.Mesh(boardGeometry, boardMaterial);

      return board;
    }
  }, {
    key: 'cube',
    value: function cube(size) {

      var w = size.width * 0.5;
      var h = size.height * 0.5;
      var d = size.depth * 0.5;

      var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(-w, -h, -d), new THREE.Vector3(-w, h, -d), new THREE.Vector3(-w, h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(-w, -h, -d), new THREE.Vector3(-w, -h, d), new THREE.Vector3(-w, h, d), new THREE.Vector3(-w, h, d), new THREE.Vector3(w, h, d), new THREE.Vector3(w, h, d), new THREE.Vector3(w, -h, d), new THREE.Vector3(w, -h, d), new THREE.Vector3(-w, -h, d), new THREE.Vector3(-w, -h, -d), new THREE.Vector3(-w, -h, d), new THREE.Vector3(-w, h, -d), new THREE.Vector3(-w, h, d), new THREE.Vector3(w, h, -d), new THREE.Vector3(w, h, d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(w, -h, d));

      return geometry;
    }
  }, {
    key: 'raycast',
    value: function raycast(raycaster, intersects) {}
  }]);

  return Rack;
}(THREE.Object3D);

exports.default = Rack;

},{"./stock":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stock = function (_THREE$Mesh) {
  _inherits(Stock, _THREE$Mesh);

  function Stock(model) {
    _classCallCheck(this, Stock);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Stock).call(this));

    _this._model = model;

    _this.createObject(model);

    return _this;
  }

  _createClass(Stock, [{
    key: 'createObject',
    value: function createObject(model) {

      this.createStock(model.width, model.height, model.depth);
    }
  }, {
    key: 'createStock',
    value: function createStock(w, h, d) {

      this.geometry = new THREE.BoxGeometry(w, d, h);
      this.material = new THREE.MeshLambertMaterial({ color: '#ccaa76', side: THREE.FrontSide });
      this.type = 'stock';
    }
  }]);

  return Stock;
}(THREE.Mesh);

exports.default = Stock;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _rack = require('./rack');

var _rack2 = _interopRequireDefault(_rack);

var _forkLift = require('./forkLift');

var _forkLift2 = _interopRequireDefault(_forkLift);

var _person = require('./person');

var _person2 = _interopRequireDefault(_person);

var _threeLayout = require('./three-layout');

var _threeLayout2 = _interopRequireDefault(_threeLayout);

var _threeControls = require('./three-controls');

var _threeControls2 = _interopRequireDefault(_threeControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene;
var Component = _scene.Component;
var Container = _scene.Container;
var Layout = _scene.Layout;


function registerLoaders() {
  if (!registerLoaders.done) {
    THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader());
    registerLoaders.done = true;
  }
}

var ThreeContainer = function (_Container) {
  _inherits(ThreeContainer, _Container);

  function ThreeContainer() {
    _classCallCheck(this, ThreeContainer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ThreeContainer).apply(this, arguments));
  }

  _createClass(ThreeContainer, [{
    key: 'createFloor',


    /* THREE Object related .. */

    value: function createFloor(color, width, height) {

      var floorMaterial = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide
      });
      var floorGeometry = new THREE.BoxGeometry(width, height, 1, 10, 10);

      var floor = new THREE.Mesh(floorGeometry, floorMaterial);

      floor.position.y = -1;
      floor.rotation.x = Math.PI / 2;

      this._scene3d.add(floor);
    }
  }, {
    key: 'createObjects',
    value: function createObjects(components, canvasSize) {

      var obj = new THREE.Object3D();

      components.forEach(function (model) {

        var item;
        switch (model.type) {
          case 'rack':
            item = new _rack2.default(model, canvasSize);
            break;

          case 'forklift':
            item = new _forkLift2.default(model, canvasSize);
            break;

          case 'person':
            item = new _person2.default(model, canvasSize);
            break;

          default:
            break;
        }
        obj.add(item);
      });

      this._scene3d.add(obj);
    }
  }, {
    key: 'destroy_scene3d',
    value: function destroy_scene3d() {
      this._renderer = undefined;
      this._camera = undefined;
      this._keyboard = undefined;
      this._controls = undefined;
      this._projector = undefined;
      this._load_manager = undefined;

      this._scene3d = undefined;
    }
  }, {
    key: 'init_scene3d',
    value: function init_scene3d() {
      this._mouse = { x: 0, y: 0 };

      if (!this.tooltip) this.createTooltip();

      if (this._scene3d) this.destroy_scene3d();

      registerLoaders();

      var _model = this.model;
      var width = _model.width;
      var height = _model.height;
      var _model$fov = _model.fov;
      var fov = _model$fov === undefined ? 45 : _model$fov;
      var _model$near = _model.near;
      var near = _model$near === undefined ? 0.1 : _model$near;
      var _model$far = _model.far;
      var far = _model$far === undefined ? 20000 : _model$far;
      var _model$fillStyle = _model.fillStyle;
      var fillStyle = _model$fillStyle === undefined ? '#424b57' : _model$fillStyle;
      var _model$light = _model.light;
      var light = _model$light === undefined ? 0xffffff : _model$light;
      var _model$components = _model.components;
      var components = _model$components === undefined ? [] : _model$components;

      // SCENE

      this._scene3d = new THREE.Scene();

      // CAMERA
      var aspect = width / height;

      this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this._scene3d.add(this._camera);
      this._camera.position.set(800, 800, 800);
      this._camera.lookAt(this._scene3d.position);

      // RENDERER
      this._renderer = new THREE.WebGLRenderer({
        precision: 'mediump',
        alpha: true
      });

      this._renderer.setClearColor(0x000000, 0); // transparent
      this._renderer.setSize(width, height);

      // KEYBOARD
      // this._keyboard = new THREEx.KeyboardState()

      // CONTROLS
      // this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement)
      this._controls = new _threeControls2.default(this._camera, this);

      // LIGHT
      var _light = new THREE.PointLight(light);
      _light.position.set(10, 10, 0);
      this._camera.add(_light);

      this.createFloor(fillStyle, width, height);
      this.createObjects(components, { width: width, height: height });

      // initialize object to perform world/screen calculations
      this._projector = new THREE.Projector();

      this._load_manager = new THREE.LoadingManager();
      this._load_manager.onProgress = function (item, loaded, total) {};
      this.animate();
    }
  }, {
    key: 'animate',
    value: function animate() {

      requestAnimationFrame(this.animate.bind(this));
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {

      var tooltip = this.tooltip || {};

      // find intersections

      // create a Ray with origin at the mouse position
      //   and direction into the scene (camera direction)

      var vector = new THREE.Vector3(this._mouse.x, this._mouse.y, 1);
      if (!this._camera) return;

      vector.unproject(this._camera);
      var ray = new THREE.Raycaster(this._camera.position, vector.sub(this._camera.position).normalize());

      // create an array containing all objects in the scene with which the ray intersects
      var intersects = ray.intersectObjects(this._scene3d.children, true);

      // INTERSECTED = the object in the scene currently closest to the camera
      //    and intersected by the Ray projected from the mouse position

      // if there is one (or more) intersections
      if (intersects.length > 0) {
        // if the closest object intersected is not the currently stored intersection object
        if (intersects[0].object != this.INTERSECTED) {
          // restore previous intersection object (if it exists) to its original color
          // if ( this.INTERSECTED )
          //   this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
          // store reference to closest object as current intersection object
          this.INTERSECTED = intersects[0].object;
          // store color of closest object (for later restoration)
          // this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
          // set a new color for closest object
          // this.INTERSECTED.material.color.setHex( 0xffff00 );

          if (this.INTERSECTED.type === 'stock') {
            if (!this.INTERSECTED.visible) return;

            if (!this.INTERSECTED.userData) this.INTERSECTED.userData = {};

            var loc = this.INTERSECTED.name;
            var status = this.INTERSECTED.userData.status;
            var boxId = this.INTERSECTED.userData.boxId;
            var inDate = this.INTERSECTED.userData.inDate;
            var type = this.INTERSECTED.userData.type;
            var count = this.INTERSECTED.userData.count;

            tooltip.textContent = '';

            for (var key in this.INTERSECTED.userData) {
              if (this.INTERSECTED.userData[key]) tooltip.textContent += key + ": " + this.INTERSECTED.userData[key] + "\n";
            }

            // tooltip.textContent = 'loc : ' + loc

            if (tooltip.textContent.length > 0) {
              var mouseX = (this._mouse.x + 1) / 2 * this.model.width;
              var mouseY = (-this._mouse.y + 1) / 2 * this.model.height;

              tooltip.style.left = this._mouse.originX + 20 + 'px';
              tooltip.style.top = this._mouse.originY - 20 + 'px';
              tooltip.style.display = 'block';
            } else {
              tooltip.style.display = 'none';
            }
          } else {
            tooltip.style.display = 'none';
          }
        }
      } else // there are no intersections
        {
          // restore previous intersection object (if it exists) to its original color
          // if ( this.INTERSECTED )
          //   this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
          // remove previous intersection object reference
          //     by setting current intersection object to "nothing"
          this.INTERSECTED = null;

          tooltip.style.display = 'none';
        }

      this._controls.update();
    }
  }, {
    key: 'createTooltip',
    value: function createTooltip() {
      var tooltip = this.tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.left = '0px';
      tooltip.style.top = '0px';
      tooltip.style['background-color'] = '#fff';
      tooltip.style['max-width'] = '200px';
      tooltip.style.border = '3px solid #ccc';
      tooltip.style.padding = '5px 10px';
      tooltip.style['border-radius'] = '10px';
      tooltip.style.display = 'none';
      tooltip.style['z-index'] = 100;

      document.body.appendChild(tooltip);
    }
  }, {
    key: 'render_threed',
    value: function render_threed() {
      this._renderer && this._renderer.render(this.scene3d, this._camera);
      this.invalidate();
    }

    /* Container Overides .. */

  }, {
    key: '_draw',
    value: function _draw(ctx) {
      var _model2 = this.model;
      var left = _model2.left;
      var top = _model2.top;
      var width = _model2.width;
      var height = _model2.height;
      var threed = _model2.threed;
      var _model2$fov = _model2.fov;
      var fov = _model2$fov === undefined ? 45 : _model2$fov;
      var _model2$near = _model2.near;
      var near = _model2$near === undefined ? 0.1 : _model2$near;
      var _model2$far = _model2.far;
      var far = _model2$far === undefined ? 20000 : _model2$far;
      var _model2$zoom = _model2.zoom;
      var zoom = _model2$zoom === undefined ? 100 : _model2$zoom;
      var _model2$light = _model2.light;
      var light = _model2$light === undefined ? 0xffffff : _model2$light;


      if (threed) {

        if (!this._scene3d) {
          this.init_scene3d();
          this.render_threed();
        }

        ctx.drawImage(this._renderer.domElement, 0, 0, width, height, left, top, width, height);
      } else {
        _get(Object.getPrototypeOf(ThreeContainer.prototype), '_draw', this).call(this, ctx);
      }
    }
  }, {
    key: 'onchange',
    value: function onchange(after, before) {
      if (after.hasOwnProperty('width') || after.hasOwnProperty('height') || after.hasOwnProperty('threed') || after.hasOwnProperty('autoRotate')) this.destroy_scene3d();

      if (after.hasOwnProperty('fov') || after.hasOwnProperty('near') || after.hasOwnProperty('far') || after.hasOwnProperty('zoom')) {

        this._camera.fov = after.fov || this.model.fov;
        this._camera.near = after.near || this.model.near;
        this._camera.far = after.far || this.model.far;
        this._camera.zoom = (after.zoom || this.model.zoom) * 0.01;
        this._camera.updateProjectionMatrix();
        this.render_threed();
        return;
      }

      // if(after.hasOwnProperty('autoRotate')) {
      //   this.model.autoRotate = after.autoRotate
      // }

      this.invalidate();
    }
  }, {
    key: 'onmousedown',
    value: function onmousedown(e) {
      if (this._controls) {
        this._controls.onMouseDown(e);
      }
    }
  }, {
    key: 'onmousemove',
    value: function onmousemove(e) {
<<<<<<< Updated upstream

      var pointer = this.transcoordC2S(e.offsetX, e.offsetY);

      this._mouse.originX = e.offsetX;
      this._mouse.originY = e.offsetY;

      this._mouse.x = (pointer.x - this.model.left) / this.model.width * 2 - 1;
      this._mouse.y = -((pointer.y - this.model.top) / this.model.height) * 2 + 1;

      if (this._controls) this._controls.onMouseMove(e);
=======
      if (this._controls) {
        this._controls.onMouseMove(e);
        e.stopPropagation();
      }
>>>>>>> Stashed changes
    }
  }, {
    key: 'onwheel',
    value: function onwheel(e) {
      if (this._controls) {
        this._controls.onMouseWheel(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'ondragstart',
    value: function ondragstart(e) {
      if (this._controls) {
        this._controls.onDragStart(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'ondragmove',
    value: function ondragmove(e) {
      if (this._controls) {
        this._controls.onDragMove(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'ondragend',
    value: function ondragend(e) {
      if (this._controls) {
        this._controls.onDragEnd(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'ontouchstart',
    value: function ontouchstart(e) {
      if (this._controls) {
        this._controls.onTouchStart(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'ontouchmove',
    value: function ontouchmove(e) {
      if (this._controls) {
        this._controls.onTouchMove(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'ontouchend',
    value: function ontouchend(e) {
      if (this._controls) {
        this._controls.onTouchEnd(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'onkeydown',
    value: function onkeydown(e) {
      if (this._controls) {
        this._controls.onKeyDown(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'scene3d',
    get: function get() {
      if (!this._scene3d) this.init_scene3d();
      return this._scene3d;
    }
  }, {
    key: 'layout',
    get: function get() {
      return Layout.get('three');
    }
  }]);

  return ThreeContainer;
}(Container);

exports.default = ThreeContainer;


Component.register('three-container', ThreeContainer);

},{"./forkLift":1,"./person":3,"./rack":4,"./three-controls":7,"./three-layout":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

var ThreeControls = function ThreeControls(object, component) {

  this.object = object;

  this.component = component;

  // Set to false to disable this control
  this.enabled = true;

  // "target" sets the location of focus, where the object orbits around
  this.target = new THREE.Vector3();

  // How far you can dolly in and out ( PerspectiveCamera only )
  this.minDistance = 0;
  this.maxDistance = Infinity;

  // How far you can zoom in and out ( OrthographicCamera only )
  this.minZoom = 0;
  this.maxZoom = Infinity;

  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  this.minPolarAngle = 0; // radians
  this.maxPolarAngle = Math.PI; // radians

  // How far you can orbit horizontally, upper and lower limits.
  // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
  this.minAzimuthAngle = -Infinity; // radians
  this.maxAzimuthAngle = Infinity; // radians

  // Set to true to enable damping (inertia)
  // If damping is enabled, you must call controls.update() in your animation loop
  this.enableDamping = false;
  this.dampingFactor = 0.25;

  // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  // Set to false to disable zooming
  this.enableZoom = true;
  this.zoomSpeed = 1.0;

  // Set to false to disable rotating
  this.enableRotate = true;
  this.rotateSpeed = 1.0;

  // Set to false to disable panning
  this.enablePan = true;
  this.keyPanSpeed = 7.0; // pixels moved per arrow key push

  // Set to true to automatically rotate around the target
  // If auto-rotate is enabled, you must call controls.update() in your animation loop
  this.autoRotate = this.component.model.autoRotate || false;
  this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

  // Set to false to disable use of the keys
  this.enableKeys = true;

  // The four arrow keys
  this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

  // Mouse buttons
  this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

  // for reset
  this.target0 = this.target.clone();
  this.position0 = this.object.position.clone();
  this.zoom0 = this.object.zoom;

  //
  // public methods
  //

  this.getPolarAngle = function () {

    return phi;
  };

  this.getAzimuthalAngle = function () {

    return theta;
  };

  this.reset = function () {

    scope.target.copy(scope.target0);
    scope.object.position.copy(scope.position0);
    scope.object.zoom = scope.zoom0;

    scope.object.updateProjectionMatrix();
    // scope.dispatchEvent( changeEvent );

    scope.update();

    state = STATE.NONE;
  };

  // this method is exposed, but perhaps it would be better if we can make it private...
  this.update = function () {

    var offset = new THREE.Vector3();

    // so camera.up is the orbit axis
    var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
    var quatInverse = quat.clone().inverse();

    var lastPosition = new THREE.Vector3();
    var lastQuaternion = new THREE.Quaternion();

    return function () {

      var position = scope.object.position;

      offset.copy(position).sub(scope.target);

      // rotate offset to "y-axis-is-up" space
      offset.applyQuaternion(quat);

      // angle from z-axis around y-axis

      theta = Math.atan2(offset.x, offset.z);

      // angle from y-axis

      phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

      if (scope.autoRotate && state === STATE.NONE) {

        rotateLeft(getAutoRotationAngle());
      }

      theta += thetaDelta;
      phi += phiDelta;

      // restrict theta to be between desired limits
      theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, theta));

      // restrict phi to be between desired limits
      phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, phi));

      // restrict phi to be betwee EPS and PI-EPS
      phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

      var radius = offset.length() * scale;

      // restrict radius to be between desired limits
      radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, radius));

      // move target to panned location
      scope.target.add(panOffset);

      offset.x = radius * Math.sin(phi) * Math.sin(theta);
      offset.y = radius * Math.cos(phi);
      offset.z = radius * Math.sin(phi) * Math.cos(theta);

      // rotate offset back to "camera-up-vector-is-up" space
      offset.applyQuaternion(quatInverse);

      position.copy(scope.target).add(offset);

      scope.object.lookAt(scope.target);

      if (scope.enableDamping === true) {

        thetaDelta *= 1 - scope.dampingFactor;
        phiDelta *= 1 - scope.dampingFactor;
      } else {

        thetaDelta = 0;
        phiDelta = 0;
      }

      scale = 1;
      panOffset.set(0, 0, 0);

      // update condition is:
      // min(camera displacement, camera rotation in radians)^2 > EPS
      // using small-angle approximation cos(x/2) = 1 - x^2 / 8

      if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {

        lastPosition.copy(scope.object.position);
        lastQuaternion.copy(scope.object.quaternion);
        zoomChanged = false;

        scope.component.render_threed();
        return true;
      }

      return false;
    };
  }();

  this.dispose = function () {};

  //
  // event handlers - FSM: listen for events and reset state
  //

  this.onMouseDown = function (event) {};

  this.onMouseMove = function (event) {};

  this.onMouseUp = function (event) {};

  this.onDragStart = function (event) {
    if (this.enabled === false || this.enableRotate === false) return;

    if (event.altKey === true) state = STATE.PAN;else state = STATE.ROTATE;

    switch (state) {
      case STATE.ROTATE:
        if (this.enableRotate) handleDragStartRotate(event);
        break;

      case STATE.DOLLY:
        if (this.enableZoom) handleDragStartDolly(event);
        break;

      case STATE.PAN:
        if (this.enablePan) handleDragStartPan(event);
        break;
    }
  };

  this.onDragMove = function (event) {
    if (!this.enabled) return;

    if (event.altKey === true) state = STATE.PAN;else state = STATE.ROTATE;

    switch (state) {
      case STATE.ROTATE:
        if (this.enableRotate) handleDragMoveRotate(event);
        break;

      case STATE.DOLLY:
        if (this.enableZoom) handleDragMoveDolly(event);
        break;

      case STATE.PAN:
        if (this.enablePan) handleDragMovePan(event);
        break;
    }
  };

  this.onDragEnd = function (event) {
    if (this.enabled === false || this.enableRotate === false) return;

    state = STATE.NONE;
  };

  this.onMouseWheel = function (event) {

    if (event.type === 'wheel') state = STATE.DOLLY;

    if (this.enabled === false || this.enableZoom === false || state !== STATE.DOLLY) return;

    handleMouseWheel(event);
    state = STATE.NONE;
  };

  this.onKeyDown = function (event) {

    if (this.enabled === false || this.enableKeys === false || this.enablePan === false) return;

    handleKeyDown(event);
  };

  this.onTouchStart = function (event) {

    //   if ( this.enabled === false ) return;

    //   switch ( event.touches.length ) {
    //     case 1: // one-fingered touch: rotate
    //       if ( this.enableRotate === false ) return;
    //       handleTouchStartRotate( event );
    //       state = STATE.TOUCH_ROTATE;
    //       break;

    //     case 2: // two-fingered touch: dolly
    //       if ( this.enableZoom === false ) return;
    //       handleTouchStartDolly( event );
    //       state = STATE.TOUCH_DOLLY;
    //       break;

    //     case 3: // three-fingered touch: pan
    //       if ( this.enablePan === false ) return;
    //       handleTouchStartPan( event );
    //       state = STATE.TOUCH_PAN;
    //       break;

    //     default:
    //       state = STATE.NONE;
    //   }
  };

  this.onTouchMove = function (event) {

    //   if ( this.enabled === false ) return;

    //   switch ( event.touches.length ) {
    //     case 1: // one-fingered touch: rotate
    //       if ( this.enableRotate === false ) return;
    //       if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...
    //       handleTouchMoveRotate( event );
    //       break;
    //     case 2: // two-fingered touch: dolly
    //       if ( this.enableZoom === false ) return;
    //       if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...
    //       handleTouchMoveDolly( event );
    //       break;
    //     case 3: // three-fingered touch: pan
    //       if ( this.enablePan === false ) return;
    //       if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...
    //       handleTouchMovePan( event );
    //       break;
    //     default:
    //       state = STATE.NONE;
    //   }
  };

  this.onTouchEnd = function (event) {}
  //   if ( this.enabled === false ) return;
  //   handleTouchEnd( event );
  //   // this.dispatchEvent( endEvent );
  //   state = STATE.NONE;


  //
  // internals
  //

  ;var scope = this;

  var changeEvent = { type: 'change' };
  var startEvent = { type: 'start' };
  var endEvent = { type: 'end' };

  var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

  var state = STATE.NONE;

  var EPS = 0.000001;

  // current position in spherical coordinates
  var theta;
  var phi;

  var phiDelta = 0;
  var thetaDelta = 0;
  var scale = 1;
  var panOffset = new THREE.Vector3();
  var zoomChanged = false;

  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();

  var panStart = new THREE.Vector2();
  var panEnd = new THREE.Vector2();
  var panDelta = new THREE.Vector2();

  var dollyStart = new THREE.Vector2();
  var dollyEnd = new THREE.Vector2();
  var dollyDelta = new THREE.Vector2();

  function getAutoRotationAngle() {

    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
  }

  function getZoomScale() {

    return Math.pow(0.95, scope.zoomSpeed);
  }

  function rotateLeft(angle) {

    thetaDelta -= angle;
  }

  function rotateUp(angle) {

    phiDelta -= angle;
  }

  var panLeft = function () {

    var v = new THREE.Vector3();

    return function panLeft(distance, objectMatrix) {

      var te = objectMatrix.elements;

      // get X column of objectMatrix
      v.set(te[0], te[1], te[2]);

      v.multiplyScalar(-distance);

      panOffset.add(v);
    };
  }();

  var panUp = function () {

    var v = new THREE.Vector3();

    return function panUp(distance, objectMatrix) {

      var te = objectMatrix.elements;

      // get Y column of objectMatrix
      v.set(te[4], te[5], te[6]);

      v.multiplyScalar(distance);

      panOffset.add(v);
    };
  }();

  // deltaX and deltaY are in pixels; right and down are positive
  var pan = function () {

    var offset = new THREE.Vector3();

    return function (deltaX, deltaY) {

      var element = scope.component === document ? scope.component.body : scope.component;

      if (scope.object instanceof THREE.PerspectiveCamera) {

        // perspective
        var position = scope.object.position;
        offset.copy(position).sub(scope.target);
        var targetDistance = offset.length();

        // half of the fov is center to top of screen
        targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);

        // we actually don't use screenWidth, since perspective camera is fixed to screen height
        panLeft(2 * deltaX * targetDistance / element.model.height, scope.object.matrix);
        // panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
        panUp(2 * deltaY * targetDistance / element.model.height, scope.object.matrix);
        // panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );
      } else if (scope.object instanceof THREE.OrthographicCamera) {

        // orthographic
        panLeft(deltaX * (scope.object.right - scope.object.left) / element.model.width, scope.object.matrix);
        // panLeft( deltaX * ( scope.object.right - scope.object.left ) / element.clientWidth, scope.object.matrix );
        panUp(deltaY * (scope.object.top - scope.object.bottom) / element.model.height, scope.object.matrix);
        // panUp( deltaY * ( scope.object.top - scope.object.bottom ) / element.clientHeight, scope.object.matrix );
      } else {

        // camera neither orthographic nor perspective
        console.warn('WARNING: ThreeControls.js encountered an unknown camera type - pan disabled.');
        scope.enablePan = false;
      }
    };
  }();

  function dollyIn(dollyScale) {

    if (scope.object instanceof THREE.PerspectiveCamera) {

      scale /= dollyScale;
    } else if (scope.object instanceof THREE.OrthographicCamera) {

      scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
      scope.object.updateProjectionMatrix();
      zoomChanged = true;
    } else {

      console.warn('WARNING: ThreeControls.js encountered an unknown camera type - dolly/zoom disabled.');
      scope.enableZoom = false;
    }
  }

  function dollyOut(dollyScale) {

    if (scope.object instanceof THREE.PerspectiveCamera) {

      scale *= dollyScale;
    } else if (scope.object instanceof THREE.OrthographicCamera) {

      scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
      scope.object.updateProjectionMatrix();
      zoomChanged = true;
    } else {

      console.warn('WARNING: ThreeControls.js encountered an unknown camera type - dolly/zoom disabled.');
      scope.enableZoom = false;
    }
  }

  //
  // event callbacks - update the object state
  //

  function handleDragStartRotate(event) {

    rotateStart.set(event.offsetX, event.offsetY);
  }

  function handleDragStartDolly(event) {

    dollyStart.set(event.offsetX, event.offsetY);
  }

  function handleDragStartPan(event) {

    panStart.set(event.offsetX, event.offsetY);
  }

  function handleDragMoveRotate(event) {

    rotateEnd.set(event.offsetX, event.offsetY);
    rotateDelta.subVectors(rotateEnd, rotateStart);

    var element = scope.component;

    // rotating across whole screen goes 360 degrees around
    rotateLeft(2 * Math.PI * rotateDelta.x / element.get('width') * scope.rotateSpeed);

    // rotating up and down along whole screen attempts to go 360, but limited to 180
    rotateUp(2 * Math.PI * rotateDelta.y / element.get('height') * scope.rotateSpeed);

    rotateStart.copy(rotateEnd);

    scope.update();
  }

  function handleDragMoveDolly(event) {

    dollyEnd.set(event.offsetX, event.offsetY);

    dollyDelta.subVectors(dollyEnd, dollyStart);

    if (dollyDelta.y > 0) {

      dollyIn(getZoomScale());
    } else if (dollyDelta.y < 0) {

      dollyOut(getZoomScale());
    }

    dollyStart.copy(dollyEnd);

    scope.update();
  }

  function handleDragMovePan(event) {

    panEnd.set(event.offsetX, event.offsetY);

    panDelta.subVectors(panEnd, panStart);

    pan(panDelta.x, panDelta.y);

    panStart.copy(panEnd);

    scope.update();
  }

  function handleMouseUp(event) {}

  function handleMouseWheel(event) {

    var delta = 0;

    // if ( event.wheelDelta !== undefined ) {

    //   // WebKit / Opera / Explorer 9

    //   delta = event.wheelDelta;

    // } else if ( event.detail !== undefined ) {

    //   // Firefox

    //   delta = - event.detail;

    // }

    delta = -event.deltaY;

    if (delta > 0) {

      dollyOut(getZoomScale());
    } else if (delta < 0) {

      dollyIn(getZoomScale());
    }

    scope.update();
  }

  function handleKeyDown(event) {

    switch (event.keyCode) {

      case scope.keys.UP:
        pan(0, scope.keyPanSpeed);
        scope.update();
        break;

      case scope.keys.BOTTOM:
        pan(0, -scope.keyPanSpeed);
        scope.update();
        break;

      case scope.keys.LEFT:
        pan(scope.keyPanSpeed, 0);
        scope.update();
        break;

      case scope.keys.RIGHT:
        pan(-scope.keyPanSpeed, 0);
        scope.update();
        break;

    }
  }

  function handleTouchStartRotate(event) {

    rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
  }

  function handleTouchStartDolly(event) {

    var dx = event.touches[0].pageX - event.touches[1].pageX;
    var dy = event.touches[0].pageY - event.touches[1].pageY;

    var distance = Math.sqrt(dx * dx + dy * dy);

    dollyStart.set(0, distance);
  }

  function handleTouchStartPan(event) {

    panStart.set(event.touches[0].pageX, event.touches[0].pageY);
  }

  function handleTouchMoveRotate(event) {

    rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    rotateDelta.subVectors(rotateEnd, rotateStart);

    var element = scope.component === document ? scope.component.body : scope.component;

    // rotating across whole screen goes 360 degrees around
    rotateLeft(2 * Math.PI * rotateDelta.x / element.model.width * scope.rotateSpeed);
    // rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

    // rotating up and down along whole screen attempts to go 360, but limited to 180
    rotateUp(2 * Math.PI * rotateDelta.y / element.model.height * scope.rotateSpeed);
    // rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

    rotateStart.copy(rotateEnd);

    scope.update();
  }

  function handleTouchMoveDolly(event) {

    var dx = event.touches[0].pageX - event.touches[1].pageX;
    var dy = event.touches[0].pageY - event.touches[1].pageY;

    var distance = Math.sqrt(dx * dx + dy * dy);

    dollyEnd.set(0, distance);

    dollyDelta.subVectors(dollyEnd, dollyStart);

    if (dollyDelta.y > 0) {

      dollyOut(getZoomScale());
    } else if (dollyDelta.y < 0) {

      dollyIn(getZoomScale());
    }

    dollyStart.copy(dollyEnd);

    scope.update();
  }

  function handleTouchMovePan(event) {

    panEnd.set(event.touches[0].pageX, event.touches[0].pageY);

    panDelta.subVectors(panEnd, panStart);

    pan(panDelta.x, panDelta.y);

    panStart.copy(panEnd);

    scope.update();
  }

  function handleTouchEnd(event) {}

  this.update();
};

ThreeControls.prototype = {}; //Object.create( THREE.EventDispatcher.prototype );
ThreeControls.prototype.constructor = ThreeControls;

exports.default = ThreeControls;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _scene = scene;
var Layout = _scene.Layout;

/* 대상 컴포넌트의 bounds를 계산한다. */

var ThreeLayout = {
  reflow: function reflow(container, component) {},

  capturables: function capturables(container) {
    return container.get('threed') ? [] : container.components;
  },

  drawables: function drawables(container) {
    return container.get('threed') ? [] : container.components;
  },

  isStuck: function isStuck(component) {
    return false;
  }
};

Layout.register('three', ThreeLayout);

exports.default = ThreeLayout;

},{}]},{},[2]);
