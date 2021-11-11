import * as THREE from 'three';

export default class ShaderPass {
  constructor(renderer, shader, width, height, format, type, minFilter, magFilter, wrapS, wrapT) {
    this.renderer = renderer;
    this.shader = shader;
    this.orthoScene = new THREE.Scene();
    this.fbo = new THREE.WebGLRenderTarget(width, height, {
      wrapS: wrapS || THREE.ClampToEdgeWrapping,
      wrapT: wrapT || THREE.ClampToEdgeWrapping,
      minFilter: minFilter || THREE.LinearFilter,
      magFilter: magFilter || THREE.LinearFilter,
      format: format || THREE.RGBAFormat,
      type: type || THREE.UnsignedByteType,
      stencilBuffer: false,
      depthBuffer: false,
    });
    this.orthoCamera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.00001, 1000);
    this.orthoQuad = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), this.shader);
    this.orthoQuad.scale.set(width, height, 1);
    this.orthoScene.add(this.orthoQuad);
    this.texture = this.fbo.texture;
  }

  render(final, renderFBO = this.fbo) {
    const renderTarget = final ? null : renderFBO;
    this.renderer.setRenderTarget(renderTarget);
    this.renderer.render(this.orthoScene, this.orthoCamera);
  }

  setSize(width, height) {
    this.orthoQuad.scale.set(width, height, 1);
    this.fbo.setSize(width, height);
    this.orthoQuad.scale.set(width, height, 1);
    this.orthoCamera.left = -width / 2;
    this.orthoCamera.right = width / 2;
    this.orthoCamera.top = height / 2;
    this.orthoCamera.bottom = -height / 2;
    this.orthoCamera.updateProjectionMatrix();
  }
}
