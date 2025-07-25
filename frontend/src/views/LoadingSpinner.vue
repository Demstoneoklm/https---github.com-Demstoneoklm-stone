<!-- src/components/LoadingSpinner.vue -->
<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
