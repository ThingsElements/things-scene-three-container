var { Rect, Component } = scene

export default class VideoPlayer360 extends Rect {

  init_scene(width, height) {
    var { mute, loop, autoplay, src, fov } = this.model

    this._time = new Date().getTime();

    // create a local THREE.js scene
    this._scene = new THREE.Scene();

    // create ThreeJS camera
    this._camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    this._camera.setLens(fov);

    // create ThreeJS renderer and append it to our object
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize( width, height );
    this._renderer.autoClear = false;
    this._renderer.setClearColor( 0x333333, 1 );

    // create off-dom video player
    this._video = document.createElement('video');
    this._video.setAttribute('crossorigin', 'anonymous');
    this._video.loop = loop;
    this._video.muted = mute;
    this._texture = new THREE.Texture( this._video );

    // make a self reference we can pass to our callbacks
    var self = this;

    // attach video player event listeners
    this._video.addEventListener("ended", function() {

    });

    // Progress Meter
    this._video.addEventListener("progress", function() {

      var percent = null;
      if (self._video && self._video.buffered && self._video.buffered.length > 0 && self._video.buffered.end && self._video.duration) {
          percent = self._video.buffered.end(0) / self._video.duration;
      }
      // Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
      // to be anything other than 0. If the byte count is available we use this instead.
      // Browsers that support the else if do not seem to have the bufferedBytes value and
      // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
      else if (self._video && self._video.bytesTotal !== undefined && self._video.bytesTotal > 0 && self._video.bufferedBytes !== undefined) {
          percent = self._video.bufferedBytes / self._video.bytesTotal;
      }

      // Someday we can have a loading animation for videos
      var cpct = Math.round(percent * 100);
      if(cpct === 100) {
          // do something now that we are done
      } else {
          // do something with this percentage info (cpct)
      }
    });

    // Video Play Listener, fires after video loads
    // this._video.addEventListener("canplaythrough", function() {
    this._video.addEventListener("canplay", function() {

      if(autoplay === true) {
        self._video.play();
        self._videoReady = true;
      }
    });

    // set the video src and begin loading
    this._video.src = src;

    this._texture.generateMipmaps = false;
    this._texture.minFilter = THREE.LinearFilter;
    this._texture.magFilter = THREE.LinearFilter;
    this._texture.format = THREE.RGBFormat;

    // create ThreeJS mesh sphere onto which our texture will be drawn
    this._mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 80, 50 ), new THREE.MeshBasicMaterial( { map: this._texture } ) );
    this._mesh.scale.x = -1; // mirror the texture, since we're looking from the inside out
    this._scene.add(this._mesh);

    this.animate();
  }

  destroy_scene() {
    cancelAnimationFrame(this._requestAnimationId);
    this._requestAnimationId = undefined
    this._texture.dispose()
    this._scene.remove(this._mesh)
    this.unloadVideo()

    this._renderer = undefined
    this._camera = undefined
    this._keyboard = undefined
    this._controls = undefined
    this._projector = undefined
    this._load_manager = undefined

    this._scene = undefined
    this._video = undefined
  }

  loadVideo(videoFile) {
    this._video.src = videoFile;
  }

  unloadVideo() {
    // overkill unloading to avoid dreaded video 'pending' bug in Chrome. See https://code.google.com/p/chromium/issues/detail?id=234779
    this.pause();
    this._video.src = '';
    this._video.removeAttribute('src');
  }

  play() {
    this._video.play()
  }

  pause() {
    this._video.pause()
  }

  resize(w, h) {
    this._renderer.setSize(w, h);
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
  }

  animate() {

    this._requestAnimationId = requestAnimationFrame( this.animate.bind(this) );

    if ( this._video.readyState === this._video.HAVE_ENOUGH_DATA) {
      if(typeof(this._texture) !== "undefined" ) {
        var ct = new Date().getTime();
        if(ct - this._time >= 30) {
          this._texture.needsUpdate = true;
          this._time = ct;
        }
      }
    }

    this.render()
    this.invalidate()
  }

  render() {
    this._lat = Math.max( - 85, Math.min( 85, this._lat || 0 ) );
    this._phi = ( 90 - this._lat ) * Math.PI / 180;
    this._theta = (this._lon || 0) * Math.PI / 180;

    var cx = 500 * Math.sin( this._phi ) * Math.cos( this._theta );
    var cy = 500 * Math.cos( this._phi );
    var cz = 500 * Math.sin( this._phi ) * Math.sin( this._theta );

    this._camera.lookAt(new THREE.Vector3(cx, cy, cz));

    // distortion
    if(this.model.flatProjection) {
      this._camera.position.x = 0;
      this._camera.position.y = 0;
      this._camera.position.z = 0;
    } else {
      this._camera.position.x = - cx;
      this._camera.position.y = - cy;
      this._camera.position.z = - cz;
    }

    this._renderer.clear();
    this._renderer.render( this._scene, this._camera );
  }

  /* Component Overides .. */

  _draw(ctx) {

    var {
      left,
      top,
      width,
      height,
      src
    } = this.model

    if(src) {

      if(!this._scene) {
        this.init_scene(width, height)
        this.render()
      }

      ctx.drawImage(
        this._renderer.domElement, 0, 0, width, height,
        left, top, width, height
      )

    } else {
      super._draw(ctx);
    }
  }

  onchange(after, before) {

    if(after.hasOwnProperty('width')
      || after.hasOwnProperty('height')) {
      this.resize(this.model.width, this.model.height)
    }
      
    if(after.hasOwnProperty('src'))
      this.destroy_scene()

    this.invalidate()
  }

  onmousedown(e) {
  }

  onmousemove(e) {
  }

  onwheel(e) {
  }

  ondragstart(e) {
  }

  ondragmove(e) {
  }

  ondragend(e) {
  }

  ontouchstart(e) {
  }

  ontouchmove(e) {
  }

  ontouchend(e) {
  }

  onkeydown(e) {
  }

}

Component.register('video-player-360', VideoPlayer360)
