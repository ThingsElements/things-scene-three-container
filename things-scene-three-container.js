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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATUS_COLORS = ['#6666ff', '#ccccff', '#ffcccc', '#cc3300'];

var HumiditySensor = function (_THREE$Object3D) {
  _inherits(HumiditySensor, _THREE$Object3D);

  function HumiditySensor(model, canvasSize, container) {
    _classCallCheck(this, HumiditySensor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HumiditySensor).call(this));

    _this._model = model;
    _this._container = container;

    _this.userData.temperature = model.humidity ? model.humidity[0] : 0;
    _this.userData.humidity = model.humidity ? model.humidity[1] : 0;

    _this.createObject(model, canvasSize);

    return _this;
  }

  _createClass(HumiditySensor, [{
    key: 'createObject',
    value: function createObject(model, canvasSize) {

      var cx = model.cx - canvasSize.width / 2;
      var cy = model.cy - canvasSize.height / 2;
      var cz = (model.zPos || 0) + model.depth / 2;

      var rotation = model.rotation;

      this.type = 'humidity-sensor';

      if (model.location) this.name = model.location;

      for (var i = 0; i < 3; i++) {
        var mesh = this.createSensor(model.rx * (1 + 0.5 * i), model.ry * (1 + 0.5 * i), model.depth * (1 + 0.5 * i), i);
        mesh.material.opacity = 0.5 - i * 0.15;
      }

      this.position.set(cx, cz, cy);
      this.rotation.y = model.rotation || 0;

      this._container._heatmap.addData({
        x: Math.floor(model.cx),
        y: Math.floor(model.cy),
        value: this.userData.temperature
      });

      this._container.updateHeatmapTexture();

      // var self = this
      //
      // setInterval(function(){
      //
      //   var data = self._container._heatmap._store._data
      //
      //   // var value = self._container._heatmap.getValueAt({x:model.cx, y: model.cy})
      //   var value = data[model.cx][model.cy]
      //
      //   self._container._heatmap.addData({
      //     x: model.cx,
      //     y: model.cy,
      //     // min: -100,
      //     // value: -1
      //     value: (Math.random() * 40 - 10) - value
      //   })
      //   self._container._heatmap.repaint()
      //
      //   self._container.render_threed()
      // }, 1000)
    }
  }, {
    key: 'createSensor',
    value: function createSensor(w, h, d, i) {

      var isFirst = i === 0;

      var geometry = new THREE.SphereGeometry(w, 32, 32);
      // let geometry = new THREE.SphereGeometry(w, d, h);
      var material;
      if (isFirst) {
        // var texture = new THREE.TextureLoader().load('./images/drop-34055_1280.png')
        // texture.repeat.set(1,1)
        // // texture.premultiplyAlpha = true
        material = new THREE.MeshLambertMaterial({ color: '#cc3300', side: THREE.FrontSide });
        // material = new THREE.MeshLambertMaterial( { color : '#74e98a', side: THREE.FrontSide} );
      } else {
        material = new THREE.MeshBasicMaterial({ color: '#cc3300', side: THREE.FrontSide, wireframe: true, wireframeLinewidth: 1 });
        // material = new THREE.MeshBasicMaterial( { color : '#74e98a', side: THREE.FrontSide, wireframe: true, wireframeLinewidth : 1} );
      }

      // let material = new THREE.MeshBasicMaterial( { color : '#ff3300', side: THREE.DoubleSide, wireframe: true, wireframeLinewidth : 1} );

      var mesh = new THREE.Mesh(geometry, material);
      mesh.material.transparent = true;

      this.add(mesh);

      return mesh;
    }
  }, {
    key: 'onUserDataChanged',
    value: function onUserDataChanged() {
      var _model = this._model;
      var cx = _model.cx;
      var cy = _model.cy;

      cx = Math.floor(cx);
      cy = Math.floor(cy);

      var temperature = this.userData.temperature;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var sphere = _step.value;

          var colorIndex = 0;
          if (temperature < 0) {
            colorIndex = 0;
          } else if (temperature < 10) {
            colorIndex = 1;
          } else if (temperature < 20) {
            colorIndex = 2;
          } else {
            colorIndex = 3;
          }

          sphere.material.color.set(STATUS_COLORS[colorIndex]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var data = this._container._heatmap._store._data;

      // var value = self._container._heatmap.getValueAt({x:model.cx, y: model.cy})
      var value = data[cx][cy];

      this._container._heatmap.addData({
        x: cx,
        y: cy,
        // min: -100,
        // value: -1
        value: temperature - value
      });
      this._container._heatmap.repaint();

      // this._container.render_threed()
      this._container.updateHeatmapTexture();
    }
  }]);

  return HumiditySensor;
}(THREE.Object3D);

