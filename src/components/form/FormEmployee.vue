<template>
  <div class="form-add-employee" v-if="isShowForm" @keydown.esc="closeForm">
    <div class="form">
      <div class="form-heading">
        <h3>
          {{ formTitle }}
        </h3>
      </div>
      <div class="form-body">
        <div class="form-body-inf">
          <div>
            <div class="ben-trai w-50">
              <BaseInputGroup
                :label="resource.TABLE_COLUMNS.employeeCode"
                type="text"
                width="w-40"
                :placeholder="resource.TABLE_COLUMNS.employeeCode"
                :isRequired="true"
                :errorMessage="formErrors.employeeCodeError"
                :blur="validateEmployeeCode"
                v-model="formData.employeeCode"
                ref="inputEmployeeCode"
              ></BaseInputGroup>

              <BaseInputGroup
                :label="resource.TABLE_COLUMNS.fullName"
                type="text"
                :placeholder="resource.TABLE_COLUMNS.fullName"
                width="w-60"
                :isRequired="true"
                :errorMessage="formErrors.nameError"
                :blur="validateName"
                v-model="formData.fullName"
              ></BaseInputGroup>
            </div>
            <div class="ben-phai w-50">
              <BaseInputGroup
                :label="resource.TABLE_COLUMNS.dateOfBirth"
                type="date"
                width="w-40"
                :isRequired="false"
                v-model="formData.dateOfBirth"
                font="M-roboto"
              ></BaseInputGroup>

              <div class="form-group gender w-60">
                <label for="">{{ resource.TABLE_COLUMNS.gender }}</label>
                <div class="box-gender">
                  <BaseGenderInput
                    v-model="formData.gender"
                    :options="genderOptions"
                  ></BaseGenderInput>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="ben-trai w-50" ref="target">
              <div
                class="form-group w-full don-vi"
                :class="{
                  ' error': formErrors.departmentError,
                }"
                v-on:keyup.enter="handleDropList"
              >
                <label for="" class="required"
                  >{{ resource.TABLE_COLUMNS.departmentName
                  }}<span class="icon-required">*</span></label
                >
                <input
                  type="text"
                  name="donvi"
                  id="input-don-vi"
                  class="input-don-vi"
                  autocomplete="off"
                  placeholder="-Vui lòng chọn-"
                  @click="handleDropList"
                  @blur="validateDepartment"
                  v-model="formData.departmentName"
                  v-on:keydown.arrow-down="selectNextItem"
                  v-on:keydown.arrow-up="selectPrevItem"
                />
                <span class="show-don-vi" :class="{ open: isOpenDropList }">
                </span>
                <div class="parent-option-div" v-show="isOpenDropList">
                  <div class="option">
                    <div
                      class="option-item"
                      :class="{
                        ' hover': index === selectItemIndex,
                      }"
                      v-for="(department, index) in arrayDepartments"
                      :key="department"
                      @click="selectOption(index)"
                      ref="department"
                    >
                      <span class="lua-chon">{{
                        department.departmentName
                      }}</span>
                    </div>
                  </div>
                </div>
                <span class="error-message" v-if="formErrors.departmentError">{{
                  formErrors.departmentError
                }}</span>
              </div>
            </div>

            <div class="ben-phai w-50">
              <BaseInputGroup
                :label="resource.TABLE_COLUMNS.identityNumber"
                type="text"
                width="w-60"
                :isRequired="false"
                v-model="formData.identityNumber"
                tooltip="Chứng minh nhân dân"
              ></BaseInputGroup>
              <BaseInputGroup
                :label="resource.TABLE_COLUMNS.identityDate"
                type="date"
                width="w-40"
                :isRequired="false"
                v-model="formData.identityDate"
              ></BaseInputGroup>
            </div>
          </div>
          <div>
            <div class="ben-trai w-50">
              <BaseInputGroup
                :label="resource.TABLE_COLUMNS.positionName"
                type="text"
                width="w-full"
                :isRequired="false"
                v-model="formData.positionName"
              ></BaseInputGroup>
            </div>
            <div class="ben-phai w-50">
              <BaseInputGroup
                :label="resource.TABLE_COLUMNS.identityPlace"
                type="text"
                width="w-full"
                :isRequired="false"
                v-model="formData.identityPlace"
              ></BaseInputGroup>
            </div>
          </div>
        </div>
        <div class="form-body-contact">
          <div class="w-full">
            <BaseInputGroup
              :label="resource.TABLE_COLUMNS.address"
              type="text"
              width="w-full"
              :isRequired="false"
              v-model="formData.address"
            ></BaseInputGroup>
          </div>
          <div class="w-full">
            <BaseInputGroup
              :label="resource.TABLE_COLUMNS.phoneNumber"
              type="text"
              width="w-40"
              :isRequired="false"
              v-model="formData.phoneNumber"
            ></BaseInputGroup>
            <BaseInputGroup
              :label="resource.TABLE_COLUMNS.salary"
              placeholder="0"
              type="number"
              typeData="number"
              width="w-40"
              field="salary"
              text="end"
              :isRequired="false"
              v-model="formData.salary"
            ></BaseInputGroup>

            <BaseInputGroup
              :label="resource.TABLE_COLUMNS.email.label"
              :placeholder="resource.TABLE_COLUMNS.email.placeholder"
              type="text"
              width="w-40"
              :isRequired="false"
              v-model="formData.email"
            ></BaseInputGroup>
          </div>
          <div class="w-full">
            <BaseInputGroup
              :label="resource.TABLE_COLUMNS.bankAccount"
              type="text"
              width="w-40"
              :isRequired="false"
              v-model="formData.bankAccount"
            ></BaseInputGroup>
            <BaseInputGroup
              :label="resource.TABLE_COLUMNS.bankName"
              type="text"
              width="w-40"
              :isRequired="false"
              v-model="formData.bankName"
            ></BaseInputGroup>
            <BaseInputGroup
              :label="resource.TABLE_COLUMNS.bankPlace"
              type="text"
              width="w-40"
              :isRequired="false"
              v-model="formData.bankPlace"
            ></BaseInputGroup>
          </div>
        </div>
      </div>

      <!--  form footer -->
      <!-- mode: edit -->
      <div class="form-footer" v-if="isShowFooterFormUpdate">
        <div class="block-btn nut-trai" @click="closeForm">
          <BaseButton
            :title="resource.BUTTON.title.cancel"
            type="sub-btn"
          ></BaseButton>
        </div>
        <div class="btn-update" @click="update">
          <BaseButton
            :title="resource.BUTTON.title.save"
            type="m-btn"
          ></BaseButton>
        </div>
      </div>

      <!--  form footer -->
      <!-- mode: add -->
      <div class="form-footer" v-if="isShowFooterFormAdd">
        <div class="block-btn nut-trai" @click="closeForm">
          <BaseButton
            :title="resource.BUTTON.title.cancel"
            type="sub-btn"
          ></BaseButton>
        </div>
        <div class="nut-phai">
          <BaseButton
            :title="resource.BUTTON.title.save"
            type="sub-btn"
            @click="save"
          ></BaseButton>

          <BaseButton
            :title="resource.BUTTON.title.saveAndAdd"
            type="m-btn"
            @click="saveAndAdd"
          ></BaseButton>
        </div>
      </div>
      <div class="btn-close-question">
        <Tippy content="Giúp(F1)" placement="bottom">
          <div class="btn-question"></div>
        </Tippy>
        <Tippy content="Đóng(ESC)" placement="bottom">
          <div class="btn-close" @mousedown="closeForm"></div>
        </Tippy>
      </div>
    </div>
  </div>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
  <BaseToastMessage
    :result="resource.TOAST_MESSAGE.actions.add"
    :state="resource.TOAST_MESSAGE.state.success"
    :isShow="isShowToastMessage"
    iconState="success"
  />

  <BaseToastMessage
    :result="resource.TOAST_MESSAGE.actions.update"
    :state="resource.TOAST_MESSAGE.state.success"
    :isShow="isShowToastMessageUpdate"
    iconState="success"
  />
  <BaseDialogError
    :isShow="isShowDialogError"
    :description="dialogError"
    button1="Đóng"
    @closeDialog="() => (isShowDialogError = !isShowDialogError)"
  ></BaseDialogError>

  <BaseDialog
    :isShow="isShowDialog"
    mode="change"
    :title="resource.DIALOG_WARNING.title"
    :description="resource.DIALOG_WARNING.message"
    :button1="resource.DIALOG_WARNING.actions.cancel"
    :button2="resource.DIALOG_WARNING.actions.save"
    @closeDialog="() => (isShowDialog = false)"
    @save="update"
  ></BaseDialog>
