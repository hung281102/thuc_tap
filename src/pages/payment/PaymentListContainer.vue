<template>
  <div class="container-content receipt">
    <div class="receipt-router">
      <router-link :to="{ name: 'Receipt' }">
        <div class="process">Quy trình</div>
      </router-link>
      <div class="payment active">Chi tiền</div>
    </div>

    <div class="layout-master-detail" ref="layoutMasterDetail">
      <div class="layout-master-action">
        <div class="layout-master-action_left">
          <div class="icon-down">
            <div></div>
          </div>
          <BaseDropdown
            :disabled="isDisabledDropdown"
            @deletePayment="deleteMultiPayment"
          ></BaseDropdown>
        </div>
        <div class="layout-master-action_right">
          <div class="input-group">
            <span class="search">
              <div class="search-icon"></div>
            </span>
            <input
              type="text"
              id="input"
              class="input"
              placeholder="Tìm kiếm theo tên, số tài khoản"
              v-model="searchInput"
              @input="changeInput"
            />
          </div>
          <Tippy content="Lấy lại dữ liệu" placement="bottom">
            <div class="btn-reload" @click="reloadPage">
              <div></div>
            </div>
          </Tippy>
          <Tippy content="Xuất excel" placement="bottom">
            <div class="div">
              <a
                v-if="searchInput && arrayChecked.length === 0"
                class="btn-export"
                :href="`https://localhost:44339/api/v1/Payment/export-excel?query=${searchInput}`"
              >
                <div></div>
              </a>
              <a
                v-else
                class="btn-export"
                :href="`https://localhost:44339/api/v1/Payment/export-excel-id?arrayPaymentId=${arrayCheckedString}`"
              >
                <div></div>
              </a>
            </div>
          </Tippy>
          <Tippy content="Tuỳ chỉnh giao diện" placement="bottom">
            <div class="btn-setting">
              <div></div>
            </div>
          </Tippy>
          <router-link :to="{ name: 'PaymentDetail' }" style="color: #000">
            <BaseButtonMore text="Chi tiền"></BaseButtonMore>
          </router-link>
        </div>
      </div>
      <div
        class="layout-master"
        :style="{ height: heightMaster }"
        ref="layoutMaster"
      >
        <div class="layout-master-table">
          <div class="layout-master-table_header">
            <div class="column_header text-center" style="min-width: 40px">
              <input
                type="checkbox"
                name=""
                id=""
                style="cursor: pointer"
                @change="selectAllPayment"
                v-model="isCheckAll"
              />
            </div>
            <div class="column_header text-center" style="min-width: 150px">
              <div class="column-name">Ngày hạch toán</div>
            </div>
            <div class="column_header text-center" style="min-width: 150px">
              <div class="column-name">Ngày chứng từ</div>
            </div>
            <div class="column_header text-left" style="min-width: 150px">
              <div class="column-name">Số chứng từ</div>
            </div>
            <div class="column_header text-left" style="min-width: 270px">
              <div class="column-name">Diễn giải</div>
            </div>
            <div class="column_header text-right" style="min-width: 150px">
              <div class="column-name">Số tiền</div>
            </div>
            <div class="column_header text-left" style="min-width: 150px">
              <div class="column-name">Mã đối tượng</div>
            </div>
            <div class="column_header text-left" style="min-width: 250px">
              <div class="column-name">Đối tượng</div>
            </div>

            <div class="column_header text-left" style="min-width: 250px">
              <div class="column-name">Địa chỉ</div>
            </div>
            <div class="column_header text-center" style="min-width: 100px">
              <div class="column-name">Chức năng</div>
            </div>
          </div>
          <div class="layout-master-table_body">
            <div
              class="row-body"
              v-for="payment in masterData"
              :class="{
                ' click': payment.refid === paymentIdClick,
              }"
              @click="bindingDetail(payment.refid)"
            >
              <div style="display: flex">
                <div
                  class="column_body text-center"
                  @click="(e) => e.stopPropagation()"
                  style="width: 40px"
                >
                  <input
                    type="checkbox"
                    style="cursor: pointer"
                    v-model="arrayChecked"
                    :value="payment.refid"
                  />
                </div>
                <div class="column_body text-center" style="width: 150px">
                  <div class="column-name">
                    <Tippy
                      :content="
                        () =>
                          enums.FORMAT_DATE(payment.posted_date, 'dd-mm-yyyy')
                      "
                      placement="bottom"
                    >
                      {{ enums.FORMAT_DATE(payment.posted_date, "dd-mm-yyyy") }}
                    </Tippy>
                  </div>
                </div>
                <div class="column_body text-center" style="width: 150px">
                  <div class="column-name">
                    <Tippy
                      :content="
                        () => enums.FORMAT_DATE(payment.ref_date, 'dd-mm-yyyy')
                      "
                      placement="bottom"
                    >
                      {{ enums.FORMAT_DATE(payment.ref_date, "dd-mm-yyyy") }}
                    </Tippy>
                  </div>
                </div>
                <div class="column_body text-left" style="width: 150px">
                  <div class="column-name">
                    <Tippy :content="payment.refno_finance" placement="bottom">
                      {{ payment.refno_finance }}
                    </Tippy>
                  </div>
                </div>
                <div class="column_body text-left" style="width: 270px">
                  <div
                    class="column-name"
                    style="
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    <Tippy :content="payment.journal_memo" placement="bottom">
                      {{ payment.journal_memo }}
                    </Tippy>
                  </div>
                </div>
                <div class="column_body text-right" style="width: 150px">
                  <div class="column-name">
                    {{
                      payment.total_amount
                        ? enums.FORMAT_MONEY_2(Math.floor(payment.total_amount))
                        : ""
                    }}
                  </div>
                </div>
                <div class="column_body text-left" style="width: 150px">
                  <div class="column-name">
                    <Tippy :content="payment.supplier_code" placement="bottom">
                      {{ payment.supplier_code }}
                    </Tippy>
                  </div>
                </div>
                <div class="column_body text-left" style="width: 250px">
                  <div class="column-name">
                    <Tippy :content="payment.supplier_name" placement="bottom">
                      {{ payment.supplier_name }}
                    </Tippy>
                  </div>
                </div>

                <div class="column_body text-left" style="width: 250px">
                  <div class="column-name">
                    <Tippy
                      :content="payment.supplier_address"
                      placement="bottom"
                    >
                      {{ payment.supplier_address }}
                    </Tippy>
                  </div>
                </div>
                <div class="column_body text-center" style="width: 100px">
                  <div class="column-name m-table-cell" style="padding: 0">
                    <div
                      class="edit-option"
                      @click="
                        handleOpenPaymentDetail(
                          payment.refid,
                          payment.supplier_id
                        )
                      "
                    >
                      Xem
                    </div>
                    <div
                      class="edit-select-option"
                      @click="openOptionList($event, payment)"
                    >
                      <div class="edit-select-icon"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row-body last-row">
              <div style="min-width: 40px"></div>
              <div
                style="
                  min-width: 150px;
                  border-right: transparent;
                  border-bottom: transparent;
                "
                class="column_header text-center"
              >
                <div class="column-name">
                  <span>Tổng</span>
                </div>
              </div>
              <div style="min-width: 150px">
                <div class="column-name"></div>
              </div>
              <div style="min-width: 150px">
                <div class="column-name"></div>
              </div>
              <div style="min-width: 270px">
                <div class="column-name"></div>
              </div>
              <div
                style="
                  min-width: 150px;
                  border-right: transparent;
                  border-bottom: transparent;
                "
                class="column_header text-right"
              >
                <div class="column-name">
                  <span>{{
                    enums.FORMAT_MONEY_2(Math.floor(totalAmountMaster))
                  }}</span>
                </div>
              </div>
              <div style="min-width: 150px">
                <div class="column-name"></div>
              </div>
              <div style="min-width: 250px">
                <div class="column-name"></div>
              </div>

              <div style="min-width: 250px">
                <div class="column-name"></div>
              </div>
              <div style="min-width: 100px">
                <div class="column-name"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="layout-master-table_footer">
          <div class="pagination-master-layout">
            <div class="sum-of-record">
              <span>Tổng số: </span>
              <span class=""
                ><b>{{ enums.FORMAT_MONEY_2(totalRecordPayment) }}</b></span
              >
              <span class=""> bản ghi</span>
            </div>
            <div class="paging-block-right">
              <BaseComboBoxNormal
                :comboboxData="resource.RECORD_PER_PAGE"
                width="w-50"
                :isRequired="false"
                direction="top"
                v-model="defaultPageIndexMaster"
                style="margin-bottom: 5px"
                :widthList="100"
              ></BaseComboBoxNormal>

              <BasePaging
                :totalRecord="totalRecordPaymentDetail"
                :totalPage="totalPageMasters"
                v-model="currentPage"
              >
              </BasePaging>
            </div>
          </div>
        </div>
      </div>
      <div
        class="layout-detail"
        :style="{ height: heightDetail }"
        ref="layoutDetail"
      >
        <div class="layout-detail_header">
          <div
            class="layout-master-detail_resize"
            @mousedown="startResize"
            @mousemove="resizeLayout"
            @mouseup="stopResize"
          >
            <button class="btn-detail">Chi tiết</button>
            <div
              class="resize-block"
              @click="resizeDetail"
              :class="{ ' click': isResize }"
            >
              <div></div>
            </div>
          </div>
        </div>
        <div class="layout-detail-table">
          <div class="layout-detail-table_header">
            <div class="column_header text-center" style="min-width: 40px">
              <div class="column-name">#</div>
            </div>
            <div class="column_header text-left" style="width: 240px">
              <div class="column-name">Diễn giải</div>
            </div>
            <div class="column_header text-left" style="min-width: 140px">
              <div class="column-name">Tk nợ</div>
            </div>
            <div class="column_header text-left" style="min-width: 140px">
              <div class="column-name">Tk có</div>
            </div>
            <div class="column_header text-right" style="min-width: 200px">
              <div class="column-name">Số tiền</div>
            </div>
            <div class="column_header text-left" style="min-width: 200px">
              <div class="column-name">Đối tượng</div>
            </div>
            <div class="column_header text-left" style="min-width: 336px">
              <div class="column-name">Tên đối tượng</div>
            </div>
          </div>
          <div class="layout-detail-table_body">
            <div
              class="row-body"
              v-for="(detail, index) in detailDataView"
              :key="detail"
            >
              <div class="column_body text-center" style="min-width: 40px">
                <div class="column-name">{{ index + 1 }}</div>
              </div>
              <div class="column_body text-left" style="width: 240px">
                <div class="column-name">
                  <Tippy :content="detail.description" placement="bottom">
                    {{ detail.description }}
                  </Tippy>
                </div>
              </div>
              <div class="column_body text-left" style="min-width: 140px">
                <div class="column-name">
                  {{
                    detail.debit_account_id
                      ? allAccounts.filter(
                          (acc) => acc.account_id === detail.debit_account_id
                        )[0].account_number
                      : ""
                  }}
                </div>
              </div>
              <div class="column_body text-left" style="min-width: 140px">
                <div class="column-name">
                  {{
                    detail.credit_account_id
                      ? allAccounts.filter(
                          (acc) => acc.account_id === detail.credit_account_id
                        )[0].account_number
                      : ""
                  }}
                </div>
              </div>
              <div class="column_body text-right" style="min-width: 200px">
                <div class="column-name">
                  {{ enums.FORMAT_MONEY_2(detail.amount) }}
                </div>
              </div>
              <div class="column_body text-left" style="min-width: 200px">
                <div class="column-name">
                  <Tippy :content="detail.supplier_code" placement="bottom">
                    {{ detail.supplier_code }}
                  </Tippy>
                </div>
              </div>

              <div class="column_body text-left" style="min-width: 336px">
                <div class="column-name">
                  <Tippy :content="detail.supplier_name" placement="bottom">
                    {{ detail.supplier_name }}</Tippy
                  >
                </div>
              </div>
            </div>

            <div class="row-body last-row">
              <div style="min-width: 40px"></div>
              <div
                style="
                  min-width: 240px;
                  border-right: transparent;
                  border-bottom: transparent;
                "
                class="column_header text-center"
              >
                <div class="column-name">
                  <span>Tổng</span>
                </div>
              </div>
              <div style="min-width: 140px">
                <div class="column-name"></div>
              </div>
              <div style="min-width: 140px">
                <div class="column-name"></div>
              </div>

              <div
                style="
                  min-width: 200px;
                  border-right: transparent;
                  border-bottom: transparent;
                "
                class="column_header text-right"
              >
                <div class="column-name">
                  <span>{{
                    detailData.length > 0
                      ? enums.FORMAT_MONEY_2(
                          detailData
                            .map((data) => data.amount)
                            .reduce((a, b) => a + b)
                        )
                      : 0
                  }}</span>
                </div>
              </div>
              <div style="min-width: 200px">
                <div class="column-name"></div>
              </div>
              <div style="min-width: 336px">
                <div class="column-name"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="layout-detail-table_footer">
          <div class="pagination-master-layout">
            <div class="sum-of-record">
              <span>Tổng số: </span>
              <span class=""
                ><b>{{
                  enums.FORMAT_MONEY_2(totalRecordPaymentDetail)
                }}</b></span
              >
              <span class=""> bản ghi</span>
            </div>
            <div class="paging-block-right">
              <BaseComboBoxNormal
                :comboboxData="resource.RECORD_PER_PAGE"
                width="w-50"
                :isRequired="false"
                direction="top"
                v-model="defaultPageIndexDetail"
                style="margin-bottom: 5px"
                :widthList="100"
              ></BaseComboBoxNormal>

              <BasePaging
                :totalRecord="totalRecordPaymentDetail"
                :totalPage="totalPageDetails"
                v-model="currentPageDetail"
              >
              </BasePaging>
            </div>
          </div>
        </div>
      </div>

      <BaseLoading v-if="isShowLoading"></BaseLoading>
    </div>
  </div>
  <teleport to="body">
    <ul
      class="option-list"
      :style="{ top: `${posOptionY}px`, right: '45px' }"
      v-show="isShowOptionList"
    >
      <li class="option-item" @click="clickEditAction">Sửa</li>
      <li class="option-item" @click="deletePayment(paymentIdClick)">Xóa</li>
      <li class="option-item">Nhân bản</li>
    </ul>
  </teleport>
  <!-- <BaseLoading v-if="isShowLoading"></BaseLoading> -->
  <BaseDialogGD2
    v-if="isShowDialog"
    :action="actionOfDialog"
    :message="messageDialog"
    @closeDialog="isShowDialog = false"
    :data="paymentIdClick"
    @acceptDelete="confirmDeleteAccount"
    @acceptDeleteMultiple="confirmDeleteAccountMultiple"
  ></BaseDialogGD2>
  <BaseToastMessage
    state="success"
    description="Xoá thành công một chứng từ khỏi hệ thống"
    :isShow="isShowToastMessage"
  ></BaseToastMessage>

  <PaymentDetail
    v-if="isShowDetail"
    :mode="modePaymentDetail"
    :data="paymentDetailIdClick"
    :supplierId="supplierId"
    @closePopupDetail="closePopupDetail"
  />
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import enums from "@/helpers/enum";
import resource from "@/helpers/resource";
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";

