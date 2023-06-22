<template>
  <div class="container-content">
    <div class="container-content-header">
      <div class="heading">
        <h2>{{ resource.HEADER_TABLE_ACCOUNT }}</h2>
      </div>
    </div>
    <div class="container-content-body">
      <div class="container-table-data">
        <div class="container-table-data_header">
          <div class="search-on-list">
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
          </div>
          <div class="group-table-header-right">
            <!-- <BaseButton
              :title="titleHandleCollapseExtend"
              type="third-btn"
              @click="handleCollapseExtend"
            ></BaseButton> -->
            <a
              @click="handleCollapseExtend"
              style="color: #0075c0; font-size: 14px; cursor: pointer"
              >{{ titleHandleCollapseExtend }}</a
            >
            <Tippy content="Lấy lại dữ liệu " placement="top">
              <div class="reload" @click="reloadPage"></div>
            </Tippy>
            <BaseButtonMore
              text="Thêm"
              @click="handleOpenForm(enums.FORM_MODE.add)"
            ></BaseButtonMore>
          </div>
        </div>
        <div class="container-table-data_body">
          <table class="table-account" id="">
            <thead>
              <tr>
                <th>
                  <div class="name-column">Số tài khoản</div>
                  <div class="resize-column"></div>
                </th>
                <th>
                  <div class="name-column">Tên tài khoản</div>
                  <div class="resize-column"></div>
                </th>
                <th>
                  <div class="name-column">Tính chất</div>
                  <div class="resize-column"></div>
                </th>
                <th>
                  <div class="name-column">Tên tiếng anh</div>
                  <div class="resize-column"></div>
                </th>
                <th>
                  <div class="name-column">Diễn giải</div>
                  <div class="resize-column"></div>
                </th>
                <th style="width: 140px" class="state">
                  <div class="name-column">Trạng thái</div>
                  <div class="resize-column"></div>
                </th>
                <th style="width: 100px">
                  <div class="name-column">Chức năng</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(account, index) in dataAccount"
                :key="account.account_id"
                :class="{
                  ' text-bold have-child': account.is_parent,
                  'root-element': account.grade === 1,
                  ' clicked': idAccountClick === account.account_id,
                }"
                ref="rowTable"
                @click="clickRow(account.account_id)"
                @dblclick="handleOpenForm(enums.FORM_MODE.edit, account)"
              >
                <td :style="customStyle(account.grade)">
                  <div
                    class="column-first"
                    @dblclick="(e) => e.stopPropagation()"
                  >
                    <div
                      :class="{
                        ' show-more': account.is_parent,
                        ' click': isMinus,
                      }"
                      @click="
                        handleClick(
                          account.account_id,
                          $event,
                          account.misa_code_id
                        )
                      "
                      ref="iconElement"
                      v-if="account.is_parent"
                    ></div>

                    <div class="block" v-else></div>
                    {{ account.account_number }}
                  </div>
                </td>
                <td>{{ account.account_name }}</td>
                <td>
                  {{
                    enums.ACCOUNT_CATEGORY_KIND[account.account_category_kind]
                  }}
                </td>
                <td>{{ account.account_name_english }}</td>
                <td>{{ account.description }}</td>
                <td class="text-hide">{{ enums.STATE[account.state] }}</td>

                <td class="m-table-cell" @dblclick="(e) => e.stopPropagation()">
                  <div
                    class="edit-option"
                    @click="handleOpenForm(enums.FORM_MODE.edit, account)"
                  >
                    Sửa
                  </div>
                  <div
                    class="edit-select-option"
                    @click="openOptionList($event, account)"
                  >
                    <div class="edit-select-icon"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <div class="sum-of-record">
            <span>Tổng số: </span>
            <span class=""
              ><b>{{ totalRecord }}</b></span
            >
            <span class=""> bản ghi</span>
          </div>
          <div class="paging-block-right">
            <BaseComboBoxNormal
              :comboboxData="resource.RECORD_PER_PAGE"
              width="w-50"
              :isRequired="false"
              direction="top"
              v-model="recordPerPageId"
              style="margin-bottom: 5px"
            ></BaseComboBoxNormal>
            <BasePaging
              :totalRecord="totalRecordGrade1"
              :totalPage="totalPage"
              v-model="currentPage"
            >
            </BasePaging>
          </div>
        </div>
        <BaseLoading v-if="isShowLoading"></BaseLoading>
      </div>
    </div>
    <BaseDialogGD2
      v-if="isShowDialog"
      :action="actionOfDialog"
      :message="messageDialog"
      @closeDialog="isShowDialog = false"
      :data="accountClick"
      @acceptDelete="confirmDeleteAccount"
      @acceptUpdate="confirmUpdateState"
      @updateAlone="updateStateAlone"
    />
    <BaseDialogWarning
      :title="titleDialogWarning"
      :description="descriptionDialogWarning"
      :isShow="isShowDialogWar"
      @closeDialog="isShowDialogWar = false"
    ></BaseDialogWarning>
  </div>

  <FormAccount
    v-if="isShowAccountDetail"
    @closeDetailAccount="isShowAccountDetail = false"
    @reloadPage="reloadPage"
    :mode="modeForm"
    :data="dataAccountEdit"
    @changeModeToAdd="changeMode"
  />

  <teleport to="body">
    <ul
      class="option-list"
      :style="{ top: `${posOptionY}px`, right: '45px' }"
      v-show="isShowOptionList"
    >
      <li
        class="option-item"
        @click="handleOpenForm(enums.FORM_MODE.duplicate, accountClick)"
      >
        Nhân bản
      </li>
      <li class="option-item">Chuyển tài khoản hạch toán</li>
      <li class="option-item" @click="deleteAccount(accountClick)">Xóa</li>
      <li class="option-item" @click="toggleState(accountClick)">
        {{ accountClick.state === 1 ? "Ngưng sử dụng" : "Sử dụng" }}
      </li>
    </ul>
  </teleport>