exports.default = HumiditySensor;
var _scene = scene;
var Component = _scene.Component;
var Ellipse = _scene.Ellipse;

var Sensor = exports.Sensor = function (_Ellipse) {
  _inherits(Sensor, _Ellipse);

  function Sensor() {
    _classCallCheck(this, Sensor);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Sensor).apply(this, arguments));
  }

  _createClass(Sensor, [{
    key: '_draw',
    value: function _draw(context) {
      var _bounds = this.bounds;
      var left = _bounds.left;
      var top = _bounds.top;
      var width = _bounds.width;
      var height = _bounds.height;


      context.beginPath();
      context.rect(left, top, width, height);

      this.model.fillStyle = {
        type: 'pattern',
        fitPattern: true,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABBCAYAAACTiffeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQ0E1QkUzRTRDMDcxMUU2QkMyRDk3MzlGN0EzMTI2NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQ0E1QkUzRjRDMDcxMUU2QkMyRDk3MzlGN0EzMTI2NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJFQ0Q4QzE5NEI1MjExRTZCQzJEOTczOUY3QTMxMjY1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJFQ0Q4QzFBNEI1MjExRTZCQzJEOTczOUY3QTMxMjY1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tgU1kQAAB4pJREFUeNrcWktMVFcYPgPIVHxTERpsq4XaBwZbjRIjaUO0qbGuWDQQFnZhgkuty7qUhMQYTdqFGl10YcSYUBfWkEjCxtREClEDJkZgbAsWxYIIKjPCTP/v8p3xOtyZe+4dRtA/+XIv957H/53zv+4ZArFYTL0NEvBCJBAIzHhWsmZNllwWChYJ3iGCaC7IEWQLooJJXsNERPBc8LT33r0XbnO76WlEJJGAKA9F8wUrSGBBQpcsKm3vGCOmbM+m2GZC8ETwWDAuxKJeSaUkYifAlX9X8J5gqU1hRWWwuuO8QrEXVFQrm00EiTzuZA7bxEge/UYEQ0LouSkZRyIOBIqJXCqfxQkfCh4JRmXSSa92jblL164FoWXc3eUkFSXGBPdl7HE3Mq8QcSBQJFhjs3ms6KCgvycUGnHymXRE5sTurBIU0tc0IZjcgBB6loxMnEgCicVy+YwmpM3nH0FIBgtnOgJxp7BD7wuW2ILFABbS7kOORDjAh/LnOq4+SPwruOO0Gq+JUIHcrqUvgQD0uKv9ZwYR6QDFy+nMWQyPN6XDAw+mEaStL6Uz59peRxh2x+hTYx7GhW4lNHUdEEBm2IkIJv+Kk0P5dmkYcZkgi8Q/EqxmSI7aIlnUFoq1M0bp0GH6W4j2HzYgtFIuZbaxe8RX789wdiGzkop1ycCxFANitddzB/M4cMCWK5ATRhmGdd4IMucsseWdSZtD93HeRy5kMN9GjnEDQccx/KaKRDIIdqtC8CUH0spbfkRnfOiW0GScZbad/IC7ppPlPcGfMBsXPYJCYsw4j9g6l8rlW65qNlf7Jid9kmbI/VTwBU1zkrgh6JCxp3wnRDsZOto3gk1cOQx8TfDHbIZimQcTfkI/zeM8/wkuJS6U5xJFfAaK1wo+5iOYULMMPJSpkEuz+VqwgeaGcPubzDmYqnh0LRqFDDL7Hm7176alCE1mKTM0Vve5FxOU/kjIu+mHfwkuiE9E06p+hcxyUeKxy8QLGBoRUZBUC7iiAVtIjtCZewSdepVTjIn6rhI7IiQis/I9kiyayWQL6UNVgsVUPjF3BGylfNR2f1dwWQjdSeU7QsJVybQ+rGQShOEfWL3qRNfNaBais46zvNAhdx13bZUt5HYKmpyyvfFCe/3UBRlGmO8F3zEUI3q10odGDSMUfKCauQSLgLzxi/T/2ysJX0ToMyizG/lhhJX/WRS47zPkwixruCDYkUNiSo8z+s2eQAZJbBdXMeJlFR1M9HO5/IjQLiQu+y6V/YJFo+9xEsjkp6NLIN3jIP0ds3fvXjjzVlYAKChLbRWxog/0M/R2ofxAhXDmzJlRr/4wq6alRQhsZeLayWjkRRCtWlCGnD59+tqcEBECWPk6ljBFaVYmSIznBGeFUMdrISIE4Kn7BPWshxwlJydH1dTUqC1btlh/X79+XTU1NanJyZQVDvLPScEJIRTLGBEhgZLhoOCAW9u6ujpVVVX1yrMrV66o8+fPm0x1THBUyAyY6pblgQSct8GEBKSiosK6NjQ0qCNHjlj327ZtM50OczRwTiPJ8bATh1gFG0leXp51DYVCM55BZLXt4zsNsYfvfjLZmRxDnzjohYTh4pg0w5zD0vagm8+YmNY+U3PKkBygDv59hCG2Xs291FMX36ZVlyrEpiMGPmKXDdSlwzMRZuzaTC2xoY/YpVb6XEhWAaQyrd2zkLFnU4qok7mPsADcqeaf7KRuxqa11UcBmEkf0bKRurWYEtmU6aX14SN23VpMfWS9mr+y3ouzl85jIqVefGR1prXx6SNJdUtGJH8e+0h+WmX8fJdkRIbTGbS8vNy69vX1xZ/pe/0uDRn2QqTfzwwFBQWqtrZW1ddP15m3b9+Ov9P3eIc2aOtT+r0Q6fFDorq6Wm3fvl0Fg0HrG/3ixYvx97jHM7xDG7T1SabHC5Eur6Pv2LFDbd68WU1MTKjGxkZ16tSpGW3wDO/QBm3Rx4d0eSHS4dUnKisrrfvjx4+rnp7kG4p3aANBHx8+0+GFCErlTtORy8rK4uakSayIxVR1JKwOP3tqAfcreGKDNtrM0NeDdFI3MyKSrEad6plkUlJSYl3b2triz6peRNSucEQVTUUt4B7PtOi2uq+htFA3T3nkkpo+AXSVwsJC6zow8PKwY6PDQZz9mW6r+xrIIHXy9s3OL7Fz8yjnnUt1PuyW2c+q6WPMlPLgwfT/3RQXF7805pyZ1Y/9mW6r+7rITeri7xSFB8on3Wbp7e2d9gvbEWnbglx1OZirBrOzLOAez+I+xLa6r4ucdDvcNqm1Tqjps9ik0t3drcLhsHVgXVo6XWWPBAKqOTeoDuUtsoD7Ef5ShTZoiz7o6yLHqINKiwhP+I4Kfk3W5tatW+rq1avW/f79++NkHD8m5B3aQNAHfVMI5jxqcjJvfBrPA+Wk57+6REHGhiBPIMTq6ASfgDnpnxna29tVc3OzGhoaSkXisJAwKpdm9WcFkEHZgYyNZOckMCfsRGtrayoSnn9WyMgPPSg7kLGR7HSeQHSCY8MnUpjT6/mhJ4HQm/3TmwOhN/vHUAdCvn6eTlY7zRmRuZa3hsj/AgwA2qER3p3SY8gAAAAASUVORK5CYII="
      };
      this.drawFill(context);
    }
  }]);

  return Sensor;
}(Ellipse);

