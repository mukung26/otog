document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var parcelImg = document.getElementById("parcelImage");
    var closeBtn = document.querySelector(".close");

    parcelImg.onclick = function () {
        modal.style.display = "flex";
        modalImg.src = parcelImg.src;
    };

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
