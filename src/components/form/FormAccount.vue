<template>
  <div class="account-detail">
    <div class="ad-container" :class="{ ' large': isLarge }">
      <div class="resize-ad" @click="resizeAccountDetail">
        <div></div>
      </div>
      <div class="ad-title">
        <div class="ad-title__content">{{ formAccountTitle }}</div>
        <div class="action-btn-top">
          <Tippy content="Giúp(F1)" placement="bottom">
            <div class="btn-question"></div>
          </Tippy>
          <Tippy content="Đóng(ESC)" placement="bottom">
            <div class="btn-close" @mousedown="closeForm"></div>
          </Tippy>
        </div>
      </div>

      <div class="ad_body">
        <div class="ad_inf">
          <div class="ad_inf-row">
            <BaseInputGroupGD2
              label="Số tài khoản"
              type="text"
              width="w-25"
              :isRequired="true"
              v-model="accountData.account_number"
              :errorMessage="formErrors.accountNumber"
              ref="inputAccountNumber"
              :blur="validateAccountNumber"
            />
          </div>
          <div class="ad_inf-row">
            <BaseInputGroupGD2
              label="Tên tài khoản"
              type="text"
              width="w-50"
              :isRequired="true"
              v-model="accountData.account_name"
              :errorMessage="formErrors.accountName"
              :blur="validateAccountName"
            />
            <BaseInputGroupGD2
              label="Tên tiếng anh"
              type="text"
              width="w-50"
              :isRequired="false"
              v-model="accountData.account_name_english"
              :errorMessage="formErrors.accountNameEnglish"
              :blur="validateAccountNameEnglish"
            />
          </div>
          <div class="ad_inf-row">
            <div style="width: 25%">
              <BaseComboboxAdvance
                type="text"
                label="Tài khoản chung"
                width="w-25"
                v-model="accountData.parent_id"
                :comboboxData="allAccount"
                :dataColumn="resource.LIST_COLUMN_NAME_ACCOUNT_GENERAL"
                :widthList="375"
                attributeBinding="account_id"
                attributeDisplay="account_number"
                :isCustomStyle="isCustomStyle"
                :widthParent="195"
              />
            </div>
            <div>
              <BaseComboBoxNormal
                type="text"
                label="Tính chất"
                width="w-25"
                :isRequired="true"
                icon="true"
                :comboboxData="resource.ACCOUNT_CATEGORY_KIND"
                v-model="accountData.account_category_kind"
              />
            </div>
          </div>

          <div class="ad_inf-row">
            <BaseTextArea
              label="Diễn giải"
              type="text"
              width="w-full"
              :textField="true"
              :isRequired="false"
              v-model="accountData.description"
            />
          </div>
          <div class="ad_inf-row">
            <input
              style="transform: scale(1.3)"
              type="checkbox"
              name=""
              id="is_postable_in_foreign_currency"
              v-model="accountData.is_postable_in_foreign_currency"
            />
            <label for="is_postable_in_foreign_currency" style="font-size: 14px"
              >Có hạch toán ngoại tệ</label
            >
          </div>

          <div class="detail-follow">
            <div
              class="df-heading"
              @click="toggleHideShowDetail"
              :class="{ click: isShowDetail }"
            >
              <div class="df-heading-icon">
                <div></div>
              </div>
              <h3>Theo dõi chi tiết theo</h3>
            </div>

            <div class="df-container" v-if="isShowDetail">
              <div class="df-container-col">
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_account_object"
                      v-model="accountData.detail_by_account_object"
                    />
                    <label for="detail_by_account_object">Đối tượng</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OBJECT"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_account_object"
                      v-model="accountData.detail_by_account_type"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_bank_account"
                      v-model="accountData.detail_by_bank_account"
                    />
                    <label for="detail_by_bank_account"
                      >Tài khoản ngân hàng</label
                    >
                  </div>
                </div>
              </div>
              <div class="df-container-col">
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_job"
                      v-model="accountData.detail_by_job"
                    />
                    <label for="detail_by_job">Đối tượng THCP</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OTHER"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_job"
                      v-model="accountData.detail_by_job_kind"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_project_work"
                      v-model="accountData.detail_by_project_work"
                    />
                    <label for="detail_by_project_work">Công trình</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OTHER"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_project_work"
                      v-model="accountData.detail_by_project_work_kind"
                    />
                  </div>
                </div>
              </div>
              <div class="df-container-col">
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_order"
                      v-model="accountData.detail_by_order"
                    />
                    <label for="detail_by_order">Đơn đặt hàng</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OTHER"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_order"
                      v-model="accountData.detail_by_order_kind"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_contract"
                      v-model="accountData.detail_by_contract"
                    />
                    <label for="detail_by_contract">Hợp đồng bán</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OTHER"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_contract"
                      v-model="accountData.detail_by_contract_kind"
                    />
                  </div>
                </div>
              </div>
              <div class="df-container-col">
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_pu_contract"
                      v-model="accountData.detail_by_pu_contract"
                    />
                    <label for="detail_by_pu_contract">Hợp đồng mua</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OTHER"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_pu_contract"
                      v-model="accountData.detail_by_pu_contract_kind"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_expense_item"
                      v-model="accountData.detail_by_expense_item"
                    />
                    <label for="detail_by_expense_item">Khoản mục CP</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OTHER"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_expense_item"
                      v-model="accountData.detail_by_expense_item_kind"
                    />
                  </div>
                </div>
              </div>
              <div class="df-container-col">
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_department"
                      v-model="accountData.detail_by_department"
                    />
                    <label for="detail_by_department">Đơn vị</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OTHER"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_department"
                      v-model="accountData.detail_by_department_kind"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="block-checkbox">
                    <input
                      type="checkbox"
                      name=""
                      id="detail_by_list_item"
                      v-model="accountData.detail_by_list_item"
                    />
                    <label for="detail_by_list_item">Mã thống kê</label>
                  </div>
                  <div class="combobox">
                    <BaseComboBoxNormal
                      :comboboxData="resource.DETAIL_FOLLOW_BY_OTHER"
                      width="w-25"
                      :isRequired="false"
                      :disabled="!accountData.detail_by_list_item"
                      v-model="accountData.detail_by_list_item_kind"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ad-footer">
        <div class="ad-footer_left">
          <button class="btn s-btn" @click="cancel">Huỷ</button>
        </div>
        <div class="ad-footer_right">
          <Tippy content="Cất (Ctrl + S)" placement="bottom">
            <button class="btn m-btn" @click="clickSave(modeForm)">Cất</button>
          </Tippy>
          <Tippy content="Cất và thêm (Ctrl + Shift + S)" placement="bottom">
            <button class="btn s-btn" @click="clickSaveAndAdd(modeForm)">
              Cất và thêm
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  </div>
  <BaseDialogError
    :isShow="isShowDialog"
    button1="Đóng"
    :description="descriptionDialog"
    @closeDialog="isShowDialog = false"
  ></BaseDialogError>
  <BaseToastMessage
    state="success"
    description="Thêm thành công một tài khoản vào hệ thống"
    :isShow="isShowToastMessage"
  ></BaseToastMessage>
  <BaseDialogDataChange
    v-if="isShowDialogChangeData"
    message="Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
    @save="save(false)"
    @closeDialog="isShowDialogChangeData = false"
    @closeDialogAndForm="closeDialogAndForm"
  >
  </BaseDialogDataChange>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
