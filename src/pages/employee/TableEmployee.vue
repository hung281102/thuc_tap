<template>
  <div class="container-content" :class="{ 'mini-sidebar': receivedValue }">
    <div class="container-content-header">
      <div class="heading">
        <h2>{{ resource.HEADER_TABLE }}</h2>
      </div>
      <div class="header-action">
        <!-- click mở form -->
        <div class="" @click="openForm">
          <BaseButton
            type="m-btn"
            :title="resource.BUTTON.title.add"
          ></BaseButton>
        </div>
      </div>
    </div>

    <div class="container-content-body">
      <div class="container-table-data">
        <div class="container-table-data_header">
          <div class="search-on-list">
            <div class="input-group">
              <span class="action">
                <div class="action-icon"></div>
              </span>
              <input
                type="text"
                id="input"
                class="input"
                placeholder="Tìm kiếm nhân viên"
                v-model="searchInput"
                @input="changeInput"
              />
            </div>

            <!-- Hiện lên khi có click vào checkbox -->

            <div class="action-checked" v-show="arrayChecked.length > 0">
              <span
                >Đã chọn tất cả: <b>{{ arrayChecked.length }}</b></span
              >
              <BaseButton
                class="unchecked"
                :title="resource.BUTTON.title.unchecked"
                @click="unCheckAll"
              ></BaseButton>
              <BaseButton
                type="sub-btn"
                :title="resource.BUTTON.title.deleteAll"
                @click="deleteAllChecked"
              ></BaseButton>
              <BaseDialog
                :title="resource.DIALOG_MESSAGE.title_del"
                :description="resource.DIALOG_MESSAGE.message_dels"
                :button1="resource.DIALOG_MESSAGE.actions.cancel"
                :button2="resource.DIALOG_MESSAGE.actions.confirm"
                :isShow="isShowDialogDelAll"
                @closeDialog="($event) => (isShowDialogDelAll = false)"
                @deleteEmployee="deleteAllEmployeeChecked()"
                mode="delete"
              ></BaseDialog>
            </div>
          </div>
          <!-- Nhóm nút + input bên phải bảng (select + filter + setting column) -->
          <div class="group-table-header-right">
            <div class="combo-box-container">
              <input
                type="text"
                name=""
                id=""
                placeholder="Chọn công ty"
                disabled
              />
              <span class="show-option">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ionicon"
                  viewBox="0 0 512 512"
                  width="20"
                  height="20"
                >
                  <title>Chevron Down</title>
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="48"
                    d="M112 184l144 144 144-144"
                  />
                </svg>
              </span>
              <div class="parent-option hidden">
                <div class="option">
                  <div class="option-item disable">
                    <span>-Chọn giá trị-</span>
                    <span class="check"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <defs></defs>
                        <rect
                          class="a"
                          width="24"
                          height="24"
                          style="fill: #50b83c; opacity: 0"
                        />
                        <path
                          class="b"
                          style="fill: #50b83c"
                          d="M9.86,18a1,1,0,0,1-.73-.32L4.27,12.51a1,1,0,1,1,1.46-1.37l4.12,4.39,8.41-9.2a1,1,0,1,1,1.48,1.34l-9.14,10a1,1,0,0,1-.73.33Z"
                        /></svg
                    ></span>
                  </div>
                  <div class="option-item">
                    <span>Hà Nội</span>
                  </div>
                  <div class="option-item">
                    <span>Hà Nội</span>
                  </div>
                </div>
              </div>
            </div>

            <Tippy content="Xuất Excel" placement="top">
              <a
                :href="`${resource.BASE_API}export-excel?query=${searchInput}`"
                class="export-excel"
                style="display: block"
              ></a>
            </Tippy>

            <Tippy content="Lấy lại dữ liệu " placement="top">
              <div class="reload" @click="reloadPage"></div>
            </Tippy>
          </div>
        </div>

        <div class="container-table-data_body">
          <table class="table-employee" id="my-table">
            <thead>
              <tr
                @mousedown="startResizing"
                @mousemove="resizing"
                @mouseup="endResizing"
              >
                <th>
                  <div class="column-header">
                    <div class="checkbox">
                      <input
                        type="checkbox"
                        class=""
                        @change="selectAllEmployee"
                        v-model="isCheck"
                      />
                    </div>
                  </div>
                </th>
                <th style="min-width: 150px">
                  <div class="column-header text-left">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.employeeCode }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th style="min-width: 200px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.fullName }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th style="min-width: 160px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.gender }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th class="column-date" style="min-width: 150px">
                  <div class="column-header text-center">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.dateOfBirth }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th style="min-width: 160px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.phoneNumber }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th style="min-width: 300px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.email.label }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>

                <th style="min-width: 300px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.address }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th style="min-width: 200px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.departmentName }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>

                <th style="min-width: 200px">
                  <div class="column-header text-right">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.salary }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th style="min-width: 180px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.bankAccount }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th style="min-width: 180px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.bankName }}
                    </div>
                  </div>
                  <div class="resize-column"></div>
                </th>
                <th style="min-width: 180px">
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.bankPlace }}
                    </div>
                  </div>
                </th>
                <!-- <th>
                  <div class="column-header">
                    <div class="name-column">
                      {{ resource.TABLE_COLUMNS.functions }}
                    </div>
                  </div>
                </th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="employee in employees"
                :key="employee.employeeId"
                @dblclick="
                  updateEmployee(employee.employeeId, employee.employeeCode)
                "
                :class="{
                  ' tr-select': arrayChecked.includes(employee.employeeId),
                }"
                class="row"
              >
                <td @dblclick="(e) => e.stopPropagation()">
                  <div class="checkbox">
                    <input
                      type="checkbox"
                      v-model="arrayChecked"
                      :value="employee.employeeId"
                      @click="selectEmployee(employee.employeeId)"
                    />
                    <div class="group-icon">
                      <div class="group-function">
                        <Tippy content="Xoá" placement="top">
                          <div
                            class="delete-box"
                            @click="
                              deleteEmployee(
                                employee.employeeId,
                                employee.employeeCode
                              )
                            "
                          >
                            <div></div>
                          </div>
                        </Tippy>
                        <Tippy content="Chỉnh sửa" placement="top">
                          <div
                            class="edit-box"
                            @click="
                              updateEmployee(
                                employee.employeeId,
                                employee.employeeCode
                              )
                            "
                          >
                            <div></div>
                          </div>
                        </Tippy>
                        <Tippy content="Nhân bản" placement="top">
                          <div
                            class="double-box"
                            @click="duplicateEmployee(employee.employeeId)"
                          >
                            <div></div>
                          </div>
                        </Tippy>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ employee.employeeCode }}</td>
                <td>{{ employee.fullName }}</td>
                <td>
                  {{ enums.GENDER[employee.gender] }}
                </td>
                <td class="column-date">
                  {{
                    enums.FORMAT_DATE(
                      employee.dateOfBirth,
                      resource.FORMAT_DATE.day_month_year
                    )
                  }}
                </td>
                <td>
                  {{ employee.phoneNumber }}
                </td>
                <td>
                  {{ employee.email }}
                </td>
                <td>
                  {{ employee.address }}
                </td>
                <td>
                  {{ employee.departmentName }}
                </td>
                <td class="column-salary">
                  {{ enums.FORMAT_MONEY_2(Math.floor(employee.salary)) }}
                </td>

                <td>
                  {{ employee.bankAccount }}
                </td>
                <td>
                  {{ employee.bankName }}
                </td>
                <td>
                  {{ employee.bankPlace }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panigation">
          <div class="panigation-bar">
            <div class="sum-record">
              Tổng số:
              <span>{{
                Number(sumRecord)
                  .toFixed(0)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }}</span>
              bản ghi
            </div>

            <div class="record-in-page">
              <span>Số bản ghi/ trang</span>
              <div class="number-record-page" ref="record">
                <input
                  type="text"
                  name=""
                  id=""
                  :value="defaultPageSize"
                  :v-model="defaultPageSize"
                  readonly
                  @click="showOptionPageSize"
                />

                <span class="show-option" @click="showOptionPageSize">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="ionicon"
                    viewBox="0 0 512 512"
                    width="16"
                    height="16"
                  >
                    <title>Chevron Down</title>
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="48"
                      d="M112 184l144 144 144-144"
                    />
                  </svg>
                </span>
                <div class="parent-option" v-show="isShowOptionPageSize">
                  <div class="option">
                    <div
                      class="option-item"
                      v-for="record of enums.RECORD_PER_PAGE"
                      :key="record"
                      @click="selectRecord(record)"
                    >
                      <span>{{ record }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="value-range-record">
              <b>{{ (defaultPageIndex - 1) * defaultPageSize + 1 }}</b>
              -
              <b>{{
                defaultPageIndex === maxPageIndex
                  ? sumRecord
                  : (defaultPageIndex - 1) * defaultPageSize + defaultPageSize
              }}</b>
              <span>bản ghi</span>
            </div>

            <div class="control-page">
              <div @click="prevPage" :class="{ ' disable': disablePrevBtn }">
                <Tippy content="Lùi" placement="top">
                  <div
                    class="prev-page"
                    :class="{ ' disable': disablePrevBtn }"
                  ></div>
                </Tippy>
              </div>

              <div @click="nextPage" :class="{ ' disable': disableNextBtn }">
                <Tippy content="Tiến" placement="top">
                  <div class="next-page"></div>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
        <BaseLoading v-show="isLoading" />
      </div>
    </div>
  </div>

  <FormEmployee
    v-if="isShowForm"
    :mode="enums.FORM_MODE.add"
    @closeForm="($event) => (isShowForm = false)"
    :isShow="isShowForm"
    :loadingData="loadingData"
    :pageIndex="defaultPageIndex"
    :pageSize="defaultPageSize"
  />

  <FormEmployee
    v-if="isShowFormUpdate"
    :mode="enums.FORM_MODE.edit"
    :employeeId="employeeId"
    @closeForm="($event) => (isShowFormUpdate = false)"
    :isShow="isShowFormUpdate"
    :loadingData="loadingData"
    :pageIndex="defaultPageIndex"
    :pageSize="defaultPageSize"
  />
  <FormEmployee
    v-if="isShowFormDuplicate"
    :mode="enums.FORM_MODE.duplicate"
    :employeeId="employeeId"
    @closeForm="($event) => (isShowFormDuplicate = false)"
    :isShow="isShowFormDuplicate"
    :loadingData="loadingData"
    :pageIndex="defaultPageIndex"
    :pageSize="defaultPageSize"
  />

  <BaseDialog
    :title="resource.DIALOG_MESSAGE.title_del"
    :description="resource.DIALOG_MESSAGE.message_del"
    :button1="resource.DIALOG_MESSAGE.actions.cancel"
    :button2="resource.DIALOG_MESSAGE.actions.confirm"
    :isShow="isShowDialog"
    @closeDialog="($event) => (isShowDialog = false)"
    @deleteEmployee="acceptDeleteFunc(employeeIdDel)"
    :employeeIdDel="employeeIdDel"
    :employeeCode="employeeCode"
    mode="delete"
  />
  <BaseToastMessage
    :result="resource.TOAST_MESSAGE.actions.delete"
    :state="resource.TOAST_MESSAGE.state.success"
    :isShow="isShowToastMessageDel"
    iconState="success"
  />

  <BaseDialogError
    :isShow="isShowDialogError"
    :description="resource.Error"
    button1="Đóng"
    @closeDialog="() => (isShowDialogError = !isShowDialogError)"
  ></BaseDialogError>
</template>

<script>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import axios from "axios";
import enums from "@/helpers/enum";
import resource from "@/helpers/resource";
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import { onClickOutside } from "@vueuse/core";

import FormEmployee from "@/components/form/FormEmployee.vue";
import BaseLoading from "@/components/loading/BaseLoading.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import BaseDialog from "@/components/dialog/BaseDialog.vue";
import BaseToastMessage from "@/components/toast/BaseToastMessage.vue";
import BaseDialogError from "@/components/dialog/BaseDialogError.vue";

export default {
  name: "TableEmployee",
  components: {
    BaseLoading,
    BaseToastMessage,
    BaseDialog,
    BaseButton,
    FormEmployee,
    Tippy,
    BaseDialogError,
  },
  methods: {},

  data() {
    return {
      enums: { ...enums },
      resource: { ...resource },
    };
  },

  props: ["receivedValue"],

  setup(props, context) {
    // Người viết: Trần Quang Hưng
    // Ngày viết: 28/03/2023
    // Khởi tạo biến cần thiết

    //#region Khởi tạo biến
    const employees = ref([]);
    const employeeId = ref("");
    const isLoading = ref(false);
    const isShowForm = ref(false);
    const isShowToastMessageDel = ref(false);
    const isShowDialog = ref(false);
    const isShowFormUpdate = ref(false);
    const isShowFormDuplicate = ref(false);
    const employeeIdDel = ref("");
    const employeeCode = ref("");

    const employeeUpdateCode = ref("");
    const isCheck = ref(false);
    const isShowDialogDelAll = ref(false);
    const defaultPageIndex = ref(1);
    const defaultPageSize = ref(10);
    const isShowOptionPageSize = ref(false);
    const isCheckFull = ref(false);
    const disablePrevBtn = ref(false);
    const disableNextBtn = ref(false);
    const isShowDialogError = ref(false);

    // Khai báo ra 1 mảng để lưu giá trị (value) những nhân viên được check
    var arrayChecked = ref([]);
    //#endregion

    //#region  Method
    /*
        Người viết:  Trần Quang Hưng
        Ngày viết: 28/03/2023
    */
    // xoá tất cả
    // Hàm hiện dialog hỏi người dùng có chắc chắn xoá hết những user được checked không
    const deleteAllChecked = () => {
      // show dialog cảnh báo xoá hàng loạt
      isShowDialogDelAll.value = true;
    };

    // Hàm check tất cả bản ghi
    const selectAllEmployee = () => {
      // console.log(isCheckFull.value);

      if (isCheck.value) {
        // Map để lấy hết id của nhân viên trên bảng
        let employeeId = employees.value.map((employee) => employee.employeeId);

        for (let index = 0; index < employeeId.length; index++) {
          if (!arrayChecked.value.includes(employeeId[index])) {
            arrayChecked.value.push(employeeId[index]);
          }
        }
      } else {
        unCheckAll();
      }
    };
    const selectEmployee = (id) => {
      console.log(id);
    };

    // Theo dõi mảng các nhân viên được chẹck
    // Kiểm tra nếu tất cả nhân viên được chọn thì dấu checkall sẽ đụọc check
    // Người viết: Trần Quang Hưng
    // Ngày viết: 10/04/2023
    // Tên hàm: Cất nhân viên
    watch(
      arrayChecked,
      (arrayChecked, prevArr) => {
        if (
          enums.IS_INCLUDES(
            arrayChecked,
            employees.value.map((employee) => employee.employeeId)
          )
        ) {
          isCheck.value = true;
        } else {
          isCheck.value = false;
        }
      },
      { deep: true }
    );

    // Theo dõi chỉ số trang để disable button next, prev
    // Người viết: Trần Quang Hưng
    // Ngày viết: 10/04/2023
    watch(defaultPageIndex, (defaultPageIndex, prevIndex) => {
      if (defaultPageIndex === 1) {
        disablePrevBtn.value = true;
      } else if (defaultPageIndex > 1) {
        disablePrevBtn.value = false;
      } else if (defaultPageIndex === maxPageIndex.value) {
        disableNextBtn.value = true;
      } else if (defaultPageIndex < maxPageIndex.value) {
        disableNextBtn.value = false;
      }
    });

    /**
     * Người viết: Trần Quang Hưng
     * Ngày viết: 4/4/2023
     * Hàm xoá nhiều nhân viên
     */
    // Hàm xoá tất cả những nhân viên được checked
    const deleteAllEmployeeChecked = async () => {
      const array = [...arrayChecked.value];
      // Khi người dùng click button "xoá" thì ẩn dialog và tiến hành call API xoá
      isShowDialogDelAll.value = false;

      //Call API xoá (dữ liệu gửi đi là 1 mảng cái id nhân viên yêu cầu xoá)
      await axios
        .delete(
          `${resource.BASE_API}delete-multy`,

          {
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(array),
          }
        )
        .then((response) => {
          isLoading.value = true;

          // Nếu xoá thành công
          if (response.status === 200) {
            isLoading.value = false;

            // Hiện ta message thông báo xoá thành công ở góc phải dưới màn hình
            isShowToastMessageDel.value = true;

            // Hiện trong 1.5s sau đó lại ẩn đi
            setTimeout(() => {
              isShowToastMessageDel.value = false;
            }, 1500);

            //reset input
            searchInput.value = "";

            //Loading lại dữ liệu

            loadingData(defaultPageIndex.value, defaultPageSize.value);
          }
        })
        .catch((err) => {
          console.log(err);
          isShowDialogError.value = true;
        });

      // Sau khi xoá hết những nhân viên được check thì trả lại giao diện như ban đâuf (Không có nhân viên nào được check)
      isLoading.value = false;
      arrayChecked.value = [];
    };

    //Hàm bỏ check tất cả các nhân viên trên trang
    const unCheckAll = () => {
      isCheck.value = false;

      const employeeIds = employees.value.map(
        (employee) => employee.employeeId
      );

      for (let index = 0; index < employeeIds.length; index++) {
        arrayChecked.value = arrayChecked.value.filter(
          (item) => item !== employeeIds[index]
        );
      }
    };

    // Hàm hiển thị form
    const openForm = () => {
      isShowForm.value = !isShowForm.value;
    };

    // Hiện hiện loading khi call dữ liệu
    onBeforeMount(() => {
      isLoading.value = true;
    });

    // Call API lấy thông tin nhân viên
    onMounted(() => {
      loadingData(defaultPageIndex.value, defaultPageSize.value);
    });

    // Hàm call API về theo tham số ban đầu(Không có search)
    const loadingData = async (pageIndex, pageSize) => {
      isLoading.value = true;
      let response = await axios
        .get(
          `${resource.BASE_API}paging?pageIndex=${pageIndex}&pageSize=${pageSize}`
        )
        .then((response) => {
          if (response.data.employee.length > 0) {
            employees.value = response.data.employee;
            sumRecord.value = response.data.total;

            // sumRecord.value = 10000;
            maxPageIndex.value =
              Math.floor(response.data.total / defaultPageSize.value) + 1;
          }
          isLoading.value = false;

          if (
            enums.IS_INCLUDES(
              arrayChecked.value,
              employees.value.map((employee) => employee.employeeId)
            )
          ) {
            isCheck.value = true;
          } else {
            isCheck.value = false;
          }
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          isShowDialogError.value = true;
        });
    };

    // Hàm reload lại trang web khi thực hiện thêm nhân viên -> gán cho button reload để người dùng reload lại trang sau khi thêm nhân viên
    const reloadPage = () => {
      loadingData(defaultPageIndex.value, defaultPageSize.value);
    };

    // Hàm xoá nhân viên hiện ra dialog cảnh báo xoá nhân viên để người dùng xác nhận
    const deleteEmployee = async (id, code) => {
      isShowDialog.value = true;
      employeeIdDel.value = id;
      employeeCode.value = code;
    };

    /*
        Người viết:  Trần Quang Hưng
        Ngày viết: 28/03/2023
    */
    //Hàm thưc hiện call API xoá nhân viên khi người dùng confirm xoá
    const acceptDeleteFunc = (id) => {
      isLoading.value = true;
      axios
        .delete(`${resource.BASE_API}${id}`)

        // Không xoá được thì sẽ bắn ra lỗi ở màn hình console log
        .then((response) => {
          isLoading.value = false;
          // Khi xoá thành công
          // Ẩn dialog cảnh báo xoá
          isShowDialog.value = false;

          // Hiện ta message thông báo xoá thành công ở góc phải dưới màn hình
          isShowToastMessageDel.value = true;

          //Ẩn thông báo sau 2s
          setTimeout(() => {
            isShowToastMessageDel.value = false;
          }, 2000);

          employees.value = employees.value.filter(
            (employee) => employee.employeeId !== id
          );

          // console.log(arrayChecked.value);
          if (arrayChecked.value.includes(id)) {
            arrayChecked.value = arrayChecked.value.filter(
              (item) => item !== id
            );
          }

          // reset input
          searchInput.value = "";

          //Xoá xong call lại api giao diện
          defaultPageIndex.value = 1;
          loadingData(defaultPageIndex.value, defaultPageSize.value);
        })
        .catch((e) => {
          console.log(e);
          isShowDialogError.value = true;
        });
    };

    // Sửa nhân viên
    // Lấy id và truyển id của nhân viên xuống form sửa nhân viên để render dữ liệu của nhân viên ra form
    const updateEmployee = async (id, code) => {
      isShowFormUpdate.value = true;
      employeeId.value = id;
      employeeUpdateCode.value = code;
    };

    // Nhân bản nhân viên
    const duplicateEmployee = (id) => {
      isShowFormDuplicate.value = true;
      employeeId.value = id;
    };

    // Tên:  Phân trang
    /**
     * Chức năng: phân trang
     * người viết:  TQHUNG
     * Ngày: 19/4/2023
     */
    // Khai báo các biến cần dùng
    var sumRecord = ref(0);
    var maxPageIndex = ref(1);

    // Hàm mở đóng dropdown chọn số bản ghi trên bảng
    const showOptionPageSize = () => {
      isShowOptionPageSize.value = !isShowOptionPageSize.value;
    };

    /*
      Khối code xử lý search
      người viết: TQHUNG
      Ngày viết:  19/04/2023
    */

    var searchInput = ref("");
    const timeout = ref(null);

    // Hàm call API khi gõ input
    const searchQuery = async (pageIndex, pageSize, keyWord) => {
      if (searchInput.value !== "") {
        console.log(searchInput.value);
        await axios
          .get(
            `${resource.BASE_API}pagination-search?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyWord}`
          )
          .then((response) => {
            employees.value = response.data.employee;
            sumRecord.value = response.data.total;

            maxPageIndex.value =
              Math.floor(response.data.total / defaultPageSize.value) + 1;
            console.log(maxPageIndex.value);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        loadingData(defaultPageIndex.value, defaultPageSize.value);
      }
    };

    // Hàm bắt sự kiện khi nhập input
    const changeInput = () => {
      // debounce
      if (timeout.value) {
        clearTimeout(timeout.value);
      }

      timeout.value = setTimeout(() => {
        //Gọi đến hàm call APiI sau 1s
        defaultPageIndex.value = 1;
        searchQuery(
          defaultPageIndex.value,
          defaultPageSize.value,
          searchInput.value
        );
      }, 1000);
    };

    // Hàm chọn số bản ghi hiển thị trên grid
    const selectRecord = (num) => {
      isShowOptionPageSize.value = false;
      defaultPageSize.value = num;
      defaultPageIndex.value = 1;
      maxPageIndex.value =
        Math.floor(employees.value.length / defaultPageSize.value) + 1;
      loadingData(defaultPageIndex.value, defaultPageSize.value);
    };

    // Hàm lùi 1 trang
    const prevPage = () => {
      // Khi người dùng không search
      if (searchInput.value === "") {
        console.log(defaultPageIndex.value);

        if (defaultPageIndex.value > 1) {
          disablePrevBtn.value = false;
          disableNextBtn.value = false;
          --defaultPageIndex.value;

          loadingData(defaultPageIndex.value, defaultPageSize.value);
        } else if (defaultPageIndex.value === 1) {
          disablePrevBtn.value = true;
          return;
        }
      } else {
        // Khi người dùng searching
        if (defaultPageIndex.value > 1) {
          --defaultPageIndex.value;
          searchQuery(
            defaultPageIndex.value,
            defaultPageSize.value,
            searchInput.value
          );
        }
      }
    };

    // Hàm tiến 1 trang
    const nextPage = () => {
      // Khi người dùng không search
      if (searchInput.value === "") {
        if (defaultPageIndex.value < maxPageIndex.value) {
          disableNextBtn.value = false;
          ++defaultPageIndex.value;

          loadingData(defaultPageIndex.value, defaultPageSize.value);
        } else if ((defaultPageIndex.value = maxPageIndex.value)) {
          loadingData(defaultPageIndex.value, defaultPageSize.value);
          disableNextBtn.value = true;
        } else {
          disableNextBtn.value = false;

          return;
        }
      } else {
        //Khi người dùng searching
        if (defaultPageIndex.value < maxPageIndex.value) {
          ++defaultPageIndex.value;
          searchQuery(
            defaultPageIndex.value,
            defaultPageSize.value,
            searchInput.value
          );
        }
      }
    };

    /**
     * Tên: Khối code xử lý resize width column
     * Người viết: TQHUNG
     * Ngày: 24/04/2023
     */
    var clickedColumn = null;
    var startX = null;
    var startWidth = null;

    //mousedown
    const startResizing = (e) => {
      // Bắt đúng vào block resize thì xử lý
      if (e.target.matches(".resize-column")) {
        // Lấy ra cột để sau set lại chiều rộng
        clickedColumn = e.target.parentElement;
        // Lấy toạ độ chuột (trục hoành - ngang)
        startX = e.clientX;
        console.log(startX);
        // Chiều rộng ban đầu của cột
        startWidth = parseFloat(getComputedStyle(clickedColumn).width);
        console.log(startWidth);
      }
    };

    // mousemove
    const resizing = (e) => {
      if (clickedColumn) {
        // Tính toán chiều rộng mới của cột theo hành động kéo thả của chuột
        const width = startWidth + (e.clientX - startX);
        // Đặt lại chiều rộng của cột
        clickedColumn.style.minWidth = `${width}px`;
      }
    };
    // mouseup
    const endResizing = (e) => {
      clickedColumn = null;
      startX = null;
      startWidth = null;
    };

    // Tên hàm: Click outside
    // Người viết:Hưng
    // Ngày:
    const record = ref(null);
    onClickOutside(record, (event) => (isShowOptionPageSize.value = false));
    //#endregion

    // return biến ra ngoài để sử dụng
    return {
      employees,
      isLoading,
      deleteEmployee,
      openForm,
      isShowForm,
      reloadPage,
      isShowToastMessageDel,
      isShowDialog,
      updateEmployee,
      duplicateEmployee,
      isShowFormUpdate,
      isShowFormDuplicate,
      employeeId,
      employeeIdDel,
      employeeCode,
      acceptDeleteFunc,
      arrayChecked,
      deleteAllChecked,
      isShowDialogDelAll,
      deleteAllEmployeeChecked,
      unCheckAll,
      employeeUpdateCode,
      selectAllEmployee,
      isCheck,
      defaultPageIndex,
      defaultPageSize,
      showOptionPageSize,
      isShowOptionPageSize,
      selectRecord,
      nextPage,
      prevPage,
      sumRecord,
      maxPageIndex,
      searchInput,
      changeInput,
      isCheckFull,
      loadingData,
      selectEmployee,
      startResizing,
      resizing,
      endResizing,
      disablePrevBtn,
      disableNextBtn,
      record,
      isShowDialogError,
    };
  },
};
</script>

<style scoped>
@import url("@/css/table-employee.css");
</style>
