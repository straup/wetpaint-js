wetpaint-js
--
A collection of tools for filtering and mucking with Canvas objects.

wetpaint.atk
--

Apply Bill Atkinson's 1-bit dithering algorithm to a canvas element:

	var canvas = document.getElementById("some-canvas");

	var a = wetpaint.atk(canvas);

	a.dither(function(){
		// do something...
	});

Apply Bill Atkinson's 1-bit dithering algorithm from one canvas element to
another:

	var input_canvas = document.getElementById("canvas-1");
	var output_canvas = document.getElementById("canvas-2");	

	var a = wetpaint.atk(output_canvas);

	a.dither_canvas(input_canvas, function(){
		// do something...
	});

Apply Bill Atkinson's 1-bit dithering algorithm to an image and store the result
in a canvas element:

	var canvas = document.getElementById("some-canvas");	
	var img = document.getElementById("some-img");
	
	var a = wetpaint.atk(canvas);

	a.dither_image(img, function(){
		// do something...
	});
