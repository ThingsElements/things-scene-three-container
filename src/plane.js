var { Component } = scene

export default class Plane extends THREE.Mesh {

  constructor(model) {

    super();

    this._model = model;

    this.createObject(model);

  }

  createObject(model) {

    this.createPlane(model.width, model.height, model.fillStyle)

  }

  createPlane(w, h, fillStyle) {

    this.geometry = new THREE.PlaneGeometry(w, h);
    if( fillStyle && fillStyle.type == 'pattern' && fillStyle.image ) {
      var texture = new THREE.TextureLoader().load(fillStyle.image)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(1,1)
      this.material = new THREE.MeshBasicMaterial( { map : texture, side: THREE.FrontSide } );
    } else {
      this.material = new THREE.MeshBasicMaterial( { color : fillStyle|| '#ccaa76', side: THREE.FrontSide } );  
    }

    this.rotation.x = - Math.PI / 2
    this.type = 'rect'

  }

}