</template>

<script>
import { onMounted, ref, reactive, watch } from "vue";
import axios from "axios";
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import resource from "@/helpers/resource";
import enums from "@/helpers/enum";
import { onClickOutside } from "@vueuse/core";

import BaseInputGroup from "../input/BaseInputGroup.vue";
import BaseGenderInput from "../input/BaseGenderInput.vue";
// import DropdownDepartment from "../dropdown/BaseDropdown.vue";
import BaseToastMessage from "../toast/BaseToastMessage.vue";
import BaseLoading from "../loading/BaseLoading.vue";
import BaseButton from "../button/BaseButton.vue";
import BaseDialogError from "../dialog/BaseDialogError.vue";
import BaseDialog from "../dialog/BaseDialog.vue";

export default {
  data() {
    return {
      resource: { ...resource },
      enums: { ...enums },
      genderOptions: [...resource.genderOptions],
    };
  },

  components: {
    BaseInputGroup,
    BaseGenderInput,

    BaseToastMessage,
    BaseLoading,
    BaseButton,
    Tippy,
    BaseDialogError,
    BaseDialog,
  },
  emits: ["closeForm"],

  props: [
    "mode",
    "employeeId",
    "isShow",
    "loadingData",
    "pageIndex",
    "pageSize",
  ],

  setup(props, context) {
    //#region Khai bảo biến
    // Khai báo biến dùng trong components
    const isShowForm = ref(true);
    const isShowFooterFormUpdate = ref(false);

    const isShowFooterFormAdd = ref(false);
    const isShowToastMessage = ref(false);
    const isShowToastMessageUpdate = ref(false);
    const isShowLoading = ref(false);
    const isOpenDropList = ref(false);
    const inputEmployeeCode = ref(null);
    var selectItemIndex = ref(-1);
    const isShowDialogError = ref(false);
    const dialogError = ref("");
    const isShowDialog = ref(false);
    const isChange = ref(false);

    // Lưu dữ diệu phòng ban call từ API
    const arrayDepartments = ref([]);

    // Lưu dữ liệu form
    var formData = ref({
      employeeCode: "",
      fullName: "",
      departmentId: "",
      dateOfBirth: null,
      gender: 1,
      identityNumber: "",
      identityDate: null,
      identityPlace: "",
      positionName: "",
      address: "",
      phoneNumber: "",
      email: "",
      salary: null,
      bankAccount: "",
      bankName: "",
      bankPlace: "",
    });

    // Định nghĩa object để lưu lỗi hiển thị ra màn giao diện
    const formErrors = reactive({
      employeeCodeError: "",
      nameError: "",
      departmentError: "",
      email: "",
    });
    //#endregion

    //#region Method
    // Người viết:  Trần Quang Hưng
    // Ngày viết: 28/03/2023
    // Tên hàm: Hàm thực hiện phát đi sự kiện đóng form
    const closeForm = () => {
      // context.emit("closeForm");

      if (props.mode === enums.FORM_MODE.add) {
        context.emit("closeForm");
      } else if (props.mode === enums.FORM_MODE.duplicate) {
        context.emit("closeForm");
      } else if (props.mode === enums.FORM_MODE.edit) {
        // so sánh dữ liệu
        for (let prop in oldFormData.value) {
          if (oldFormData.value[prop] !== formData.value[prop]) {
            isChange.value = true;
            break;
          }
        }

        //Nếu có thay đổi dữ liệu -> hiện dialog cảnh báo
        if (isChange.value) {
          isShowDialog.value = true;
        } else {
          context.emit("closeForm");
          isShowDialog.value = false;
        }
      }
    };

    /*
        Người viết:  Trần Quang Hưng
        Ngày viết: 28/03/2023
        */
    //Khối code thực hiện xử lý khi người dùng chọn phòng ban
    // Khi mở form lên thì lấy toàn bộ thông tin tất cả phòng ban về
    onMounted(async () => {
      await axios
        .get(`${resource.BASE_API_Department}`)
        .then((response) => {
          arrayDepartments.value = response.data;
        })

        // Có lỗi
        .catch((e) => {
          console.log(e);
        });
    });

    // Hàm lưu lại giá trị chọn phòng ban
    const selectOption = (index) => {
      selectItemIndex.value = index;

      if (selectItemIndex.value < 0) {
        selectItemIndex.value = 0;
      }
      formData.value.departmentName =
        arrayDepartments.value[selectItemIndex.value].departmentName;

      validateDepartment();
      isOpenDropList.value = false;
    };

    // Hàm chọn phòng ban bằng mũi tên
    // 1. Chọn bằng phím mũi tên xuống
    const selectNextItem = () => {
      isOpenDropList.value = true;

      if (selectItemIndex.value < arrayDepartments.value.length - 1) {
        selectItemIndex.value++;
      }

      console.log(selectItemIndex.value);
      formData.value.departmentName =
        arrayDepartments.value[selectItemIndex.value].departmentName;
    };

    // 2. Chọn bằng phím mũi tên lên
    const selectPrevItem = () => {
      isOpenDropList.value = true;

      if (selectItemIndex.value > -1) {
        selectItemIndex.value--;
      }
      if (selectItemIndex.value < 0) {
        selectItemIndex.value = 0;
      }
      formData.value.departmentName =
        arrayDepartments.value[selectItemIndex.value].departmentName;
    };

    // Hàm đóng mở droplist
    const handleDropList = () => {
      isOpenDropList.value = !isOpenDropList.value;
    };

    /*
      Người viết:  Trần Quang Hưng
      Ngày viết: 28/03/2023
    */
    //Khối code thực hiện validate form

    //1. Hàm kiểm tra trường mã nhân viên
    // nếu chưa có mã nhân viên thì hiển thị lỗi tương ứng
    const validateEmployeeCode = () => {
      try {
        if (
          formData.value.employeeCode.trim() === "" &&
          formData.value.employeeCode !== null
        ) {
          formErrors.employeeCodeError =
            resource.FORM_VALIDATE.employeeCode.required;
        } else {
          formErrors.employeeCodeError = "";
        }
      } catch (err) {
        console.log(err);
      }
    };

    //2. Hàm kiểm tra trường tên nhân viên
    // nếu chưa có tên nhân viên thì hiển thị lỗi tương ứng
    const validateName = () => {
      try {
        if (
          formData.value.fullName.trim() === "" &&
          formData.value.fullName !== null
        ) {
          formErrors.nameError = resource.FORM_VALIDATE.employeeName.required;
        } else {
          formErrors.nameError = "";
        }
      } catch (err) {
        console.log(err);
      }
    };

    //3. Hàm kiểm tra trường đơn vị (phòng ban) nhân viên
    // nếu chưa có đơn vị (phòng ban) nhân viên thì hiển thị lỗi tương ứng
    const validateDepartment = () => {
      try {
        if (!formData.value.departmentName) {
          formErrors.departmentError =
            resource.FORM_VALIDATE.employeeDepartment.required;
        } else {
          formErrors.departmentError = "";
        }
      } catch (err) {
        console.log(err);
      }
    };

    //5. Hàm kiểm tra trước khi submit from
    // Nếu thoả mãn thì trả ra True -> Cho submit form gửi dữ liệu đi
    // Ngược lại thì trả ra False -> không cho submit form -> hiển thị ra validate để người dùng nhập lại.
    const submit = () => {
      try {
        validateEmployeeCode();
        validateName();
        validateDepartment();

        if (
          !formErrors.employeeCodeError &&
          !formErrors.nameError &&
          !formErrors.departmentError
        ) {
          return true;
        }
        return false;
      } catch (err) {
        console.log(err);
      }
    };

    // 6.  Hàm thực hiện reset form (reset khi người dùng muốn nhập liên tiếp nhiều nhân viên -> cất và thêm)
    const resetForm = () => {
      formData.value.employeeCode = "";
      formData.value.fullName = "";
      formData.value.departmentName = "";
      formData.value.dateOfBirth = null;
      formData.value.gender = 1;
      formData.value.identityNumber = "";
      formData.value.identityDate = null;
      formData.value.identityPlace = "";
      formData.value.positionName = "";
      formData.value.phoneNumber = "";
      formData.value.email = "";
      formData.value.salary = null;
      formData.value.bankAccount = "";
      formData.value.bankName = "";
      formData.value.bankPlace = "";
    };

    // Gọi hàm thực hiện cất
    const save = () => {
      // check lỗi validate -> Không có lỗi thì cho thêm nhân viên
      if (submit()) {
        submitForm();
      }
    };

    // Gọi hàm thực hiện cất và thêm
    const saveAndAdd = () => {
      // check lỗi validate -> Không có lỗi thì cho thêm nhân viên
      if (submit()) {
        submitFormAndAdd();
      }
    };

    // Gọi hàm thực hiện update dữ liệu
    const update = () => {
      isShowDialog.value = false;

      // check lỗi validate -> Không có lỗi thì cho cập nhật nhân viên
      if (submit()) {
        updateForm();
      }
    };

    // Theo dõi sự thay đổi của formData
    const oldFormData = ref({});

    /**
     * Nếu mode là thêm thì chạy đoạn code dưới
     */
    const formTitle = ref("");

    // Viết càc hàm gọi api để dùng lại

    // Hàm xử lý khi có lỗi call API (Nhảy vào khối catch)
    const errorApi = (error) => {
      console.log(error);
      isShowLoading.value = false;
      dialogError.value = resource.Error;
      isShowDialogError.value = true;
    };

    // Hàm lấy mới mã nhân viên
    const getNewEmployeeCode = () => {
      try {
        axios.get(`${resource.BASE_API}new-employee-code`).then((response) => {
          formData.value.employeeCode = response.data;
        });
        return code;
      } catch {
        (error) => {
          console.log(error);
        };
      }
    };

    // Lấy thông tin nhân viên về theo theo ID
    const getDataEmployeeById = (id) => {
      try {
        const response = axios
          .get(`${resource.BASE_API}${id}`)
          .then((response) => {
            formData.value = response.data;

            //Format lại ngày để hiển thị ra form
            formData.value.dateOfBirth =
              response.data.dateOfBirth.split("T")[0];

            formData.value.identityDate =
              response.data.identityDate.split("T")[0];

            // Gán lại dữ liệu call về để theo dõi sự thay đổi
            oldFormData.value = { ...formData.value };
          });
      } catch (error) {
        errorApi(error);
      }
    };

    // Hàm post nhân viên (cất)
    const methodPost = (data, continute) => {
      const response = axios
        .post(`${resource.BASE_API}`, data)
        .then((response) => {
          isShowLoading.value = true;

          // Nếu post thành công
          if (response.status === 201) {
            //Hiện ra thông báo thêm nhân viên thành công và đóng form
            isShowLoading.value = false;

            if (!continute) {
              isShowForm.value = false;
            } else {
              isShowForm.value = true;
              resetForm();
              getNewEmployeeCode();
            }
            isShowToastMessage.value = true;
            setTimeout(() => {
              isShowToastMessage.value = false;
            }, 1500);

            // Cập nhật lại bảng
            props.loadingData(props.pageIndex, props.pageSize);
          } else if (response.status === 200) {
            isShowLoading.value = false;
            dialogError.value = response.data.userMessage;
            isShowDialogError.value = true;
          }
        });
    };

    //Logic cất nhân viên
    //Người viết: Trần Quang Hưng
    if (props.mode === enums.FORM_MODE.add) {
      // Đôi tiêu đề form theo form mode
      formTitle.value = resource.FORM_TITLE.filter(
        (item) => item.id === props.mode
      )[0].name;

      isShowFooterFormAdd.value = true;
      isShowFooterFormUpdate.value = false;

      // Call API lấy về mã nhân viên
      onMounted(() => {
        // Focus vào ô input mã nhân viên
        inputEmployeeCode.value.$refs.input.focus();
        getNewEmployeeCode();
      });

      // Người viết: Trần Quang Hưng
      // Ngày viết: 28/03/2022
      // Tên hàm: Cất nhân viên
      var submitForm = () => {
        try {
          //Gán lại departmentId theo departmentName lấy được
          let departmentSelect = arrayDepartments.value.filter(
            (department) =>
              department.departmentName === formData.value.departmentName
          );

          formData.value.departmentId = departmentSelect[0].departmentId;

          methodPost(formData.value, false);
        } catch (err) {
          errorApi(err);
        }
      };

      // Người viết: Trần Quang Hưng
      // Ngày viết: 28/03/2022
      // Tên hàm: Cất và thêm nhân viên
      var submitFormAndAdd = () => {
        try {
          //Gán lại departmentId theo departmentName lấy được
          let departmentSelect = arrayDepartments.value.filter(
            (department) =>
              department.departmentName === formData.value.departmentName
          );

          formData.value.departmentId = departmentSelect[0].departmentId;

          methodPost(formData.value, true);
        } catch (err) {
          errorApi(err);
        }
      };
      /**
       *  Người viết: Trần Quang Hưng
          Ngày viết: 28/03/2022
       *  Nếu mode là chỉnh sửa thì chạy đoạn code dưới
       */
    } else if (props.mode === enums.FORM_MODE.edit) {
      // Đổi tiêu đề form theo form mode
      formTitle.value = resource.FORM_TITLE.filter(
        (item) => item.id === props.mode
      )[0].name;
      // Hiển thị lại footer của form chỉnh sửa
      isShowFooterFormAdd.value = false;
      isShowFooterFormUpdate.value = true;

      // Lấy id nhận viên từ props để gọi API
      let EmployeeId = props.employeeId;

      // Người viết: Trần Quang Hưng
      // Ngày viết: 28/03/2022
      // Logic update
      // Call Thông tin có nhân viên tương ứng về và render ra form
      onMounted(() => {
        //Focus vào input nhập mã nhân viên
        inputEmployeeCode.value.$refs.input.focus();
        getDataEmployeeById(EmployeeId);
      });

      // Người viết: Trần Quang Hưng
      // Ngày viết: 28/03/2022
      // Tên hàm: Sửa thông tin nhân viên
      var updateForm = () => {
        isShowLoading.value = true;

        // Lấy mã phòng ban theo tên phòng ban để gửi đi
        let departmentSelect = arrayDepartments.value.filter(
          (department) =>
            department.departmentName === formData.value.departmentName
        );
        formData.value.departmentId = departmentSelect[0].departmentId;

        // Call API gửi dữ liệu đi
        try {
          // isShowToastMessageUpdate.value = false;

          axios
            .put(`${resource.BASE_API}${EmployeeId}`, formData.value)
            .then((response) => {
              console.log(response);
              isShowLoading.value = true;

              //Nếu thành công
              if (response.status === 201) {
                console.log("Ok");
                isShowLoading.value = false;

                console.log(isShowToastMessageUpdate.value);
                isShowToastMessageUpdate.value = true;
                console.log(isShowToastMessageUpdate.value);

                setTimeout(() => {
                  isShowToastMessageUpdate.value = false;
                }, 2000);

                isShowDialog.value = false;

                context.emit("closeForm");

                // Cập nhật lại bảng
                props.loadingData(props.pageIndex, props.pageSize);

                // Dữ liệu k hợp lệ API trả về mã code 200 (mã code, email, ...)
              } else if (response.status === 200) {
                isShowLoading.value = false;
                dialogError.value = response.data.userMessage;
                isShowDialogError.value = true;
              }
            });
        } catch (err) {
          errorApi(err);
        }
      };

      // Người viết: Trần Quang Hưng
      // Ngày viết: 28/03/2022
      // Logic nhân bản
      // Call Thông tin có nhân viên tương ứng về và render ra form
    } else if (props.mode === enums.FORM_MODE.duplicate) {
      // Đôi tiêu đề form theo form mode
      formTitle.value = resource.FORM_TITLE.filter(
        (item) => item.id === props.mode
      )[0].name;

      // Hiển thị lại footer của form chỉnh sửa
      isShowFooterFormAdd.value = true;
      isShowFooterFormUpdate.value = false;

      // Lấy id nhận viên từ props để gọi API
      let EmployeeId = props.employeeId;

      onMounted(async () => {
        //Focus vào input nhập mã nhân viên
        inputEmployeeCode.value.$refs.input.focus();

        // Lấy thông tin nhân viên hiển thị vào form
        await getDataEmployeeById(EmployeeId);

        // Lấy mã nhân viên mới
        // await getNewEmployeeCode();
      });

      var submitForm = () => {
        try {
          //Gán lại departmentId theo departmentName lấy được
          let departmentSelect = arrayDepartments.value.filter(
            (department) =>
              department.departmentName === formData.value.departmentName
          );
          // console.log(departmentSelect);
          formData.value.departmentId = departmentSelect[0].departmentId;

          // console.log(formData.value);
          methodPost(formData.value, false);
        } catch (err) {
          errorApi(err);
        }
      };

      var submitFormAndAdd = () => {
        try {
          //Gán lại departmentId theo departmentName lấy được
          let departmentSelect = arrayDepartments.value.filter(
            (department) =>
              department.departmentName === formData.value.departmentName
          );

          formData.value.departmentId = departmentSelect[0].departmentId;

          methodPost(formData.value, true);
        } catch (err) {
          errorApi(err);
        }
      };
    }

    // Tên hàm: Click outside
    // Người viết:Hưng
    // Ngày: 01/05/2023

    const target = ref(null);
    onClickOutside(target, (event) => (isOpenDropList.value = false));

    //#endregion

    // Return biến ra ngoài để sử dụng
    return {
      formData,
      formTitle,
      isShowForm,
      isShowFooterFormUpdate,
      isShowFooterFormAdd,
      closeForm,
      save,
      saveAndAdd,
      formErrors,
      validateEmployeeCode,
      validateName,
      validateDepartment,
      isShowToastMessage,
      isShowToastMessageUpdate,
      update,
      isShowLoading,
      arrayDepartments,
      selectOption,
      isOpenDropList,
      handleDropList,
      isShowDialogError,
      inputEmployeeCode,
      selectNextItem,
      selectPrevItem,
      selectItemIndex,
      dialogError,
      target,
      isShowDialog,
    };
  },
};
</script>

<style>
@import url("@/css/form-edit.css");
.hover {
  background-color: rgba(80, 184, 60, 0.1);
}
</style>