import BaseComboBoxNormal from "@/components/combo-box/BaseComboBoxNormal.vue";
import BasePaging from "@/components/paging/BasePaging.vue";
import BaseButtonMore from "@/components/button/BaseButtonMore.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import BaseLoading from "@/components/loading/BaseLoading.vue";
import BaseDialogGD2 from "@/components/dialog/BaseDialogGD2.vue";
import BaseToastMessage from "@/components/toast-message/BaseToastMessage.vue";
import PaymentDetail from "./PaymentDetail.vue";

//#region  Khởi tạo biến dùng trong component
const heightMaster = ref("60%");
const heightDetail = ref("40%");
const defaultPageIndexMaster = ref(1);
const defaultPageIndexDetail = ref(1);
const defaultPageSizeMaster = ref(20);
const defaultPageSizeDetail = ref(20);

const allAccounts = ref([]);
const detailClick = ref("");
const recordPerPageId = ref(1);
// const recordPerPageIdDetail = ref(1);
const currentPage = ref(1);
const currentPageDetail = ref(1);
const isShowLoading = ref(false);
const isShowOptionList = ref(false);
const posOptionY = ref(null);
const paymentIdClick = ref("");
const totalRecordPayment = ref(0);
const totalRecordPaymentDetail = ref(0);
const totalPageDetails = ref(0);
const totalPageMasters = ref(0);
const searchInput = ref("");
const timeout = ref(null);
const masterData = ref([]);
const detailData = ref([]);
const detailDataView = ref([]);
const totalAmountMaster = ref(0);
const isShowDialog = ref(false);
const isShowToastMessage = ref(false);
const actionOfDialog = ref("delete");
const messageDialog = ref("");
const isResize = ref(false);
const arrayChecked = ref([]);
const isDisabledDropdown = ref(true);
const isCheckAll = ref(false);
const isShowDetail = ref(false);
const modePaymentDetail = ref("view");
const paymentDetailIdClick = ref("");
const supplierClick = ref("");
const supplierId = ref("");
const arrayCheckedString = ref("");

