var { Component, Ellipse } = scene

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'depth',
    name: 'rz',
    property: 'rz'
  }]
}


export default class Sphere extends THREE.Mesh{

  constructor(model, canvasSize) {

    super();

    this._model = model;

    this.createObject(model, canvasSize);

  }

  createObject(model, canvasSize) {

    // let cx = (model.left + (model.width/2)) - canvasSize.width/2
    // let cy = (model.top + (model.height/2)) - canvasSize.height/2
    // let cz = 0.5 * model.depth
    let {
      cx,
      cy,
      cz = 0,
      rx,
      rz
    } = this.model

    let rotation = model.rotation
    this.type = model.type

    this.createSphere(rx, rz)

    this.position.set(cx,rx,cy) // z좌표는 땅에 붙어있게 함
    this.rotation.y = rotation || 0

  }

  createSphere(rx, rz) {

    let {
      fillStyle = 'lightgray'
    } = this.model

    this.geometry = new THREE.SphereGeometry(rx, 20, 20);
    this.material = new THREE.MeshLambertMaterial( { color : fillStyle, side: THREE.FrontSide } );

    this.castShadow = true

  }

  get model() {
    return this._model
  }

  get nature() {
    return NATURE
  }
}

export class Sphere2d extends Ellipse {
  get controls() {}
}


Component.register('sphere', Sphere2d)
scene.Component3d.register('sphere', Sphere)
