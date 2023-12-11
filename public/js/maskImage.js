let canvas, ctx, isDrawing = false;

function processToBlackAndWhite(imageData) {
    const threshold = 1;
  
    for (let i = 0; i < imageData.data.length; i += 4) {
      const painted = (imageData.data[i] > threshold || imageData.data[i + 1] > threshold || imageData.data[i + 2] > threshold);
  
      const color = painted ? 0 : 255;
  
      imageData.data[i] = color;
      imageData.data[i + 1] = color;
      imageData.data[i + 2] = color;
    }
  
    return imageData;
  }
  

document.getElementById('imageInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.lineWidth = 35;
      ctx.drawImage(img, 0, 0);
    }
    img.src = e.target.result;
  }
  reader.readAsDataURL(file);
});

document.getElementById('canvas').addEventListener('mousedown', function(event) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
});

document.getElementById('canvas').addEventListener('mousemove', function(event) {
  if (isDrawing) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
});

document.getElementById('canvas').addEventListener('mouseup', function() {
  isDrawing = false;
  ctx.closePath();
});

document.getElementById('promptAndImageForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const maskImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const processedImageData = processToBlackAndWhite(maskImageData);

  const processedCanvas = document.createElement('canvas');
  processedCanvas.width = canvas.width;
  processedCanvas.height = canvas.height;
  const processedCtx = processedCanvas.getContext('2d');
  processedCtx.putImageData(processedImageData, 0, 0);

  const dataURL = processedCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'masked_image.png';
  link.click();
});

function initializeCanvas() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 50;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
initializeCanvas();
