const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg",
];

let shuffledImages = [];
let selectedImages = [];

function shuffleImages() {
  let tempImages = [...images];
  let duplicateImage =
    tempImages[Math.floor(Math.random() * tempImages.length)];
  tempImages.push(duplicateImage); // Ensure only one duplicate
  shuffledImages = tempImages.sort(() => Math.random() - 0.5);
}

function displayImages() {
  const container = document.getElementById("imageContainer");
  container.innerHTML = "";
  shuffledImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add(`img${index + 1}`);
    img.setAttribute("data-src", src); // Use data attribute for comparison
    img.addEventListener("click", () => selectImage(img));
    container.appendChild(img);
  });
}

function selectImage(img) {
  if (selectedImages.length < 2 && !selectedImages.includes(img)) {
    img.classList.add("selected");
    selectedImages.push(img);
    document.getElementById("reset").style.display = "inline";

    if (selectedImages.length === 2) {
      document.getElementById("verify").style.display = "inline";
    }
  }
}

function verifySelection() {
  let msg = "";
  let firstImageSrc = selectedImages[0].getAttribute("data-src");
  let secondImageSrc = selectedImages[1].getAttribute("data-src");

  if (firstImageSrc === secondImageSrc) {
    msg = "You are a human. Congratulations!";
  } else {
    msg =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  document.getElementById("para").innerText = msg;
  document.getElementById("verify").style.display = "none";
}

function resetGame() {
  selectedImages = [];
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").innerText = "";
  shuffleImages();
  displayImages();
}

// Initialize game
shuffleImages();
displayImages();
document.getElementById("verify").addEventListener("click", verifySelection);
document.getElementById("reset").addEventListener("click", resetGame);
