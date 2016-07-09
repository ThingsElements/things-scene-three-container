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
  THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader());

  var objLoader = new THREE.OBJLoader();
  var mtlLoader = new THREE.MTLLoader();

  objLoader.setPath('obj/Fork_lift/');
  mtlLoader.setPath('obj/Fork_lift/');

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
      // this.scale.set(model.width, model.depth, model.height)
      this.position.set(cx, 0, cy);
      this.rotation.y = model.rotation || 0;

      // this.loadExtMtl('obj/Fork_lift/', 'ForkLift.mtl', '', function(materials){
      //   materials.preload();
      //
      //   this.loadExtObj('obj/Fork_lift/', 'ForkLift.obj', materials, function(object){
      //     object.traverse(function(child){
      //       if(child instanceof THREE.Mesh) {
      //         // child.matrix.scale(model.width, model.depth, model.height)
      //       }
      //     })
      //
      //     // console.log(object.matrixWorld, object.matrix)
      //     // this.matrixWorld.makeScale(model.width, model.depth, model.height)
      //     // object.scale.normalize()
      //     // object.scale.set(model.width, model.depth, model.height)
      //     // object.matrix.scale(model.width, model.depth, model.height)
      //     // console.log(object)
      //     this.scale.set(1, 1, 1)
      //     this.position.set(cx, 0, cy)
      //     this.add(object)
      //     this.rotation.y = model.rotation || 0
      //     // console.log(model)
      //   })
      // })

      // this.scale.set(model.width, model.depth, model.height)
      // console.log(this.matrixWorld, this.matrix)
      // this.matrixWorld.makeScale(model.width, model.depth, model.height)
    }
  }, {
    key: 'loadExtMtl',
    value: function loadExtMtl(path, filename, texturePath, funcSuccess) {

      var self = this;
      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.setPath(path);
      if (texturePath) mtlLoader.setTexturePath(texturePath);

      mtlLoader.load(filename, funcSuccess.bind(self));
    }
  }, {
    key: 'loadExtObj',
    value: function loadExtObj(path, filename, materials, funcSuccess) {
      var self = this;
      var loader = new THREE.OBJLoader(this._loadManager);

      loader.setPath(path);

      if (materials) loader.setMaterials(materials);

      loader.load(filename, funcSuccess.bind(self), function () {}, function () {
        console.log("error");
      });
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
  var objLoader = new THREE.OBJLoader();
  var mtlLoader = new THREE.MTLLoader();

  objLoader.setPath('obj/Casual_Man_02/');
  mtlLoader.setPath('obj/Casual_Man_02/');

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

      // this.scale.normalize()

      // this.loadExtMtl('obj/Casual_Man_02/', 'Casual_Man.mtl', '', function(materials){
      //   materials.preload();
      //
      //   this.loadExtObj('obj/Casual_Man_02/', 'Casual_Man.obj', materials, function(object){
      //     object.traverse(function(child){
      //       if(child instanceof THREE.Mesh) {
      //         // child.matrix.scale(model.width, model.depth, model.height)
      //       }
      //     })
      //
      //     // console.log(object.matrixWorld, object.matrix)
      //     // this.matrixWorld.makeScale(model.width, model.depth, model.height)
      //     // object.scale.normalize()
      //     // object.scale.set(model.width, model.depth, model.height)
      //     // object.matrix.scale(model.width, model.depth, model.height)
      //     // console.log(object)
      //     this.scale.set(10, 10, 10)
      //     this.position.set(cx, 0, cy)
      //     this.add(object)
      //     this.rotation.y = model.rotation || 0
      //
      //   })
      // })

      // this.scale.set(model.width, model.depth, model.height)
      // console.log(this.matrixWorld, this.matrix)
      // this.matrixWorld.makeScale(model.width, model.depth, model.height)
    }
  }, {
    key: 'loadExtMtl',
    value: function loadExtMtl(path, filename, texturePath, funcSuccess) {

      var self = this;
      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.setPath(path);
      if (texturePath) mtlLoader.setTexturePath(texturePath);

      mtlLoader.load(filename, funcSuccess.bind(self));
    }
  }, {
    key: 'loadExtObj',
    value: function loadExtObj(path, filename, materials, funcSuccess) {
      var self = this;
      var loader = new THREE.OBJLoader(this._loadManager);

      loader.setPath(path);

      if (materials) loader.setMaterials(materials);

      loader.load(filename, funcSuccess.bind(self), function () {}, function () {
        console.log("error");
      });
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
      if (this._scene3d) this.destroy_scene3d();

      registerLoaders();

      var _model = this.model;
      var width = _model.width;
      var height = _model.height;
      var _model$angle = _model.angle;
      var angle = _model$angle === undefined ? 45 : _model$angle;
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

      this._camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
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
    }
  }, {
    key: '_draw',


    /* Container Overides .. */

    value: function _draw(ctx) {
      var _model2 = this.model;
      var left = _model2.left;
      var top = _model2.top;
      var width = _model2.width;
      var height = _model2.height;
      var mode_threed = _model2.mode_threed;


      if (mode_threed) {
        var scene = this.scene3d;

        this._renderer.render(scene, this._camera);

        ctx.drawImage(this._renderer.domElement, 0, 0, width, height, left, top, width, height);
      } else {
        _get(Object.getPrototypeOf(ThreeContainer.prototype), '_draw', this).call(this, ctx);
      }
    }
  }, {
    key: 'onchange',


    // get stuck() {
    //   if(this.get('mode_threed'))
    //     return true
    //   return super.stuck
    // }

    value: function onchange(after, before) {
      this.destroy_scene3d();
      this.invalidate();
    }
  }, {
    key: 'onmousedown',
    value: function onmousedown(e) {
      // this._mouse.x = ( e.offsetX / this.SCREEN_WIDTH ) * 2 - 1;
      // this._mouse.y = - ( e.offsetY / this.SCREEN_HEIGHT ) * 2 + 1;
    }
  }, {
    key: 'onmousemove',
    value: function onmousemove(e) {
      // the following line would stop any other event handler from firing
      // (such as the mouse's TrackballControls)
      // event.preventDefault();

      // update the mouse variable
      // this._mouse.x = ( e.offsetX / this.SCREEN_WIDTH ) * 2 - 1;
      // this._mouse.y = - ( e.offsetY / this.SCREEN_HEIGHT ) * 2 + 1;
    }
  }, {
    key: 'ondragstart',
    value: function ondragstart(e) {}
  }, {
    key: 'ondragmove',
    value: function ondragmove(e) {}
  }, {
    key: 'ondragend',
    value: function ondragend(e) {}
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

},{"./forkLift":1,"./person":3,"./rack":4,"./three-layout":7}],7:[function(require,module,exports){
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
    return container.get('mode_threed') ? [] : container.components;
  },

  drawables: function drawables(container) {
    return container.get('mode_threed') ? [] : container.components;
  },

  isStuck: function isStuck(component) {
    return false;
  }
};

Layout.register('three', ThreeLayout);

exports.default = ThreeLayout;

},{}]},{},[2]);
