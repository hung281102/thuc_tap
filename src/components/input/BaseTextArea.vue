<template>
  <div :class="width">
    <div
      class="form-group"
      :class="{ ' error': errorMessage, ' text-field': textField }"
    >
      <label for="" :class="{ ' required': isRequired }"
        >{{ label }}<span class="icon-required" v-show="isRequired">*</span>
      </label>
      <textarea
        :placeholder="placeholder"
        :name="name"
        :type="type"
        ref="input"
        :value="modelValue"
        @input="updateValue"
        @blur="blur"
        :checked="value"
        :style="{ 'text-align': text }"
        style="font-family: M-roboto; resize: none; rows='2'"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import enums from "@/helpers/enum";
import { ref } from "vue";
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
  },

  setup(props, context) {
    /**
     *
     * Xử lý input
     * author: TQHUNG
     * Date: 8-4-2023
     */

    const isRotate = ref(false);

    // Hàm gửi đi sự kiện cập nhật input
    const updateValue = (event) => {
      // console.log(event.target.value);
      context.emit("update:modelValue", event.target.value);
    };
    const handleClickIcon = () => {
      if (!props.disabled) {
        context.emit("handleClick");
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
.form-group textarea {
}
.form-group textarea:disabled {
  background-color: #eff0f2;
}
.form-group.text-field textarea {
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
.form-group textarea:hover ~ .tooltip-input {
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}
.form-group label {
  font-size: 13px;
  color: #1f1f1f;
  font-weight: 700;
}

.form-group textarea {
  width: 100%;
  height: 26px;
  padding: 8px 12px;
  border-radius: 2px;
  border: 1px solid #babec5;
}
.form-group textarea::placeholder {
  color: #999999;
  font-size: 14px;
}

.form-group textarea:focus {
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
</style>
