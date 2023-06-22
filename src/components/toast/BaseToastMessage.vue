<template>
  <div class="toast-message" v-if="isShow">
    <span class="toast-message-icon" :class="iconState"> </span>
    <div class="notification">
      <span class="state">{{ state }}!</span>
      <p class="result">{{ result }}</p>
    </div>
    <span class="toast-message-action">Hoàn tác</span>
    <span class="toast-message-close" @click="closeToastMessage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <defs></defs>
        <rect
          class="a"
          style="fill: #999999; opacity: 0"
          width="24"
          height="24"
          transform="translate(24 24) rotate(180)"
        />
        <path
          class="b"
          style="fill: #999999"
          d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,1,0,1.42,1.42L12,13.41l4.29,4.3a1,1,0,1,0,1.42-1.42Z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: "BaseToastMessage",
  data() {
    return {};
  },
  methods: {
    closeToastMessage() {
      // console.log(isShow);
      console.log(this.iconState);
    },
  },
  props: ["state", "result", "isShow", "iconState"],
};
</script>

<style scoped>
.toast-message {
  width: 450px;
  height: 56px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}
.toast-message-icon {
  margin-right: 10px;
}
.toast-message-icon.success {
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -1602px -258px;
  width: 20px;
  height: 20px;
}
.toast-message-icon.error {
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -762px -146px;
  width: 20px;
  height: 20px;
}
.notification {
  display: flex;
  gap: 4px;
}
.notification span {
  color: #50b83c;
  font-size: 14px;
  font-weight: bolder;
}
.notification p {
  color: #1f1f1f;
  font-size: 14px;
  margin-right: 92px;
}
.toast-message-action {
  font-size: 14px;
  text-decoration: underline;
  font-weight: 500;
  color: #1f1f1f;
  margin-right: 16px;
  cursor: pointer;
}
.toast-message-close {
  color: #50b83c;
  cursor: pointer;
  margin-left: auto;
}
</style>