Component.register('humidity-sensor', Sensor);

},{}],3:[function(require,module,exports){
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

var _videoPlayer = require('./video-player-360');

Object.defineProperty(exports, 'VideoPlayer360', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_videoPlayer).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./three-container":8,"./video-player-360":11}],4:[function(require,module,exports){
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

  objLoader.setPath('../resources/obj/Casual_Man_02/');
  mtlLoader.setPath('../resources/obj/Casual_Man_02/');

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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene;
var Component = _scene.Component;

var Plane = function (_THREE$Mesh) {
  _inherits(Plane, _THREE$Mesh);

  function Plane(model, canvasSize) {
    _classCallCheck(this, Plane);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Plane).call(this));

    _this._model = model;

    _this.createObject(model, canvasSize);

    return _this;
  }

  _createClass(Plane, [{
    key: 'createObject',
    value: function createObject(model, canvasSize) {

      this.createPlane(model.width, model.height, model.fillStyle);

      var cx = model.left + model.width / 2 - canvasSize.width / 2;
      var cy = model.top + model.height / 2 - canvasSize.height / 2;

      this.position.x = cx;
      this.position.z = cy;
    }
  }, {
    key: 'createPlane',
    value: function createPlane(w, h, fillStyle) {

      this.geometry = new THREE.PlaneGeometry(w, h);
      if (fillStyle && fillStyle.type == 'pattern' && fillStyle.image) {
        var texture = new THREE.TextureLoader().load(fillStyle.image);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        this.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.FrontSide });
      } else {
        this.material = new THREE.MeshBasicMaterial({ color: fillStyle || '#ccaa76', side: THREE.FrontSide });
      }

      this.rotation.x = -Math.PI / 2;
      this.type = 'rect';
    }
  }]);

  return Plane;
}(THREE.Mesh);

