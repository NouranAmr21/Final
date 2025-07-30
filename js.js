// Thumbnail carousel functionality
const thumbnails = document.querySelectorAll(".thumbnail");
const mainImage = document.getElementById("mainImage");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    // Remove active class from all thumbnails
    thumbnails.forEach((t) => t.classList.remove("active"));

    // Add active class to clicked thumbnail
    this.classList.add("active");

    // Change main image
    const imageUrl = this.getAttribute("data-image");
    mainImage.style.backgroundImage = `url('${imageUrl}')`;
  });
});
