/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
var { Component, Rect } = scene

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'number',
    label: 'depth',
    name: 'depth',
    property: 'depth'
  }]
}

export default class Cube extends THREE.Mesh {

  constructor(model, canvasSize) {

    super();

    this._model = model;

    this.createObject(model, canvasSize);

    // this.up = new THREE.Vector3(1, 0, 0)

    // this.updateMatrix();

    var axisHelper = new THREE.AxisHelper( 100 );
    this.add(axisHelper);


  }

  createObject(model, canvasSize) {

    let cx = (model.left + (model.width / 2)) - canvasSize.width / 2
    let cy = (model.top + (model.height / 2)) - canvasSize.height / 2
    let cz = model.zPos || 0.5 * model.depth

    let rotation = model.rotation
    this.type = model.type

    this.createCube(model.width, model.height, model.depth)

    this.position.set(cx, cz, cy)
    this.rotation.y = rotation || 0

  }

  createCube(w, h, d) {

    let {
      fillStyle = 'lightgray'
    } = this.model

    this.geometry = new THREE.BoxGeometry(w, d, h);
    this.material = new THREE.MeshLambertMaterial({ color: fillStyle, side: THREE.FrontSide });

    // this.castShadow = true

  }

  get model() {
    return this._model
  }

  setPosition(location) {
    var { x, y } = location

    this.position.set(x, 0, y);
  }

  setQuaternion(quaternion) {
    var { x, y, z, w } = quaternion

    var q = new THREE.Quaternion()

    q.set(x, y, z, w);

    this.setRotationFromQuaternion(q.normalize());
    this.updateMatrix()
  }

  onUserDataChanged() {
    if (!this.userData)
      return

    if (this.userData.hasOwnProperty('location')) {
      this.setPosition(this.userData.location);
    }

    if (this.userData.hasOwnProperty('qx') && this.userData.hasOwnProperty('qy') && this.userData.hasOwnProperty('qz') && this.userData.hasOwnProperty('qw')) {
      this.setQuaternion({
        x: this.userData.qx,
        y: this.userData.qy,
        z: this.userData.qz,
        w: this.userData.qw
      })
    }


  }

}

export class Cube2d extends Rect {
  is3dish() {
    return true
  }

  get controls() { }

  get nature() {
    return NATURE
  }
}


Component.register('cube', Cube2d)
scene.Component3d.register('cube', Cube)
