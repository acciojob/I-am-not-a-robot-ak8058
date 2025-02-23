//your code here
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg",
];

let suffledImage = [];
let selectedImage = [];

function suffledImages() {
  let tempImage = [...images];
  let duplicateImage = tempImage[Math.floor(Math.random() * tempImage.length)];
  tempImage.push(duplicateImage);
  suffledImage = tempImage.sort(() => Math.random() - 0.5);
}

function displayImage() {
  const container = document.getElementById("imageContainer");
  container.innerHTML = "";
  suffledImage.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.setAttribute("data-index", index);
    img.addEventListener("click", () => selectImage(img));
    container.appendChild(img);
  });
}
function selectImage(img) {
  if (selectedImage.length < 2 && !selectedImage.includes(img)) {
    img.classList.add("selected"); // Highlight selected image
    selectedImage.push(img); // Store selected image
    document.getElementById("reset").style.display = "inline"; // Show Reset button

    if (selectedImage.length === 2) {
      document.getElementById("verify").style.display = "inline"; // Show Verify button
    }
  }
}

function verifySelection() {
  let msg = "";

  if (selectedImage[0].src === selectedImage[1].src) {
    msg = "You are a human. Congratulations!";
  } else {
    msg =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
  document.getElementById("para").innerText = msg;
  document.getElementById("verify").style.display = "none";
}

function reset() {
  selectedImage = [];
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").innerText = "";
  suffledImages();
  displayImage();
}
suffledImages();
displayImage();
document.getElementById("verify").addEventListener("click", verifySelection);
document.getElementById("reset").addEventListener("click", reset);