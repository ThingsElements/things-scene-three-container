const STATUS_COLORS = ['black', '#ccaa76', '#ff1100', '#252525', '#6ac428']

export default class Stock extends THREE.Mesh {

  constructor(model) {

    super();

    this._model = model;

    this.createObject(model);

  }

  createObject(model) {

    this.createStock(model.width, model.height, model.depth)

  }

  createStock(w, h, d) {

    this.geometry = new THREE.BoxGeometry(w, d, h);
    this.material = new THREE.MeshLambertMaterial( { color : '#ccaa76', side: THREE.FrontSide } );
    this.type = 'stock'

    this.castShadow = true

  }

  onUserDataChanged() {
    this.material.color.set(STATUS_COLORS[this.userData.status])

    if(d.status === 0) {
      this.visible = false
    } else {
      this.visible = true
    }
  }

}
