<template>
  <div class="" v-for="option in options" :key="option.value">
    <label for="">{{ option.label }}</label>
    <input
      type="radio"
      name="gender"
      :value="option.value"
      @input="updateValue"
      :checked="modelValue == option.value"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedDefault: 1,
    };
  },
  props: {
    modelValue: String,
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      // console.log(event.target.value);
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style></style>
