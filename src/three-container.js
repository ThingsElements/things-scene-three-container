import Rack from './rack'
import Plane from './plane'
import ForkLift from './forkLift'
import Person from './person'
import HumiditySensor from './humidity-sensor'

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
      var floorTexture = new THREE.TextureLoader().load(fillStyle.image, function() {
        self.render_threed()
      })
      // floorTexture.premultiplyAlpha = true
      // floorTexture.wrapS = THREE.MirroredRepeatWrapping
      // floorTexture.wrapT = THREE.MirroredRepeatWrapping
      // floorTexture.repeat.set(1,1)
      // floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.FrontSide } );
      floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, specular: 0x050505 } );
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

    var obj = new THREE.Object3D();

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

        default:
          break;
      }
      obj.add(item)

    })

    this._scene3d.add(obj);
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
      side: THREE.FrontSide
    })

    var heatmapGeometry = new THREE.PlaneGeometry(width, height)

    var heatmap = new THREE.Mesh(heatmapGeometry, heatmapMaterial)

    heatmap.material.transparent = true

    heatmap.rotation.x = - Math.PI / 2
    heatmap.position.y = -1

    heatmap.name = 'heatmap'

    this._scene3d.add(heatmap)

  }

  updateHeatmapTexture() {
    var heatmap = this._scene3d.getObjectByName('heatmap', true)

    var texture = new THREE.Texture(this._heatmap._renderer.canvas)
    texture.needsUpdate = true;

    heatmap.material.map = texture
  }


  destroy_scene3d() {
    this.stop();
    this._renderer && this._renderer.clear()
    this._renderer = undefined
    this._camera = undefined
    this._keyboard = undefined
    this._controls = undefined
    this._projector = undefined
    this._load_manager = undefined

    this._scene3d = undefined
  }

  init_scene3d() {
    this._mouse = { x: 0, y: 0, originX: 0, originY : 0 }

    if(!this.tooltip)
      this.createTooltip()

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
      light = 0xffffff,
      components = []
    } = this.model

    // SCENE
    this._scene3d = new THREE.Scene()

    // CAMERA
    var aspect = width / height

    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this._scene3d.add(this._camera)
    this._camera.position.set(800,800,800)
    this._camera.lookAt(this._scene3d.position)

    // RENDERER
    this._renderer = new THREE.WebGLRenderer({
      // precision: 'mediump',
      alpha: true
    });

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


    this._tick = 0
    this._clock = new THREE.Clock(true)

    this.createHeatmap(width, height)
    this.createFloor(fillStyle, width, height)
    this.createObjects(components, { width, height })


    // initialize object to perform world/screen calculations
    this._projector = new THREE.Projector();

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

    var tooltip = this.tooltip || {}

    // find intersections

    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)

    var vector = new THREE.Vector3( this._mouse.x, this._mouse.y, 1 );
    if(!this._camera)
      return

    vector.unproject( this._camera );
    var ray = new THREE.Raycaster( this._camera.position, vector.sub( this._camera.position ).normalize() );

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( this._scene3d.children, true );

    // INTERSECTED = the object in the scene currently closest to the camera
    //    and intersected by the Ray projected from the mouse position

    // if there is one (or more) intersections
    if ( intersects.length > 0 )
    {
      // if the closest object intersected is not the currently stored intersection object
      if ( intersects[ 0 ].object != this.INTERSECTED )
      {
        // restore previous intersection object (if it exists) to its original color
        // if ( this.INTERSECTED )
        //   this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
        // store reference to closest object as current intersection object
        this.INTERSECTED = intersects[ 0 ].object;
        // store color of closest object (for later restoration)
        // this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
        // set a new color for closest object
        // this.INTERSECTED.material.color.setHex( 0xffff00 );

        if( this.INTERSECTED.type === 'stock' ) {
          if(!this.INTERSECTED.visible)
            return;

          if(!this.INTERSECTED.userData)
            this.INTERSECTED.userData = {};

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

          for (let key in this.INTERSECTED.userData) {
            if(this.INTERSECTED.userData[key])
              tooltip.textContent += key + ": " + this.INTERSECTED.userData[key] + "\n"
          }

          // tooltip.textContent = 'loc : ' + loc

          if(tooltip.textContent.length > 0) {
            var mouseX = (this._mouse.x + 1) / 2 * (this.model.width)
            var mouseY = (-this._mouse.y + 1 ) / 2 * (this.model.height)

            tooltip.style.left = this._mouse.originX + 20 + 'px';
            tooltip.style.top = this._mouse.originY - 20 + 'px';
            tooltip.style.display = 'block'
          } else {
            tooltip.style.display = 'none'
          }

        }
        else if(this.INTERSECTED.parent.type === 'humidity-sensor') {
          if(!this.INTERSECTED.parent.visible)
            return;

          if(!this.INTERSECTED.parent.userData)
            this.INTERSECTED.parent.userData = {};


          tooltip.textContent = '';

          for (let key in this.INTERSECTED.parent.userData) {
            if(this.INTERSECTED.parent.userData[key])
              tooltip.textContent += key + ": " + this.INTERSECTED.parent.userData[key] + "\n"
          }

          // tooltip.textContent = 'loc : ' + loc

          if(tooltip.textContent.length > 0) {
            var mouseX = (this._mouse.x + 1) / 2 * (this.model.width)
            var mouseY = (-this._mouse.y + 1 ) / 2 * (this.model.height)

            tooltip.style.left = this._mouse.originX + 20 + 'px';
            tooltip.style.top = this._mouse.originY - 20 + 'px';
            tooltip.style.display = 'block'
          } else {
            tooltip.style.display = 'none'
          }

        }

        else {
          tooltip.style.display = 'none'
        }


      }
    }
    else // there are no intersections
    {
      // restore previous intersection object (if it exists) to its original color
      // if ( this.INTERSECTED )
      //   this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
      // remove previous intersection object reference
      //     by setting current intersection object to "nothing"
      this.INTERSECTED = null;

      tooltip.style.display = 'none'
    }

    this._controls.update();

  }

  createTooltip() {
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

  get scene3d() {
    if(!this._scene3d)
      this.init_scene3d()
    return this._scene3d
  }

  render_threed() {
    this._renderer && this._renderer.render(this._scene3d, this._camera)
    this.invalidate()
  }

  /* Container Overides .. */

  _draw(ctx) {

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

        this._data && this._data.forEach(d => {
          let object = this._scene3d.getObjectByName(d.loc, true)
          if(object) {
            object.userData = d;
          }

          if(object){
            object.onUserDataChanged()
          }
        })

        this._dataChanged = false
      }

      ctx.drawImage(
        this._renderer.domElement, 0, 0, width, height,
        left, top, width, height
      )

    } else {
      super._draw(ctx);
    }
  }

  get layout() {
    return Layout.get('three')
  }

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

      this._mouse.originX = this.getContext().canvas.offsetLeft +e.offsetX;
      this._mouse.originY = this.getContext().canvas.offsetTop + e.offsetY;

      this._mouse.x = ( (pointer.x - this.model.left ) / (this.model.width) ) * 2 - 1;
      this._mouse.y = - ( (pointer.y - this.model.top ) / this.model.height ) * 2 + 1;

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
