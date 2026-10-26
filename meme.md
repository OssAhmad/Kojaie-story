
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fafa and Zaza</title>
  <link rel="stylesheet" href="./style.css">
  <script src="./gallery-data.js" defer></script>
  <script src="./gallery.js" defer></script>
</head>
<body>

  <main class="story">

    <header class="story-heading">
      <h1>Fafa and Zaza</h1>
    </header>

    <article class="story-content">

      <!-- FIRST PARAGRAPH -->
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur.
      </p>

      <!-- INTERACTIVE PROFILE GALLERY -->
      <figure class="profile-section">

        <div class="telegram-profile">

          <div class="photo-frame">

            <div
              class="photo-track"
              id="photoTrack"
              aria-label="Zaza's profile pictures. Swipe or scroll horizontally."
              tabindex="0"
            ></div>

            <div class="photo-top">
              <span class="photo-category">Profile Photos</span>
              <span id="inlineCounter">0 / 0</span>
            </div>

            <div class="photo-bottom">
              <span class="profile-name">Zaza</span>
              <span class="profile-subtitle">View profile photos</span>
            </div>

            <button
              class="nav-button nav-prev"
              id="inlinePrev"
              type="button"
              aria-label="Previous photo"
            >&#10094;</button>

            <button
              class="nav-button nav-next"
              id="inlineNext"
              type="button"
              aria-label="Next photo"
            >&#10095;</button>

          </div>

          <div class="profile-info">
            <div>
              <strong>Zaza</strong>
              <span>Profile photo collection</span>
            </div>
            <span class="profile-symbol" aria-hidden="true">✦</span>
          </div>

        </div>

        <figcaption>
          Swipe or drag to browse. Click a photo to enlarge.
        </figcaption>

        <p id="galleryError" class="gallery-error" hidden></p>

      </figure>

      <!-- SECOND PARAGRAPH -->
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque habitant morbi tristique senectus et netus
        et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet,
        ante. Donec eu libero sit amet quam egestas semper.
        Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo. Quisque sit amet est et sapien ullamcorper pharetra.
      </p>

    </article>

  </main>

  <!-- FULLSCREEN PHOTO VIEWER -->
  <dialog
    id="photoViewer"
    class="photo-viewer"
    aria-label="Zaza's profile photo viewer"
  >

    <div class="viewer-layout">

      <header class="viewer-header">

        <div class="viewer-heading">
          <strong>Zaza</strong>
          <span id="viewerCounter">1 of 1</span>
        </div>

        <button
          id="closeViewer"
          class="close-button"
          type="button"
          aria-label="Close photo viewer"
        >&times;</button>

      </header>

      <div class="viewer-stage" id="viewerStage">

        <button
          id="viewerPrev"
          class="viewer-arrow"
          type="button"
          aria-label="Previous photo"
        >&#10094;</button>

        <img
          id="viewerImage"
          src=""
          alt=""
          draggable="false"
        >

        <button
          id="viewerNext"
          class="viewer-arrow"
          type="button"
          aria-label="Next photo"
        >&#10095;</button>

      </div>

      <footer class="viewer-footer">

        <div
          id="thumbnailStrip"
          class="thumbnail-strip"
          aria-label="Photo thumbnails"
        ></div>

        <span class="viewer-hint">
          Use arrow keys or swipe to navigate · Esc to close
        </span>

      </footer>

    </div>

  </dialog>

</body>
</html>
