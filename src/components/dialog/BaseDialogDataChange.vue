<template>
  <div class="dialog">
    <div class="overlay"></div>
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="dialog-icon">
          <div></div>
        </div>
        <div class="message">{{ props.message }}</div>
      </div>
      <div class="button-block">
        <button class="btn s-btn" @click="closeDialog">Huỷ</button>
        <div class="block-btn-right">
          <button class="btn s-btn" @click="closeDialogAndForm">Không</button>
          <button class="btn m-btn" @click="accept">Có</button>
        </div>
      </div>
    </div>
  </div>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
</template>

<script setup>
import BaseLoading from "@/components/loading/BaseLoading.vue";

import axios from "axios";
import { defineProps, defineEmits, ref, onMounted } from "vue";

const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  message: {
    type: String,
  },
  data: {
    type: Object,
  },
  action: {
    type: String,
  },
});

const accept = () => {
  emit("save");
};

const closeDialog = () => {
  emit("closeDialog");
};

const closeDialogAndForm = () => {
  emit("closeDialogAndForm");
};
</script>

<style scoped>
.dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog-container {
  width: 444px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 16px 20px 10px;
  border-radius: 2px;
}
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  height: 48px;
}
.dialog-icon {
  width: 37px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-icon > div {
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -832px -462px;
  width: 36px;
  height: 37px;
}
.message {
  font-size: 14px;
  font-weight: 400;
}
.button-block {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #999;
  margin-top: 15px;
}
.block-btn-right {
  display: flex;
  gap: 10px;
}
</style>
