var fill = document.querySelector(".progress-bar .fill");
window.addEventListener("scroll", function() {
  var percentage = window.scrollY / (document.body.offsetHeight - window.innerHeight);
  fill.style.width = percentage * 100 + "%";
});
