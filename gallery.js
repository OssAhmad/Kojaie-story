
"use strict";

const ASSET_ROOT = "./assets/private-assets/";

const track = document.getElementById("photoTrack");
const inlineCounter = document.getElementById("inlineCounter");
const inlinePrev = document.getElementById("inlinePrev");
const inlineNext = document.getElementById("inlineNext");
const galleryError = document.getElementById("galleryError");

const viewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerCounter = document.getElementById("viewerCounter");
const viewerStage = document.getElementById("viewerStage");
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");
const closeViewer = document.getElementById("closeViewer");
const thumbnailStrip = document.getElementById("thumbnailStrip");

let photos = [];
let currentIndex = 0;
let thumbnailButtons = [];

/* IMAGE URL */

function photoURL(filename) {
  return ASSET_ROOT + encodeURIComponent(filename);
}

function clampIndex(index) {
  return Math.max(0, Math.min(index, photos.length - 1));
}

/* KEEP COUNTERS AND BUTTONS UPDATED */

function renderState() {
  if (!photos.length) return;

  inlineCounter.textContent =
    `${currentIndex + 1} / ${photos.length}`;

  inlinePrev.disabled = currentIndex === 0;
  inlineNext.disabled = currentIndex === photos.length - 1;

  if (viewer.open) {
    viewerImage.src = photoURL(photos[currentIndex]);
    viewerImage.alt =
      `Zaza's profile photo ${currentIndex + 1} of ${photos.length}`;

    viewerCounter.textContent =
      `${currentIndex + 1} of ${photos.length}`;

    viewerPrev.disabled = currentIndex === 0;
    viewerNext.disabled = currentIndex === photos.length - 1;

    thumbnailButtons.forEach((button, index) => {
      const active = index === currentIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
    });

    thumbnailButtons[currentIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }
}

/* CHANGE CURRENT PHOTO */

function setPhoto(index, syncInline = true) {
  if (!photos.length) return;

  currentIndex = clampIndex(index);

  if (syncInline) {
    track.scrollTo({
      left: currentIndex * track.clientWidth,
      behavior: "auto"
    });
  }

  renderState();
}

/* BUILD INLINE GALLERY */

function buildInlineGallery() {
  photos.forEach((filename, index) => {
    const slide = document.createElement("button");
    slide.className = "photo-slide";
    slide.type = "button";

    slide.setAttribute(
      "aria-label",
      `Open profile photo ${index + 1} of ${photos.length}`
    );

    const img = document.createElement("img");
    img.src = photoURL(filename);
    img.alt = `Zaza's profile photo ${index + 1}`;
    img.loading = index === 0 ? "eager" : "lazy";
    img.decoding = "async";
    img.draggable = false;

    slide.appendChild(img);

    slide.addEventListener("click", () => {
      openPhotoViewer(index);
    });

    track.appendChild(slide);
  });
}

/* BUILD THUMBNAILS */

function buildThumbnails() {
  photos.forEach((filename, index) => {
    const button = document.createElement("button");
    button.className = "thumbnail";
    button.type = "button";
    button.setAttribute("aria-label", `Go to photo ${index + 1}`);

    const img = document.createElement("img");
    img.src = photoURL(filename);
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";

    button.appendChild(img);

    button.addEventListener("click", () => {
      setPhoto(index, false);
    });

    thumbnailStrip.appendChild(button);
    thumbnailButtons.push(button);
  });
}

/* INLINE NAVIGATION */

inlinePrev.addEventListener("click", () => {
  setPhoto(currentIndex - 1);
});

inlineNext.addEventListener("click", () => {
  setPhoto(currentIndex + 1);
});

/* AUTOMATIC INDEX UPDATES WHILE SWIPING */

let scrollScheduled = false;

track.addEventListener("scroll", () => {
  if (viewer.open || scrollScheduled || !photos.length) return;

  scrollScheduled = true;

  requestAnimationFrame(() => {
    scrollScheduled = false;

    const width = track.clientWidth || 1;
    const index = clampIndex(
      Math.round(track.scrollLeft / width)
    );

    if (index !== currentIndex) {
      currentIndex = index;
      renderState();
    }
  });
});

/* DESKTOP MOUSE DRAGGING */

let isMouseDown = false;
let startX = 0;
let startScroll = 0;
let wasDragged = false;
let suppressClick = false;

track.addEventListener("pointerdown", event => {
  if (event.pointerType !== "mouse" || event.button !== 0) {
    return;
  }

  isMouseDown = true;
  wasDragged = false;
  startX = event.clientX;
  startScroll = track.scrollLeft;
});

window.addEventListener("pointermove", event => {
  if (!isMouseDown) return;

  const distance = event.clientX - startX;

  if (Math.abs(distance) > 6) {
    wasDragged = true;
    track.classList.add("is-dragging");
    track.scrollLeft = startScroll - distance;
  }
});

window.addEventListener("pointerup", () => {
  if (!isMouseDown) return;

  isMouseDown = false;
  track.classList.remove("is-dragging");

  if (wasDragged) {
    suppressClick = true;

    setTimeout(() => {
      suppressClick = false;
    }, 0);
  }
});

track.addEventListener("click", event => {
  if (suppressClick) {
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }
}, true);

track.addEventListener("dragstart", event => {
  event.preventDefault();
});

/* FULLSCREEN VIEWER */

function openPhotoViewer(index) {
  currentIndex = clampIndex(index);

  viewer.showModal();
  document.body.classList.add("viewer-open");

  renderState();
}

function closePhotoViewer() {
  viewer.close();
}

closeViewer.addEventListener("click", closePhotoViewer);

viewer.addEventListener("close", () => {
  document.body.classList.remove("viewer-open");

  track.scrollTo({
    left: currentIndex * track.clientWidth,
    behavior: "auto"
  });

  renderState();
});

viewerPrev.addEventListener("click", () => {
  setPhoto(currentIndex - 1, false);
});

viewerNext.addEventListener("click", () => {
  setPhoto(currentIndex + 1, false);
});

/* KEYBOARD NAVIGATION */

document.addEventListener("keydown", event => {
  if (viewer.open) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPhoto(currentIndex + 1, false);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPhoto(currentIndex - 1, false);
    }

    if (event.key === "Home") {
      event.preventDefault();
      setPhoto(0, false);
    }

    if (event.key === "End") {
      event.preventDefault();
      setPhoto(photos.length - 1, false);
    }
  } else if (document.activeElement === track) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPhoto(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPhoto(currentIndex - 1);
    }
  }
});