//#endregion

//#region  Function

const handleOpenPaymentDetail = (id, supId) => {
  modePaymentDetail.value = "view";
  paymentDetailIdClick.value = id;

  isShowDetail.value = true;
  supplierId.value = supId;
};

const exportExcel = async () => {
  await axios
    .post("https://localhost:44339/api/v1/Payment/export-excel-id", {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(arrayChecked.value.join(",")),
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(console);
    });
};

const closePopupDetail = () => {
  console.log("close popup");
  isShowDetail.value = false;
  getData(
    resource.RECORD_PER_PAGE[defaultPageIndexMaster.value].value,
    currentPage.value
  );
};
/**
 * Theo dõi  để thực hiện phân trang
 *
 *
 * @author TQHUNG (06/06/2023)
 */

watch(defaultPageIndexMaster, () => {
  currentPage.value = 1;
  getData(
    resource.RECORD_PER_PAGE[defaultPageIndexMaster.value].value,
    1,
    searchInput.value
  );
});
watch(currentPage, () =>
  getData(
    resource.RECORD_PER_PAGE[defaultPageIndexMaster.value].value,
    currentPage.value,
    searchInput.value
  )
);

// Phân trang detail
const recordPerpage = ref(0);
watch(defaultPageIndexDetail, (newValue) => {
  console.log(newValue);
  currentPageDetail.value = 1;
  // Phân theo sô bản ghi trêe trang
  recordPerpage.value = resource.RECORD_PER_PAGE.filter(
    (x) => x.id === newValue
  )[0].value;
  totalPageDetails.value = Math.ceil(
    totalRecordPaymentDetail.value / recordPerpage.value
  );
  console.log(recordPerpage.value);

  detailDataView.value = detailData.value.slice(0, recordPerpage.value);

  console.log(detailDataView.value);
});

