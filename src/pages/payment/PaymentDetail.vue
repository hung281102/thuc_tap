<template>
  <div class="payment-detail-container" id="payment-detail-container">
    <div class="payment-detail_up">
      <div class="header-layout">
        <div class="header-title">
          <div class="header-icon">
            <div></div>
          </div>
          <span> {{ `Phiếu chi ${infPayment.refno_finance}` }} </span>
        </div>
        <div class="payment-type" style="width: 350px">
          <BaseComboBoxNormal
            :comboboxData="resource.TYPE_PAYMENT"
            width="w-25"
            v-model="typePaymentDetails"
          />
        </div>
        <div class="header-block-button">
          <div class="guide-tour">
            <div class="guide-tour-icon">
              <div></div>
            </div>
            <span style="font-size: 14px; color: #0075c0">Hướng dẫn</span>
          </div>
          <div class="config-layout">
            <div></div>
          </div>
          <div class="help-detail">
            <div></div>
          </div>
          <Tippy content="Đóng (ESC)" placement="bottom">
            <div
              class="close-btn"
              @click="closeFormDetailFunc(modeFormDetail)"
              style="cursor: pointer"
            >
              <div></div>
            </div>
          </Tippy>
        </div>
      </div>
      <div class="body-layout">
        <div class="main-inf">
          <div class="w-3-4">
            <div class="w-4-5">
              <div class="main-inf_row">
                <BaseComboboxAdvance
                  type="text"
                  width="w-25"
                  :comboboxData="supplierData"
                  :dataColumn="resource.LIST_COLUMN_NAME_SUPPLIER"
                  :widthList="1000"
                  label="Mã đối tượng"
                  attributeBinding="supplier_id"
                  attributeDisplay="supplier_code"
                  v-model="infPayment.supplier_id"
                  :data="infPayment.supplier_code"
                  :disabled="isDisabled"
                  :widthParent="430"
                  @scrollTop="getMoreScrollSupplier"
                />
                <BaseInputGroupGD2
                  label="Tên đối tượng"
                  type="text"
                  width="w-100"
                  :isRequired="false"
                  v-model="infPayment.supplier_name"
                  :disabled="isDisabled"
                  :errorMessage="popupMessageError.supplierName"
                  :blur="validateLength"
                />
              </div>
              <div class="main-inf_row">
                <BaseInputGroupGD2
                  label="Người nhận"
                  type="text"
                  width="w-100"
                  :isRequired="false"
                  v-model="infPayment.receiver"
                  :data="infPayment.supplier_name"
                  :disabled="isDisabled"
                  :errorMessage="popupMessageError.receiverName"
                  :blur="validateLength"
                />
                <BaseInputGroupGD2
                  label="Địa chỉ"
                  type="text"
                  width="w-100"
                  :isRequired="false"
                  v-model="infPayment.supplier_address"
                  :disabled="isDisabled"
                  :errorMessage="popupMessageError.address"
                  :blur="validateLength"
                />
              </div>
              <div class="main-inf_row full">
                <BaseInputGroupGD2
                  label="Lý do chi tiền"
                  type="text"
                  width="w-200"
                  :isRequired="false"
                  v-model="infPayment.journal_memo"
                  :disabled="isDisabled"
                  :errorMessage="popupMessageError.journalMemo"
                  :blur="validateLength"
                />
              </div>
              <div class="main-inf_row">
                <BaseComboboxAdvance
                  type="text"
                  width="w-25"
                  :comboboxData="employeeData"
                  :dataColumn="resource.LIST_COLUMN_NAME_EMPLOYEE"
                  :widthList="570"
                  label="Nhân viên"
                  attributeBinding="employee_id"
                  attributeDisplay="full_name"
                  v-model="infPayment.employee_id"
                  :disabled="isDisabled"
                  :widthParent="430"
                />
                <BaseInputNumber
                  label="Kèm theo"
                  type="text"
                  text="right"
                  width="w-33"
                  span="Chứng từ gốc"
                  placeholder="Số lượng"
                  :isRequired="false"
                  v-model="infPayment.document_included"
                  :disabled="isDisabled"
                />
              </div>
            </div>
            <div class="w-1-5">
              <BaseInputGroupGD2
                label="Ngày hạch toán"
                type="date"
                width="w-100"
                :isRequired="false"
                v-model="infPayment.posted_date"
                :disabled="isDisabled"
              />
              <BaseInputGroupGD2
                label="Ngày phiếu chi"
                type="date"
                width="w-100"
                :isRequired="false"
                v-model="infPayment.ref_date"
                :disabled="isDisabled"
                :errorMessage="popupMessageError.date"
                :blur="validateDate"
              />
              <BaseInputGroupGD2
                label="Số phiếu chi"
                type="text"
                width="w-100"
                :isRequired="true"
                v-model="infPayment.refno_finance"
                :errorMessage="popupMessageError.refnoFinance"
                :blur="validateRefnoFinance"
                :disabled="isDisabled"
              />
            </div>
            <div class="main-inf_row"></div>
          </div>
          <div class="w-1-4">
            <span class="">Tổng tiền </span>
            <h2 class="sum-money">
              {{
                infPayment.total_amount
                  ? enums.FORMAT_MONEY_2(infPayment.total_amount)
                  : 0
              }}
            </h2>
          </div>
        </div>
        <div class="sub-inf">
          <span>Tham chiếu</span>
          <span>...</span>
        </div>
      </div>
    </div>
    <div class="payment-detail-down">
      <div class="payment-detail-down_header">Hạch toán</div>
      <div class="payment-detail-down_table">
        <div
          class="payment-detail_table"
          style="max-height: 310px; overflow-y: auto; border: 1px solid #e5e8ec"
        >
          <div
            class="table_header"
            style="position: sticky; left: 0; top: 0; z-index: 999"
          >
            <div class="column_header" style="min-width: 32px">
              <div class="column-name">#</div>
            </div>
            <div class="column_header" style="min-width: 400px">
              <div class="column-name">Diễn giải</div>
            </div>
            <div class="column_header" style="min-width: 195px">
              <div class="column-name">TK nợ</div>
            </div>
            <div class="column_header" style="min-width: 195px">
              <div class="column-name">TK có</div>
            </div>
            <div class="column_header text-right" style="min-width: 195px">
              <div class="column-name">Số tiền</div>
            </div>
            <div class="column_header" style="min-width: 195px">
              <div class="column-name">Đối tượng</div>
            </div>
            <div class="column_header" style="flex: 1; min-width: 250px">
              <div class="column-name">Tên đối tượng</div>
            </div>
            <div class="column_header" style="min-width: 32px">
              <div class="column-name">
                <div class="icon-delete" style="opacity: 0">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="table_body" :class="{ disabled: isDisabled }">
            <div
              class="table_row"
              @click="enableModeEdit(infDetail, index)"
              v-for="(item, index) in arrInfDetail"
              :key="index"
              :style="{ 'z-index': arrInfDetail.length - index }"
              style="position: relative"
            >
              <div class="column_body" style="min-width: 32px">
                <div class="column-name">{{ index + 1 }}</div>
              </div>
              <div class="column_body" style="min-width: 400px">
                <div class="column-name" style="width: 100%">
                  <input
                    class="special-input"
                    v-if="!item.isEdit"
                    v-model="item.description"
                    style="
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                    readonly
                  />

                  <BaseInputGroupGD2
                    v-else
                    type="text"
                    width="w-100"
                    :isRequired="false"
                    v-model="item.description"
                  />
                </div>
              </div>
              <div class="column_body" style="min-width: 195px">
                <div class="column-name">
                  <span v-if="!item.isEdit">{{
                    item.debit_account_id
                      ? accountData.filter(
                          (acc) => acc.account_id === item.debit_account_id
                        )[0].account_number
                      : ""
                  }}</span>

                  <BaseComboboxAdvance
                    v-else
                    type="text"
                    width="w-90"
                    :comboboxData="accountData"
                    :dataColumn="resource.LIST_COLUMN_NAME_ACCOUNT_GENERAL"
                    :widthList="350"
                    label=""
                    attributeBinding="account_id"
                    attributeDisplay="account_number"
                    :isCustomStyle="isCustomStyle"
                    v-model="item.debit_account_id"
                    top="35px"
                    :widthParent="175"
                  />
                </div>
              </div>
              <div class="column_body" style="min-width: 195px">
                <div class="column-name">
                  <!-- <input
                    v-if="!item.isEdit"
                    v-model="item.credit_account"
                    class="special-input"
                    readonly
                  /> -->

                  <span v-if="!item.isEdit">{{
                    item.credit_account_id
                      ? accountData.filter(
                          (acc) => acc.account_id === item.credit_account_id
                        )[0].account_number
                      : ""
                  }}</span>
                  <BaseComboboxAdvance
                    v-else
                    type="text"
                    width="w-90"
                    :comboboxData="accountData"
                    :dataColumn="resource.LIST_COLUMN_NAME_ACCOUNT_GENERAL"
                    :widthList="350"
                    label=""
                    attributeBinding="account_id"
                    attributeDisplay="account_number"
                    :isCustomStyle="isCustomStyle"
                    v-model="item.credit_account_id"
                    top="35px"
                    :widthParent="175"
                  />
                </div>
              </div>
              <div class="column_body text-right" style="min-width: 195px">
                <div class="column-name">
                  <input
                    v-if="!item.isEdit"
                    class="special-input text-right"
                    v-model="item.amount"
                    readonly
                  />
                  <BaseInputNumber
                    v-else
                    type="text"
                    text="right"
                    width="w-100"
                    placeholder=""
                    :isRequired="false"
                    v-model="item.amount"
                  />
                </div>
              </div>
              <div class="column_body" style="min-width: 195px">
                <div class="column-name">
                  <div class="column-name">
                    <span v-if="!item.isEdit">{{ item.supplier_code }}</span>

                    <BaseComboboxAdvance
                      v-else
                      type="text"
                      width="w-25"
                      :left="516"
                      top="35px"
                      :custom="true"
                      :comboboxData="supplierData"
                      :dataColumn="resource.LIST_COLUMN_NAME_SUPPLIER"
                      :widthList="1000"
                      attributeBinding="supplier_id"
                      attributeDisplay="supplier_code"
                      v-model="item.supplier_id"
                    />
                  </div>
                </div>
              </div>
              <div class="column_body" style="flex: 1; min-width: 250px">
                <div class="column-name">
                  <input
                    v-model="item.supplier_name"
                    class="special-input"
                    readonly
                  />
                </div>
              </div>
              <div class="column_body" style="min-width: 32px">
                <div class="column-name">
                  <div
                    class="icon-delete"
                    @click="deleteItem(item.payment_detail_id)"
                  >
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="table_footer"
            style="position: sticky; left: 0; bottom: 0; z-index: 999"
          >
            <div class="column_footer" style="min-width: 812px"></div>
            <div
              class="column_footer text-right"
              style="min-width: 195px; padding: 0 27px"
            >
              <div
                class="column-name"
                style="font-size: 14px; font-weight: 600"
              >
                {{
                  infPayment.total_amount
                    ? enums.FORMAT_MONEY_2(infPayment.total_amount)
                    : 0
                }}
              </div>
            </div>
            <div class="column_footer" style="flex: 1"></div>
          </div>
        </div>
      </div>
      <div class="action_table">
        <button class="sub-btn" @click="addRow">Thêm dòng</button>
        <button class="sub-btn" @click="isShowDialog = true">
          Xoá hết dòng
        </button>
      </div>
    </div>
    <div class="payment-detail_footer" v-if="modeFormDetail === 'view'">
      <!-- <div class="cancel-btn third-btn">Huỷ</div> -->
      <BaseButton
        title="Huỷ"
        type="btn third-btn"
        @click="closeFormDetailFunc(modeFormDetail)"
      ></BaseButton>
      <Tippy content="Sửa nhanh (Ctrl + E)" placement="bottom">
        <div class="block-handle-btn" @click="changeMode">
          <BaseButton title="Sửa" type="btn third-btn"></BaseButton>
        </div>
      </Tippy>
    </div>
    <div class="payment-detail_footer" v-else>
      <BaseButton
        title="Huỷ"
        type="btn third-btn"
        @click="closeFormDetailFunc(modeFormDetail)"
      ></BaseButton>
      <div class="block-handle-btn">
        <Tippy content="Cất (Ctrl + S)" placement="bottom">
          <BaseButton
            title="Cất"
            type="btn third-btn"
            @click="clickSave(modeFormDetail, false)"
          ></BaseButton>
        </Tippy>
        <BaseButtonAdvance
          @saveAndAdd="clickSaveAndAdd(modeFormDetail)"
          @saveAndClose="clickSave(modeFormDetail, true)"
        />
        <!-- <div class="btn m-btn">Cất và in</div> -->
      </div>
    </div>
  </div>
  <BaseDialogGD2
    v-if="isShowDialog"
    :action="actionOfDialog"
    :message="messageDialog"
    @closeDialog="isShowDialog = false"
    @acceptDelete="confirmDelete"
  />
  <BaseDialogError
    :isShow="isShowDialogValidate"
    button1="Đóng"
    :description="descriptionDialog"
    @closeDialog="isShowDialogValidate = false"
  ></BaseDialogError>
  <BaseLoading v-if="isShowLoading"></BaseLoading>