/* MOBILE SWIPE IN FULLSCREEN */

let touchStartX = 0;
let touchStartY = 0;

viewerStage.addEventListener("touchstart", event => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

viewerStage.addEventListener("touchend", event => {
  const touch = event.changedTouches[0];

  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) {
      setPhoto(currentIndex + 1, false);
    } else {
      setPhoto(currentIndex - 1, false);
    }
  }
}, { passive: true });

/* FETCH GENERATED IMAGE MANIFEST */


async function initializeGallery() {
  try {
    // Read photos directly from generated JavaScript.
    // No fetch or server required.
    const filenames = window.GALLERY_PHOTOS;

    if (!Array.isArray(filenames)) {
      throw new Error(
        "gallery-data.js is not loaded. Check index.html."
      );
    }

    photos = filenames
      .filter(filename =>
        typeof filename === "string" &&
        /^\d+\.\s*.+\.(png|jpe?g|webp|avif|gif)$/i.test(filename)
      )
      .sort((a, b) => {
        const numberA = Number(a.match(/^\d+/)[0]);
        const numberB = Number(b.match(/^\d+/)[0]);

        return numberA - numberB || a.localeCompare(b);
      });

    if (photos.length === 0) {
      throw new Error("No numbered photographs found.");
    }

    buildInlineGallery();
    buildThumbnails();
    renderState();

    console.log(`Gallery loaded: ${photos.length} photos.`);

  } catch (error) {
    console.error("Gallery initialization failed:", error);

    galleryError.hidden = false;
    galleryError.textContent = error.message;
  }
}

initializeGallery();

