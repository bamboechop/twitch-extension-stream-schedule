<template>
  <span class="custom-loader"></span>
</template>

<style scoped>
.custom-loader {
  animation: rotation 1s linear infinite;
  border: 3px solid rgba(255, 255, 255, 0.75);
  border-bottom-color: #9146ff;
  border-radius: 50%;
  display: inline-block;
  height: 32px;
  width: 32px;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
  100% {
    transform: rotate(360deg);
  }
}
</style>