</template>

<script setup>
import enums from "@/helpers/enum";
import resource from "@/helpers/resource";
import BaseComboBoxNormal from "@/components/combo-box/BaseComboBoxNormal.vue";
import BaseComboboxAdvance from "@/components/combo-box/BaseComboboxAdvance.vue";
import BaseInputGroupGD2 from "@/components/input/BaseInputGroupGD2.vue";
import BaseDialogGD2 from "@/components/dialog/BaseDialogGD2.vue";
import BaseInputNumber from "@/components/input/BaseInputNumber.vue";
import BaseLoading from "@/components/loading/BaseLoading.vue";
import BaseDialogError from "@/components/dialog/BaseDialogError.vue";

import { v4 as uuidv4 } from "uuid";
import { useRoute, useRouter } from "vue-router";

import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import {
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import BaseButton from "@/components/button/BaseButton.vue";
import BaseButtonAdvance from "@/components/button/BaseButtonAdvance.vue";
import axios from "axios";

const props = defineProps(["isShowDetail", "mode", "data", "supplierId"]);

const emits = defineEmits(["closePopupDetail"]);

//#region Khai báo biến
const typePaymentDetails = ref(0);
const employeeData = ref([]);
const supplierData = ref([]);
const accountData = ref([]);
const isCustomStyle = ref(false);
const isShowDialog = ref(false);
const isShowDialogValidate = ref(false);
const actionOfDialog = ref("delete");
const isShowLoading = ref(false);
const messageDialog = ref(
  "Bạn có thực sự muốn xóa tất cả các dòng đã nhập không?"
);
const descriptionDialog = ref("");
const modeFormDetail = ref("add");
const isDisabled = ref(false);
const idPayment = ref("");
const route = useRoute();
const router = useRouter();

//scroll
const pageSizeSupplier = ref(20);
const pageIndexSupplier = ref(1);
const getMoreScrollSupplier = () => {
  console.log("emit");
  ++pageIndexSupplier.value;
};

watch(pageIndexSupplier, (newValue) => {
  console.log(newValue);
  setTimeout(() => {
    getSuppliers(pageSizeSupplier.value, newValue);
  }, 500);
});

//scroll

const infPayment = ref({
  refid: uuidv4(),
  supplier_id: null,
  supplier_name: "",
  supplier_code: "",
  receiver: "",
  supplier_address: "",
  journal_memo: "Chi tiền cho",
  employee_id: null,
  document_included: "",
  refno_finance: "",
  total_amount: 0,
  posted_date: "",
  ref_date: "",
});
const infDetail = ref({
  payment_detail_id: "",
  refid: null,
  description: "Chi tiền cho",
  debit_account_id: null,
  credit_account_id: null,
  supplier_name: "",
  supplier_code: "",
  amount: 0,
});
const arrInfDetail = ref([
  {
    payment_detail_id: uuidv4(),
    refid: null,
    description: "Chi tiền cho",
    debit_account_id: null,
    credit_account_id: null,
    supplier_name: "",
    supplier_code: "",
    amount: 0,
    isEdit: false,
  },
]);

const popupMessageError = reactive({
  supplierName: "",
  receiverName: "",
  address: "",
  journalMemo: "",
  refDate: "",
  refnoFinance: "",
  date: "",
});

//#endregion

//#region  Function

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Hàm đóng mở popup detail
*/
const closeFormDetailFunc = (mode) => {
  console.log(mode);
  if (mode === "edit" || mode === "view") {
    emits("closePopupDetail");
    router.push("/CA/CAPaymentList");
  } else if (mode === "add") {
    router.push("/CA/CAPaymentList");
    emits("closePopupDetail");
    console.log("close");
  }
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Theo dõi biến supplier_id để binding lại form khi thay đổi nhà cung cấp
*/
watch(
  () => infPayment.value.supplier_id,
  (newValue, oldValue) => {
    debugger;
    console.log(oldValue);
    console.log(newValue);
    if (modeFormDetail.value === "add") {
      if (newValue) {
        let objectTmp = supplierData.value.filter(
          (sup) => sup.supplier_id === newValue
        )[0];

        infPayment.value.supplier_name = objectTmp.supplier_name;
        infPayment.value.supplier_address = objectTmp.supplier_address;
        infPayment.value.receiver = objectTmp.receiver;
        infPayment.value.journal_memo = `Chi tiền cho ${objectTmp.supplier_name}`;
        infPayment.value.receiver = objectTmp.supplier_name;
        infPayment.value.supplier_code = objectTmp.supplier_code;
        infPayment.value.refid = uuidv4();

        if (arrInfDetail.value.length > 0) {
          for (let index = 0; index < arrInfDetail.value.length; index++) {
            arrInfDetail.value[index].isEdit = false;
            arrInfDetail.value[
              index
            ].description = `Chi tiền cho ${objectTmp.supplier_name}`;
            arrInfDetail.value[index].supplier_code = objectTmp.supplier_code;
            arrInfDetail.value[index].supplier_name = objectTmp.supplier_name;
            arrInfDetail.value[index].supplier_id = objectTmp.supplier_id;
          }
        } else {
          arrInfDetail.value = [
            {
              payment_detail_id: uuidv4(),
              refid: "",
              description: "Chi tiền cho",
              debit_account_id: "",
              credit_account_id: "",
              supplier_name: "",
              supplier_code: "",
              amount: 0,
              isEdit: false,
            },
          ];

          for (let index = 0; index < arrInfDetail.value.length; index++) {
            arrInfDetail.value[index].isEdit = false;
            arrInfDetail.value[
              index
            ].description = `Chi tiền cho ${objectTmp.supplier_name}`;
            arrInfDetail.value[index].supplier_code = objectTmp.supplier_code;
            arrInfDetail.value[index].supplier_name = objectTmp.supplier_name;
            arrInfDetail.value[index].supplier_id = objectTmp.supplier_id;
          }
        }
      } else {
        console.log("reset");
        infPayment.value.supplier_name = "";
        infPayment.value.supplier_address = "";
        infPayment.value.receiver = "";
        infPayment.value.journal_memo = "Chi tiền cho";
        infPayment.value.receiver = "";
        infPayment.value.supplier_code = "";
        infPayment.value.refid = uuidv4();
      }
    } else if (modeFormDetail.value === "edit") {
      let objectTmp = supplierData.value.filter(
        (sup) => sup.supplier_id === newValue
      )[0];
      console.log(infPayment.value.journal_memo);

      infPayment.value.supplier_name = objectTmp.supplier_name;
      infPayment.value.supplier_address = objectTmp.supplier_address;
      infPayment.value.receiver = objectTmp.receiver;
      infPayment.value.journal_memo =
        objectTmp.journal_memo || `Chi tiền cho ${objectTmp.supplier_name}`;

      infPayment.value.receiver = objectTmp.supplier_name;
      infPayment.value.supplier_code = objectTmp.supplier_code;

      if (arrInfDetail.value.length > 0) {
        for (let index = 0; index < arrInfDetail.value.length; index++) {
          arrInfDetail.value[index].isEdit = false;
          arrInfDetail.value[
            index
          ].description = `Chi tiền cho ${objectTmp.supplier_name}`;
          arrInfDetail.value[index].supplier_code = objectTmp.supplier_code;
          arrInfDetail.value[index].supplier_name = objectTmp.supplier_name;
          arrInfDetail.value[index].supplier_id = objectTmp.supplier_id;
        }
      } else {
        arrInfDetail.value = [
          {
            payment_detail_id: uuidv4(),
            refid: "",
            description: "Chi tiền cho",
            debit_account_id: "",
            credit_account_id: "",
            supplier_name: "",
            supplier_code: "",
            amount: 0,
            isEdit: false,
          },
        ];

        for (let index = 0; index < arrInfDetail.value.length; index++) {
          arrInfDetail.value[index].isEdit = false;
          arrInfDetail.value[
            index
          ].description = `Chi tiền cho ${objectTmp.supplier_name}`;
          arrInfDetail.value[index].supplier_code = objectTmp.supplier_code;
          arrInfDetail.value[index].supplier_name = objectTmp.supplier_name;
          arrInfDetail.value[index].supplier_id = objectTmp.supplier_id;
        }
      }
    } else if ((modeFormDetail.value = "view")) {
      console.log(infPayment.value);
      return;
    }
  }
);

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Theo dõi diễn giải để binding xuống detail
*/
watch(
  () => infPayment.value.journal_memo,
  (newValue) => {
    console.log(newValue);

    for (let index = 0; index < arrInfDetail.value.length; index++) {
      arrInfDetail.value[index].description = newValue;
    }
  }
);

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Theo dõi ngày hạch toán ngày phiếu chi
*/
watch(
  () => infPayment.value.posted_date,
  (newValue, oldValue) => {
    // console.log(newValue);
    infPayment.value.ref_date = newValue;
    // console.log(infPayment.value.ref_date);
  }
);

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Theo dõi mảng chứa những hạch toán
*/
watch(
  () => arrInfDetail.value.map((x) => x.supplier_id),
  (newValue) => {
    console.log(newValue);

    for (let index = 0; index < newValue.length; index++) {
      arrInfDetail.value[index].supplier_id = newValue[index];
      if (arrInfDetail.value[index].supplier_name) {
        arrInfDetail.value[index].supplier_name = supplierData.value.filter(
          (sup) => sup.supplier_id === newValue[index]
        )[0].supplier_name;
      }
      if (arrInfDetail.value[index].supplier_code) {
        arrInfDetail.value[index].supplier_code = supplierData.value.filter(
          (sup) => sup.supplier_id === newValue[index]
        )[0].supplier_code;
      }
    }
  },
  { deep: true }
);

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Theoi dõi mảng để tính lại tổng tiền
*/
watch(
  () => arrInfDetail.value.map((x) => x.amount),
  (newValue) => {
    console.log(newValue.reduce((a, b) => parseInt(a) + parseInt(b), 0));
    infPayment.value.total_amount = newValue.reduce(
      (a, b) => parseInt(a) + parseInt(b),
      0
    );
  },
  {
    deep: true,
  }
);

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Khởi tạo dữ liệu
*/
const initData = () => {
  // call api lấy mã phiếu chi mới (refno_finance)
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  let year = currentDate.getFullYear();

  infPayment.value.posted_date = `${year}-${month}-${day}`;
  infPayment.value.ref_date = `${year}-${month}-${day}`;
  infPayment.value.refno_finance = "123";
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 10/6/2023
Chạy khi component được mounted vào DOM
*/
onMounted(() => {
  // console.log(isDisabled.value);
  // console.log(props.data);
  // console.log(props.mode);
  // console.log(props.supplierId);
  infPayment.value.supplier_id = null;

  if (props.mode === "view") {
    infPayment.value.supplier_id = props.supplierId;
    console.log(infPayment.value.supplier_id);
    isDisabled.value = true;
  } else {
    isDisabled.value = false;
  }

  if (props.data) {
    modeFormDetail.value = props.mode;

    idPayment.value = props.data;
  } else {
    console.log("mode add");
  }

  getPaymentById(props.data);

  initData();
  getNewFinance();
  getEmployees();
  getSuppliers(pageSizeSupplier.value, pageIndexSupplier.value);
  getAccount();
});

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 15/6/2023
Lấy thông tin của bản ghi muốn chỉnh sửa hoặc xem
*/
const getPaymentById = async (id) => {
  await axios
    .get(`https://localhost:44339/api/v1/Payment/${id}`)
    .then((response) => {
      console.log(response.data);
      infPayment.value = response.data[0];
      // console.log(infPayment.value);

      infPayment.value.posted_date = infPayment.value.posted_date.split("T")[0];
      infPayment.value.ref_date = infPayment.value.ref_date.split("T")[0];
      infPayment.value.journal_memo = response.data[0].journal_memo;
      infPayment.value.receiver = response.data[0].supplier_name;

      getPaymentDetailById(infPayment.value.refid);
    })
    .catch((error) => {
      console.log(error);
    });
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Lấy thông tin detail payment
*/
const getPaymentDetailById = async (id) => {
  await axios
    .get(`https://localhost:44339/api/v1/PaymentDetail/${id}`)
    .then((response) => {
      // console.log("paymentDetail", response.data);
      arrInfDetail.value = response.data;

      // console.log(infPayment.value.supplier_id);

      arrInfDetail.value = arrInfDetail.value.map((item) => {
        return {
          ...item,
          supplier_id: infPayment.value.supplier_id,
        };
      });
      console.log(arrInfDetail.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 *
 * Lấy toàn bộ nhân viên
 * author: TQHUNG
 * Date: 10-06-2023
 */
const getEmployees = async () => {
  await axios
    .get("https://localhost:44339/api/v1/Employees")
    .then((response) => {
      // console.log(response);
      employeeData.value = response.data;
      // console.log(employeeData.value);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Lấy thông tin nhà cung cấp
 * author: TQHUNG
 * Date: 10-06-2023
 */
const getSuppliers = async (pageSize, pageIndex, searchKeyword = "") => {
  let api;
  if (searchKeyword) {
    api = `https://localhost:44339/api/v1/Supplier/pagination?pageSize=${pageSize}&pageIndex=${pageIndex}&searchKeyword=${searchKeyword}`;
  } else {
    api = `https://localhost:44339/api/v1/Supplier/pagination?pageSize=${pageSize}&pageIndex=${pageIndex}`;
  }
  await axios
    .get(api)
    .then((response) => {
      // console.log(response);
      if (supplierData.value.length > 0) {
        supplierData.value = [...supplierData.value, ...response.data.records];
      } else {
        supplierData.value = response.data.records;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Hàm thực hiện lấy mã mới (số phiếu chi)
*/
const getNewFinance = async () => {
  await axios
    .get("https://localhost:44339/api/v1/Payment/new-refno-finance")
    .then((response) => {
      infPayment.value.refno_finance = response.data;
      // console.log(infPayment.value.refno_finance);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 *
 * Lấy thông tin tài khoản
 * author: TQHUNG
 * Date: 10-06-2023
 */
const getAccount = async () => {
  await axios
    .get("https://localhost:44339/api/v1/Account")
    .then((response) => {
      // console.log(response.data);
      accountData.value = response.data;
    })
    .catch((error) => console.log(error));
};

/**
 *
 * Thêm dòng
 * author: TQHUNG
 * Date: 11-06-2023
 */
const addRow = () => {
  if (!isDisabled.value) {
    for (let index = 0; index < arrInfDetail.value.length; index++) {
      arrInfDetail.value[index].isEdit = false;
    }
    if (arrInfDetail.value.length > 0) {
      arrInfDetail.value.push({
        payment_detail_id: uuidv4(),
        refid: arrInfDetail.value[arrInfDetail.value.length - 1].refid,
        supplier_id:
          arrInfDetail.value[arrInfDetail.value.length - 1].supplier_id,
        description:
          arrInfDetail.value[arrInfDetail.value.length - 1].description,
        debit_account_id: null,
        credit_account_id: null,
        supplier_name:
          arrInfDetail.value[arrInfDetail.value.length - 1].supplier_name,
        supplier_code:
          arrInfDetail.value[arrInfDetail.value.length - 1].supplier_code,
        amount: arrInfDetail.value.length - 1,
        isEdit: true,
      });
    } else {
      arrInfDetail.value = [
        {
          payment_detail_id: uuidv4(),
          refid: infPayment.value.refid,
          description: "Chi tiền cho",
          debit_account_id: null,
          credit_account_id: null,
          supplier_name: infPayment.value.supplier_name,
          supplier_code: infPayment.value.supplier_code,
          supplier_id: infPayment.value.supplier_id,
          amount: 0,
          isEdit: false,
        },
      ];
    }
  } else {
    return;
  }
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Xoá toàn bộ hạch toán ở grid popip (Có để lại 1 bản ghi trong mảng)
*/
const confirmDelete = (data) => {
  isShowDialog.value = false;
  let x = arrInfDetail.value[0];
  arrInfDetail.value = [x];
};

/**
 *
 * Hàm thực hiện chức năng cất
 * Người viết : Trần Quang Hưng
 * Ngày: 11-06-2023
 */
const save = async (mode, isClose) => {
  console.log(isClose);
  // debugger;
  console.log(mode);
  if (mode === "add") {
    console.log("add");
    console.log(infPayment.value);
    isShowLoading.value = true;
    await axios
      .post("https://localhost:44339/api/v1/Payment/insert", infPayment.value)
      .then((response) => {
        isShowLoading.value = false;

        console.log(response);
        for (let index = 0; index < arrInfDetail.value.length; index++) {
          arrInfDetail.value[index].refid = infPayment.value.refid;
        }
        if (response.status === 201) {
          axios
            .post(
              "https://localhost:44339/api/v1/PaymentDetail/insert",
              arrInfDetail.value
            )
            .then((response) => {
              isShowLoading.value = false;

              if (!isClose) {
                console.log(response);
                // Chuyển sang mode view
                // hiển thị thông báo thêm thành công chứng từ
                console.log("Đổi mode");
                modeFormDetail.value = "view";
                isDisabled.value = true;
                for (
                  let index = 0;
                  index < arrInfDetail.value.length;
                  index++
                ) {
                  arrInfDetail.value[index].isEdit = false;
                }
              } else {
                //close form
                console.log(mode);
                closeFormDetailFunc(mode);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (response.status == 200) {
          isShowLoading.value = false;

          isShowDialogValidate.value = true;
          descriptionDialog.value = response.data.userMessage;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(arrInfDetail.value);
  } else if (mode === "edit") {
    debugger;

    isShowLoading.value = true;
    console.log("mode edit");

    console.log(arrInfDetail.value);

    idPayment.value = idPayment.value || infPayment.value.refid;
    let data = {
      ...infPayment.value,
      refid: idPayment.value,
    };
    console.log(data);
    // Gọi api update từng thằng 1
    await axios
      .put(
        `https://localhost:44339/api/v1/Payment/update?id=${idPayment.value}`,
        data
      )
      .then((response) => {
        console.log(response);
        // update details
        axios
          .put(
            `https://localhost:44339/api/v1/PaymentDetail/update?refid=${idPayment.value}`,
            arrInfDetail.value
          )
          .then((response) => {
            if (!isClose) {
              isShowLoading.value = false;
              console.log(response);
              console.log("Đổi mode");
              modeFormDetail.value = "view";
              isDisabled.value = true;
              for (let index = 0; index < arrInfDetail.value.length; index++) {
                arrInfDetail.value[index].isEdit = false;
              }
            } else {
              //close form
              console.log(mode);
              closeFormDetailFunc(mode);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

/**
 *
 *Hàm reset popup
 * Người viết : Trần Quang Hưng
 * Ngày: 17-06-2023
 */
const reset = () => {
  infPayment.value = {
    refid: "",
    supplier_id: "",
    supplier_name: "",
    supplier_code: "",
    receiver: "",
    supplier_address: "",
    journal_memo: "Chi tiền cho",
    employee_id: "",
    document_included: 0,
    refno_finance: "",
    total_amount: 0,
    posted_date: "",
    ref_date: "",
  };

  // resert lai mang detail
  arrInfDetail.value = [
    {
      payment_detail_id: uuidv4(),
      refid: "",
      description: "Chi tiền cho",
      debit_account_id: "",
      credit_account_id: "",
      supplier_name: "",
      supplier_code: "",
      amount: 0,
      isEdit: false,
    },
  ];
};

/**
 *
 * Hàm thực hiện chức năng cất và thêm
 * Người viết : Trần Quang Hưng
 * Ngày: 17-06-2023
 */
const saveAndAdd = async (mode) => {
  console.log(mode);
  // debugger;
  if (mode === "add") {
    // Thực hiện thêm và reset form
    // console.log("add");
    // console.log(infPayment.value);
    isShowLoading.value = true;
    await axios
      .post("https://localhost:44339/api/v1/Payment/insert", infPayment.value)
      .then((response) => {
        isShowLoading.value = false;
        // console.log(response);
        for (let index = 0; index < arrInfDetail.value.length; index++) {
          arrInfDetail.value[index].refid = infPayment.value.refid;
        }
        axios
          .post(
            "https://localhost:44339/api/v1/PaymentDetail/insert",
            arrInfDetail.value
          )
          .then(async (response) => {
            isShowLoading.value = false;

            //reset form
            modeFormDetail.value = "add";
            // infDetail.value.supplier_id = null;
            // infDetail.value.supplier_name = null;

            infPayment.value.refid = uuidv4();
            infPayment.value.supplier_id = null;
            infPayment.value.employee_id = null;

            getNewFinance();

            // for (let index = 0; index < arrInfDetail.value.length; index++) {
            //   arrInfDetail.value[index].payment_detail_id = uuidv4();
            // }

            arrInfDetail.value = [
              {
                payment_detail_id: uuidv4(),
                refid: null,
                description: "Chi tiền cho",
                debit_account_id: null,
                credit_account_id: null,
                supplier_name: "",
                supplier_code: "",
                amount: 0,
                isEdit: false,
              },
            ];
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (mode === "edit") {
    console.log("edit");
    console.log(infPayment.value);
    console.log(arrInfDetail.value);
    isShowLoading.value = true;

    // call API update

    axios
      .put(
        `https://localhost:44339/api/v1/Payment/update?id=${infPayment.value.refid}`,
        infPayment.value
      )
      .then((response) => {
        isShowLoading.value = false;

        axios
          .put(
            `https://localhost:44339/api/v1/PaymentDetail/update?refid=${infPayment.value.refid}`,
            arrInfDetail.value
          )
          .then((response) => {
            isShowLoading.value = false;
            console.log(response);
            console.log("Thành công");
            // reset form + đổi mode

            modeFormDetail.value = "add";
            infDetail.value.supplier_id = "";
            infDetail.value.supplier_name = "";
            getNewFinance();

            for (let index = 0; index < arrInfDetail.value.length; index++) {
              arrInfDetail.value[index].payment_detail_id = uuidv4();
            }
          });
      });

    // thực hiện cập nhật và reset form
  }
};

const rowClick = ref(null);

/**
 *
 * Bật mode edit ở bảng detail
 * author: TQHUNG
 * Date: 10-06-2023
 */
const enableModeEdit = (infDetail, index) => {
  rowClick.value = index;
  if (!isDisabled.value) {
    if (index === rowClick.value) {
      for (let index = 0; index < arrInfDetail.value.length; index++) {
        if (index === rowClick.value) {
          arrInfDetail.value[index].isEdit = true;
        } else {
          arrInfDetail.value[index].isEdit = false;
        }
      }
    }
  } else {
    return;
  }
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 14/6/2023
Xoá một dòng
*/
const deleteItem = (id) => {
  console.log(id);
  arrInfDetail.value = arrInfDetail.value.filter(
    (item) => item.payment_detail_id !== id
  );
  // console.log(arrInfDetail.value);
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Thay đổi mode popup
*/
const changeMode = () => {
  console.log("change mode");
  modeFormDetail.value = "edit";

  isDisabled.value = false;
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 17/6/2023
Hàm validate kiểm tra mã phiếu chi không để trống
*/
const validateRefnoFinance = () => {
  infPayment.value.refno_finance = infPayment.value.refno_finance
    .toString()
    .trim();

  if (!infPayment.value.refno_finance) {
    popupMessageError.refnoFinance = "Số chứng từ không được phép để trống";
  } else {
    if (infPayment.value.refno_finance.length > 50) {
      popupMessageError.refnoFinance = "Số chứng từ vượt quá 50 kí tự";
    } else {
      popupMessageError.refnoFinance = "";
    }
  }
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 17/6/2023
Kiểm cha toàn bộ validate
*/
const checkValidate = () => {
  try {
    validateRefnoFinance();
    validateLength();
    validateDate();

    if (
      !popupMessageError.refnoFinance &&
      !popupMessageError.supplierName &&
      !popupMessageError.address &&
      !popupMessageError.journalMemo &&
      !popupMessageError.receiverName &&
      !popupMessageError.date
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Hàm xử lý khi click button cất
*/
const clickSave = (mode, isContinue) => {
  console.log("click save");
  console.log(checkValidate());
  if (!checkValidate()) {
    isShowDialogValidate.value = true;
    descriptionDialog.value =
      popupMessageError.refnoFinance ||
      popupMessageError.journalMemo ||
      popupMessageError.supplierName ||
      popupMessageError.receiverName ||
      popupMessageError.address ||
      popupMessageError.date;
  } else {
    console.log("Cất");
    save(mode, isContinue);
  }
};

const clickSaveAndAdd = (mode) => {
  if (!checkValidate()) {
    isShowDialogValidate.value = true;
    descriptionDialog.value =
      popupMessageError.refnoFinance ||
      popupMessageError.journalMemo ||
      popupMessageError.supplierName ||
      popupMessageError.receiverName ||
      popupMessageError.address ||
      popupMessageError.date;
  } else {
    saveAndAdd(mode);
  }
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 16/6/2023
Hàm validate maxlength
*/

const validateLength = () => {
  if (!infPayment.value.supplier_name) {
    popupMessageError.supplierName = "";
  } else {
    if (infPayment.value.supplier_name.trim().length > 100) {
      popupMessageError.supplierName = "Tên nhà cung cấp quá 100 kí tự";
    } else {
      popupMessageError.supplierName = "";
    }
  }

  if (!infPayment.value.journal_memo) {
    popupMessageError.journalMemo = "";
  } else {
    if (infPayment.value.journal_memo.trim().length > 255) {
      popupMessageError.journalMemo = "Lý do chi quá 255 kí tự";
    } else {
      popupMessageError.journalMemo = "";
    }
  }

  if (!infPayment.value.receiver) {
    popupMessageError.receiverName = "";
  } else {
    if (infPayment.value.receiver.trim().length > 100) {
      popupMessageError.receiverName = "Tên người nhận quá 100 kí tự ";
    } else {
      popupMessageError.receiverName = "";
    }
  }

  if (!infPayment.value.supplier_address) {
    popupMessageError.address = "";
  } else {
    if (infPayment.value.supplier_address.trim().length > 255) {
      popupMessageError.address = "Địa chỉ quá 255 kí tự";
    } else {
      popupMessageError.address = "";
    }
  }
};

const validateDate = () => {
  console.log(infPayment.value.ref_date);
  console.log(infPayment.value.posted_date);

  const refDate = new Date(infPayment.value.ref_date);
  const postedDate = new Date(infPayment.value.posted_date);

  // nếu ngày phiếu chi mà lớn hơn ngày hạch toán thì lỗi
  if (refDate > postedDate) {
    popupMessageError.date =
      "Ngày phiếu chi phải nhỏ hơn hoặc bằng ngày hạch toán";
  } else {
    popupMessageError.date = "";
  }
};

/*
NGgười viết: Trần Quang Hưng
Ngày viết: 18/6/2023
Cấu hình phím tắt
*/

const handleKey = (event) => {
  debugger;
  console.log(event);
  if (
    event.keyCode === enums.KeyCode.S &&
    event.keyCode === enums.KeyCode.CTRL
  ) {
    console.log("save");
    event.preventDefault();
    clickSave(modeFormDetail.value, false);
  }
  //Ấn ESC để thoát
  else if (event.keyCode === enums.KeyCode.ESC) {
    event.preventDefault();
    closeFormDetailFunc(modeFormDetail.value);
  } else if (event.keyCode === enums.KeyCode.E) {
    event.preventDefault();
    changeMode();
  }
};
onMounted(() => window.addEventListener("keydown", handleKey));
onUnmounted(() => window.removeEventListener("keydown", handleKey));

//#endregion
</script>

<style scoped>
@import url("@/css/payment-detail.css");
</style>
