//FOR KEY and ParcelImage
window.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";
        document.getElementById('overlay').style.display = "none";
    }
});
function copyToClipboard(link, button) {
  navigator.clipboard.writeText(link).then(() => {
    let notification = document.getElementById("copy-notification");
    if (!notification) {
      notification = document.createElement("div");
      notification.id = "copy-notification";
      document.body.appendChild(notification);
    }
    notification.textContent = "Copied!";
    notification.style.display = "block";
    setTimeout(() => { notification.style.display = "none"; }, 2000);
  });
}

// Get elements
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var parcelImg = document.getElementById("parcelImage");
var closeBtn = document.querySelector(".close");

var scale = 1; // Initial zoom level

// Open Modal on Image Click
parcelImg.onclick = function() {
    modal.style.display = "flex";
    modalImg.src = parcelImg.src;
    scale = 1; // Reset zoom level
    modalImg.style.transform = "scale(1)";
}

// Close Modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close Modal when clicking outside image
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Scroll to Zoom Functionality
modalImg.addEventListener("wheel", function(event) {
    event.preventDefault(); // Prevent default scroll behavior

    if (event.deltaY < 0) {
        scale += 0.1; // Zoom in
    } else {
        scale -= 0.1; // Zoom out
        if (scale < 1) scale = 1; // Prevent too much zoom-out
    }

    modalImg.style.transform = "scale(" + scale + ")";
});

// Example backend data (this would be dynamically generated in the backend)
// https://docs.google.com/spreadsheets/d/14JVXsSgPwunfYSy5vzc0GcAofEqZBNj8tyjiG97U87M/edit?rm=minimal&single=true&gid=375537901#gid=375537901
const containersData = [
    {
        title: "Chat Flow Speil by YEL",
        iframeSrc: "https://docs.google.com/spreadsheets/d/1ecGI2kdEz87Qt0dypMCtrSzka7AUyM0aJn-i_Uxsp4I/edit?rm=minimal&single=true"
    },
    {
        title: "How to Escalate by TL YEL",
        iframeSrc: "https://docs.google.com/spreadsheets/d/1jsXh1O0RTiG50eEA-BhycbRYBpc7HT5RUbcGXla8IJ4/edit?rm=minimal&single=true"
    },
    {
        title: "Time In/Out Monitoring",
        iframeSrc: "https://docs.google.com/spreadsheets/d/14JVXsSgPwunfYSy5vzc0GcAofEqZBNj8tyjiG97U87M/edit?gid=1451801315#gid=1451801315"
    },
    {
        title: "RC Samples",
        iframeSrc: "https://docs.google.com/document/d/1rXRQWiX9dIDlul7r3IPpy3Wna_cEwxj0GCQ3lUB881A/edit?rm=minimal&tab=t.6nsllfw3li9f"
    },
    {
        title: "Revamped RC",
        iframeSrc: "https://docs.google.com/spreadsheets/d/1ixTd2TLWQZNpxWp1btkuDosIy569BOeDhWiWRaCyOu4/edit?rm=minimal&single=true&gid=2095445831#gid=2095445831"
    }
];

// Object to hold preloaded iframes
const preloadedIframes = {};

// Function to create containers dynamically
function createContainer(title, iframeSrc) {
    const container = document.createElement('div');
    container.classList.add('iframe-container');

    // Preload iframe content and store it
    if (!preloadedIframes[iframeSrc]) {
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.style.display = 'none'; // Hide it initially
        document.body.appendChild(iframe);
        preloadedIframes[iframeSrc] = iframe;
    }
    
    // Add title and iframe with new window button
    container.innerHTML = `
        <div class="container-title">
            <button class="open-new-window-btn" onclick="openInNewWindow('${iframeSrc}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
                    <path d="M5 3C3.91 3 3 3.91 3 5v14c0 1.09.91 2 2 2h14c1.09 0 2-.91 2-2v-7h-2v7H5V5h7V3H5zm9 0v2h3.59L8.29 14.29l1.42 1.42L19 6.41V10h2V3h-7z"/>
                </svg>
            </button>
            ${title}
        </div>
        <iframe src="${iframeSrc}" width="100%" height="350" loading="lazy" style="zoom: 0.5;"></iframe>
        <button class="expand-btn" onclick="expandIframe('${iframeSrc}')">Click to Expand</button>
    `;
    
    // Append to the main container
    document.getElementById('mainContainer').appendChild(container);
}

function openInNewWindow(src) {
    // Open the link directly in a new tab
    window.open(src, '_blank');
}

// Function to handle iframe expansion
function expandIframe(src) {
    const overlay = document.getElementById('overlay');
    const expandedIframe = document.getElementById('expandedIframe');
    
    // Check if iframe content is preloaded
    if (preloadedIframes[src]) {
        expandedIframe.src = src; // Use preloaded iframe
    } else {
        expandedIframe.src = src; // Otherwise load the iframe
    }
    
    overlay.style.display = "flex"; // Show the overlay
}

// Close expanded iframe
function closeIframe(event) {
    document.getElementById('overlay').style.display = "none"; // Hide the overlay
}

// On page load, create all containers dynamically
window.onload = () => {
    containersData.forEach(container => {
        createContainer(container.title, container.iframeSrc);
    });
};
