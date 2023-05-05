const saturation = document.getElementById("saturation");
const contrast = document.getElementById("contrast");
const brightness = document.getElementById("brightness");
const sepia = document.getElementById("sepia");
const grayscale = document.getElementById("grayscale");
const blur = document.getElementById("blur");
const hueRotate = document.getElementById("hue-rotate");
const downloadBtn = document.getElementById("download");
const resetBtn = document.getElementById("reset");
const uploadBtn = document.getElementById("upload");
const imgContainer = document.querySelector(".img-container");
const img = document.querySelector(".img-container >img");
const filters = document.querySelectorAll(".filters >ul>li>input");
const canvas = document.querySelector("canvas");
const canContext = canvas.getContext("2d");

function restImage() {
  canContext.filter = "none";
  canContext.drawImage(img, 0, 0, canvas.width, canvas.height);
  saturation.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

resetBtn.addEventListener("click", restImage);

window.addEventListener("load", () => {
  imgContainer.style.display = "none";
  downloadBtn.style.display = "none";
  resetBtn.style.display = "none";
});

uploadBtn.addEventListener("change", () => {
  restImage();
  imgContainer.style.display = "block";
  downloadBtn.style.display = "block";
  resetBtn.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(uploadBtn.files[0]);

  file.addEventListener("load", () => {
    img.src = file.result;
  });

  img.addEventListener("load", () => {
    canvas.width = img.width;
    canvas.height = img.height;
    canContext.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  });
});

filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    canContext.filter = `
    saturate(${saturation.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)

    
    `;
    canContext.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});
console.log(downloadBtn);

downloadBtn.addEventListener("click", () => {
  downloadBtn.href = canvas.toDataURL();
});
