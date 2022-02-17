import * as THREE from 'three';
import { randomRange } from '../utils/number';
import Point from '../geom/Point';

export function toScreenPosition(obj, camera, width, height) {
  const vector = new THREE.Vector3();

  const widthHalf = width / 2;
  const heightHalf = height / 2;

  obj.updateMatrixWorld();
  vector.setFromMatrixPosition(obj.matrixWorld);
  vector.project(camera);

  return new THREE.Vector2(vector.x * widthHalf + widthHalf, vector.y * -heightHalf + heightHalf);
}

export function localToGlobal3d(element, root, point = new THREE.Vector3(), debug = false) {
  while (element !== root) {
    if (debug) {
      console.log('$$$ element', element, element.position);
    }
    point.x += element.position.x;
    point.y += element.position.y;
    point.z += element.position.z;
    element = element.parent;
  }
  return point;
}

export function getTriangleCenter(triangle) {
  var vectorA = triangle.a;
  var vectorB = triangle.b;
  var vectorC = triangle.c;

  var centerX = (vectorA[0] + vectorB[0] + vectorC[0]) / 3;
  var centerY = (vectorA[1] + vectorB[1] + vectorC[1]) / 3;
  var centerZ = (vectorA[2] + vectorB[2] + vectorC[2]) / 3;

  return new THREE.Vector3(centerX, centerY, centerZ);
}

export function FillTriangleWithPointsBarycentric(vector1, vector2, vector3, output) {
  let triangle = new THREE.Triangle(vector1, vector2, vector3);
  let area = triangle.getArea();
  console.log('Area is ' + area);
  area = Math.sqrt(area);
  console.log('sqrt Area is ' + area);
  let increment = 0.1 / area;
  for (let r1 = 0; r1 <= 1; r1 += increment) {
    for (let r2 = 0; r2 <= 1; r2 += increment) {
      // of course this is javascript we have to write this out instead of
      // using only one line
      let sqrtR = Math.sqrt(r1);
      let A = 1 - sqrtR;
      let B = sqrtR * (1 - r2);
      let C = sqrtR * r2;
      let x = A * vector1.x + B * vector2.x + C * vector3.x;
      let y = A * vector1.y + B * vector2.y + C * vector3.y;
      let z = A * vector1.z + B * vector2.z + C * vector3.z;
      output.push(x, y, z);
    }
  }
}

export function randomVector3(range) {
  return new THREE.Vector3(randomRange(-range, range), randomRange(-range, range), randomRange(-range, range));
}

export function randomVector2(range) {
  return new THREE.Vector2(randomRange(-range, range), randomRange(-range, range));
}

export function screenCoordinatesFromCenter(point, screenRectangle) {
  const pointFromCenter = new Point();
  pointFromCenter.x = (point.x / screenRectangle.width) * 2 - 1;
  pointFromCenter.y = -(point.y / screenRectangle.height) * 2 + 1;
  return pointFromCenter;
}

export function raycastRectangle(raycaster, camera, plane, topLeft2d, bottomRight2d) {
  raycaster.setFromCamera(topLeft2d, camera);
  let topLeft3d;
  let intersects = raycaster.intersectObject(plane);
  if (intersects.length > 0) {
    topLeft3d = intersects[0].point;
  }
  raycaster.setFromCamera(bottomRight2d, camera);
  let bottomRight3d;
  intersects = raycaster.intersectObject(plane);
  if (intersects.length > 0) {
    bottomRight3d = intersects[0].point;
  }
  const box = new THREE.Box3();
  box.setFromPoints([topLeft3d, bottomRight3d]);
  return box;
}

export const glsl = (strings, ...values) => {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
};

export function rotateX2(p, a) {
  const x = Math.cos(a) * p.x - Math.sin(a) * p.y;
  const y = Math.sin(a) * p.x + Math.cos(a) * p.y;
  return new THREE.Vector2(x, y);
}

export function rotateX3(p, a) {
  const x = Math.cos(a) * p.z - Math.sin(a) * p.y;
  const y = Math.sin(a) * p.z + Math.cos(a) * p.y;
  return new THREE.Vector3(p.x, y, x);
}

export function rotateY2(p, a) {
  const x = Math.cos(a) * p.x - Math.sin(a) * p.y;
  const y = Math.sin(a) * p.x + Math.cos(a) * p.y;
  return new THREE.Vector2(x, y);
}

export function rotateY3(p, a) {
  const x = Math.cos(a) * p.x - Math.sin(a) * p.z;
  const y = Math.sin(a) * p.x + Math.cos(a) * p.z;
  return new THREE.Vector3(x, p.y, y);
}

export function rotateZ2(p, a) {
  const x = Math.cos(a) * p.x - Math.sin(a) * p.y;
  const y = Math.sin(a) * p.x + Math.cos(a) * p.y;
  return new THREE.Vector2(x, y);
}

export function rotateZ3(p, a) {
  const x = Math.cos(a) * p.x - Math.sin(a) * p.y;
  const y = Math.sin(a) * p.x + Math.cos(a) * p.y;
  return new THREE.Vector3(x, y, p.z);
}

export function rotate3(p, a) {
  p = rotateX3(p, a.x);
  p = rotateY3(p, a.y);
  p = rotateZ3(p, a.z);
  return p;
}
