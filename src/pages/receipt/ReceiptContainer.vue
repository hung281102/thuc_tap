<template>
  <div class="container-content receipt">
    <div class="receipt-router">
      <div class="process active">Quy trình</div>
      <router-link :to="{ name: 'PaymentList' }">
        <div class="payment">Chi tiền</div>
      </router-link>
    </div>
    <div class="receipt-container">
      <div class="receipt-container_cash">
        <div class="cash-header">
          <h2>Nghiệp vụ tiền mặt</h2>
        </div>
        <div class="cash-router">
          <div class="router-left">
            <div class="collect-money">
              <div class="collect-money-icon">
                <div></div>
              </div>
              <div class="text">Thu tiền</div>
            </div>
            <div class="arrow">
              <img
                src="@/assets/imgs/arrow1.jpg"
                alt=""
                style="transform: scale(0.7)"
              />
            </div>
            <router-link :to="{ name: 'PaymentDetail' }" style="color: #000">
              <div class="pay-money">
                <div class="pay-money-icon">
                  <div></div>
                </div>
                <div class="text">Chi tiền</div>
              </div>
            </router-link>
          </div>
          <div class="router-right">
            <div class="fund-inventory">
              <div class="fund-inventory-icon">
                <div></div>
              </div>
              <div class="text">Kiểm kê quỹ</div>
            </div>
            <div class="arrow">
              <img
                src="@/assets/imgs/arrow2.jpg"
                alt=""
                style="transform: scale(0.7)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="receipt-container_account">
        <div>
          <router-link :to="{ name: 'Account' }" style="color: #000">
            <div class="account-icon">
              <div class="a" style=""></div>
            </div>
            <div class="text" style="font-size: 15px">Hệ thống tài khoản</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import url("@/css/receipt.css");
</style>
