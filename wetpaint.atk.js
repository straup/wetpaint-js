if (wetpaint === undefined){
    var wetpaint = {};
}

wetpaint.atk = function(canvas){

    if (canvas.getContext === undefined){
	canvas = document.getElementById(canvas);
    }

    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.width;

    var atk = {};
    var data = null;

    atk.dither_canvas = function(input, oncomplete){
	var input_ctx = input.getContext('2d');
	var input_data = input_ctx.getImageData(0, 0, width, height);
	ctx.putImageData(input_data, 0, 0);
	/* unclear whether this is a useful efficiency or not */
	/* data = input_ctx.getImageData(0, 0, width, height); */
	this.dither(oncomplete)
    };

    atk.dither_image = function(input, oncomplete){
	ctx.drawImage(input, 0, 0);
	this.dither(oncomplete);
    }

    atk.dither = function(oncomplete){

	data = ctx.getImageData(0, 0, width, height);
	this.endotify(data);

	ctx.putImageData(data, 0, 0);

	if (oncomplete !== undefined){
	    oncomplete();
	}
    };

    /* https://github.com/flickr/FlickrDithr */

    atk.endotify = function(data){

	width = data.width;
	height = data.height;

	for (y = 0; y < height; y++) {

	    thisRow = [];

	    for (x = 0; x < width; x++) {
		
		i = (y * 4) * width + x * 4;
		avg = this.getAverage(x, y);
		newavg = this.findClosestValue(avg);

		this.setPixel(x, y, newavg);
		err = avg - newavg;

		this.setPixel(x+1, y, this.getAverage(x+1, y) + (1/8) * err);
		this.setPixel(x+2, y, this.getAverage(x+2, y) + (1/8) * err);
		this.setPixel(x-1, y+1, this.getAverage(x-1, y+1) + (1/8) * err);
		this.setPixel(x, y+1, this.getAverage(x, y+1) + (1/8) * err);
		this.setPixel(x+1, y+1, this.getAverage(x+1, y+1) + (1/8) * err);
		this.setPixel(x, y+2, this.getAverage(x, y+2) + (1/8) * err);
	    }

	}

    }
    
    atk.findClosestValue = function(pixel){
	var result;
	if (pixel > 130) {
	    result = 255;
	} else {
	    result = 0;
	}
	return result;
    }

    atk.getPixelIndex = function(x, y) {
	return (y * 4) * data.width + x * 4;
    }

    atk.getAverage = function(x, y){
	var i = this.getPixelIndex(x,y);
	return (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3;
    }

    atk.setPixel = function(x, y, value) {
	var i = this.getPixelIndex(x,y);
	data.data[i] = value;
	data.data[i + 1] = value;
	data.data[i + 2] = value;
    }

    return atk;
};