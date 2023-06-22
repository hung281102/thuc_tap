const resource = {
  HEADER_BRANCH: {
    title: "Công ty cổ phần vô cùng kỳ diệu",
  },
  HEADER_TABLE: "Quản lý nhân viên",
  HEADER_TABLE_ACCOUNT: "Hệ thống tài khoản",
  NO_DATA: "Không có dữ liệu",
  FORM_VALIDATE: {
    employeeCode: {
      required: "Vui lòng nhập mã nhân viên",
      duplicated: "Mã nhân viên đã tồn tại",
    },
    employeeName: {
      required: "Vui lòng nhập tên nhân viên",
    },
    employeeDepartment: {
      required: "Vui lòng chọn đơn vị",
    },
  },
  FORM_TITLE: [
    {
      id: 0,
      name: "Thêm mới nhân viên",
    },
    {
      id: 1,
      name: "Sửa thông tin nhân viên",
    },
    {
      id: 2,
      name: "Nhân bản nhân viên",
    },
  ],
  FORM_TITLE_ACCOUNT: [
    {
      id: 0,
      name: "Thêm mới tài khoản",
    },
    {
      id: 1,
      name: "Sửa tài khoản",
    },
    {
      id: 2,
      name: "Nhân bản tài khoản",
    },
  ],
  TOAST_MESSAGE: {
    state: {
      success: "Thành công",
      error: "Thất bại",
    },
    actions: {
      add: "Thêm nhân viên",
      delete: "Xoá nhân viên",
      update: "Cập nhật nhân viên",
    },
  },
  DIALOG_MESSAGE: {
    title_del: "Xoá nhân viên",
    message_del: "Bạn có muốn xoá nhân viên",
    message_dels: "Bạn có muốn những xoá nhân viên được chọn",

    actions: {
      cancel: "Không",
      confirm: "Có, xoá nhân viên",
    },
  },
  DIALOG_WARNING: {
    title: "Dữ liệu thay đổi",
    message: "Thông tin nhân viên bị thay đổi",
    actions: {
      save: "Cất",
      cancel: "Tiếp tục",
    },
  },
  BUTTON: {
    title: {
      update: "Cập nhật",
      unchecked: "Bỏ chọn",
      deleteAll: "Xoá tất cả",
      add: "Thêm mới nhân viên",
      save: "Cất",
      saveAndAdd: "Cất và thêm",
      cancel: "Huỷ",
    },
  },
  TABLE_COLUMNS: {
    employeeCode: "Mã nhân viên",
    fullName: "Họ tên nhân viên",
    gender: "Giới tính",
    dateOfBirth: "Ngày sinh",
    phoneNumber: "Số điện thoại",
    email: {
      label: "Email",
      placeholder: "example@gmail.com",
    },
    departmentName: "Phòng ban",
    salary: "Lương(VND)",
    bankAccount: "Số tài khoản",
    bankName: "Tên ngân hàng",
    bankPlace: "Chi nhánh",
    functions: "Chức năng",
    identityNumber: "Số CCCD",
    identityDate: "Ngày cấp",
    identityPlace: "Nơi cấp",
    positionName: "Vị trí công việc",
    address: "Địa chỉ",
    phoneNumber: "Số địa thoại",
  },

  TABLE_COLUMNS_TH: [],

  SIDEBAR_TITLE: {},
  ERROR_MESSAGE: {
    duplicatedEmployeeCode: "Mã nhân viên đã tồn tại ",
    invalidEmail: "Email không đúng định dạng",
  },
  genderOptions: [
    { label: "Nam", value: "1" },
    { label: "Nữ", value: "0" },
    { label: "Khác", value: "2" },
  ],
  BASE_API: "https://localhost:44339/api/v1/Employees/",
  BASE_API_Department: "https://localhost:44339/api/v1/Departments",

  FORMAT_DATE: {
    day_month_year: "dd-mm-yyyy",
    year_month_day: "yyyy-mm-dd",
  },
  SIDE_BAR: [
    {
      id: 1,
      title: "Trang chủ",
      component: "Home",
      icon: "trang-chu",
    },
    {
      id: 2,
      title: "Nhân viên",
      component: "Employee",
      icon: "nhan-vien",
    },
    {
      id: 3,
      title: "Tiền mặt",
      component: "Receipt",
      icon: "tien-mat",
    },
  ],

  Error: "Có lỗi xảy ra vui lòng liên hệ Misa",
  DETAIL_FOLLOW_BY_OBJECT: [
    {
      id: 0,
      name: "Khách hàng",
    },
    {
      id: 1,
      name: "Nhà cung cấp",
    },
    {
      id: 2,
      name: "Nhân viên",
    },
  ],
  DETAIL_FOLLOW_BY_OTHER: [
    {
      id: 0,
      name: "Chỉ cảnh báo",
    },
    {
      id: 1,
      name: "Bắt buộc nhập",
    },
  ],
  RECORD_PER_PAGE: [
    { name: "10 bản ghi trên 1 trang", value: 10, id: 0 },
    { name: "20 bản ghi trên 1 trang", value: 20, id: 1 },
    { name: "50 bản ghi trên 1 trang", value: 50, id: 2 },
    { name: "100 bản ghi trên 1 trang", value: 100, id: 3 },
  ],
  TYPE_PAYMENT: [{ name: "7. Chi khác", id: 0 }],
  ACCOUNT_CATEGORY_KIND: [
    {
      id: 0,
      name: "Dư nợ",
    },
    {
      id: 1,
      name: "Dư có",
    },
    {
      id: 2,
      name: "Lưỡng tính",
    },
    {
      id: 3,
      name: "Không có số dư",
    },
  ],

  LIST_COLUMN_NAME_ACCOUNT_GENERAL: [
    {
      id: 0,
      column_name: "Số tài khoản",
      attribute: "account_number",
      width: "40%",
    },
    {
      id: 2,
      column_name: "Tên tài khoản",
      attribute: "account_name",
      width: "60%",
    },
  ],
  LIST_COLUMN_NAME_SUPPLIER: [
    {
      id: 0,
      column_name: "Đối tượng",
      attribute: "supplier_code",
      width: "15%",
    },
    {
      id: 1,
      column_name: "Tên đối tượng",
      attribute: "supplier_name",
      width: "30%",
    },
    {
      id: 2,
      column_name: "Mã số thuế",
      attribute: "supplier_tax_code",
      width: "15%",
    },
    {
      id: 3,
      column_name: "Địa chỉ",
      attribute: "supplier_address",
      width: "25%",
    },
    {
      id: 4,
      column_name: "ĐT di động",
      attribute: "supplier_phone_number",
      width: "15%",
    },
  ],
  LIST_COLUMN_NAME_EMPLOYEE: [
    {
      id: 0,
      column_name: "Mã nhân viên",
      attribute: "employee_code",
      width: "20%",
    },
    {
      id: 1,
      column_name: "Tên nhân viên",
      attribute: "full_name",
      width: "30%",
    },
    {
      id: 2,
      column_name: "Đơn vị",
      attribute: "department_name",
      width: "25%",
    },
    {
      id: 3,
      column_name: "ĐT di động",
      attribute: "phone_number",
      width: "25%",
    },
  ],
};

export default resource;
