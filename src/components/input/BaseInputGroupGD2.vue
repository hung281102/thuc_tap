<template>
  <div :class="width">
    <div
      class="form-group"
      :class="{ ' error': errorMessage, ' text-field': textField }"
    >
      <label for="" :class="{ ' required': isRequired }"
        >{{ label }}<span class="icon-required" v-show="isRequired">*</span>
      </label>
      <input
        :placeholder="placeholder"
        :name="name"
        :type="type"
        ref="input"
        :value="modelValue"
        @input="updateValue"
        @blur="blur"
        :checked="value"
        :style="{ 'text-align': text }"
        style="font-family: M-roboto"
        :disabled="disabled"
      />
      <div
        class="icon"
        :class="{ ' rotate': rotate }"
        v-if="icon"
        @click="handleClickIcon($event)"
      >
        <div></div>
      </div>
      <div class="tooltip-input" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import enums from "@/helpers/enum";
import { onBeforeUpdate, onMounted, ref } from "vue";
export default {
  data() {
    return {
      enums: { ...enums },
    };
  },
  props: {
    isRequired: Boolean,
    label: String,
    modelValue: String,
    errorMessage: String,
    type: String,
    name: String,
    width: String,
    value: String,
    blur: Function,
    placeholder: String,
    tooltip: String,
    text: String,
    typeData: String,
    font: String,
    icon: Boolean,
    textField: Boolean,
    disabled: Boolean,
    isClickIcon: Boolean,
    rotate: Boolean,
  },

  setup(props, context) {
    /**
     *
     * Xử lý input
     * author: TQHUNG
     * Date: 8-4-2023
     */

    onMounted(() => {
      // console.log(props.modelValue);
    });

    const isRotate = ref(false);

    // Hàm gửi đi sự kiện cập nhật input
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    const handleClickIcon = (event) => {
      if (!props.disabled) {
        context.emit("handleClick", event);
        isRotate.value = !isRotate.value;
      } else {
        return;
      }
    };

    return {
      updateValue,
      handleClickIcon,
      isRotate,
    };
  },
};
</script>

<style>
.form-group {
  position: relative;
}
.form-group input {
  position: relative;
}
.form-group input:disabled {
  background-color: #eff0f2;
}
.form-group.text-field input {
  height: 55px !important;
  width: 100%;
}
.tooltip-input {
  width: max-content;
  position: absolute;
  bottom: -30px;
  left: 0;
  font-size: 12px;
  padding: 0 12px;
  height: 24px;
  line-height: 24px;
  background-color: rgb(255, 119, 119);
  color: #ffffff;
  border-radius: 4px;
  /* display: none; */
  z-index: 999;
}
.form-group input:hover ~ .tooltip-input {
  display: block;
}
.tooltip-input::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateY(50%);
  width: 0px;
  height: 0px;
  border-bottom: 4px solid rgb(255, 119, 119);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  width: 100%;
  height: 36px;
  padding: 0px 8px;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}
.form-group label {
  font-size: 13px;
  color: #1f1f1f;
  font-weight: 700;
}

.form-group input[type="text"],
.form-group input[type="date"] {
  width: 100%;
  height: 26px;
  padding: 0px 12px 0 10px;
  border-radius: 2px;
  border: 1px solid #babec5;
}
.form-group input::placeholder {
  color: #999999;
  font-size: 14px;
}

.form-group input[type="text"]:focus,
.form-group input[type="date"]:focus {
  border: 1px solid #50b83c;
  outline: none;
}
.icon {
  position: absolute;
  right: 1px;
  bottom: 1px;

  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.icon:hover {
  background-color: #ebebf2;
}
.icon.rotate > div {
  transform: rotate(180deg);
}
.icon > div {
  display: block;
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -564px -365px;
  width: 8px;
  height: 5px;
}
</style>