</template>

<script setup>
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import { v4 as uuidv4 } from "uuid";
import resource from "@/helpers/resource";
import BaseInputGroupGD2 from "@/components/input/BaseInputGroupGD2.vue";
import BaseTextArea from "@/components/input/BaseTextArea.vue";
import enums from "@/helpers/enum";

import BaseComboBoxNormal from "@/components/combo-box/BaseComboBoxNormal.vue";
import BaseComboboxAdvance from "@/components/combo-box/BaseComboboxAdvance.vue";
import BaseDialogError from "@/components/dialog/BaseDialogError.vue";
import BaseDialogDataChange from "@/components/dialog/BaseDialogDataChange.vue";

import BaseToastMessage from "@/components/toast-message/BaseToastMessage.vue";
import BaseLoading from "@/components/loading/BaseLoading.vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import axios from "axios";

const emit = defineEmits([
  "closeDetailAccount",
  "changeModeToAdd",
  "reloadPage",
]);
const props = defineProps(["mode", "data"]);

//#region  Khai báo biến sử dụng trong components
const isLarge = ref(false);
const isCustomStyle = ref(true);
const allAccount = ref([]);
const accountData = ref({
  account_name: "",
  account_number: "",
  grade: 1,
  state: 1,
  is_parent: false,
  description: "",
  general_account: "",
  parent_id: null,
  account_category_kind: 0,
  detail_by_account_object: false,
  detail_by_job: false,
  detail_by_project_work: false,
  detail_by_order: false,
  detail_by_contract: false,
  detail_by_pu_contract: false,
  detail_by_expense_item: false,
  detail_by_department: false,
  detail_by_list_item: false,
});
const modeForm = ref(null);
const initData = ref({});
const isChange = ref(false);
const parentAccountData = ref({});
const isShowLoading = ref(false);
const formAccountTitle = ref("");
const isShowDetail = ref(true);
const inputAccountNumber = ref(null);
const isShowDialog = ref(false);
const isShowToastMessage = ref(false);
const isShowDialogChangeData = ref(false);
const descriptionDialog = ref("");

