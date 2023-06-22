<template>
  <div class="button-container" ref="target">
    <Tippy :content="textTooltip" placement="bottom">
      <div class="button-show-more">
        <div class="text" @click="action">{{ text }}</div>
        <div class="icon-btn" @click="openListOption">
          <div></div>
        </div>
      </div>
    </Tippy>
    <div class="list-option-button" v-if="isShowOption">
      <ul>
        <li v-for="item in arrText" @click="selectOption(item)">
          <Tippy :content="item.tooltip" placement="bottom">
            {{ item.name }}
          </Tippy>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import enums from "@/helpers/enum";

const emit = defineEmits(["saveAndAdd", "saveAndClose", "saveAndPrint"]);

const text = ref("");
const textTooltip = ref("");
const isShowOption = ref(false);
const target = ref(null);
const arrText = ref([
  { id: 0, name: "Cất và thêm", tooltip: "Cất và thêm (Ctrl + Shift + S)" },
  {
    id: 1,
    name: "Cất và đóng",
    tooltip: "Cất và đóng (Ctrl + Q)",
  },
  {
    id: 2,
    name: "Cất và in",
    tooltip: "Cất và in (Ctrl + P)",
  },
]);

onMounted(() => {
  if (localStorage.getItem("button")) {
    text.value = arrText.value[localStorage.getItem("button")].name;
    textTooltip.value = arrText.value[localStorage.getItem("button")].tooltip;
  } else {
    text.value = arrText.value[0].name;
    textTooltip.value = arrText.value[0].tooltip;
  }

  console.log(text.value);
});

const openListOption = () => {
  isShowOption.value = !isShowOption.value;
};

const selectOption = (item) => {
  isShowOption.value = false;
  text.value = item.name;
  textTooltip.value = item.tooltip;
  console.log(item);
  if (item.id === 0) {
    emit("saveAndAdd");
    localStorage.setItem("button", 0);
  } else if (item.id === 1) {
    emit("saveAndClose");
    localStorage.setItem("button", 1);
  } else if (item.id === 2) {
    emit("saveAndPrint");
    localStorage.setItem("button", 2);
  }
};
// const saveAndAdd = () => {
//   emit("saveAndAdd");
// };
const action = () => {
  // console.log(typeof localStorage.getItem("button"));
  if (localStorage.getItem("button") === "0") {
    emit("saveAndAdd");
  } else if (localStorage.getItem("button") === "1") {
    emit("saveAndClose");
  } else if (localStorage.getItem("button") === "2") {
    emit("saveAndPrint");
  }
};

const handleKey = (event) => {
  console.log(event);
  if (event.keyCode === enums.KeyCode.S && event.ctrlKey && event.shiftKey) {
    event.preventDefault();
    emit("saveAndAdd");
  } else if (
    event.keyCode === enums.KeyCode.CTRL &&
    event.keyCode === enums.KeyCode.Q
  ) {
    console.log("Save");
    event.preventDefault();
    emit("saveAndClose");
  } else if (event.keyCode === enums.KeyCode.P && event.ctrlKey) {
    event.preventDefault();
    emit("saveAndPrint");
  }
};
onMounted(() => window.addEventListener("keydown", handleKey));
onUnmounted(() => window.removeEventListener("keydown", handleKey));

onClickOutside(target, (event) => {
  isShowOption.value = false;
});
</script>

<style scoped>
.text {
  padding-right: 16px;
  height: 28px;
  line-height: 28px;
}
.button-container {
  position: relative;
}

.button-show-more {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  background-color: #33951f;
  height: 28px;
  padding-left: 16px;
  cursor: pointer;
  border-radius: 2px;
}
.icon-btn {
  padding: 6px 10px;
  border-left: 1px solid #fff;
}
.icon-btn > div {
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -852px -365px;
  width: 8px;
  height: 5px;
  color: #fff;
}
.list-option-button {
  position: absolute;
  bottom: 28px;
  right: 0;
  padding: 4px 0;
  background-color: #fff;
  width: max-content;
  border: 1px solid #999;
  border-radius: 2px;
}
.list-option-button li {
  list-style: none;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
  cursor: pointer;
}
.list-option-button li:hover {
  background-color: rgba(0, 0, 0, 0.04);
  color: #96ca96;
}
</style>