</template>

<script setup>
import enums from "@/helpers/enum";
import resource from "@/helpers/resource";
import BaseButton from "@/components/button/BaseButton.vue";
import BaseButtonMore from "@/components/button/BaseButtonMore.vue";
import BasePaging from "@/components/paging/BasePaging.vue";
import BasePagingGD2 from "@/components/paging/BasePagingGD2.vue";
import BaseComboBoxNormal from "@/components/combo-box/BaseComboBoxNormal.vue";

import BaseCombobox from "@/components/dropdown/BaseCombobox.vue";
import BaseLoading from "@/components/loading/BaseLoading.vue";
import BaseDialogGD2 from "@/components/dialog/BaseDialogGD2.vue";
import BaseDialogWarning from "@/components/dialog/BaseDialogWarning.vue";
import { onClickOutside } from "@vueuse/core";

import FormAccount from "@/components/form/FormAccount.vue";
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import {
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  ref,
  watch,
} from "vue";
import axios from "axios";

//#region  Khai  báo biến dùng trong components
const recordPerPageId = ref(0);
const dataAccount = ref([]);
const currentPage = ref(1);
const totalRecord = ref(null);
const totalRecordGrade1 = ref(null);
const recordPerPage = ref(10);
const totalPage = ref(null);
const arrayIdAccount = ref([]);
var iconElement = ref(null);
const rowTable = ref(null);
const isShowOptionList = ref(false);
const posOptionY = ref(null);
const titleHandleCollapseExtend = ref("Mở rộng");
const modeExtend = ref(true);
const isShowAccountDetail = ref(false);
const accountClick = ref({});
const allAccounts = ref([]);
const isShowLoading = ref(false);
const idAccountClick = ref(null);
const accountDelete = ref(null);
const isHaveChild = ref(false);
const isShowDialog = ref(false);
const isShowDialogWar = ref(false);
const messageDialog = ref("");
const searchInput = ref(null);
const timeout = ref(null);
const modeForm = ref(null);
const dataAccountEdit = ref({});
const isMinus = ref(false);
const actionOfDialog = ref("");
const titleDialogWarning = ref("");
const descriptionDialogWarning = ref("");
//#endregion

//#region  Function sử dụng trong components
/**
 * Theo dõi recordPerPage và curentPage để thực hiện phân trang
 *
 * @author TQHUNG (28/05/2023)
 */
watch(currentPage, () => {
  getRecord(
    currentPage.value,
    resource.RECORD_PER_PAGE[recordPerPageId.value].value
  );
});