watch(currentPageDetail, (newValue) => {
  console.log(newValue);
  // Phân theo page index
  console.log(newValue);
  detailDataView.value = detailData.value.slice(
    recordPerpage.value * (newValue - 1),
    recordPerpage.value * newValue
  );
});

/**
 * Hàm gọi lấy dữ liệu
 *
 * @author TQHUNG (06/06/2023)
 */
const getData = async (pageSize, pageIndex, search = "") => {
  var api;
  if (search) {
    api = `https://localhost:44339/api/v1/Payment/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchKeyword=${search.trim()}`;
  } else {
    api = `https://localhost:44339/api/v1/Payment/search_no_keyword?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  }
  isShowLoading.value = true;
  await axios.get(api).then((response) => {
    isShowLoading.value = false;
    // console.log(response.data);
    masterData.value = response.data.records;
    // console.log(response.data);

    totalRecordPayment.value = response.data.records[0].total;
    totalAmountMaster.value = response.data.records[0].sum_moneys;

    // console.log(totalAmountMaster.value);

    totalPageMasters.value = Math.ceil(totalRecordPayment.value / pageSize);
    // console.log(totalPageMasters.value);
    paymentIdClick.value = masterData.value[0].refid;
    bindingDetail(masterData.value[0].refid);
  });
};

/**
 * Hàm gọi lấy tất cả dữ liệu tài khoản để binding details table
 *
 * @author TQHUNG (06/06/2023)
 */
const getAllAccounts = async () => {
  axios
    .get("https://localhost:44339/api/v1/Account")
    .then((response) => {
      allAccounts.value = response.data;
      // console.log(allAccounts.value);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Chạy khi components mounted
 *
 * @author TQHUNG (06/06/2023)
 */
onMounted(() => {
  getData(
    defaultPageSizeMaster.value,
    defaultPageIndexMaster.value,
    searchInput.value
  );
  getAllAccounts();
});

const reloadPage = () => {
  getData(
    defaultPageSizeMaster.value,
    defaultPageIndexMaster.value,
    searchInput.value
  );
};

/**
 * Khi click vào dòng nào thì binding tương ứng details
 *
 * @author TQHUNG (06/06/2023)
 */
const bindingDetail = (refid) => {
  // isShowLoading.value = true;
  paymentIdClick.value = refid;

  // call thông tin theo refid
  axios
    .get(`https://localhost:44339/api/v1/PaymentDetail/${refid}`)

    .then((response) => {
      // isShowLoading.value = false;

      detailDataView.value = response.data;
      detailData.value = response.data;
      totalRecordPaymentDetail.value = detailData.value.length;
      // console.log(detailData.value);

      recordPerpage.value = resource.RECORD_PER_PAGE.filter(
        (x) => x.id === defaultPageIndexDetail.value
      )[0].value;
      console.log(recordPerpage.value);

      totalPageDetails.value = Math.ceil(
        totalRecordPaymentDetail.value / recordPerpage.value
      );
    });
};

/**
 * Mở combox box chức năng
 *
 * @author TQHUNG (06/06/2023)
 */
const openOptionList = (event, payment) => {
  paymentDetailIdClick.value = payment.refid;
  supplierClick.value = payment.supplier_id;

  let heightContent = 165;

  isShowOptionList.value = !isShowOptionList.value;

  if (window.innerHeight - event.clientY < heightContent) {
    posOptionY.value = event.clientY - 15 - 170;
  } else {
    posOptionY.value = event.clientY + 15;
  }
};

/**
 * Hàm mở popup với mode sửa
 *
 * @author TQHUNG (06/06/2023)
 */

const clickEditAction = () => {
  isShowDetail.value = true;
  modePaymentDetail.value = "edit";
};

/**
 * Hàm click outside
 *
 * @author TQHUNG (06/06/2023)
 */
const clickOutSide = (e) => {
  if (
    !e.target.classList.contains("option-item") &&
    !e.target.classList.contains("option-list") &&
    !e.target.classList.contains("edit-select-option") &&
    !e.target.classList.contains("edit-select-icon")
  ) {
    isShowOptionList.value = false;
  }
};
/**
 * Theo dõi biến để add sự kiện click outside
 *
 * @author TQHUNG (06/06/2023)
 */
watch(isShowOptionList, () => {
  if (isShowOptionList.value) {
    document.addEventListener("click", clickOutSide);
  } else {
    document.removeEventListener("click", clickOutSide);
  }
});

/**
 * Bắt sự kiện thay đổi trên input để search
 *
 * @author TQHUNG (16/06/2023)
 */
const changeInput = () => {
  // modeExtend.value = false;

  if (timeout.value) {
    clearTimeout(timeout.value);
  }

  timeout.value = setTimeout(() => {
    //Gọi đến hàm call API sau 1s
    currentPage.value = 1;
    // getData()
    getData(
      defaultPageSizeMaster.value,
      defaultPageIndexMaster.value,
      searchInput.value
    );
  }, 1000);
};

/**
 * Hàm xoá 1 payment trên giao diện (hiện dialog cảnh báo xoá)
 *
 * @author TQHUNG (10/06/2023)
 */
const deletePayment = (id) => {
  let payment = masterData.value.filter((p) => p.refid === id)[0];
  isShowDialog.value = true;
  messageDialog.value = `Bạn có muốn xoá chứng từ <${payment.refno_finance}> không?`;
};

/**
 * Hàm xác nhận xoá
 *
 * @author TQHUNG (06/06/2023)
 */
const confirmDeleteAccount = async (id) => {
  isShowLoading.value = true;

  await axios
    .delete(`https://localhost:44339/api/v1/Payment/${id}`)
    .then((response) => {
      isShowLoading.value = false;
      isShowDialog.value = false;
      isShowToastMessage.value = true;
      setTimeout(() => {
        isShowToastMessage.value = false;
      }, 2000);
      masterData.value = masterData.value.filter((data) => data.refid !== id);
      totalRecordPayment.value = totalRecordPayment.value - 1;
      // totalRecordPayment.value = masterData.value.length;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * thay đổi độ dài của master detail
 *
 * @author TQHUNG (16/06/2023)
 */
const resizeDetail = () => {
  isResize.value = !isResize.value;
  if (isResize.value) {
    // heightMaster.value = "calc(100% - 15px)";
    // heightDetail.value = `calc(100% - ${heightMaster.value})`;
    heightMaster.value = "calc(100vh - 104px)";
    heightDetail.value = `calc(100% - ${heightMaster.value})`;
  } else {
    heightMaster.value = "60%";
    heightDetail.value = "40%";
  }
};

/**
 * Hàm xoá nhiều (hiện dialog cảnh báo)
 *
 * @author TQHUNG (06/06/2023)
 */
const deleteMultiPayment = () => {
  isShowDialog.value = true;
  actionOfDialog.value = "delete-multiple";
  messageDialog.value = `Bạn có muốn xoá những chứng từ này không?`;
};

/**
 * Hàm xác nhận xoá nhiều
 *
 * @author TQHUNG (06/06/2023)
 */
const confirmDeleteAccountMultiple = async () => {
  isShowLoading.value = true;

  isShowDialog.value = false;
  await axios
    .delete("https://localhost:44339/api/v1/Payment/delete-multi", {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(arrayChecked.value.join(",")),
    })
    .then((response) => {
      console.log(response);
      isShowLoading.value = false;
      isShowToastMessage.value = true;
      setTimeout(() => {
        isShowToastMessage.value = false;
      }, 2000);

      for (let index = 0; index < arrayChecked.value.length; index++) {
        masterData.value = masterData.value.filter(
          (data) => data.refid !== arrayChecked.value[index]
        );
        // --totalRecordPayment.value;
      }
      totalRecordPayment.value =
        totalRecordPayment.value - arrayChecked.value.length;

      arrayChecked.value = [];

      isDisabledDropdown.value = true;

      reloadPage();
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Theo dõi mảng được check để cập nhật biến isCheckAll
 *
 * @author TQHUNG (06/06/2023)
 */
watch(
  arrayChecked,
  (newArr, prevArr) => {
    // console.log(newArr);
    arrayCheckedString.value = arrayChecked.value.join(",");
    if (newArr.length >= 2) {
      isDisabledDropdown.value = false;
    }
    if (
      enums.IS_INCLUDES(
        newArr,
        masterData.value.map((payment) => payment.refid)
      )
    ) {
      isCheckAll.value = true;
    } else {
      isCheckAll.value = false;
    }
    if (newArr.length === 0) {
      console.log("Không tích");
      isDisabledDropdown.value = true;
    }
  },
  { deep: true }
);

/**
 * Khi thay đổi trang thì update lại biến isCheckAll
 *
 * @author TQHUNG (06/06/2023)
 */
watch(
  masterData,
  (newArr, oldArr) => {
    if (
      enums.IS_INCLUDES(
        arrayChecked.value,
        newArr.map((payment) => payment.refid)
      )
    ) {
      isCheckAll.value = true;
    } else {
      isCheckAll.value = false;
    }
  },
  { deep: true }
);

/**
 * Chọn tất cả payment trên grid
 *
 * @author TQHUNG (06/06/2023)
 */
const selectAllPayment = () => {
  // console.log(arrayChecked.value);
  // check all
  if (isCheckAll.value) {
    let paymentId = masterData.value.map((payment) => payment.refid);

    for (let index = 0; index < paymentId.length; index++) {
      if (!arrayChecked.value.includes(paymentId[index])) {
        arrayChecked.value.push(paymentId[index]);
      }
    }
  } else {
    unCheckAll();
  }
};

/**
 * Bỏ tất cả payment trên grid
 *
 * @author TQHUNG (06/06/2023)
 */
const unCheckAll = () => {
  isCheckAll.value = false;

  let paymentId = masterData.value.map((payment) => payment.refid);
  // console.log(paymentId)
  for (let index = 0; index < paymentId.length; index++) {
    arrayChecked.value = arrayChecked.value.filter(
      (item) => item !== paymentId[index]
    );
  }
};

//resize

const isResizing = ref(false);
const initialY = ref(0);
const initialHeightMaster = ref("");
const initialHeightDetail = ref("");

const startResize = (event) => {
  isResizing.value = true;
  initialY.value = event.clientY;
  initialHeightMaster.value = heightMaster.value;
  initialHeightDetail.value = heightDetail.value;

  window.addEventListener("mousemove", resizeLayout);
  window.addEventListener("mouseup", stopResize);
};

const resizeLayout = (event) => {
  if (!isResizing.value) return;

  const deltaY = event.clientY - initialY.value;
  heightMaster.value = `calc(${initialHeightMaster.value} + ${deltaY}px)`;
  heightDetail.value = `calc(${initialHeightDetail.value} - ${deltaY}px)`;
};

const stopResize = () => {
  isResizing.value = false;

  window.removeEventListener("mousemove", resizeLayout);
  window.removeEventListener("mouseup", stopResize);
};

//#endregion
</script>

<style scoped>
@import url("@/css/payment-container.css");
</style>
