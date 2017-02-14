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

    let {
      fillStyle = '#ccaa76'
    } = this.model

    this.geometry = new THREE.BoxGeometry(w, d, h);
    this.material = new THREE.MeshLambertMaterial( { color : fillStyle, side: THREE.FrontSide } );
    this.type = 'stock'

    this.visible = false

    this.castShadow = true

  }

  get model() {
    return this._model
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

    var tooltip = threeContainer.tooltip || threeContainer._scene2d.getObjectByName("tooltip")

    if(tooltip) {
      threeContainer._scene2d.remove(tooltip)
      threeContainer.tooltip = null
      threeContainer.render_threed()
    }

    if(!this.visible)
      return;

    if(!this.userData)
      this.userData = {};

    var tooltipText = '';

    for (let key in this.userData) {
      if(this.userData[key] && typeof this.userData[key] != 'object' && key != 'loc')
        tooltipText += key + ": " + this.userData[key] + "\n"
    }

    // tooltipText = 'loc : ' + loc

    if(tooltipText.length > 0) {
      tooltip = threeContainer.tooltip = threeContainer.makeTextSprite(tooltipText)

      var vector = new THREE.Vector3()
      var vector2 = tooltip.getWorldScale().clone()

      var widthMultiplier = vector2.x / threeContainer.model.width
      var heightMultiplier = vector2.y / threeContainer.model.height

      vector.set(threeContainer._mouse.x, threeContainer._mouse.y, 0.5)
      vector2.normalize()

      vector2.x = vector2.x /2 * widthMultiplier
      vector2.y = -vector2.y /2 * heightMultiplier
      vector2.z = 0;

      vector.add(vector2)

      vector.unproject(threeContainer._2dCamera)
      tooltip.position.set(vector.x, vector.y, vector.z)
      tooltip.name = "tooltip"

      tooltip.scale.x = tooltip.scale.x * widthMultiplier
      tooltip.scale.y = tooltip.scale.y * heightMultiplier

      threeContainer._scene2d.add(tooltip)
      threeContainer._renderer && threeContainer._renderer.render(threeContainer._scene2d, threeContainer._2dCamera)
      threeContainer.invalidate()
    }

  }
}
