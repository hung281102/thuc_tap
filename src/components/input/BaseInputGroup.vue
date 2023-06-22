<template>
  <div :class="width">
    <div class="form-group" :class="{ ' error': errorMessage }">
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
      />
      <span class="error-message">{{ errorMessage }}</span>
      <div class="tooltip-input" v-show="tooltip">
        {{ tooltip }}
      </div>
    </div>
  </div>
</template>

<script>
import enums from "@/helpers/enum";
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
  },

  setup(props, context) {
    /**
     * Xử lý input
     * author: TQHUNG
     * Date: 8-4-2023
     */

    // Hàm gửi đi sự kiện cập nhật input
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };

    return {
      updateValue,
    };
  },
};
</script>

<style>
.form-group {
  position: relative;
}
.tooltip-input {
  position: absolute;
  bottom: -20px;
  left: 0;

  font-size: 12px;
  padding: 0 12px;
  height: 24px;
  line-height: 24px;
  background-color: #041434;
  color: #ffffff;
  border-radius: 4px;
  display: none;
}
label:hover ~ .tooltip-input {
  display: block;
}
.tooltip-input::after {
  content: "";
  position: absolute;
  left: 50%;
  top: -6px;
  transform: translateY(50%);
  width: 0px;
  height: 0px;
  border-bottom: 4px solid #041434;
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
</style>
