import MaskBase64 from 'Src/js/maskBase64-old';

function readMask(callback){
    this.maskCanvas = null;

    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = MaskBase64;

    img.onload = () => {
        window.URL.revokeObjectURL(MaskBase64);

        this.maskCanvas = document.createElement('canvas');
        this.maskCanvas.width = img.width;
        this.maskCanvas.height = img.height;

        var ctx = this.maskCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var imageData = ctx.getImageData(0, 0, this.maskCanvas.width, this.maskCanvas.height);
        var newImageData = ctx.createImageData(imageData);

        for (var i = 0; i < imageData.data.length; i += 4) {
            var tone = imageData.data[i] +
                imageData.data[i + 1] +
                imageData.data[i + 2];
            var alpha = imageData.data[i + 3];

            if (alpha < 128 || tone > 128 * 3) {
                // Area not to draw
                newImageData.data[i] =
                    newImageData.data[i + 1] =
                    newImageData.data[i + 2] = 255;
                newImageData.data[i + 3] = 0;
            } else {
                // Area to draw
                newImageData.data[i] =
                    newImageData.data[i + 1] =
                    newImageData.data[i + 2] = 0;
                newImageData.data[i + 3] = 255;
            }
        }

        ctx.putImageData(newImageData, 0, 0);
        callback()
    };
};

export default readMask;