const formErrors = reactive({
  accountNumber: "",
  accountName: "",
  accountNameEnglish: "",
});

//#endregion

//#region Functions sử dụng trong components

/**
 * Hàm xử lý phím tắt
 *
 * @author TQHUNG (17/06/2023)
 */
const handleKeyPress = (event) => {
  console.log(event);
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    clickSave(modeForm.value);
  } else if (
    event.keyCode === 17 &&
    event.keyCode === 16 &&
    event.keyCode === 83
  ) {
    event.preventDefault();
    console.log("Ctrl shift s");
    clickSaveAndAdd(modeForm.value);
  } else if (event.keyCode === 27) {
    emit("closeDetailAccount");
  }
};

/**
 * Hàm đóng form
 *
 * @author TQHUNG (28/05/2023)
 */
const cancel = () => {
  emit("closeDetailAccount");
};

/**
 * Lấy toàn bộ tài khoản về
 *
 * @author TQHUNG (28/05/2023)
 */
const getAllAccount = async () => {
  await axios
    .get("https://localhost:44339/api/v1/Account")
    .then((response) => {
      allAccount.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Lifecycle Mounted
 *
 * @author TQHUNG (28/05/2023)
 */
onMounted(() => {
  console.log(props.mode);
  if (props.mode !== null) {
    modeForm.value = props.mode;
    formAccountTitle.value = resource.FORM_TITLE_ACCOUNT[props.mode].name;

    inputAccountNumber.value.$refs.input.focus();
    if (props.mode === 0) {
      initData.value = { ...accountData.value };
    } else if (props.mode === 1) {
      initData.value = { ...props.data };
    } else if (props.mode === 2) {
      initData.value = { ...props.data };
    }
  }

  if (props.data) {
    getAccountById(props.data.account_id);
  }

  getAllAccount();
  window.addEventListener("keydown", handleKeyPress);
});
/**
 * Thu nhỏ phóng to form
 *
 * @author TQHUNG (28/05/2023)
 */
const resizeAccountDetail = () => {
  isLarge.value = !isLarge.value;
};

/**
 * Đóng form
 *
 * @author TQHUNG (28/05/2023)
 */
const closeForm = () => {
  // Kiểm tra dữ liệu thay đổi thì hiện thị dialog hỏi người dùng
  for (let prop in initData.value) {
    if (initData.value[prop] !== accountData.value[prop]) {
      isChange.value = true;
      break;
    }
  }

  if (isChange.value) {
    isShowDialogChangeData.value = true;
  } else {
    emit("closeDetailAccount");
  }
};
const closeDialogAndForm = () => {
  emit("closeDetailAccount");
};

const createMisaCode = (accountNumber, grade, parent = "", misaCodeId = "") => {
  // Tạo misa_code_id cho tài khoản mới cấp cao nhất
  if (grade === 1) {
    return "/" + accountNumber + "/";
  } else {
    // Tạo misa_code_id cho tài khoản không phải cấp cao nhất
    let misa_code_id = accountNumber + "/";

    return misaCodeId + misa_code_id;
  }
};

/**
 * Ẩn hiện phần theo dõi chi tiết trong form
 *
 * @author TQHUNG (28/05/2023)
 */
const toggleHideShowDetail = () => {
  isShowDetail.value = !isShowDetail.value;
};

const updateParent = async (parent_id) => {};

//Validate Form

//
/**
 * Hàm validate account number
 *
 * @author TQHUNG (01/06/2023)
 */

const validateAccountNumber = () => {
  accountData.value.account_number = accountData.value.account_number
    .toString()
    .trim();
  try {
    if (!accountData.value.account_number) {
      formErrors.accountNumber = "Số tài khoản không được để trống";
    } else {
      if (accountData.value.account_number.length < 3) {
        formErrors.accountNumber = "Số tài khoản có độ dài >= 3 kí tự";
      } else {
        if (accountData.value.account_number.length > 25) {
          formErrors.accountNumber = "Số tài khoản phải <= 25 kí tự";
        } else {
          // Lấy account genaral

          let accountGeneral = allAccount.value.filter(
            (account) => account.account_id === accountData.value.parent_id
          )[0];

          if (accountGeneral) {
            if (
              accountData.value.account_number.startsWith(
                accountGeneral.account_number.toString().trim()
              ) === false
            ) {
              formErrors.accountNumber =
                "Số tài khoản phải bắt đầu bằng tài khoản tổng hợp";
            } else {
              formErrors.accountNumber = "";
            }
            // formErrors.accountNumber = `Số tài khoản phải bắt đầu bằng <${accountData.value.general_account}>`
          } else {
            if (accountData.value.account_number.length > 3) {
              formErrors.accountNumber =
                "Số tài khoản > 3 kí tự phải có tài khoản tổng hợp";
            } else {
              formErrors.accountNumber = "";
            }
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * Hàm validate account name
 *
 * @author TQHUNG (01/06/2023)
 */
const validateAccountName = () => {
  accountData.value.account_name = accountData.value.account_name
    .toString()
    .trim();
  try {
    if (accountData.value.account_name === "") {
      formErrors.accountName = "Tên tài khoản không để trống";
    } else {
      if (accountData.value.account_name.length > 100) {
        formErrors.accountName = "Tên tài khoản phải <= 100 kí tự ";
      } else {
        formErrors.accountName = "";
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const validateAccountNameEnglish = () => {
  if (!accountData.value.account_name_english) {
    formErrors.accountNameEnglish = "";
  } else {
    accountData.value.account_name_english =
      accountData.value.account_name_english.toString().trim();
    if (accountData.value.account_name_english.length > 100) {
      formErrors.accountNameEnglish =
        "Tên tài khoản tiếng anh phải <= 100 kí tự ";
    } else {
      formErrors.accountNameEnglish = "";
    }
  }
};

/**
 * Hàm validate final
 *
 * @author TQHUNG (01/06/2023)
 */
const checkValidate = () => {
  try {
    validateAccountNumber();

    validateAccountName();

    validateAccountNameEnglish();

    if (
      !formErrors.accountName &&
      !formErrors.accountNumber &&
      !formErrors.accountNameEnglish
    ) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Hàm cất
 *
 * @author TQHUNG (03/06/2023)
 */
var save = async (isContinue) => {
  if (accountData.value.parent_id) {
    // lấy ra account parent
    let accountParent = (accountData.value.grade = allAccount.value.filter(
      (acc) => acc.account_id === accountData.value.parent_id
    )[0]);
    // lấy ra dữ liệu của tk cha để update lại field is_parent
    parentAccountData.value = accountParent;

    // Gán lại general_account là account_number của cha
    accountData.value.general_account = parentAccountData.value.account_number;
    //tăng grade lên 1
    accountData.value.grade = accountParent.grade + 1;
    // Tạo misa_ic_code
    accountData.value.misa_code_id = createMisaCode(
      accountData.value.account_number,
      accountData.value.grade,
      accountData.value.parent_id,
      accountParent.misa_code_id
    );
  } else {
    accountData.value.misa_code_id = createMisaCode(
      accountData.value.account_number,
      accountData.value.grade
    );
  }

  isShowLoading.value = true;

  console.log(accountData.value);

  await axios
    .post("https://localhost:44339/api/v1/Account", accountData.value)
    .then((response) => {
      isShowLoading.value = false;
      console.log(response);
      if (response.status === 201) {
        // Khi ng dùng chọn cất và thêm

        // Thêm thành công cập nhật lại tk cha nếu là th thêm con đầu tiên
        if (!parentAccountData.value.is_parent) {
          parentAccountData.value.is_parent = true;
          axios
            .put(
              `https://localhost:44339/api/v1/Account/${parentAccountData.value.account_id}`,
              parentAccountData.value
            )
            .then((response) => {
              console.log(response);

              emit("reloadPage");
            })
            .catch((error) => {
              console.log(error);
            });
        }

        if (isContinue) {
          emit("reloadPage");
          isShowToastMessage.value = true;

          let timeout = setTimeout(() => {
            isShowToastMessage.value = false;
          }, 1500);

          // reset lại form
          accountData.value = {
            account_name: "",
            account_number: "",
            grade: 1,
            state: 1,
            is_parent: false,
            description: "",
            general_account: "",
            parent_id: null,
            account_category_kind: 0,
            detail_by_account_object: false,
            detail_by_job: false,
            detail_by_project_work: false,
            detail_by_order: false,
            detail_by_contract: false,
            detail_by_pu_contract: false,
            detail_by_expense_item: false,
            detail_by_department: false,
            detail_by_list_item: false,
          };
          inputAccountNumber.value.$refs.input.focus();
        } else {
          isShowToastMessage.value = true;

          let timeout = setTimeout(() => {
            isShowToastMessage.value = false;
            emit("closeDetailAccount");
            emit("reloadPage");
          }, 1500);

          // console.log(timeout);
        }
      } else if (response.status === 200) {
        isShowDialog.value = true;
        descriptionDialog.value = response.data.userMessage;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const count = ref(1);

/**
 * Hàm update tài khoản
 *
 * @author TQHUNG (04/06/2023)
 */
var update = (isContinue) => {
  var parentIdOld;
  onMounted(() => {
    // Lấy thông tin của tài khoản về từ prop truyền xuống từ account list (có thể gọi api call)
    accountData.value = props.data;
    if (props.data.grade > 1) {
      parentIdOld = props.data.parent_id;
    }
  });

  var isChangeParent;

  // isShowLoading.value = true;
  if (accountData.value.grade > 1) {
    console.log(parentIdOld);
    console.log(accountData.value.parent_id);
    if (accountData.value.parent_id !== parentIdOld) {
      console.log("Thay đổi cha");
      isChangeParent = true;
    } else {
      console.log("Không đổi cha");
      isChangeParent = false;
    }
  } else {
    // console.log("Update");
    isChangeParent = false;
  }

  // update một tk có grade = 1 (sửa thông tin bt)
  // update một tk có grade > 1 (nếu thay đổi cha)

  axios
    .put(
      `https://localhost:44339/api/v1/Account/${accountData.value.account_id}`,
      accountData.value
    )
    .then((response) => {
      if (isChangeParent) {
        //Lâys grade cha mới
        let newGrade = allAccount.value.filter(
          (acc) => acc.account_id === accountData.value.parent_id
        )[0].grade;

        axios
          .put(
            `https://localhost:44339/api/v1/Account/update-misa-code?id=${accountData.value.account_id}&p_id=${accountData.value.parent_id}&o_p_grade=${newGrade}`
          )
          .then((response) => {
            // Cập nhật cho cha mới ở giao diện
            allAccount.value.filter(
              (acc) => acc.account_id === accountData.value.parent_id
            )[0].is_parent = true;
          })
          .catch((error) => console.log(error));
      }
      if (response.status === 201) {
        isShowLoading.value = false;
        if (!isContinue) {
          emit("closeDetailAccount");
        } else {
          formAccountTitle.value = "Thêm nhân viên";
          accountData.value = {
            account_name: "",
            account_number: "",
            grade: 1,
            state: 1,
            is_parent: false,
            description: "",
            general_account: "",
            parent_id: null,
            account_category_kind: 0,
            detail_by_account_object: false,
            detail_by_job: false,
            detail_by_project_work: false,
            detail_by_order: false,
            detail_by_contract: false,
            detail_by_pu_contract: false,
            detail_by_expense_item: false,
            detail_by_department: false,
            detail_by_list_item: false,
          };
          modeForm.value = 0;
        }
        emit("reloadPage");
      } else if (response.status === 200) {
        isShowDialog.value = true;
        descriptionDialog.value = response.data.userMessage;
      }
    })
    .catch((error) => console.log(error));
};

/**
 * Hàm nhân bản
 *
 * @author TQHUNG (11/06/2023)
 */
const dupplicate = async (isContinue) => {
  if (accountData.value.parent_id) {
    // lấy ra account parent
    let accountParent = (accountData.value.grade = allAccount.value.filter(
      (acc) => acc.account_id === accountData.value.parent_id
    )[0]);
    // lấy ra dữ liệu của tk cha để update lại field is_parent
    parentAccountData.value = accountParent;

    // Gán lại general_account là account_number của cha
    accountData.value.general_account = parentAccountData.value.account_number;
    //tăng grade lên 1
    accountData.value.grade = accountParent.grade + 1;
    // Tạo misa_ic_code
    accountData.value.misa_code_id = createMisaCode(
      accountData.value.account_number,
      accountData.value.grade,
      accountData.value.parent_id,
      accountParent.misa_code_id
    );
  } else {
    accountData.value.misa_code_id = createMisaCode(
      accountData.value.account_number,
      accountData.value.grade
    );
  }

  accountData.value.account_id = uuidv4();
  accountData.value.is_parent = false;
  console.log(accountData.value);

  await axios
    .post("https://localhost:44339/api/v1/Account", accountData.value)
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        if (isContinue) {
          console.log("Cất và thêm");
          formAccountTitle.value = "Thêm tài khoản";
          emit("reloadPage");
          isShowToastMessage.value = true;
          let timeout = setTimeout(() => {
            isShowToastMessage.value = false;
          }, 1500);
          // reset lại form
          accountData.value = {
            account_name: "",
            account_number: "",
            grade: 1,
            state: 1,
            is_parent: false,
            description: "",
            general_account: "",
            parent_id: null,
            account_category_kind: 0,
            detail_by_account_object: false,
            detail_by_job: false,
            detail_by_project_work: false,
            detail_by_order: false,
            detail_by_contract: false,
            detail_by_pu_contract: false,
            detail_by_expense_item: false,
            detail_by_department: false,
            detail_by_list_item: false,
          };
          modeForm.value = 0;
          inputAccountNumber.value.$refs.input.focus();
        } else {
          console.log("Cất ");

          isShowToastMessage.value = true;
          let timeout = setTimeout(() => {
            isShowToastMessage.value = false;
            emit("closeDetailAccount");
            emit("reloadPage");
          }, 1500);
        }
      } else if (response.status === 200) {
        isShowDialog.value = true;
        descriptionDialog.value = response.data.userMessage;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // }
};
//

/**
 * Hàm lấy thông tin tài khoản theo id để binding ra form
 *
 * @author TQHUNG (04/06/2023)
 */
const getAccountById = async (id) => {
  await axios
    .get(`https://localhost:44339/api/v1/Account/${id}`)
    .then((response) => {
      accountData.value = response.data[0];
      console.log(accountData.value);
    });
};

/**
 * Check mode
 *
 * @author TQHUNG (01/06/2023)
 */
if (props.mode === 1) {
  getAccountById(props.data.account_id);
} else if (props.mode === 2) {
  onMounted(() => {
    accountData.value = props.data;
  });
}

/**
 * Xử lý khi click button "cất" theo các mode
 *
 * @author TQHUNG (11/06/2023)
 */
const clickSave = (mode) => {
  console.log("mode form", mode);
  console.log(formErrors);
  // check validate -> đăng mặc định là true -> chưa validate
  if (!checkValidate()) {
    isShowDialog.value = true;
    descriptionDialog.value =
      formErrors.accountNumber ||
      formErrors.accountName ||
      formErrors.accountNameEnglish;
  } else {
    isShowDialog.value = false;
    if (mode === 0) {
      save(false);
    } else if (mode === 1) {
      update(false);
    } else if (mode === 2) {
      console.log("nhân bản");
      dupplicate(false);
    }
  }
};

/**
 * Xử lý khi click button "cất và thêm" theo các mode
 *
 * @author TQHUNG (11/06/2023)
 */
const clickSaveAndAdd = (mode) => {
  console.log("mode form", mode);
  console.log(count.value);

  if (!checkValidate()) {
    isShowDialog.value = true;
    descriptionDialog.value =
      formErrors.accountNumber || formErrors.accountName;
  } else {
    isShowDialog.value = false;
    if (mode === 0) {
      save(true);
    } else if (mode === 1) {
      update(true);

      console.log(count.value);
    } else if (mode === 2) {
      dupplicate(true);
    }
  }
};

/**
 * Phím tắt
 *
 * @author TQHUNG (11/06/2023)
 */
const handleKey = (event) => {
  if (event.keyCode === enums.KeyCode.A && event.ctrlKey && event.shiftKey) {
    event.preventDefault();
    clickSaveAndAdd(modeForm.value);
  }
  //Ấn tổ hợp CTRL + S để cất
  else if (event.keyCode === enums.KeyCode.S && event.ctrlKey) {
    event.preventDefault();
    clickSave(modeForm.value);
  }
  //Ấn ESC để thoát
  else if (event.keyCode === enums.KeyCode.ESC) {
    closeForm();
  }
};
onMounted(() => window.addEventListener("keydown", handleKey));
onUnmounted(() => window.removeEventListener("keydown", handleKey));

//#endregionư
</script>

<style scoped>
@import url("@/css/form-account.css");
</style>
