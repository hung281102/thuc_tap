<template>
  <div class="dialog" v-if="isShow">
    <div class="dialog-overlay"></div>
    <div class="dialog-container">
      <div class="dialog-header">
        <h1>{{ title }}</h1>
        <Tippy content="Đóng" placement="top">
          <div class="close" @click="closeDialog"></div>
        </Tippy>
      </div>
      <div class="dialog-desc">
        <p>{{ description }} {{ employeeCode }} ?</p>
      </div>
      <div class="dialog-footer">
        <BaseButton :title="button1" type="sub-btn " @click="closeDialog" />
        <BaseButton :title="button2" type="m-btn del" @click="deleteEmployee" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../button/BaseButton.vue";
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";

export default {
  data() {
    return {
      isDelete: true,
    };
  },
  components: { BaseButton, Tippy },
  props: [
    "title",
    "description",
    "button1",
    "button2",
    "isShow",
    "employeeIdDel",
    "employeeCode",
    "countEmployee",
    "mode",
  ],
  methods: {
    // Người viết: Trần Quang Hưng
    // Ngày viết: 15/04/2023
    // Tên hàm: Phát đi sự kiện đóng Dialog
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
  setup(props, context) {
    // Người viết: Trần Quang Hưng
    // Ngày viết: 15/04/2023
    // Tên hàm: Phát đi sự kiện theo logic
    const deleteEmployee = () => {
      if (props.mode === "delete") {
        context.emit("deleteEmployee");
      } else if (props.mode === "change") {
        context.emit("save");
      }
    };

    return {
      deleteEmployee,
    };
  },
};
</script>

<style>
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
  /* height: 173px; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 24px;
  border-radius: 4px;
}
.close {
  /* position: absolute; */
  /* top: 24px;
    right: 24px; */
  cursor: pointer;
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -1178px -362px;
  width: 12px;
  height: 12px;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
}
.dialog-header h1 {
  font-size: 20px;
  color: #1f1f1f;
  font-weight: 700;
  font-family: M-roboto;
  margin-bottom: 24px;
}
.dialog-desc p {
  font-size: 14px;
  color: #1f1f1f;
  font-weight: 400;
  margin-bottom: 24px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
