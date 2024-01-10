const form = document.getElementById('imageUploadForm');

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const imageInput = document.getElementById("imageInput");
  const imageFiles = Array.from(imageInput.files);

  const promises = imageFiles.map((file) => getBase64(file));

  Promise.all(promises)
    .then((imageDataArray) => {
      const requests = imageDataArray.map((imageData, index) =>
        fetch('http://localhost:3000/segmentation', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img: imageData,
          }),
        })
          .then(response => response.json())
          .then(data => {
            return {
              data,
              index
            };
          })
      );

      return Promise.all(requests);
    })
    .then((results) => {
      const miniImageTabs = document.getElementById('miniImageTabs');

      results.forEach((result) => {
        const index = result.index;
        const data = result.data;

        const generatedImages = data.generatedImagePath;
        generatedImages.forEach((imagePath, i) => {
          const miniImage = document.createElement('img');
          miniImage.src = imagePath;
          miniImage.alt = `Image ${index + 1}.${i + 1}`;
          miniImage.classList.add('mini-image');
          miniImage.onclick = function () {
            changeImage(this);
          };
          miniImageTabs.appendChild(miniImage);
        });
      });

      // Set default display for the first image
      document.querySelector('#miniImageTabs .mini-image').classList.add('active');
      document.getElementById('generatedImage').src = results[0].data.generatedImagePath[0];
      document.getElementById('analysisDetails').innerText = getDescriptionForImage('Image 1.1');
      document.getElementById('generationType').innerText = getGenerationType('Image 1.1');

      const generatedImageContainer = document.querySelector('.generated-image-container');
      generatedImageContainer.style.display = 'block';
      form.style.display = 'none';
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

function changeImage(element) {
  const miniImages = document.querySelectorAll('#miniImageTabs .mini-image');
  miniImages.forEach(img => img.classList.remove('active'));
  element.classList.add('active');

  var imageSrc = element.src;
  document.getElementById('generatedImage').src = imageSrc;

  var description = getDescriptionForImage(element.alt);
  document.getElementById('analysisDetails').innerText = description;

  var generationType = getGenerationType(element.alt);
  document.getElementById('generationType').innerText = generationType;
}

function getDescriptionForImage(imageAlt) {
  const staticDescriptions = {
    "Image 1.1": "The original satellite image, offering a high-resolution view of the landscape. This baseline provides crucial information about land cover, topography, and water bodies, forming the foundation for subsequent analyses.",
    "Image 1.2": "The AI system enhances precision by generating a 2.5D image that incorporates elevation data. This three-dimensional representation enables a more accurate understanding of the terrain. Additionally, the algorithm meticulously cleans and filters out noise, ensuring a clearer depiction of the landscape, enhancing the focus on essential elements for hydro power plant planning.",
    "Image 1.3": "This Output image isolates river flow patterns and depth in a black and white image. This specialized representation provides insights into water dynamics, helping assess variations in river depth and flow rates. This information is crucial for evaluating the hydrological characteristics of the region."
  };

  return staticDescriptions[imageAlt] || "No description available";
}

function getGenerationType(imageAlt) {
  const staticGenerationTypes = {
    "Image 1.1": "Original Image",
    "Image 1.2": "2.5D Image and Noise Reduction",
    "Image 1.3": "Depth Image"
  };

  return staticGenerationTypes[imageAlt] || "Unknown Generation Type";
}
