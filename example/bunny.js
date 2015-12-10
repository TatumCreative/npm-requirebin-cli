/*
	This demo is showing off the fog augmentation from Glam.
  https://github.com/glamjs/glam
*/

var glam = require('glam')

var Mesh              = glam.Mesh
var PerspectiveCamera = glam.PerspectiveCamera
var FlatMaterial      = glam.FlatMaterial
var Scene             = glam.Scene
var Geometry          = glam.Geometry
var FogAugment        = glam.FogAugment
var Bunny             = require('bunny')

;(function drawBunny() {

	var scene    = Scene()
	var camera   = PerspectiveCamera()
  
  // Compose the two features together
	var FlatFog  = FogAugment(FlatMaterial)
	
  // Now the factory function will take both configs
	var material = FlatFog(
		{// flat
			color : [0.5,0.3,0.4]
		},
		{// fog
			near  : 15,
			far   : 25,
			color : [1, 1, 1],
		}
	)
	var geometry = Geometry( Bunny )
	var mesh     = Mesh( material, geometry )

	scene.add( mesh )
	
	mesh.transform.position[1] = -5
	mesh.transform.position[2] = 0
	camera.transform.position[2] = 20
	
	scene.loop.on('update', function(e) {
		mesh.transform.euler[1] = e.elapsed * 0.001
		mesh.transform.euler[0] = Math.sin( e.elapsed * 0.0001 )
		scene.render( camera )
	})
	
})()