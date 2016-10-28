(function(scope) {

    //http://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
    scope.artify = function() {
        var canvas = document.getElementsByTagName("canvas")[0];
        var img = canvas.toDataURL("image/png");
        document.write('<img src="'+img+'"></img>');
    }
})(window);
