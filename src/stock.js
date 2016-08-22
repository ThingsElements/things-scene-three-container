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

    if(this.userData.status === 0) {
      this.visible = false
    } else {
      this.visible = true
    }
  }

  onmousemove(e, threeContainer) {

    var tooltip = threeContainer.tooltip

    if(tooltip) {
      threeContainer._scene3d.remove(tooltip)
      threeContainer.tooltip = null
    }

    if(!this.visible)
      return;

    if(!this.userData)
      this.userData = {};

    var tooltipText = '';

    for (let key in this.userData) {
      if(this.userData[key])
        tooltipText += key + ": " + this.userData[key] + "\n"
    }

    // tooltipText = 'loc : ' + loc

    if(tooltipText.length > 0) {
      tooltip = threeContainer.tooltip = threeContainer.makeTextSprite(tooltipText)

      tooltip.position.set(this.position.x, this.position.y, this.position.z)
      threeContainer._scene3d.add(tooltip)
      threeContainer.render_threed()
    }

  }
}
