import Stock from './stock'

export default class Rack extends THREE.Object3D {

  constructor(model, canvasSize) {

    super();

    this._model = model;

    this.createObject(model, canvasSize);
    this.castShadow = true
  }

  createObject(model, canvasSize) {

    let scale = 0.7;

    let cx = (model.left + (model.width/2)) - canvasSize.width/2
    let cy = (model.top + (model.height/2)) - canvasSize.height/2
    let cz = 0.5 * model.depth * model.shelves

    let rotation = model.rotation

    this.type = model.type

    var frame = this.createRackFrame(model.width, model.height, model.depth * model.shelves)

    this.add(frame)

    var shelfPattern = model.shelfPattern;

    for(var i = 0; i < model.shelves; i++) {

      let bottom = - model.depth * model.shelves * 0.5
      if( i > 0) {
        let board = this.createRackBoard(model.width, model.height)
        board.position.set(0, bottom + (model.depth * i), 0)
        board.rotation.x = Math.PI / 2;
        board.material.opacity = 0.5
        board.material.transparent = true

        this.add(board)
      }

      let stock = new Stock({
        width : model.width * scale,
        height : model.height * scale,
        depth : model.depth * scale,
        fillStyle: model.fillStyle
      })

      let stockDepth = model.depth * scale

      stock.position.set(0, bottom + (model.depth * i) + (stockDepth * 0.5), 0)
      stock.name = this.makeLocationString(this.makeShelfString(shelfPattern, i + 1, model.shelves))

      this.add(stock)
    }

    this.position.set(cx, cz, cy)
    this.rotation.y = rotation || 0

  }

  createRackFrame(w, h, d) {

    this.geometry = this.cube({
      width: w,
      height : d,
      depth : h
    })

    return new THREE.LineSegments(
      this.geometry,
      new THREE.LineDashedMaterial( { color: 0xcccccc, dashSize: 3, gapSize: 1, linewidth: 1 } )
    );

  }

  createRackBoard(w, h) {

    // var boardTexture = new THREE.TextureLoader().load('textures/textured-white-plastic-close-up.jpg');
    // boardTexture.wrapS = boardTexture.wrapT = THREE.RepeatWrapping;
    // boardTexture.repeat.set( 100, 100 );

    // var boardMaterial = new THREE.MeshBasicMaterial( { map: boardTexture, side: THREE.DoubleSide } );
    var boardMaterial = new THREE.MeshBasicMaterial( { color: '#dedede', side: THREE.DoubleSide } );
    var boardGeometry = new THREE.PlaneGeometry(w, h, 1, 1);
    var board = new THREE.Mesh(boardGeometry, boardMaterial);

    return board
  }

  cube( size ) {

    var w = size.width * 0.5;
    var h = size.height * 0.5;
    var d = size.depth * 0.5;

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( -w, -h, -d ),
      new THREE.Vector3( -w, h, -d ),
      new THREE.Vector3( -w, h, -d ),
      new THREE.Vector3( w, h, -d ),
      new THREE.Vector3( w, h, -d ),
      new THREE.Vector3( w, -h, -d ),
      new THREE.Vector3( w, -h, -d ),
      new THREE.Vector3( -w, -h, -d ),
      new THREE.Vector3( -w, -h, d ),
      new THREE.Vector3( -w, h, d ),
      new THREE.Vector3( -w, h, d ),
      new THREE.Vector3( w, h, d ),
      new THREE.Vector3( w, h, d ),
      new THREE.Vector3( w, -h, d ),
      new THREE.Vector3( w, -h, d ),
      new THREE.Vector3( -w, -h, d ),
      new THREE.Vector3( -w, -h, -d ),
      new THREE.Vector3( -w, -h, d ),
      new THREE.Vector3( -w, h, -d ),
      new THREE.Vector3( -w, h, d ),
      new THREE.Vector3( w, h, -d ),
      new THREE.Vector3( w, h, d ),
      new THREE.Vector3( w, -h, -d ),
      new THREE.Vector3( w, -h, d )
    );

    return geometry;

  }

  makeLocationString(shelfString) {
    var {
      locPattern,
      zone,
      section,
      unit
    } = this._model

    var locationString = locPattern;

    locationString = locationString.replace(/{z}/i, zone);
    locationString = locationString.replace(/{s}/i, section);
    locationString = locationString.replace(/{u}/i, unit);
    locationString = locationString.replace(/{sh}/i, shelfString);

    return locationString;
  }

  makeShelfString(pattern, shelf, length) {
    /**
     *  pattern #: 숫자
     *  pattern 0: 고정 자리수
     *  pattern -: 역순
     */

    var isReverse = /^\-/.test(pattern);
    pattern = pattern.replace(/#+/, '#');

    var fixedLength = (pattern.match(/0/g) || []).length || 0
    var shelfString = String(isReverse ? length - shelf + 1 : shelf)

    if(shelfString.length > fixedLength && fixedLength > 0) {
      shelfString = shelfString.split('').shift(shelfString.length - fixedLength).join('')
    } else {
      var prefix = '';
      for(var i = 0; i < fixedLength - shelfString.length; i++) {
        prefix += '0';
      }
      shelfString = prefix + shelfString;
    }

    return shelfString
  }

  raycast(raycaster, intersects) {

  }

}


scene.Component3d.register('rack', Rack)
