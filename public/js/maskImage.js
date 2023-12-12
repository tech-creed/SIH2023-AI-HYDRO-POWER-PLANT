let canvas,
  ctx,
  isDrawing = false;

function processToBlackAndWhite(imageData) {
  const threshold = 1;

  for (let i = 0; i < imageData.data.length; i += 4) {
    const painted =
      imageData.data[i] > threshold ||
      imageData.data[i + 1] > threshold ||
      imageData.data[i + 2] > threshold;

    const color = painted ? 0 : 255;

    imageData.data[i] = color;
    imageData.data[i + 1] = color;
    imageData.data[i + 2] = color;
  }

  return imageData;
}

document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const resizedImageData = resizeImageToMaxResolution(img);
        const resizedImg = new Image();
        resizedImg.onload = function () {
          const imageElement = document.getElementById("inputImage");
          imageElement.src = resizedImg.src;

          canvas.width = resizedImg.width;
          canvas.height = resizedImg.height;
          ctx.lineWidth = 25;
          ctx.drawImage(resizedImg, 0, 0);

          document.querySelector(".input-container").style.display = "none";
          document.querySelector(".medium-image-container").style.display =
            "block";
        };
        resizedImg.src = resizedImageData;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function resizeImageToMaxResolution(image) {
  const maxWidth = 512;
  const maxHeight = 512;
  let width = image.width;
  let height = image.height;

  if (width > maxWidth || height > maxHeight) {
    let newWidth, newHeight;

    if (width > height) {
      newWidth = maxWidth;
      newHeight = Math.round((height * maxWidth) / width);
    } else {
      newHeight = maxHeight;
      newWidth = Math.round((width * maxHeight) / height);
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.lineWidth = 25;
    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    return canvas.toDataURL("image/png");
  }

  return image.src;
}

let isCanvasPainted = false;

document
  .getElementById("popUpCanvas")
  .addEventListener("mousedown", function (event) {
    isDrawing = true;
    isCanvasPainted = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
  });

document
  .getElementById("popUpCanvas")
  .addEventListener("mousemove", function (event) {
    if (isDrawing) {
      isCanvasPainted = true;
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    }
  });

document.getElementById("popUpCanvas").addEventListener("mouseup", function () {
  isDrawing = false;
  isCanvasPainted = true;
  ctx.closePath();
});

document
  .getElementById("promptAndImageForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const imageInput = document.getElementById("imageInput");
    const maskPopupCanvas = document.getElementById("popUpCanvas");
    const ctxPopup = maskPopupCanvas.getContext("2d");

    if (imageInput.files.length === 0) {
      alert("Please upload an image.");
      return;
    }

    if (!isCanvasPainted) {
      alert("Please paint on the image to specify the portion to generate.");
      return;
    }

    const maskImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const processedImageData = processToBlackAndWhite(maskImageData);

    const processedCanvas = document.createElement("canvas");
    processedCanvas.width = canvas.width;
    processedCanvas.height = canvas.height;
    const processedCtx = processedCanvas.getContext("2d");
    processedCtx.putImageData(processedImageData, 0, 0);
    const processedDataURL = processedCanvas.toDataURL("image/png");

    const imageFile = imageInput.files[0];
    const promptText = document.getElementById("prompt-textarea").value;

    const generatedImagesContainer = document.getElementById("generatedImages");
    generatedImagesContainer.innerHTML = "";
    const textareaForValue = document.getElementById("prompt-textarea");

    getBase64(imageFile).then((imageData) => {
      fetch("http://localhost:3000/img2img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
          mask: processedDataURL,
          image: imageData,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const generatedImages = data.generatedImagePath;
          const imgWrapper = document.createElement("div");
          imgWrapper.classList.add("generated-image");

          const img = document.createElement("img");
          img.src = "/generated/org.png";
          img.alt = "Generated Image";
          img.onclick = function () {
            openGeneratedLightbox(path);
          };

          imgWrapper.appendChild(img);
          generatedImagesContainer.appendChild(imgWrapper);
          generatedImages.forEach((path) => {
            const imgWrapper = document.createElement("div");
            imgWrapper.classList.add("generated-image");

            const img = document.createElement("img");
            img.src = path;
            img.alt = "Generated Image";
            img.onclick = function () {
              openGeneratedLightbox(path);
            };

            imgWrapper.appendChild(img);
            generatedImagesContainer.appendChild(imgWrapper);
          });

          textareaForValue.value = "";
          clearUploadedImageAndCanvas();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });

function initializeCanvas() {
  canvas = document.getElementById("popUpCanvas");
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 50;
  ctx.lineCap = "round";
  ctx.strokeStyle = "white";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
initializeCanvas();

function openLightbox(imageSrc) {
  const lightbox = document.getElementById("lightbox");
  const popUpImage = document.getElementById("popUpImage");

  popUpImage.src = imageSrc;

  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function openGeneratedLightbox(imageSrc) {
  const generatedLightbox = document.getElementById("generatedLightbox");
  const generatedImage = document.getElementById("generatedImage");
  const generatedDownloadLink = document.getElementById(
    "generatedDownloadLink"
  );

  generatedImage.src = imageSrc;
  generatedDownloadLink.href = imageSrc;

  generatedLightbox.style.display = "flex";
}

function closeGeneratedLightbox() {
  document.getElementById("generatedLightbox").style.display = "none";
}

function setImageAsCanvas(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.getElementById("popUpCanvas");
      const ctx = canvas.getContext("2d");

      const resizedImageData = resizeImageToMaxResolution(img);
      const resizedImg = new Image();
      resizedImg.onload = function () {
        canvas.width = resizedImg.width;
        canvas.height = resizedImg.height;
        ctx.lineWidth = 25;
        ctx.drawImage(resizedImg, 0, 0);
      };
      resizedImg.src = resizedImageData;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function resetCanvas() {
  const canvas = document.getElementById("popUpCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fileInput = document.getElementById("imageInput");
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    setImageAsCanvas(file);
  }
}

function clearUploadedImageAndCanvas() {
  const imageInput = document.getElementById("imageInput");
  imageInput.value = null;

  document.querySelector(".input-container").style.display = "block";
  document.querySelector(".medium-image-container").style.display = "none";

  const canvas = document.getElementById("popUpCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
