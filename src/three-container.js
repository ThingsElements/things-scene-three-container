import Rack from './rack'
import ForkLift from './forkLift'
import Person from './person'

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

    var floorMaterial = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide
    })
    var floorGeometry = new THREE.BoxGeometry(width, height, 1, 10, 10)

    var floor = new THREE.Mesh(floorGeometry, floorMaterial)

    floor.position.y = -1
    floor.rotation.x = Math.PI / 2

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

        default:
          break;
      }
      obj.add(item)

    })

    this._scene3d.add(obj);
  }

  destroy_scene3d() {
    this._renderer = undefined
    this._camera = undefined
    this._keyboard = undefined
    this._controls = undefined
    this._projector = undefined
    this._load_manager = undefined

    this._scene3d = undefined
  }

  init_scene3d() {
    if(this._scene3d)
      this.destroy_scene3d()

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
      precision: 'mediump',
      alpha: true
    });

    this._renderer.setClearColor(0x000000, 0) // transparent
    this._renderer.setSize(width, height)

    // KEYBOARD
    // this._keyboard = new THREEx.KeyboardState()

    // CONTROLS
    // this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement)
    this._controls = new ThreeControls(this._camera, this)

    // LIGHT
    var _light = new THREE.PointLight(light)
    _light.position.set(10,10,0)
    this._camera.add(_light)

    this.createFloor(fillStyle, width, height)
    this.createObjects(components, { width, height })

    // initialize object to perform world/screen calculations
    this._projector = new THREE.Projector();

    this._load_manager = new THREE.LoadingManager();
    this._load_manager.onProgress = function(item, loaded, total){

    }
  }

  get scene3d() {
    if(!this._scene3d)
      this.init_scene3d()
    return this._scene3d
  }

  render_threed() {
    this._renderer && this._renderer.render(this.scene3d, this._camera)
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

    this.invalidate()
  }

  onmousedown(e) {
    if(this._controls)
      this._controls.onMouseDown(e)
  }

  onmousemove(e) {
    if(this._controls)
      this._controls.onMouseMove(e)
  }

  onwheel(e) {
    if(this._controls)
      this._controls.onMouseWheel(e)
  }

  ondragstart(e) {
    if(this._controls)
      this._controls.onDragStart(e)
  }

  ondragmove(e) {
    if(this._controls)
      this._controls.onDragMove(e)
  }

  ondragend(e) {
    if(this._controls)
      this._controls.onDragEnd(e)
  }

  ontouchstart(e) {
    if(this._controls)
      this._controls.onTouchStart(e)
  }

  ontouchmove(e) {
    if(this._controls)
      this._controls.onTouchMove(e)
  }

  ontouchend(e) {
    if(this._controls)
      this._controls.onTouchEnd(e)
  }

  onkeydown(e) {
    if(this._controls)
      this._controls.onKeyDown(e)
  }

}

Component.register('three-container', ThreeContainer)
