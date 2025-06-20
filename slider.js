
    const track = document.getElementById("slider-track");
const slides = track.querySelectorAll("img");
let index = 0;

const updateSlider = () => {
  track.style.transform = `translateX(-${index * 100}vw)`;
};

document.getElementById("nextBtn").addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlider();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
});

