const fileInput = document.querySelector(".resizer__file");
const widthInput = document.querySelector(".resizer__input--width");
const heightInput = document.querySelector(".resizer__input--height");
const aspectToggle = document.querySelector(".resizer__aspect");
const canvas = document.querySelector(".resizer__canvas");

// MAIN
const canvasCtx = canvas.getContext("2d");

let activeImage;
let originalWidthToHeighRatio; // original width 2 height of image
// 150 x 100 = 1.5 // use aspect ratio maintain img

// Listen to when user chooses new file
fileInput.addEventListener("change", (e) => {
  //   console.log(ev);

  // Need preview
  const reader = new FileReader(); // allows us to read file as dataURL --> Base 64x format
  reader.readAsDataURL(e.target.files[0]); // refers to image uploaded by user
  reader.addEventListener("load", () => {
    // ran when image is done loading
    openImage(reader.result);
    // console.log(reader.result);
  });
});

// ++++ UPDATE SIZE --> when user changes value of width input run function
widthInput.addEventListener("change", (e) => {
  // No active image do nothing
  if (!activeImage) {
    return;
  }
  //   WHEN UPDATING WITDTH INPUT MAINTAIN ON HEIGHT CHANGE
  //   IF USER Doesnt checkbox then pass height input
  const heightValue = aspectToggle.checked
    ? widthInput.value / originalWidthToHeighRatio
    : heightInput.value;
  // else pass new width and height
  resize(widthInput.value, heightValue);
});
heightInput.addEventListener("change", (e) => {
  // No active image do nothing
  if (!activeImage) {
    return;
  }
  const widthValue = aspectToggle.checked
    ? heightInput.value * originalWidthToHeighRatio
    : widthInput.value;
  // else pass new width and height based on checked to maintain aspect based on conditional
  resize(widthValue, heightInput.value);
});
// ++++ UPDATE SIZE --> when user changes value of width input run function

// OPEN IMG FUNCTION --> Create new image
function openImage(imageSrc) {
  activeImage = new Image(); // new image object

  //   listen when image is done loading
  activeImage.addEventListener("load", () => {
    originalWidthToHeighRatio = activeImage.width / activeImage.height;

    // new function called resize
    resize(activeImage.width, activeImage.height); // resize image to be starting
  });
  activeImage.src = imageSrc; // same as IMAGE TAG HTML
  console.log(activeImage); // created actual image tag for canvas
}

// UPDATE WIDTH AND HEIGHT INPUTS
function resize(width, height) {
  // apply image to HTML 5 canvas and set with and height
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);
  //   UPDATE INPUT FIELDS TO CORRES to IMAGE
  widthInput.value = Math.floor(width);
  heightInput.value = Math.floor(height);
  canvasCtx.drawImage(activeImage, 0, 0, Math.floor(width), Math.floor(height)); // drawimage at top left corner 0,0
}
