const form = document.getElementById('imageUploadForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    fetch('/dummy', {
        method: 'POST',
        body: new FormData(form) 
      })
    .then(response => response.json())
    .then(data => {
        document.getElementById('generatedImage').src = data.waterBody;

        const miniImageTabs = document.getElementById('miniImageTabs');
        Object.entries(data).forEach(([key, value], index) => {
            const miniImage = document.createElement('img');
            miniImage.src = value;
            miniImage.alt = `Image ${index + 1}`;
            miniImage.classList.add('mini-image');
            miniImage.onclick = function () {
                changeImage(this);
            };
            miniImageTabs.appendChild(miniImage);
        });

        document.getElementById('analysisDetails').innerText = getDescriptionForImage('Image 1');
        document.getElementById('generationType').innerText  = getGenerationType('Image 1')
        const generatedImageContainer = document.querySelector('.generated-image-container');
        generatedImageContainer.style.display = 'block';
        form.style.display = 'none';
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
})

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
    var descriptions = {
        "Image 1": "Description for Image 1",
        "Image 2": "Description for Image 2",
        "Image 3": "Description for Image 3"
    };
    return descriptions[imageAlt] || "No description available";
}

function getGenerationType(imageAlt) {
    var generationTypes = {
      "Image 1": "Water Body Analysis",
      "Image 2": "Water Body & Terrain Analysis",
      "Image 3": "Water Density & River Flow Analysis"
    };
    return generationTypes[imageAlt] || "Unknown Generation Type";
  }