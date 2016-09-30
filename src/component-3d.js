var { Component, Container, Layout } = scene

var registry = {}
//
// scene.Component3d = new function Component3d(){
//   this.register = function(type, clazz) {
//     if(!clazz)
//       return registry[type]
//     registry[type] = clazz
//   }
// }

// scene.Component3d.prototype.register = function(type, clazz) {
//   if(!clazz)
//     return registry[type]
//   registry[type] = clazz
// };

export default class Component3d {

  static register(type, clazz) {
    if(!clazz)
      return registry[type]
    registry[type] = clazz
  }

}

scene.Component3d = Component3d