exports.default = Plane;

},{}],6:[function(require,module,exports){
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
    _this.castShadow = true;
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

},{"./stock":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATUS_COLORS = ['black', '#ccaa76', '#ff1100', '#252525', '#6ac428'];

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

      this.castShadow = true;
    }
  }, {
    key: 'onUserDataChanged',
    value: function onUserDataChanged() {
      this.material.color.set(STATUS_COLORS[this.userData.status]);

      if (d.status === 0) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
  }]);

  return Stock;
}(THREE.Mesh);

exports.default = Stock;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _rack = require('./rack');

var _rack2 = _interopRequireDefault(_rack);

var _plane = require('./plane');

var _plane2 = _interopRequireDefault(_plane);

var _forkLift = require('./forkLift');

var _forkLift2 = _interopRequireDefault(_forkLift);

var _person = require('./person');

var _person2 = _interopRequireDefault(_person);

var _humiditySensor = require('./humidity-sensor');

var _humiditySensor2 = _interopRequireDefault(_humiditySensor);

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

      var fillStyle = this.model.fillStyle;

      var floorMaterial;

      var self = this;

      if (fillStyle.type == 'pattern' && fillStyle.image) {

        var floorTexture = new THREE.TextureLoader().load(this.app.url(fillStyle.image), function () {
          self.render_threed();
        });
        // floorTexture.premultiplyAlpha = true
        // floorTexture.wrapS = THREE.MirroredRepeatWrapping
        // floorTexture.wrapT = THREE.MirroredRepeatWrapping
        // floorTexture.repeat.set(1,1)
        // floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.FrontSide } );
        floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide, specular: 0x050505 });
      } else {
        floorMaterial = new THREE.MeshBasicMaterial({
          color: color,
          side: THREE.FrontSide
        });
      }

      var floorGeometry = new THREE.PlaneGeometry(width, height);
      // var floorGeometry = new THREE.BoxGeometry(width, height, 10, 10, 10)

      var floor = new THREE.Mesh(floorGeometry, floorMaterial);

      floor.receiveShadow = true;

      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -2;

      floor.name = 'floor';

      this._scene3d.add(floor);
    }
  }, {
    key: 'createObjects',
    value: function createObjects(components, canvasSize) {
      var _this2 = this;

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

          case 'rect':
            item = new _plane2.default(model, canvasSize);
            break;

          case 'humidity-sensor':
            item = new _humiditySensor2.default(model, canvasSize, _this2);
            break;

          default:
            break;
        }
        obj.add(item);
      });

      this._scene3d.add(obj);
    }
  }, {
    key: 'createHeatmap',
    value: function createHeatmap(width, height) {

      if (this._model.useHeatmap === false) return;

      var div = document.createElement('div');

      this._heatmap = h337.create({
        container: div,
        width: width,
        height: height,
        radius: Math.sqrt(width * width + height * height) / 4
      });

      var heatmapMaterial = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        transparent: true,
        visible: false
      });

      var heatmapGeometry = new THREE.PlaneGeometry(width, height);

      var heatmap = new THREE.Mesh(heatmapGeometry, heatmapMaterial);

      heatmap.rotation.x = -Math.PI / 2;
      heatmap.position.y = -1;

      heatmap.name = 'heatmap';

      this._scene3d.add(heatmap);
    }
  }, {
    key: 'updateHeatmapTexture',
    value: function updateHeatmapTexture() {
      var heatmap = this._scene3d.getObjectByName('heatmap', true);

      var texture = new THREE.Texture(this._heatmap._renderer.canvas);
      texture.needsUpdate = true;

      heatmap.material.map = texture;

      heatmap.material.visible = true;
    }
  }, {
    key: 'destroy_scene3d',
    value: function destroy_scene3d() {
      this.stop();
      this._renderer && this._renderer.clear();
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
      this._mouse = { x: 0, y: 0, originX: 0, originY: 0 };

      if (!this.tooltip) this.createTooltip();

      if (this._scene3d) this.destroy_scene3d();

      // window.addEventListener('focus', this.onWindowFocus.bind(this));
      // window.addEventListener('blur', this.onWindowBlur.bind(this));

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
      var _hierarchy$components = this.hierarchy.components;
      var components = _hierarchy$components === undefined ? [] : _hierarchy$components;

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
        // precision: 'mediump',
        alpha: true
      });

      this._renderer.setClearColor(0xffffff, 0); // transparent
      // this._renderer.setClearColor(0x000000, 0) // transparent
      this._renderer.setSize(width, height);
      this._renderer.shadowMap.enabled = true;

      // CONTROLS
      this._controls = new _threeControls2.default(this._camera, this);

      // LIGHT
      var _light = new THREE.PointLight(light, 1);
      // _light.position.set(1,1,1)
      // _light.castShadow = true
      // _light.shadow.mapSize.width = 2048;
      // _light.shadow.mapSize.height = 2048;
      //
      // _light.shadow.camera.left = -50;
      // _light.shadow.camera.right = 50;
      // _light.shadow.camera.top = 50;
      // _light.shadow.camera.bottom = -50;
      // _light.shadow.camera.far = 3500;
      this._camera.add(_light);
      this._camera.castShadow = true;

      this._tick = 0;
      this._clock = new THREE.Clock(true);

      this.createHeatmap(width, height);
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
      this._animationFrame = requestAnimationFrame(this.animate.bind(this));

      var delta = this._clock.getDelta();

      this.update();
    }
  }, {
    key: 'stop',
    value: function stop() {
      cancelAnimationFrame(this._animationFrame);
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

            // if(this.INTERSECTED.type === 'stock') {
            //
            // }
            //
            // var loc = this.INTERSECTED.name;
            // var status = this.INTERSECTED.userData.status;
            // var boxId = this.INTERSECTED.userData.boxId;
            // var inDate = this.INTERSECTED.userData.inDate;
            // var type = this.INTERSECTED.userData.type;
            // var count = this.INTERSECTED.userData.count;

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
          } else if (this.INTERSECTED.parent.type === 'humidity-sensor') {
            if (!this.INTERSECTED.parent.visible) return;

            if (!this.INTERSECTED.parent.userData) this.INTERSECTED.parent.userData = {};

            tooltip.textContent = '';

            for (var _key in this.INTERSECTED.parent.userData) {
              if (this.INTERSECTED.parent.userData[_key]) tooltip.textContent += _key + ": " + this.INTERSECTED.parent.userData[_key] + "\n";
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
      tooltip.style['white-space'] = 'pre-line';

      this.root.target_element.appendChild(tooltip);
    }
  }, {
    key: 'render_threed',
    value: function render_threed() {
      this._renderer && this._renderer.render(this._scene3d, this._camera);
      this.invalidate();
    }

    /* Container Overides .. */

  }, {
    key: '_draw',
    value: function _draw(ctx) {
      var _this3 = this;

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

        if (this._dataChanged) {

          this._data && this._data.forEach(function (d) {
            var object = _this3._scene3d.getObjectByName(d.loc, true);
            if (object) {
              object.userData = d;
            }

            if (object) {
              object.onUserDataChanged();
            }
          });

          this._dataChanged = false;
        }

        ctx.drawImage(this._renderer.domElement, 0, 0, width, height, left, top, width, height);
      } else {
        _get(Object.getPrototypeOf(ThreeContainer.prototype), '_draw', this).call(this, ctx);
      }
    }
  }, {
    key: 'onchange',
    value: function onchange(after, before) {

      if (after.hasOwnProperty('width') || after.hasOwnProperty('height') || after.hasOwnProperty('threed')) this.destroy_scene3d();

      if (after.hasOwnProperty('autoRotate')) {
        this._controls.autoRotate = after.autoRotate;
      }

      if (after.hasOwnProperty('fov') || after.hasOwnProperty('near') || after.hasOwnProperty('far') || after.hasOwnProperty('zoom')) {

        this._camera.near = this.model.near;
        this._camera.far = this.model.far;
        this._camera.zoom = this.model.zoom * 0.01;
        this._camera.fov = this.model.fov;
        this._camera.updateProjectionMatrix();

        this._controls.cameraChanged = true;
      }

      if (after.hasOwnProperty("data")) {
        if (this._data !== after.data) {
          this._data = after.data;
          this._dataChanged = true;
        }
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

      if (this._controls) {
        var pointer = this.transcoordC2S(e.offsetX, e.offsetY);

        this._mouse.originX = this.getContext().canvas.offsetLeft + e.offsetX;
        this._mouse.originY = this.getContext().canvas.offsetTop + e.offsetY;

        this._mouse.x = (pointer.x - this.model.left) / this.model.width * 2 - 1;
        this._mouse.y = -((pointer.y - this.model.top) / this.model.height) * 2 + 1;

        this._controls.onMouseMove(e);
        e.stopPropagation();
      }
    }
  }, {
    key: 'onwheel',
    value: function onwheel(e) {
      if (this._controls) {
        this.handleMouseWheel(e);
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
    key: 'handleMouseWheel',
    value: function handleMouseWheel(event) {

      var delta = 0;
      var zoom = this.model.zoom;

      delta = -event.deltaY;
      zoom += delta * 0.01;
      if (zoom < 0) zoom = 0;

      this.set('zoom', zoom);
    }
  }, {
    key: 'onWindowFocus',
    value: function onWindowFocus(e) {
      console.log("focus!!");
      // this.render_threed();
    }
  }, {
    key: 'onWindowBlur',
    value: function onWindowBlur(e) {
      // this.stop()
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

},{"./forkLift":1,"./humidity-sensor":2,"./person":4,"./plane":5,"./rack":6,"./three-controls":9,"./three-layout":10}],9:[function(require,module,exports){
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

  // flags
  this.cameraChanged = false;

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

      if (scope.cameraChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {

        lastPosition.copy(scope.object.position);
        lastQuaternion.copy(scope.object.quaternion);
        scope.cameraChanged = false;

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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene;
var Rect = _scene.Rect;
var Component = _scene.Component;

var VideoPlayer360 = function (_Rect) {
  _inherits(VideoPlayer360, _Rect);

  function VideoPlayer360() {
    _classCallCheck(this, VideoPlayer360);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VideoPlayer360).apply(this, arguments));
  }

  _createClass(VideoPlayer360, [{
    key: 'init_scene',
    value: function init_scene(width, height) {
      var _model = this.model;
      var mute = _model.mute;
      var loop = _model.loop;
      var autoplay = _model.autoplay;
      var src = _model.src;
      var fov = _model.fov;
      var clickAndDrag = _model.clickAndDrag;
      var wheelEnabled = _model.wheelEnabled;


      this._dragStart = {};
      this._lon = 0;
      this._lat = 0;
      this._clickAndDrag = clickAndDrag;
      this._isPlaying = false;
      this._wheelEnabled = wheelEnabled;

      this._fov = fov || 35;
      this._fovMin = 3;
      this._fovMax = 100;

      this._time = new Date().getTime();

      // create a local THREE.js scene
      this._scene = new THREE.Scene();

      // create ThreeJS camera
      this._camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
      this._camera.setFocalLength(fov);

      // create ThreeJS renderer and append it to our object
      this._renderer = new THREE.WebGLRenderer();
      this._renderer.setSize(width, height);
      this._renderer.autoClear = false;
      this._renderer.setClearColor(0x333333, 1);

      // create off-dom video player
      this._video = document.createElement('video');
      this._video.setAttribute('crossorigin', 'anonymous');
      this._video.loop = loop;
      this._video.muted = mute;
      this._texture = new THREE.Texture(this._video);

      // make a self reference we can pass to our callbacks
      var self = this;

      // attach video player event listeners
      this._video.addEventListener("ended", function () {
        this._isPlaying = false;
      });

      // Progress Meter
      this._video.addEventListener("progress", function () {

        var percent = null;
        if (self._video && self._video.buffered && self._video.buffered.length > 0 && self._video.buffered.end && self._video.duration) {
          percent = self._video.buffered.end(0) / self._video.duration;
        }
        // Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
        // to be anything other than 0. If the byte count is available we use this instead.
        // Browsers that support the else if do not seem to have the bufferedBytes value and
        // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
        else if (self._video && self._video.bytesTotal !== undefined && self._video.bytesTotal > 0 && self._video.bufferedBytes !== undefined) {
            percent = self._video.bufferedBytes / self._video.bytesTotal;
          }

        // Someday we can have a loading animation for videos
        var cpct = Math.round(percent * 100);
        if (cpct === 100) {
          // do something now that we are done
        } else {
            // do something with this percentage info (cpct)
          }
      });

      // Video Play Listener, fires after video loads
      // this._video.addEventListener("canplaythrough", function() {
      this._video.addEventListener("canplay", function () {

        if (autoplay === true) {
          self.play();
          self._videoReady = true;
        }
      });

      // set the video src and begin loading
      this._video.src = this.app.url(src);

      this._texture.generateMipmaps = false;
      this._texture.minFilter = THREE.LinearFilter;
      this._texture.magFilter = THREE.LinearFilter;
      this._texture.format = THREE.RGBFormat;

      // create ThreeJS mesh sphere onto which our texture will be drawn
      this._mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 80, 50), new THREE.MeshBasicMaterial({ map: this._texture }));
      this._mesh.scale.x = -1; // mirror the texture, since we're looking from the inside out
      this._scene.add(this._mesh);

      // this.createControls()

      this.animate();
    }
  }, {
    key: 'destroy_scene',
    value: function destroy_scene() {
      cancelAnimationFrame(this._requestAnimationId);
      this._requestAnimationId = undefined;
      this._texture.dispose();
      this._scene.remove(this._mesh);
      this.unloadVideo();

      this._renderer = undefined;
      this._camera = undefined;
      this._keyboard = undefined;
      this._controls = undefined;
      this._projector = undefined;
      this._load_manager = undefined;

      this._scene = undefined;
      this._video = undefined;
    }
  }, {
    key: 'loadVideo',
    value: function loadVideo(videoFile) {
      this._video.src = videoFile;
    }
  }, {
    key: 'unloadVideo',
    value: function unloadVideo() {
      // overkill unloading to avoid dreaded video 'pending' bug in Chrome. See https://code.google.com/p/chromium/issues/detail?id=234779
      this.pause();
      this._video.src = '';
      this._video.removeAttribute('src');
    }
  }, {
    key: 'play',
    value: function play() {
      this._isPlaying = true;
      this._video.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._isPlaying = false;
      this._video.pause();
    }
  }, {
    key: 'resize',
    value: function resize(w, h) {
      if (!this._renderer) return;
      this._renderer.setSize(w, h);
      this._camera.aspect = w / h;
      this._camera.updateProjectionMatrix();
    }
  }, {
    key: 'animate',
    value: function animate() {

      this._requestAnimationId = requestAnimationFrame(this.animate.bind(this));

      if (this._video.readyState === this._video.HAVE_ENOUGH_DATA) {
        if (typeof this._texture !== "undefined") {
          var ct = new Date().getTime();
          if (ct - this._time >= 30) {
            this._texture.needsUpdate = true;
            this._time = ct;
          }
        }
      }

      this.render();
      this.invalidate();
    }
  }, {
    key: 'render',
    value: function render() {
      this._lat = Math.max(-85, Math.min(85, this._lat || 0));
      this._phi = (90 - this._lat) * Math.PI / 180;
      this._theta = (this._lon || 0) * Math.PI / 180;

      var cx = 500 * Math.sin(this._phi) * Math.cos(this._theta);
      var cy = 500 * Math.cos(this._phi);
      var cz = 500 * Math.sin(this._phi) * Math.sin(this._theta);

      this._camera.lookAt(new THREE.Vector3(cx, cy, cz));

      // distortion
      if (this.model.flatProjection) {
        this._camera.position.x = 0;
        this._camera.position.y = 0;
        this._camera.position.z = 0;
      } else {
        this._camera.position.x = -cx;
        this._camera.position.y = -cy;
        this._camera.position.z = -cz;
      }

      this._renderer.clear();
      this._renderer.render(this._scene, this._camera);
    }

    // creates div and buttons for onscreen video controls

  }, {
    key: 'createControls',
    value: function createControls() {

      var muteControl = this.options.muted ? 'fa-volume-off' : 'fa-volume-up';
      var playPauseControl = this.options.autoplay ? 'fa-pause' : 'fa-play';

      var controlsHTML = ' \
          <div class="controls"> \
              <a href="#" class="playButton button fa ' + playPauseControl + '"></a> \
              <a href="#" class="muteButton button fa ' + muteControl + '"></a> \
              <a href="#" class="fullscreenButton button fa fa-expand"></a> \
          </div> \
      ';

      $(this.element).append(controlsHTML, true);

      // hide controls if option is set
      if (this.options.hideControls) {
        $(this.element).find('.controls').hide();
      }

      // wire up controller events to dom elements
      // this.attachControlEvents();
    }
  }, {
    key: 'attachControlEvents',
    value: function attachControlEvents() {

      // create a self var to pass to our controller functions
      var self = this;

      this.element.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      this.element.addEventListener('touchmove', this.onMouseMove.bind(this), false);
      this.element.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
      this.element.addEventListener('DOMMouseScroll', this.onMouseWheel.bind(this), false);
      this.element.addEventListener('mousedown', this.onMouseDown.bind(this), false);
      this.element.addEventListener('touchstart', this.onMouseDown.bind(this), false);
      this.element.addEventListener('mouseup', this.onMouseUp.bind(this), false);
      this.element.addEventListener('touchend', this.onMouseUp.bind(this), false);

      $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', this.fullscreen.bind(this));

      $(window).resize(function () {
        self.resizeGL($(self.element).width(), $(self.element).height());
      });

      // Player Controls
      $(this.element).find('.playButton').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('fa-pause')) {
          $(this).removeClass('fa-pause').addClass('fa-play');
          self.pause();
        } else {
          $(this).removeClass('fa-play').addClass('fa-pause');
          self.play();
        }
      });

      $(this.element).find(".fullscreenButton").click(function (e) {
        e.preventDefault();
        var elem = $(self.element)[0];
        if ($(this).hasClass('fa-expand')) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          }
        } else {
          if (elem.requestFullscreen) {
            document.exitFullscreen();
          } else if (elem.msRequestFullscreen) {
            document.msExitFullscreen();
          } else if (elem.mozRequestFullScreen) {
            document.mozCancelFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      });

      $(this.element).find(".muteButton").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('fa-volume-off')) {
          $(this).removeClass('fa-volume-off').addClass('fa-volume-up');
          self._video.muted = false;
        } else {
          $(this).removeClass('fa-volume-up').addClass('fa-volume-off');
          self._video.muted = true;
        }
      });
    }

    /* Component Overides .. */

  }, {
    key: '_draw',
    value: function _draw(ctx) {
      var _model2 = this.model;
      var left = _model2.left;
      var top = _model2.top;
      var width = _model2.width;
      var height = _model2.height;
      var src = _model2.src;


      if (src) {

        if (!this._scene) {
          this.init_scene(width, height);
          this.render();
        }

        ctx.drawImage(this._renderer.domElement, 0, 0, width, height, left, top, width, height);
      } else {
        _get(Object.getPrototypeOf(VideoPlayer360.prototype), '_draw', this).call(this, ctx);
      }
    }
  }, {
    key: 'onchange',
    value: function onchange(after, before) {

      if (after.hasOwnProperty('width') || after.hasOwnProperty('height')) {
        this.resize(this.model.width, this.model.height);
      }

      if (after.hasOwnProperty('src') || after.hasOwnProperty('autoplay')) {

        this.destroy_scene();
      }

      this.invalidate();
    }
  }, {
    key: 'ondblclick',
    value: function ondblclick(e) {
      if (this._isPlaying) this.pause();else this.play();

      e.stopPropagation();
    }
  }, {
    key: 'onmousedown',
    value: function onmousedown(e) {}
  }, {
    key: 'onmousemove',
    value: function onmousemove(e) {

      if (this._clickAndDrag === false) {

        var x, y;

        this._onPointerDownPointerX = e.offsetX;
        this._onPointerDownPointerY = -e.offsetY;

        this._onPointerDownLon = this._lon;
        this._onPointerDownLat = this._lat;

        x = e.offsetX - this._renderer.getContext().canvas.offsetLeft;
        y = e.offsetY - this._renderer.getContext().canvas.offsetTop;
        this._lon = x / this._renderer.getContext().canvas.width * 430 - 225;
        this._lat = y / this._renderer.getContext().canvas.height * -180 + 90;
      }
    }
  }, {
    key: 'onwheel',
    value: function onwheel(e) {
      if (this._wheelEnabled === false) return;

      var wheelSpeed = 0.01;

      this._fov -= e.deltaY * wheelSpeed;

      if (this._fov < this._fovMin) {
        this._fov = this._fovMin;
      } else if (this._fov > this._fovMax) {
        this._fov = this._fovMax;
      }

      this._camera.setFocalLength(this._fov);
      this._camera.updateProjectionMatrix();
      e.stopPropagation();
    }
  }, {
    key: 'ondragstart',
    value: function ondragstart(e) {
      // this._dragStart.x = e.pageX;
      // this._dragStart.y = e.pageY;
      this._dragStart.x = e.offsetX;
      this._dragStart.y = e.offsetY;
    }
  }, {
    key: 'ondragmove',
    value: function ondragmove(e) {

      if (this._isPlaying === false) {
        return;
      }

      if (this._clickAndDrag !== false) {
        // this._onPointerDownPointerX = e.clientX;
        // this._onPointerDownPointerY = -e.clientY;
        this._onPointerDownPointerX = e.offsetX;
        this._onPointerDownPointerY = -e.offsetY;

        this._onPointerDownLon = this._lon;
        this._onPointerDownLat = this._lat;

        var x, y;

        x = e.offsetX - this._dragStart.x;
        y = e.offsetY - this._dragStart.y;
        this._dragStart.x = e.offsetX;
        this._dragStart.y = e.offsetY;
        this._lon += x;
        this._lat -= y;
      }

      e.stopPropagation();
    }
  }, {
    key: 'ondragend',
    value: function ondragend(e) {}
  }, {
    key: 'ontouchstart',
    value: function ontouchstart(e) {}
  }, {
    key: 'ontouchmove',
    value: function ontouchmove(e) {}
  }, {
    key: 'ontouchend',
    value: function ontouchend(e) {}
  }, {
    key: 'onkeydown',
    value: function onkeydown(e) {}
  }]);

  return VideoPlayer360;
}(Rect);

exports.default = VideoPlayer360;


Component.register('video-player-360', VideoPlayer360);

},{}]},{},[3]);
