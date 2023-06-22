const enums = {
  KeyCode: {
    S: 83,
    ESC: 27,
    CTRL: 17,
    SHIFT: 16,
    A: 65,
    E: 69,
    Q: 81,
    P: 80,
  },
  GENDER: {
    0: "Nữ",
    1: "Nam",
    2: "Khác",
  },
  DEFAULT_GENDER: 1,
  FORMAT_MONEY: function (money) {
    const config = {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 9,
    };
    const formated = new Intl.NumberFormat("vi-VN", config).format(money);
    return formated;
  },
  FORMAT_MONEY_2: function (money) {
    if (!money) {
      money = 0;
    }
    return money.toLocaleString("de-DE");
  },
  FORMAT_DATE: function (date, format) {
    if (!date) return;
    switch (format) {
      case "dd-mm-yyyy":
        return date.split("T")[0].split("-").reverse().join("/");

      case "yyyy-mm-dd":
        return date.split("T")[0].split("-").join("/");

      default:
        break;
    }
  },
  IS_INCLUDES: function (arr, subArr) {
    let isSubArray = true;
    for (let i = 0; i < subArr.length; i++) {
      if (!arr.includes(subArr[i])) {
        isSubArray = false;
        return isSubArray;
      }
    }
    return isSubArray;
  },
  FORM_MODE: {
    add: 0,
    edit: 1,
    duplicate: 2,
  },

  ACCOUNT_CATEGORY_KIND: {
    0: "Dư nợ",
    1: "Dư có",
    2: "Lưỡng tính",
    3: "Không có số dư",
  },
  STATE: {
    0: "Ngưng sử dụng",
    1: "Đang sử dụng",
  },
};

export default enums;
