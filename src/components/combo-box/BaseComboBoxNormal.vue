<template>
  <div class="combobox-nomal" :class="width">
    <BaseInputGroupGD2
      :label="label"
      type="text"
      width="w-100"
      :isRequired="isRequired"
      :icon="true"
      v-model="itemSelect"
      @handleClick="handleClickIcon"
      :disabled="disabled"
      :isClickIcon="!isShowListItem"
      :rotate="isRotate"
      ref="target"
    ></BaseInputGroupGD2>
    <!-- <div class="dropdown-icon" @click="iconOnClick"></div> -->

    <div
      class="cb-item-list"
      v-if="isShowListItem"
      :class="direction"
      :style="{ width: widthList + '%' }"
    >
      <div
        class="combo-item"
        :class="{ ' active': item.name === itemSelect }"
        v-for="(item, index) in comboboxData"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInputGroupGD2 from "@/components/input/BaseInputGroupGD2.vue";
import { onBeforeUpdate, onMounted, onUpdated, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps([
  "label",
  "isRequired",
  "comboboxData",
  "disabled",
  "modelValue",
  "direction",
  "widthList",
]);
const target = ref(null);
const isRotate = ref(false);
const isShowListItem = ref(false);
const itemSelect = ref("");

onMounted(() => {
  if (!isNaN(props.modelValue)) {
    itemSelect.value = props.comboboxData[props.modelValue].name;
  } else if (props.modelValue === null || props.modelValue === undefined) {
    return;
  }
});
onBeforeUpdate(() => {
  if (props.modelValue) {
    itemSelect.value = props.comboboxData[props.modelValue].name;
  } else if (props.modelValue === null || props.modelValue === undefined) {
    return;
  }
});

watch(
  () => props.disabled,
  (newValue) => {
    if (!newValue) {
      itemSelect.value = props.comboboxData[0].name;
    } else {
      itemSelect.value = "";
    }
  },
  {
    deep: true,
  }
);

watch(isShowListItem, (newValue) => {
  isRotate.value = newValue;
});

const handleClickIcon = () => {
  isShowListItem.value = !isShowListItem.value;
};
const selectItem = (item) => {
  itemSelect.value = item.name;
  // isShowListItem.value = !isShowListItem.value;
  isShowListItem.value = false;
  console.log(isShowListItem.value);
  emit("update:modelValue", item.id);
};

onClickOutside(target, (event) => {
  isShowListItem.value = false;
});
</script>

<style scoped>
.combobox-nomal {
  position: relative;
}

.cb-item-list {
  width: 100%;
  height: max-content;
  border: 1px solid #babec5;
  margin-top: 3px;
  position: absolute;
  z-index: 102;
  background-color: #fff;
}
.cb-item-list.top {
  bottom: 30px;
}
.cb-item-list .combo-item {
  height: 26px;
  cursor: pointer;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: gray;
}
.cb-item-list .combo-item:hover {
  background-color: #2ca01c;
  color: white;
}
.active {
  background-color: #2ca01c;
  color: white !important;
}
</style>
