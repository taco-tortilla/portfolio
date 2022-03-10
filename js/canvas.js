// ページをロードしたりウィンドウのリサイズするたびに実行
$(function () {
	sizing();
	Draw();
	$(window).resize(function() {
		sizing();
		Draw();
	});
});
// div#wrapperからcanvas#cnvsのサイズをもらう（#wrapperのサイズはCSSで）
function sizing(){
	$('#stage').attr({height:$('#wrapper').height()});
	$('#stage').attr({width:$('#wrapper').width()});
};

function Draw() {	
    var ctx = document.getElementById('wave').getContext('2d');
    var imageData = ctx.createImageData(wave.width, wave.height);
    var width = imageData.width, height = imageData.height;
    var imgd = imageData.data;
    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
      var base = (x+y*width)*4;
      imgd[base+0] = 255*x/width;
      imgd[base+1] = 255*y/height;
      imgd[base+2] = Math.max(255-x-y,0);
      imgd[base+3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };