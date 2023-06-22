<template>
  <div class="combobox-advance" :class="width">
    <BaseInputGroupGD2
      :label="label"
      type="text"
      width="w-100"
      :icon="true"
      v-model="itemSelect"
      @handleClick="handleClickIcon"
      ref="target"
      :rotate="isRotate"
      :disabled="disabled"
    ></BaseInputGroupGD2>

    <teleport to="body">
      <div
        class="list-item-cb"
        :style="{
          left: `${posOptionX}px`,
          top: `${posOptionY}px`,
          width: `${widthList}px`,
        }"
        v-if="isShowListItem"
      >
        <div class="cb-item-list">
          <div class="list-header">
            <!-- <div class="col-acc-num">Số tài khoản</div>
          <div class="col-acc-name">Tên tài khoản</div> -->
            <div
              class="col-header"
              v-for="item in dataColumn"
              :style="{ width: item.width }"
            >
              {{ item.column_name }}
            </div>
          </div>
          <div class="list-body" @scroll="handleScroll" ref="listItem">
            <div
              class="item"
              v-for="(item, index) in comboboxData"
              @click="selectItem(item)"
              :class="{
                ' text-bold ': item.is_parent,
              }"
            >
              <div
                class="data"
                v-for="attribute in dataColumn"
                :style="{ width: attribute.width }"
              >
                <div
                  class="col-data"
                  :style="
                    attribute.id === 0 &&
                    isCustomStyle &&
                    customStyle(item.grade)
                  "
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ item[attribute.attribute] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import BaseInputGroupGD2 from "@/components/input/BaseInputGroupGD2.vue";
import { onBeforeUpdate, onMounted, onUpdated, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["update:modelValue", "scrollTop"]);
const props = defineProps([
  "comboboxData",
  "modelValue",
  "dataColumn",
  "widthList",
  "label",
  "attributeBinding",
  "attributeDisplay",
  "isCustomStyle",
  "left",
  "top",
  "data",
  "disabled",
  "widthParent",
  "custom",
]);
const listItem = ref(null);
const lastScrollPosition = ref(0);
const isShowListItem = ref(false);
const itemSelect = ref(null);
const isRotate = ref(false);

const handleScroll = () => {
  const scrollTop = listItem.value.scrollTop;

  if (scrollTop > lastScrollPosition.value) {
    // Xử lý sự kiện scroll xuống tại đây
    console.log("Scroll xuống");

    // call API gọi thêm data
    setTimeout(() => {
      emit("scrollTop");
    }, 300);
  }

  lastScrollPosition.value = scrollTop;
};

watch(isShowListItem, (newValue) => {
  isRotate.value = newValue;
});

const posOptionX = ref(null);
const posOptionY = ref(null);
onMounted(() => {
  // console.log(props.modelValue);
  // console.log(props.data);
  if (!props.modelValue) {
    itemSelect.value = "";
    return;
  } else {
    if (props.comboboxData) {
      let tmp = props.comboboxData.filter(
        (acc) => acc[props.attributeBinding] === props.modelValue
      )[0];
      if (tmp) {
        itemSelect.value = tmp[props.attributeDisplay];
      }
    } else {
      itemSelect.value = props.data;
      console.log(itemSelect.value);
    }
  }
});
onBeforeUpdate(async () => {
  // console.log(props.modelValue);
  // console.log(props.data);
  if (!props.modelValue) {
    itemSelect.value = "";
    return;
  } else {
    if (props.comboboxData) {
      let tmp = props.comboboxData.filter(
        (acc) => acc[props.attributeBinding] === props.modelValue
      )[0];
      if (tmp) {
        itemSelect.value = tmp[props.attributeDisplay];
      }
    } else {
      itemSelect.value = props.data;
      console.log(itemSelect.value);
    }
  }
});

const getParent = (element, selector) => {
  // lap ra tim form-group

  while (element.parentElement) {
    // còn tồn tại thẻ cha thì lặp
    if (element.parentElement.matches(selector)) {
      return element.parentElement;
    }
    element = element.parentElement;
  }
};

const handleClickIcon = (event) => {
  debugger;
  let elm = event.target;
  // console.log(event);
  elm = getParent(elm, ".form-group");

  console.log(elm);

  var coordinatesParentElement = elm.getBoundingClientRect();

  let heightContent = 200;
  isShowListItem.value = !isShowListItem.value;
  // console.log(props.widthParent);
  // console.log(event);
  // if (window.innerHeight - event.clientY < heightContent) {
  //   posOptionY.value = event.clientY - 250;
  //   posOptionX.value = event.clientX - props.widthParent;
  // } else {
  //   posOptionY.value = event.clientY + 25;
  //   if (props.custom === true) {
  //     posOptionX.value = props.left;
  //   } else {
  //     posOptionX.value = event.clientX - props.widthParent + 5;
  //   }
  // }

  if (window.innerHeight - event.clientY < heightContent) {
  } else {
    posOptionY.value = coordinatesParentElement.bottom + 4;
    if (props.custom === true) {
      posOptionX.value = props.left;
    } else {
      posOptionX.value = coordinatesParentElement.left;
    }
  }
};

const selectItem = (item) => {
  // console.log(item);
  // console.log(item[props.attributeBinding]);
  // itemSelect.value = item.account_number;
  // emit("update:modelValue", item.account_id);
  itemSelect.value = item[props.attributeDisplay];
  emit("update:modelValue", item[props.attributeBinding]);
  console.log(item[props.attributeBinding]);
  // accountSelect.value = item.account_id;
  // isShowListItem.value = !isShowListItem.value;
  isShowListItem.value = false;
};

const customStyle = (num) => {
  return {
    paddingLeft: num * 15 + "px",
  };
};
const target = ref(null);
onClickOutside(target, (event) => (isShowListItem.value = false));
</script>

<style scoped>
.w-90 {
  width: 90%;
}
.list-item-cb {
  position: absolute;
  top: 55px;
  left: 0;
  z-index: 105;
  background-color: #fff;
  z-index: 99999;

  border: 1px solid #d8d8d8;
}
.combobox-advance {
  position: relative;
}

.cb-item-list {
  width: 100%;
  height: 100%;
  z-index: 199;
  background-color: #fff;
  position: relative;
}
.hightlight {
  color: #fff;
  background-color: #2ca01c;
}
.list-header {
  width: 100%;
  display: flex;
  background-color: #eceef1;
  height: 30px;
  font-size: 14px;
  font-weight: 700;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
}
.col-header {
  height: 100%;
  line-height: 30px;
}
.col-header:last-child:hover {
  border-right: none;
}
.col-header:hover {
  border-right: 1px solid #ccc;
}
.list-body {
  height: 200px;
  /* width: 200%; */
  overflow-y: auto;
}
.list-body::-webkit-scrollbar {
  width: 8px;
}
.list-body::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 3px;
}
.list-body::-webkit-scrollbar-track {
  background-color: #eceef1;
}
.list-body > .item {
  display: flex;
  height: 30px;
  cursor: pointer;
  font-size: 14px;
}
.list-body > .item:hover {
  background-color: #2ca01c;
  color: white;
}
.col-header {
  padding: 0 10px;
}
.data {
  padding: 0 10px;
  line-height: 30px;
}

.text-bold {
  font-weight: 600;
}
</style>
