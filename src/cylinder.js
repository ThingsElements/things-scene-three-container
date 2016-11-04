var { Component, Ellipse } = scene

export default class Cylinder extends THREE.Mesh{

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

    this.createCylinder(rx, rz)

    this.position.set(cx,rz / 2,cy) // z좌표는 땅에 붙어있게 함
    this.rotation.y = rotation || 0

  }

  createCylinder(rx, rz) {

    let {
      fillStyle = 'lightgray'
    } = this.model

    this.geometry = new THREE.CylinderGeometry(rx, rx, rz, 25);
    this.material = new THREE.MeshLambertMaterial( { color : fillStyle, side: THREE.FrontSide } );

    this.castShadow = true

  }

  get model() {
    return this._model
  }

}

export class Cylinder2d extends Ellipse {
  get controls() {}
}


Component.register('cylinder', Cylinder2d)
scene.Component3d.register('cylinder', Cylinder)
