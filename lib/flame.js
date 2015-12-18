// variables
var canvas, ctx;
var data_width;
var data_height;
var colors = [];
var out_data = [];

// new filled array function
function new_filled_array(len, val) {
    var rv = new Array(len);
    while (--len >= 0) {
        rv[len] = val;
    }
    return rv;
}

// prepare palette function
function prepare_palette() {
    for (var i = 0; i < 64; ++i) {
        colors[i + 0] = {r: 0, g: 0, b: i << 1, a: i};
        colors[i + 64] = {r: i << 3, g: 0, b: 128 - (i << 2), a: i+64};
        colors[i + 128] = {r: 255, g: i << 1, b: 0, a: i+128};
        colors[i + 192] = {r: 255, g: 255, b: i << 2, a: i+192};
    }
}

// drawing functions
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    var data_cnt = data_width * (data_height - 1);
    for (var i = 0; i < data_width; i++) {
        out_data[data_cnt + i] = (0.7 > Math.random()) ? 255 : 0;
    }

    for (var y = 0; y < 175; y++){
        for (var x = 0; x < data_width; x++){
            var s = data_cnt + x;

            var temp_data = out_data[s] + out_data[s + 1] + out_data[s - 1] + out_data[s - data_width];
            temp_data >>= 2;
            if (temp_data > 1){
                temp_data -= 1;
            }
            temp_data <<= 0;

            out_data[s - data_width] = temp_data;

            var id = s << 2;
            img_data.data[id + 0] = colors[temp_data].r; // red
            img_data.data[id + 1] = colors[temp_data].g; // green
            img_data.data[id + 2] = colors[temp_data].b; // blue
            img_data.data[id + 3] = colors[temp_data].a; // alpha
        }
        data_cnt -= data_width;
    }

    // draw result data
    ctx.putImageData(img_data, 0, 0);
}


module.exports = function() {
    setTimeout(function() {
      // creating canvas and context objects
      canvas = document.getElementById('fireplace-panel');
      ctx = canvas.getContext('2d');

      // preparing initial image data (empty)
      img_data = ctx.createImageData(canvas.width, canvas.height);

      data_width = img_data.width,
      data_height = img_data.height,

      prepare_palette();

      // allocating array with zeros
      out_data = new_filled_array(data_width * data_height, 0)

      setInterval(drawScene, 30); // loop drawScene
    })

}
