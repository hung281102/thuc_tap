<template>
  <div class="toast-message-container" :class="state" v-if="isShow">
    <div class="toast-message-icon">
      <div :class="state"></div>
    </div>
    <div class="toast-message-description">{{ description }}</div>
  </div>
</template>

<script setup>
const emit = defineEmits([""]);
const props = defineProps(["state", "description", "isShow"]);
</script>

<style scoped>
.toast-message-container {
  position: fixed;
  top: 50px;
  right: 30px;
  width: 410px;
  height: max-content;
  padding: 20px 30px;
  border-radius: 10px;

  z-index: 999;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 20px;
}
.toast-message-container.success {
  border: 1px solid green;
}
.toast-message-icon {
  width: 36px;
  height: 36px;
}
.toast-message-icon .success {
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -990px -462px;
  width: 36px;
  height: 36px;
}
.toast-message-description {
  font-size: 15px;
}
.toast-message-container.success .toast-message-description {
  color: green;
}
</style>