/**
 * Theo dõi biến recordPerPageId để chọn số bản ghi trên trang
 *
 * @author TQHUNG (28/05/2023)
 */

watch(
  recordPerPageId,
  (newValue) => {
    getRecord(1, resource.RECORD_PER_PAGE[newValue].value);
  },
  { deep: true }
);

/**
 * Call API lấy bản ghi theo mặc định ban đầu
 *
 * @author TQHUNG (28/05/2023)
 */
const getRecord = async (pageIndex, pageSize, keyWord = "") => {
  isShowLoading.value = true;
  await axios
    .get(
      `https://localhost:44339/api/v1/Account/paging?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyWord}`
    )
    .then((response) => {
      isShowLoading.value = false;
      dataAccount.value = response.data.response;

      totalRecordGrade1.value = response.data.totalRecordGrade1[0];

      totalRecord.value = response.data.totalRecord[0];

      totalPage.value = Math.ceil(totalRecordGrade1.value / pageSize);

      //refresh  lại trạng thái của button "mở rộng và thu hẹp"
      titleHandleCollapseExtend.value = "Mở rộng";
      modeExtend.value = true;
      isMinus.value = false;

      if (iconElement.value) {
        // console.log(iconElement.value);
        iconElement.value.forEach((item) => {
          if (item.classList.contains("click")) {
            item.classList.remove("click");
          }
        });
      }
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
onMounted(async () => {
  // console.log("Đây là accountlist");
  await getRecord(currentPage.value, recordPerPage.value);
  getAllAccount();
  // console.log(totalRecordGrade1.value);
});

/**
 * Đóng, mở tài khoản cha con
 *
 * @author TQHUNG (28/05/2023)
 */
const handleClick = async (id, event, code) => {
  // toggle icon và xử lý ần tài khoản con

  if (event.target.classList.contains("click")) {
    event.target.classList.remove("click");

    // xử lý ẩn các con -> remove khỏi mảng

    // lấy ra tất cả con của tài khoản click vào
    // lấy ra misa_code_id của tài khoản click vào
    let childrenAccount = dataAccount.value
      .filter((child) => child.misa_code_id.includes(code))
      .filter((item) => item.misa_code_id !== code);

    childrenAccount.forEach((child) => {
      dataAccount.value = dataAccount.value.filter(
        (acc) => acc.misa_code_id !== child.misa_code_id
      );
    });
  } else {
    event.target.classList.add("click");

    // Lấy ra grade của account click vào
    let grade = dataAccount.value.filter((acc) => acc.account_id === id)[0]
      .grade;

    let element = dataAccount.value.filter((acc) => acc.account_id === id)[0];

    let indexElement = dataAccount.value.indexOf(element);

    // call api gọi ấy cấp con
    await axios
      .get(
        `https://localhost:44339/api/v1/Account/show-more-record?recordId=${id}&grade=${
          grade + 1
        }`
      )
      .then((res) => {
        if (
          !enums.IS_INCLUDES(
            dataAccount.value.map((item) => item.account_id),
            res.data.response.map((item) => item.account_id)
          )
        ) {
          dataAccount.value.splice(
            indexElement + 1,
            0,
            ...res.data.response.sort(
              (a, b) => a.account_number - b.account_number
            )
          );
        } else {
          return;
        }
      });
  }
};

/**
 * Hàm xác nhận xoá đi một tài khoản nếu user chọn đồng ý xoá
 *
 * @author TQHUNG (28/05/2023)
 */
const confirmDeleteAccount = (data) => {
  isShowLoading.value = true;

  axios
    .delete(`https://localhost:44339/api/v1/Account/${data.account_id}`)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        isShowLoading.value = false;
        isShowDialog.value = false;
        dataAccount.value = dataAccount.value.filter(
          (acc) => acc.account_id !== data.account_id
        );

        getRecord(currentPage.value, recordPerPage.value);
      } else if (response.status === 201) {
        isShowLoading.value = false;
        isShowDialog.value = false;

        isShowDialogWar.value = true;
        titleDialogWarning.value = "Xoá không thành công";
        descriptionDialogWarning.value = response.data.userMessage;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
/**
 * Xử lý Account con thụt vào so với cha
 *
 * @author TQHUNG (28/05/2023)
 */
const customStyle = (num) => {
  return {
    paddingLeft: num * 23 + "px",
  };
};

/**
 * Hàm lấy lại dữ liệu
 *
 * @author TQHUNG (28/05/2023)
 */

const reloadPage = () => {
  getRecord(currentPage.value, recordPerPage.value);
  getAllAccount();
  // CHeck lại dấu +, -
};

/**
 * Hàm đóng mở combobox function (Sửa)
 *
 * @author TQHUNG (28/05/2023)
 */

const openOptionList = (event, account) => {
  let heightContent = 165;

  isShowOptionList.value = !isShowOptionList.value;

  // console.log(isShowOptionList.value);
  if (window.innerHeight - event.clientY < heightContent) {
    posOptionY.value = event.clientY - 15 - 170;
  } else {
    posOptionY.value = event.clientY + 15;
  }

  accountClick.value = account;
};
/**
 * Khi click "thu gọn", "mở rộng"
 *
 * @author TQHUNG (28/05/2023)
 */

/**
 * Gọi API lấy toàn bộ account
 *
 * @author TQHUNG (28/05/2023)
 */
const getAllAccount = async () => {
  await axios
    .get("https://localhost:44339/api/v1/Account")
    .then((response) => {
      // dataAccount.value = response.data;
      allAccounts.value = response.data;
      totalRecord.value = response.data.length;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Xự kiện mở rộng thu gọn table tree
 *
 * @author TQHUNG (28/05/2023)
 */
const handleCollapseExtend = async () => {
  // getAllAccount();

  isMinus.value = !isMinus.value;

  console.log(iconElement.value);
  if (modeExtend.value) {
    console.log("thu");
    titleHandleCollapseExtend.value = "Thu hẹp";
    dataAccount.value = allAccounts.value;

    //Đổi icon
    iconElement.value.forEach((item) => {
      item.classList.add("click");
    });

    modeExtend.value = !modeExtend.value;
  } else {
    console.log("Mở");

    titleHandleCollapseExtend.value = "Mở rộng";

    //Đổi icon
    iconElement.value.forEach((item) => {
      item.classList.remove("click");
    });
    // dataAccount.value = dataAccount.value.filter((acc) => acc.grade === 1);
    getRecord(currentPage.value, recordPerPage.value);
    modeExtend.value = !modeExtend.value;
  }
};
/**
 * Hàm xoá một tài khoản
 *
 * @author TQHUNG (28/05/2023)
 */
const deleteAccount = (account) => {
  actionOfDialog.value = "delete";
  console.log("delete");
  isShowOptionList.value = false;
  if (account.is_parent) {
    isShowDialogWar.value = true;
    titleDialogWarning.value = "Xoá không thành công";
    descriptionDialogWarning.value =
      " Xóa không thành công. Không thể xóa danh mục cha nếu chưa xóa danh mục con.";
  } else {
    // console.log("Không có con");
    isShowDialog.value = true;
    messageDialog.value = `Bạn có thực sự muốn xóa Tài khoản <${account.account_number}> không`;
    accountClick.value = account;
  }
};

/**
 * Hàm search
 *
 * @author TQHUNG (28/05/2023)
 */
const searchAction = async (pageSize, pageIndex, keyWord) => {
  isShowLoading.value = true;
  await axios
    .get(
      `https://localhost:44339/api/v1/Account/search?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyWord}`
    )
    .then((response) => {
      isShowLoading.value = false;

      console.log(response);
      dataAccount.value = response.data.response;
      totalRecord.value = dataAccount.value.length;
      isMinus.value = true;
    })
    .catch((err) => console.log(err));
};

/**
 * Theo dõi sự kiện nhập trên ô search để call API
 *
 * @author TQHUNG (11/06/2023)
 */
const changeInput = () => {
  // modeExtend.value = false;

  if (timeout.value) {
    clearTimeout(timeout.value);
  }

  timeout.value = setTimeout(() => {
    //Gọi đến hàm call API sau 1s
    if (searchInput.value) {
      searchAction(20, 1, searchInput.value);
    } else {
      getRecord(currentPage.value, recordPerPage.value);
    }
  }, 1000);
};

const clickRow = (id) => {
  idAccountClick.value = id;
};

/**
 * Hàm mở form
 *
 * @author TQHUNG (28/05/2023)
 */
const handleOpenForm = (mode, account = {}) => {
  if (mode === enums.FORM_MODE.add) {
    isShowAccountDetail.value = true;
    modeForm.value = enums.FORM_MODE.add;
  } else if (mode === enums.FORM_MODE.edit) {
    isShowAccountDetail.value = true;
    modeForm.value = enums.FORM_MODE.edit;
    dataAccountEdit.value = account;
  } else if (mode === enums.FORM_MODE.duplicate) {
    isShowAccountDetail.value = true;
    modeForm.value = enums.FORM_MODE.duplicate;
    dataAccountEdit.value = account;
    isShowOptionList.value = false;
  }
};

// const updateModeForm = () => {
//   handleOpenForm(enums.FORM_MODE.add);
// };
// Sau khi xoá kiểm tra lại cha của account được xoá để cập nhật lại is_parent
/**
 * Hàm kiểm tra lại trạng thái của account cha
 *
 * @author TQHUNG (28/05/2023)
 */
const checkAfterDelete = async (acc) => {
  console.log(acc);
  // Cập nhật lại danh sách ở màn hình
  dataAccount.value = dataAccount.value.filter(
    (account) => account.account_id !== acc.account_id
  );
  reloadPage();
};
/**
 * Hàm thay đổi số bản ghi trên trang
 *
 * @author TQHUNG (28/05/2023)
 */
const changeRecordingPerPage = (value) => {
  // console.log(value);
  // console.log(currentPage.value);
  getRecord(currentPage.value, value);
};

/**
 * Hàm thay đổi số trang
 *
 * @author TQHUNG (28/05/2023)
 */
const changePageNumber = (value) => {
  // console.log(value);
};

/**
 * Hàm mở và set lại message của dialog
 *
 * @author TQHUNG (28/05/2023)
 */
const toggleState = (account) => {
  // Nếu chuyển từ sử dụng sang ngưng sử dụng -> không hiện

  // Nếu chuyển từ ngưng sử dụng sang sử dụng thì hiện và hỏi
  if (account.state === 0) {
    actionOfDialog.value = "update";
    isShowOptionList.value = false;

    if (account.grade === 1) {
      console.log("Cap 1");
      if (account.is_parent) {
        console.log("Có con -> phải hỏi");

        messageDialog.value =
          'Bạn có muốn thiết lập trạng thái "Sử dụng" cho tất cả <Tài khoản> con không';
        isShowDialog.value = true;
      } else {
        console.log("Không con -> chuyển");

        axios
          .put(
            `https://localhost:44339/api/v1/Account/update-state?account_id=${account.account_id}`
          )
          .then((response) => {
            console.log(response);

            // reloadPage();
            // getAllAccount();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      let parentAccount = allAccounts.value.filter(
        (acc) => acc.account_id === account.parent_id
      )[0];
      console.log(parentAccount);
      if (parentAccount.state === 0) {
        isShowDialogWar.value = true;
        titleDialogWarning.value = "Cập nhật không thành công";
        descriptionDialogWarning.value =
          'Tài khoản cha đang ở trạng thái "Ngừng sử dụng". Bạn không thể thiết lập trạng thái "Sử dụng" cho tài khoản con.';
      } else {
        if (!account.is_parent) {
          axios
            .put(
              `https://localhost:44339/api/v1/Account/update-state?account_id=${account.account_id}`
            )
            .then((response) => {
              console.log(response);

              // reloadPage();
              // getAllAccount();

              // cập nhật ở giao diện mà k cần reload
              allAccounts.value.filter(
                (acc) => acc.account_id === account.account_id
              )[0].state = 1;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          messageDialog.value =
            'Bạn có muốn thiết lập trạng thái "Sử dụng" cho tất cả <Tài khoản> con không';
          isShowDialog.value = true;
        }
      }
    }
  } else if (account.state === 1) {
    isShowOptionList.value = false;

    console.log(
      "Update từ sử dụng sang ngưng sử dụng không quan tâm cập nhật hết"
    );
    axios
      .put(
        `https://localhost:44339/api/v1/Account/update-state?account_id=${account.account_id}`
      )
      .then((response) => {
        console.log(response);

        // Cập nhật lại ở giao diện
        // Dùng misa_code_id để cập nhật lại toàn bộ giao diện
        console.log(account.misa_code_id);
        let tmpArr = allAccounts.value.filter((acc) =>
          acc.misa_code_id.startsWith(account.misa_code_id)
        );
        console.log(tmpArr);
        tmpArr.forEach((acc) => {
          acc.state = 0;
        });
        let tmpArr2 = dataAccount.value.filter((acc) =>
          acc.misa_code_id.startsWith(account.misa_code_id)
        );
        tmpArr2.forEach((acc) => {
          acc.state = 0;
        });
        account.state = 0;

        // reload lại trang
        // reloadPage();
        // getAllAccount();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

/**
 *  Hàm thay đổi trạng thái hoạt động từ ngưng sử dung sang sử dụng cho tài khoản có tài khoản con khi người dùng chọn có
 *  Thay đổi hết
 * @author TQHUNG (2/06/2023)
 */
const confirmUpdateState = async (account) => {
  actionOfDialog.value = "update";
  console.log(account);
  isShowOptionList.value = false;
  // Từ sử dụng sang ngưng sử dụng
  if (account.state === 1) {
    // chuyển k cần hỏi kể cả có con hay không

    console.log("Từ sử dụng => ngưng sử dụng");
  } else if (account.state === 0) {
    // chuyển phải hỏi
    // nếu có con thì hỏi người dùng có muốn thiết lập trạng thái sử dụng cho tất cả con không
    // Nếu không, update state của mk nó
    // Nếu có, update cả con
    console.log("từ ngưng sử dụng sang sử dụng");
    console.log(account.is_parent);
    isShowLoading.value = true;

    axios
      .put(
        `https://localhost:44339/api/v1/Account/update-state?account_id=${account.account_id}`
      )
      .then((response) => {
        console.log(response);
        //Ẩn loading
        isShowLoading.value = false;

        // Ẩn dialog
        isShowDialog.value = false;

        let tmpArr = allAccounts.value.filter((acc) =>
          acc.misa_code_id.startsWith(account.misa_code_id)
        );
        console.log(tmpArr);
        tmpArr.forEach((acc) => {
          acc.state = 1;
        });
        let tmpArr2 = dataAccount.value.filter((acc) =>
          acc.misa_code_id.startsWith(account.misa_code_id)
        );
        tmpArr2.forEach((acc) => {
          acc.state = 1;
        });
        account.state = 1;
        // reloadPage();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

/**
 * Hàm thay đổi trạng thái hoạt động từ ngưng sử dung sang sử dụng cho tài khoản có tài khoản con khi người dùng chọn không
 *
 * @author TQHUNG (2/06/2023)
 */
const updateStateAlone = (account) => {
  account.state = 1;
  isShowDialog.value = false;
  console.log("updateStateAlone");
  // gọi api update trạng thái cho 1 mk tài khoản cha
  console.log(account);

  axios
    .put(
      `https://localhost:44339/api/v1/Account/${account.account_id}`,
      account
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Hàm click outside
 *
 * @author TQHUNG (28/05/2023)
 */
const target = ref(null);
onClickOutside(target, (event) => (isShowOptionList.value = false));

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
 * Theo dõi biến isShowOpenList để add, remove sự kiện click outside
 *
 * @author TQHUNG (10/06/2023)
 */
watch(isShowOptionList, () => {
  if (isShowOptionList.value) {
    document.addEventListener("click", clickOutSide);
  } else {
    document.removeEventListener("click", clickOutSide);
  }
});
/**
 * Hàm mở form với mode là nhân bản
 *
 * @author TQHUNG (10/06/2023)
 */
const cloneAccount = (acc) => {
  console.log(acc);
  isShowOptionList.value = false;
  handleOpenForm(enums.FORM_MODE.duplicate, acc);
};

/**
 * Hàm dổi mode của form
 *
 * @author TQHUNG (31/05/2023)
 */
const changeMode = () => {
  modeForm.value = enums.FORM_MODE.add;
};

//#endregion
</script>

<style scoped>
@import url("@/css/account.css");
</style>
