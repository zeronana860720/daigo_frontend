<template>
  <div class="checkout-container" v-if="product">
    <h2 class="page-title">確認結帳</h2>

    <div class="checkout-layout">
      <div class="info-section">
        <div class="card">
          <h3><i class="icon"></i> 收件資訊</h3>
          <div class="form-group">
            <label>收件人姓名</label>
            <input type="text" v-model="form.name" placeholder="請輸入真實姓名">
          </div>
          <div class="form-group">
            <label>聯絡電話</label>
            <input type="tel" v-model="form.phone" placeholder="請輸入手機號碼">
          </div>
          <div class="form-group">
            <label>收件地址</label>
            <input type="text" v-model="form.address" placeholder="請輸入完整地址">
          </div>
        </div>

        <div class="card">
          <h3><i class="icon"></i> 付款方式</h3>
          <div class="payment-options">
            <label class="radio-label">
              <input type="radio" value="credit" v-model="form.payment"> 信用卡
            </label>
            <label class="radio-label">
              <input type="radio" value="cod" v-model="form.payment"> 貨到付款
            </label>
          </div>
        </div>
      </div>

      <div class="summary-section">
        <div class="card sticky-card">
          <h3>訂單摘要</h3>
          <div class="product-item">
            <img :src="product.image" class="mini-img">
            <div class="mini-info">
              <p class="name">{{ product.name }}</p>
              <p class="price">NT$ {{ product.price }}</p>
              <div class="quantity-control">
                <button class="qty-btn" @click="subQty" :disabled="qty <= 1">-</button>
                <span class="qty-num">{{ qty }}</span>
                <button class="qty-btn" @click="addQty">+</button>
              </div>
            </div>
          </div>
          <hr>
          <div class="total-row">
            <span>商品總計</span>
            <span>NT$ {{ product.price }}</span>
          </div>
          <div class="total-row">
            <span>運費</span>
            <span>NT$ 60</span>
          </div>
          <div class="total-row final">
            <span>應付總額</span>
            <span class="pink-text">NT$ {{ totalPrice }}</span>
          </div>
          <button class="submit-btn" @click="submitOrder">送出訂單</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const qty = ref(1)

// 抓取要結帳的商品資料
const product = computed(() => {
  return productStore.products.find(p => p.id === Number(route.params.id))
})

// 表單資料綁定
const form = ref({
  name: '',
  phone: '',
  address: '',
  payment: 'credit'
})

const submitOrder = () => {
  if (!form.value.name || !form.value.address) {
    alert('請填寫完整的收件資訊')
    return
  }
  alert('訂單已送出')
  router.push('/products')
}

const addQty = () => {
  qty.value++
}
const subQty = () => {
  if (qty.value > 1) {
    qty.value--
  }
}
const totalPrice = computed(() => {
  if (!product.value) return 0
  return (product.value.price * qty.value) + 60
})
</script>

<style scoped>
.checkout-container {
  max-width: 1000px;
  margin: 120px auto 40px;
  padding: 0 20px;
}

.page-title {
  margin-bottom: 30px;
  color: #333;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}

.form-group input:focus {
  border-color: #fb7299;
}

.product-item {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.mini-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  color: #666;
}

.final {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
}

.pink-text {
  color: #fb7299;
}

.submit-btn {
  width: 100%;
  background: #fb7299;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}
/* 數量選擇器外框 */
.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

/* 加減按鈕 */
.qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
}

.qty-btn:hover:not(:disabled) {
  border-color: #fb7299;
  color: #fb7299;
}

/* 數量文字 */
.qty-num {
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

/* 按鈕禁用狀態（例如數量為 1 時不能再減） */
.qty-btn:disabled {
  cursor: not-allowed;
  color: #ccc;
  background: #f5f5f5;
}
</style>