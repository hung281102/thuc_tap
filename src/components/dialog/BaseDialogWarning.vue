<template>
  <div class="dialog" v-if="isShow">
    <div class="overlay"></div>
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="dialog-icon">
          <div></div>
        </div>
        <div class="message">
          <div class="title">{{ title }}</div>
          <p>
            {{ description }}
          </p>
        </div>
      </div>
      <div class="button-block" style="">
        <button class="btn m-btn" @click="closeDialog">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from "vue";

const emit = defineEmits(["closeDialog"]);
const props = defineProps(["title", "description", "isShow"]);

const closeDialog = () => {
  emit("closeDialog");
};
</script>

<style scoped>
.dialog-icon > div {
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -752px -462px;
  width: 36px;
  height: 36px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog-container {
  width: 444px;
  padding: 16px 20px 10px;
}
.dialog-header {
  display: flex;
  gap: 20px;
  align-items: center;
}
.message .title {
  font-size: 14px;
  font-weight: 700;
  padding-bottom: 10px;
}
.message p {
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 20px;
  line-height: 26px;
  color: #111;
}
.button-block {
  display: flex;
  align-content: center;
  justify-content: center;
  border-top: 1px solid #999;
  padding-top: 10px;
}
</style>
