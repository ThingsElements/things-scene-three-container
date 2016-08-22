import Rack from './rack'
import Plane from './plane'
import ForkLift from './forkLift'
import Person from './person'
import HumiditySensor from './humidity-sensor'
import Path from './path'

import ThreeLayout from './three-layout'
import ThreeControls from './three-controls'

var { Component, Container, Layout } = scene

function registerLoaders() {
  if(!registerLoaders.done) {
    THREE.Loader.Handlers.add( /\.tga$/i, new THREE.TGALoader() );
    registerLoaders.done = true
  }
}

export default class ThreeContainer extends Container {

  /* THREE Object related .. */

  createFloor(color, width, height) {

    let fillStyle = this.model.fillStyle

    var floorMaterial

    var self = this;

    if(fillStyle.type == 'pattern' && fillStyle.image) {

      var textureLoader = new THREE.TextureLoader()

      // TODO: three.js withCredentials 관련 버그 수정되면 override 로직 제거.

      var oldLoad = THREE.XHRLoader.prototype.load;
      var newLoad = function() {
        this.withCredentials = true;
        oldLoad.apply(this, arguments);
      };
      THREE.XHRLoader.prototype.load = newLoad;

      textureLoader.setCrossOrigin('use-credentials')
      var texture = textureLoader.load(this.app.url(fillStyle.image), function(texture) {
        // floorMaterial.map = texture

        self.render_threed()

        THREE.XHRLoader.prototype.load = oldLoad;
      })

      floorMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, specular: 0x050505 } );

