<script lang="ts" setup></script>

<template>
  <div
    class="container-fluid contain-auth d-flex align-items-center justify-content-center vh-100"
  >
    <div
      class="py-5 d-flex align-items-center form-container justify-content-center w-100 mx-4"
    >
      <slot />
    </div>
    <video
      autoplay
      muted
      loop
      id="myVideo"
      class="video-container rounded-5 position-absolute d-none d-lg-block shadow-high"
    >
      <source src="../assets/video/Whisper Web (1).mp4" type="video/mp4" />
    </video>
    <img
      src="../assets/video/Whisper Web.png"
      alt=""
      class="position-absolute img-st"
    />
  </div>
</template>

<style lang="css" scoped>
.contain-auth {
  background: linear-gradient(to bottom, #d3d3d3, #919de4);
}

.video-container {
  height: 90vh;
}
.form-container {
  z-index: 100;
}

@media (max-width: 970px) {
  .form-container {
    box-shadow: var(--shadow-elevation-high);
    background-color: rgba(107, 107, 107, 0.2);
    border-radius: 2rem;
  }
}

.img-st {
  width: 8rem;
  top: 0;
}
</style>
