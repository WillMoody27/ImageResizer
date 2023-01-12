const fileInput = document.querySelector(".resizer__file");
const widthInput = document.querySelector(".resizer__input--width");
const heightInput = document.querySelector(".resizer__input--height");
const aspectToggle = document.querySelector(".resizer__aspect");
const canvas = document.querySelector(".resizer__canvas");

// MAIN
const canvasCtx = canvas.getContext("2d");

let activeImage;
let originalWidthToHeighRatio;
// 150 x 100 = 1.5 // use aspect ratio maintain img

fileInput.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.addEventListener("load", () => {
    openImage(reader.result);
  });
});

widthInput.addEventListener("change", (e) => {
  if (!activeImage) {
    return;
  }
  const heightValue = aspectToggle.checked
    ? widthInput.value / originalWidthToHeighRatio
    : heightInput.value;
  resize(widthInput.value, heightValue);
});
heightInput.addEventListener("change", (e) => {
  if (!activeImage) {
    return;
  }
  const widthValue = aspectToggle.checked
    ? heightInput.value * originalWidthToHeighRatio
    : widthInput.value;
  resize(widthValue, heightInput.value);
});

function openImage(imageSrc) {
  activeImage = new Image();

  activeImage.addEventListener("load", () => {
    originalWidthToHeighRatio = activeImage.width / activeImage.height;
    resize(activeImage.width, activeImage.height);
  });
  activeImage.src = imageSrc;
  console.log(activeImage);
}

function resize(width, height) {
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);
  widthInput.value = Math.floor(width);
  heightInput.value = Math.floor(height);
  canvasCtx.drawImage(activeImage, 0, 0, Math.floor(width), Math.floor(height));
}
