var extObj

function init() {
  if(init.done)
    return

  init.done = true

  let tgaLoader = new THREE.TGALoader();

  THREE.Loader.Handlers.add( /\.tga$/i, tgaLoader);

  let objLoader = new THREE.OBJLoader();
  let mtlLoader = new THREE.MTLLoader();

  objLoader.setPath('./obj/Casual_Man_02/')
  mtlLoader.setPath('./obj/Casual_Man_02/')

  mtlLoader.load('Casual_Man.mtl', function(materials){
    materials.preload();
    objLoader.setMaterials(materials)
    materials.side = THREE.frontSide

    objLoader.load('Casual_Man.obj', function(obj){
      extObj = obj
    })

  })
}

export default class Person extends THREE.Object3D {

  constructor(model, canvasSize) {

    super();

    this._model = model;

    this.createObject(model, canvasSize);

  }

  static get extObject() {
    if(!extObj)
      init()

    return extObj
  }

  createObject(model, canvasSize) {

    if(!Person.extObject){
      setTimeout(this.createObject.bind(this, model, canvasSize), 50)
      return;
    }

    let cx = (model.left + (model.width/2)) - canvasSize.width/2
    let cy = (model.top + (model.height/2)) - canvasSize.height/2
    let cz = 0.5 * model.depth

    let left = model.left - canvasSize.width/2
    let top = model.top - canvasSize.height/2

    let rotation = model.rotation

    this.type = 'person'
    this.add(Person.extObject.clone())
    this.scale.set(10, 10, 10)
    // this.scale.set(model.width, model.depth, model.height)
    this.position.set(cx, 0, cy)
    this.rotation.y = model.rotation || 0


  }

}

scene.Component3d.register('person', Person)
