<template>
  <div class="dialog" v-if="isShow">
    <div class="dialog-overlay"></div>
    <div class="dialog-container">
      <div class="dialog-message">
        <div class="icon-error">
          <div></div>
        </div>
        <p>{{ description }}</p>
      </div>
      <div class="dialog-footer">
        <button ref="buttonElm" class="btn m-btn" @click="closeDialog">
          {{ button1 }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUpdate, onMounted, ref } from "vue";
import BaseButton from "../button/BaseButton.vue";
const buttonElm = ref(null);
const props = defineProps(["title", "description", "button1", "isShow"]);
const emit = defineEmits(["closeDialog"]);

const closeDialog = () => {
  emit("closeDialog");
};

const handleKeyPress = (event) => {
  if (event.key === "enter") {
    console.log("enter");
    emit("closeDialog");
  }
};

onMounted(() => {
  console.log(buttonElm.value);
  // buttonElm.value.focus();
  window.addEventListener("keydown", handleKeyPress);
});
onBeforeUpdate(() => {
  console.log(buttonElm.value);
});
</script>

<style scoped>
@font-face {
  font-family: M-roboto;
  src: url("@/assets/fonts/Roboto-Regular.ttf");
}
.dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.dialog-overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog-container {
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 4px;
}

.dialog-message {
  display: flex;
  gap: 20px;
  align-items: center;
  height: 48px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dadada;
}
.dialog-message p {
  font-size: 14px;
  color: #888;
  font-weight: 400;
  /* line-height: 48px; */
}
.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 10px;
}

.icon-error {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-error > div {
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -752px -462px;
  width: 36px;
  height: 36px;
}
</style>
