<template>
  <div class="dropdown-container" ref="target">
    <div
      :class="{ ' disabled': disabled }"
      class="dropdown-click"
      @click="toggleListItem"
    >
      <span>Thực hiện hàng loạt</span>
      <div class="icon-dropdown">
        <div></div>
      </div>
    </div>
    <div class="list-item" v-if="isShowListItem" @click="deletePayment">
      <div>Xoá</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["deletePayment"]);
const props = defineProps(["disabled"]);
const isShowListItem = ref(false);
const toggleListItem = () => {
  if (!props.disabled) {
    isShowListItem.value = !isShowListItem.value;
  } else {
    return;
  }
};
const deletePayment = () => {
  isShowListItem.value = false;
  emit("deletePayment");
};
const target = ref(null);
onClickOutside(target, (event) => (isShowListItem.value = false));
</script>

<style scoped>
.dropdown-container {
  height: 26px;
  width: max-content;
  position: relative;
}
.dropdown-click {
  height: 26px;
  padding: 0 16px;
  background-color: #fff;
  border: 1px solid #515050;
  border-radius: 2px;
  display: flex;
  align-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.dropdown-click.disabled {
  opacity: 0.4;
  pointer-events: none;
}
.dropdown-click:hover {
  background-color: #c6c5c5;
}
.dropdown-click span {
  font-size: 15px;
  line-height: 26px;
  font-weight: 500;
}
.icon-dropdown {
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-dropdown > div {
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -564px -365px;
  width: 8px;
  height: 5px;
}
.dropdown-container .list-item {
  z-index: 9999;
  background-color: #fff;
  border: 1px solid #999;
  width: 60%;
  position: absolute;
  top: 30px;
  right: 0;
  /* padding: 0 10px; */
  padding: 0;
}
.list-item > div {
  height: 28px;
  line-height: 28px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  color: #111;
  padding: 0 12px;
}
.list-item > div:hover {
  background-color: #e4e2e2;
  color: #25ae25;
}
</style>