      // floorTexture.premultiplyAlpha = true
      // floorTexture.wrapS = THREE.MirroredRepeatWrapping
      // floorTexture.wrapT = THREE.MirroredRepeatWrapping
      // floorTexture.repeat.set(1,1)
      // floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.FrontSide } );
    } else {
      floorMaterial = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.FrontSide
      })
    }


    var floorGeometry = new THREE.PlaneGeometry(width, height)
    // var floorGeometry = new THREE.BoxGeometry(width, height, 10, 10, 10)

    var floor = new THREE.Mesh(floorGeometry, floorMaterial)

    floor.receiveShadow = true

    floor.rotation.x = - Math.PI / 2
    floor.position.y = -2

    floor.name = 'floor'

    this._scene3d.add(floor)
  }

  createObjects(components, canvasSize) {

    // var obj = new THREE.Object3D();

    components.forEach(model => {

      var item
      switch (model.type) {
        case 'rack':
          item = new Rack(model, canvasSize)
          break;

        case 'forklift':
          item = new ForkLift(model, canvasSize)
          break;

        case 'person':
          item = new Person(model, canvasSize)
          break;

        case 'rect':
          item = new Plane(model, canvasSize)
          break;

        case 'humidity-sensor':
          item = new HumiditySensor(model, canvasSize, this)
          break;


        case 'path':
          item = new Path(model, canvasSize, this)
          break;

        // case 'marker':
        //   item = new Marker(model, canvasSize, this)
        //   break;

        default:
          break;
      }

      if(item)
        this._scene3d.add(item)
        // obj.add(item)

    })

    // this._scene3d.add(obj);
  }

  createHeatmap(width, height) {

    if(this._model.useHeatmap === false)
      return

    var div = document.createElement('div');

    this._heatmap = h337.create({
      container: div,
      width: width,
      height: height,
      radius: Math.sqrt(width * width + height * height) / 4
    })

    var heatmapMaterial = new THREE.MeshBasicMaterial({
      side: THREE.FrontSide,
      transparent : true,
      visible : false
    })

    var heatmapGeometry = new THREE.PlaneGeometry(width, height)

    var heatmap = new THREE.Mesh(heatmapGeometry, heatmapMaterial)

    heatmap.rotation.x = - Math.PI / 2
    heatmap.position.y = -1

    heatmap.name = 'heatmap'

    this._scene3d.add(heatmap)

  }

  navigatePath(targetNames) {

    var currentPosition = {
      x: 0,
      y: 0,
      z: 0
    }

    for (let i in targetNames) {
      let targetName = targetNames[i]
      let targetObject = this.findTarget(targetName)

      this.emphasizeTarget(targetObject)

      let targetRack = targetObject.parent
      targetRack.geometry.computeBoundingBox()
      let targetRackBoundBox = targetRack.geometry.boundingBox

      // let targetPath = this.findPath(targetName)
      let sprite = this.makeTextSprite(Number(i)+1, {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)'
      })
      sprite.position.set(0, 100, 0)

      let cone = this.createNotifyCone()

      sprite.position.set(0, targetRackBoundBox.max.y + 40, 0)
      cone.position.set(0, targetRackBoundBox.max.y + 10, 0)

      sprite.name = targetName + "-nav"
      cone.name = targetName + "-cone"

      targetRack.add(sprite)
      // this._scene3d.add(sprite)
      targetRack.add(cone)

      //
      // this._scene3d.add(sprite)

      // if(targetPath)
      //   currentPosition = this.drawPath(currentPosition, targetPath)
    }

    this.render_threed()

  }

  findTarget(name) {
    var targetObject = this._scene3d.getObjectByName(name, true)
    if(!targetObject)
      return

    return targetObject
  }



  emphasizeTarget(object) {

    this._scene3d.updateMatrixWorld()

    var box = new THREE.BoxHelper(object, 0xff3333)
    box.material.linewidth = 10
    box.name = object.name + '-emp'

    this._scene3d.add(box)

  }

  createNotifyCone() {

    var geometry = new THREE.ConeGeometry( 10, 10, 32, true );
    var material = new THREE.MeshBasicMaterial( {color: 0xff3300} );
    var cone = new THREE.Mesh( geometry, material );

    cone.rotation.z = Math.PI

    return cone

  }

  findPath(target) {
    var targetObject = this._scene3d.getObjectByName(target, true)
    if(!targetObject)
      return

    targetObject = targetObject.parent  // 찾은 stock에 강조표시를 하면 눈이 띄지 않는다.
                                        // 부모(Rack)에 강조표시.

    // targetObject.updateMatrix()
    this._scene3d.updateMatrixWorld()

    var position = targetObject.getWorldPosition()

    var scale = targetObject.getWorldScale()

    var box = new THREE.BoxHelper(targetObject, 0xff3333)

    box.material.linewidth = this.model.zoom * 0.1

    this._scene3d.add(box)

    // this.makeTextSprite()

    // var box = new THREE.BoxHelper(targetObject, 0xff3333)
    // box.material.linewidth = 10
    //
    // this._scene3d.add(box)


    // position =

    return {
      x: position.x,
      y: position.y,
      z: position.z
    }

  }

  drawPath(current, target) {

    let tX = target.x;
    let tY = target.y;
    let tZ = target.z;

    let cX = current.x;
    let cY = current.y;
    let cZ = current.z;

    let lineWidth = 5

    let material = new THREE.LineBasicMaterial({
      color : 0xff3333,
      linewidth: lineWidth
    })

    let geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(cX, 0, cZ))
    geometry.vertices.push(new THREE.Vector3(tX, 0, tZ))

    let line = new THREE.Line(geometry, material)

    this._scene3d.add(line)

    return target

  }

  updateHeatmapTexture() {
    var heatmap = this._scene3d.getObjectByName('heatmap', true)

    var texture = new THREE.Texture(this._heatmap._renderer.canvas)
    texture.needsUpdate = true;

    heatmap.material.map = texture

    heatmap.material.visible = true
  }

  makeTextSprite( message, parameters ) {

    if(!message)
      return

  	if ( parameters === undefined ) parameters = {};

  	var fontFace = parameters.hasOwnProperty("fontFace") ?
  		parameters["fontFace"] : "Arial";

  	var fontSize = parameters.hasOwnProperty("fontSize") ?
  		parameters["fontSize"] : 90;

  	var textColor = parameters.hasOwnProperty("textColor") ?
  		parameters["textColor"] : 'rgba(255,30,30,1)';

  	var textBorderColor = parameters.hasOwnProperty("textBorderColor") ?
  		parameters["textBorderColor"] : 'rgba(0,0,0,1)';

    var borderWidth = parameters.hasOwnProperty("borderWidth") ?
		  parameters["borderWidth"] : 4;

  	var borderColor = parameters.hasOwnProperty("borderColor") ?
		  parameters["borderColor"] : 'rgba(0, 0, 0, 1.0)';

	  var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		  // parameters["backgroundColor"] : 'rgba(51, 51, 51, 1.0)';
		  parameters["backgroundColor"] : 'rgba(255, 255, 255, 1.0)';

    var radius = parameters.hasOwnProperty("radius") ?
		  parameters["radius"] : 30;

    var vAlign = parameters.hasOwnProperty("vAlign") ?
		  parameters["vAlign"] : 'middle';

    var hAlign = parameters.hasOwnProperty("hAlign") ?
		  parameters["hAlign"] : 'center';


  	var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    // document.body.appendChild(canvas)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    context.font = fontSize + "px " + fontFace;
    context.textBaseline = "alphabetic";
    context.textAlign = "left";

    var textWidth = 0

    var msgArr = String(message).split('\n')

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    for(let i in msgArr) {
      // get size data (height depends only on font size)
      var metrics = context.measureText( msgArr[i] );

      if(textWidth < metrics.width)
        textWidth = metrics.width;

    }

    var tx = textWidth/ 2.0;
    var ty = fontSize / 2.0;

    // then adjust for the justification
    if ( vAlign == "bottom")
      ty = 0;
    else if (vAlign == "top")
      ty = fontSize;

    if (hAlign == "left")
      tx = textWidth;
    else if (hAlign == "right")
      tx = 0;


  	this.roundRect(context, cx - tx, cy - ty * msgArr.length + 0.28 * fontSize,  textWidth, fontSize * 1.28 * msgArr.length, radius, borderWidth, borderColor, backgroundColor);

  	// text color
  	context.fillStyle = textColor;
    context.strokeStyle = textBorderColor;
    context.lineWidth = 3

    for(let i in msgArr) {
      context.fillText( msgArr[i], cx - tx, cy + ty / msgArr.length * (i+1) );
      context.strokeText( msgArr[i], cx - tx, cy + ty / msgArr.length * (i+1) );
    }

  	// canvas contents will be used for a texture
  	var texture = new THREE.Texture(canvas)
  	texture.needsUpdate = true;

  	var spriteMaterial = new THREE.SpriteMaterial({ map: texture } );
  	var sprite = new THREE.Sprite( spriteMaterial );
  	sprite.scale.set(window.innerWidth /2 , window.innerWidth / 4, 1);
  	// sprite.scale.set(canvas.width, canvas.height,1.0);

    sprite.raycast = function(){}

  	return sprite;
  }


  destroy_scene3d() {
    this.stop();
    this._renderer && this._renderer.clear()
    this._renderer = undefined
    this._camera = undefined
    this._2dCamera = undefined
    this._keyboard = undefined
    this._controls = undefined
    this._projector = undefined
    this._load_manager = undefined

    this._scene3d = undefined
    this._scene2d = undefined
  }

  init_scene3d() {

    if(this._scene3d)
      this.destroy_scene3d()

    // window.addEventListener('focus', this.onWindowFocus.bind(this));
    // window.addEventListener('blur', this.onWindowBlur.bind(this));

    registerLoaders()

    var {
      width,
      height,
      fov = 45,
      near = 0.1,
      far = 20000,
      fillStyle = '#424b57',
      light = 0xffffff
    } = this.model
    var {
      components = []
    } = this.hierarchy

    // SCENE
    this._scene3d = new THREE.Scene()
    this._scene2d = new THREE.Scene()

    // CAMERA
    var aspect = width / height

    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this._2dCamera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 1, 1000)

    this._scene3d.add(this._camera)
    this._scene2d.add(this._2dCamera)
    this._camera.position.set(800,800,800)
    this._2dCamera.position.set(800,800,800)
    this._camera.lookAt(this._scene3d.position)
    this._2dCamera.lookAt(this._scene2d.position)

    // RENDERER
    this._renderer = new THREE.WebGLRenderer({
      // precision: 'mediump',
      alpha: true
    });

    this._renderer.autoClear = false

    this._renderer.setClearColor(0xffffff, 0) // transparent
    // this._renderer.setClearColor(0x000000, 0) // transparent
    this._renderer.setSize(width, height)
    this._renderer.shadowMap.enabled = true

    // CONTROLS
    this._controls = new ThreeControls(this._camera, this)

    // LIGHT
    var _light = new THREE.PointLight(light, 1)
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
    this._camera.add(_light)
    this._camera.castShadow = true

    this._raycaster = new THREE.Raycaster()
    // this._mouse = { x: 0, y: 0, originX: 0, originY : 0 }
    this._mouse = new THREE.Vector2()


    this._tick = 0
    this._clock = new THREE.Clock(true)

    this.createHeatmap(width, height)
    this.createFloor(fillStyle, width, height)
    this.createObjects(components, { width, height })

    // this.navigatePath(['LOC-1-1-1-A-1', 'LOC-2-1-1-A-1'])



    // initialize object to perform world/screen calculations
    // this._projector = new THREE.Projector();

    this._load_manager = new THREE.LoadingManager();
    this._load_manager.onProgress = function(item, loaded, total){

    }

    this.animate()
  }

  animate() {
    this._animationFrame = requestAnimationFrame( this.animate.bind(this) );

    var delta = this._clock.getDelta()

    this.update();

  }

  stop() {
    cancelAnimationFrame(this._animationFrame)
  }

  update() {
    this._controls.update();
  }

  get scene3d() {
    if(!this._scene3d)
      this.init_scene3d()
    return this._scene3d
  }

  render_threed() {
    this._renderer.clear()
    this._renderer && this._renderer.render(this._scene3d, this._camera)
    this.invalidate()
  }

  /* Container Overides .. */

  _draw(ctx) {

    if(this.model.threed) {
      return
    }

    super._draw()
  }

  _post_draw(ctx) {

    var {
      left,
      top,
      width,
      height,
      threed,
      fov = 45,
      near = 0.1,
      far = 20000,
      zoom = 100,
      light = 0xffffff
    } = this.model

    if(threed) {

      if(!this._scene3d) {
        this.init_scene3d()
        this.render_threed()
      }

      if(this._dataChanged) {
        if(this._pickingLocations) {
          for(let i in this._pickingLocations) {
            let loc = this._pickingLocations[i]

            let empObj = this._scene3d.getObjectByName(loc + '-emp', true)
            if(empObj) {
              this._scene3d.remove(empObj)
            }
            let coneObj = this._scene3d.getObjectByName(loc + '-cone', true)
            if(coneObj) {
              coneObj.parent.remove(coneObj)
            }
            let navObj = this._scene3d.getObjectByName(loc + '-nav', true)
            if(navObj) {
              navObj.parent.remove(navObj)
            }

          }
        }

        this._pickingLocations = []

        this._data && this._data.forEach(d => {
          let object = this._scene3d.getObjectByName(d.loc, true)
          if(object) {
            object.userData = d;
            object.onUserDataChanged()

            if(d.navigationData) {
              this._pickingLocations.push(d.loc)
            }
          }

        })

        this._dataChanged = false

        this.navigatePath(this._pickingLocations)
      }

      ctx.drawImage(
        this._renderer.domElement, 0, 0, width, height,
        left, top, width, height
      )

    } else {
      super._post_draw(ctx);
    }
  }

  get layout() {
    return Layout.get('three')
  }

  roundRect(ctx, x, y, w, h, r, borderWidth, borderColor, fillColor) {
    // no point in drawing it if it isn't going to be rendered
    if (fillColor == undefined && borderColor == undefined)
      return;

    let left = x - borderWidth - r;
    let right = left + w + borderWidth * 2 + r * 2
    let top = y - borderWidth - r
    let bottom = top + h + borderWidth * 2 + r * 2

    // x -= borderWidth + r;
    // y += borderWidth + r;
    // w += borderWidth * 2 + r * 2;
    // h += borderWidth * 2 + r * 2;

    ctx.beginPath();
    ctx.moveTo(left+r, top);
    ctx.lineTo(right-r, top);
    ctx.quadraticCurveTo(right, top, right, top+r);
    ctx.lineTo(right, bottom-r);
    ctx.quadraticCurveTo(right, bottom, right-r, bottom);
    ctx.lineTo(left+r, bottom);
    ctx.quadraticCurveTo(left, bottom, left, bottom-r);
    ctx.lineTo(left, top+r);
    ctx.quadraticCurveTo(left, top, left+r, top);
    ctx.closePath();

    ctx.lineWidth = borderWidth;

    // background color
    // border color

    // if the fill color is defined, then fill it
    if (fillColor != undefined) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }

    if (borderWidth > 0 && borderColor != undefined) {
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    }
  }

  getObjectByRaycast() {

    var intersects = this.getObjectsByRaycast()
    var intersected

    if(intersects.length > 0) {
      intersected = intersects[0].object
    }

    return intersected
  }

  getObjectsByRaycast() {
    var intersected = null
    // find intersections

    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)

    // var vector = new THREE.Vector3( this._mouse.x, this._mouse.y, 1 );
    var vector = this._mouse
    if(!this._camera)
      return

    this._raycaster.setFromCamera(vector, this._camera)

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = this._raycaster.intersectObjects( this._scene3d.children, true );

    return intersects
  }

  /* Event Handlers */

  onchange(after, before) {

    if(after.hasOwnProperty('width')
      || after.hasOwnProperty('height')
      || after.hasOwnProperty('threed'))
      this.destroy_scene3d()

    if(after.hasOwnProperty('autoRotate')) {
      this._controls.autoRotate = after.autoRotate
    }

    if(after.hasOwnProperty('fov')
      || after.hasOwnProperty('near')
      || after.hasOwnProperty('far')
      || after.hasOwnProperty('zoom')) {

      this._camera.near = this.model.near
      this._camera.far = this.model.far
      this._camera.zoom = this.model.zoom * 0.01
      this._camera.fov = this.model.fov
      this._camera.updateProjectionMatrix();

      this._controls.cameraChanged = true
    }

    if(after.hasOwnProperty("data")){
      if(this._data !== after.data) {
        this._data = after.data
        this._dataChanged = true
      }
    }

    // if(after.hasOwnProperty('autoRotate')) {
    //   this.model.autoRotate = after.autoRotate
    // }

    this.invalidate()
  }

  onmousedown(e) {
    if(this._controls) {
      this._controls.onMouseDown(e)
    }
  }

  onmousemove(e) {

    if(this._controls) {
      var pointer = this.transcoordC2S(e.offsetX, e.offsetY)

      // this._mouse.originX = this.getContext().canvas.offsetLeft +e.offsetX;
      // this._mouse.originY = this.getContext().canvas.offsetTop + e.offsetY;

      this._mouse.x = ( (pointer.x - this.model.left ) / (this.model.width) ) * 2 - 1;
      this._mouse.y = - ( (pointer.y - this.model.top ) / this.model.height ) * 2 + 1;

      var object = this.getObjectByRaycast()

      if(object && object.onmousemove)
        object.onmousemove(e, this)

      this._controls.onMouseMove(e)

      e.stopPropagation()
    }
  }

  onwheel(e) {
    if(this._controls) {
      this.handleMouseWheel(e)
      e.stopPropagation()
    }
  }

  ondragstart(e) {
    if(this._controls) {
      this._controls.onDragStart(e)
      e.stopPropagation()
    }
  }

  ondragmove(e) {
    if(this._controls) {
      this._controls.onDragMove(e)
      e.stopPropagation()
    }
  }

  ondragend(e) {
    if(this._controls) {
      this._controls.onDragEnd(e)
      e.stopPropagation()
    }
  }

  ontouchstart(e) {
    if(this._controls) {
      this._controls.onTouchStart(e)
      e.stopPropagation()
    }
  }

  ontouchmove(e) {
    if(this._controls) {
      this._controls.onTouchMove(e)
      e.stopPropagation()
    }
  }

  ontouchend(e) {
    if(this._controls) {
      this._controls.onTouchEnd(e)
      e.stopPropagation()
    }
  }

  onkeydown(e) {
    if(this._controls) {
      this._controls.onKeyDown(e)
      e.stopPropagation()
    }
  }

  handleMouseWheel( event ) {

    var delta = 0;
    var zoom = this.model.zoom

    delta = - event.deltaY
    zoom += delta * 0.01
    if(zoom < 0)
      zoom = 0

    this.set('zoom', zoom)

  }

  onWindowFocus(e) {
    console.log("focus!!")
    // this.render_threed();
  }

  onWindowBlur(e) {
    // this.stop()
  }

}

Component.register('three-container', ThreeContainer)
