<template>
  <div class="orders-page">
    <div class="mode-switcher">
      <button
          :class="['switch-btn', { active: currentMode === 'buyer' }]"
          @click="currentMode = 'buyer'"
      >
        我是買家
      </button>
      <button
          :class="['switch-btn', { active: currentMode === 'seller' }]"
          @click="currentMode = 'seller'"
      >
        我是賣家
      </button>
    </div>

    <div class="orders-grid">
      <div
          v-for="order in displayOrders"
          :key="order.id"
          class="simple-card"
      >
        <div class="card-img-box">
          <img :src="order.image" :alt="order.name" class="product-img">
          <span class="img-tag">{{ currentMode === 'buyer' ? '已下單' : '待發貨' }}</span>
        </div>

        <div class="card-info">
          <h3 class="product-name">{{ order.name }}</h3>

          <div class="order-footer">
            <p class="product-price">總價：NT$ {{ order.price*order.quantity }}</p>
            <span class="product-quantity">數量：{{ order.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="displayOrders.length === 0" class="empty-box">
      目前沒有相關訂單紀錄
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 切換模式：'buyer' 或 'seller'
const currentMode = ref<'buyer' | 'seller'>('buyer');

// 模擬訂單資料
const ordersData = ref({
  buyer: [
    { id: 101, name: '吉伊卡哇悠遊卡', price: 450, quantity:4, image: 'https://bucket-image.inkmaginecms.com/version/hd/9dde7c0f-a597-445c-80dd-9a93db8a4006/image/2025/06/beaafaad-a543-4d37-ad1b-da0287de9589.jpg' },
    { id: 102, name: 'NY Cheese', price: 480, quantity: 4, image: 'https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw4270ba44/images/large/2123600171_1_b.jpg' },
  ],
  seller: [
    { id: 201, name: '【賣場】客製化頭像繪製', price: 800, quantity: 1, image: '/everett.png' },
  ]
});

// 根據模式切換顯示的資料
const displayOrders = computed(() => ordersData.value[currentMode.value]);
</script>

<style scoped>
.orders-page {
  padding: 10px;
}

/* --- 模式切換按鈕 --- */
.mode-switcher {
  display: flex;
  background: #eee;
  padding: 4px;
  border-radius: 25px;
  width: fit-content;
  margin-bottom: 25px;
}

.switch-btn {
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  background: transparent;
  transition: all 0.3s;
}

.switch-btn.active {
  background: white;
  color: #fb7299;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* --- 網格佈局 (繼承你的 hot-grid) --- */
.orders-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* --- 卡片樣式 (繼承你的 simple-card) --- */
.simple-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #eee;
  cursor: pointer;
}

.simple-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  border-color: #fb7299;
}

.card-img-box {
  position: relative;
  height: 160px; /* 稍微縮小一點 */
  background-color: #f8f8f8;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-tag {
  position: absolute;
  top: 10px;    /* 稍微往內移一點，避免太大顯得擁擠 */
  right: 10px;
  background-color: rgba(251, 114, 153, 0.95); /* 提高不透明度，顏色更實心 */
  color: white;

  /* ✨ 核心調整：加大字體與內距 */
  font-size: 14px;        /* 原本是 11px */
  font-weight: bold;      /* 加粗字體 */
  padding: 5px 14px;      /* 增加上下左右的空間感 */

  /* ✨ 造型美化 */
  border-radius: 20px;    /* 改成膠囊型圓角，視覺上更精緻 */
  box-shadow: 0 2px 6px rgba(251, 114, 153, 0.3); /* 增加一點粉色陰影，讓它浮出來 */

  z-index: 1;             /* 確保標籤在圖片最上方 */
  letter-spacing: 0.5px;  /* 增加一點字距增加可讀性 */
}

.card-info {
  padding: 12px;
}

.product-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 縮小到一行，讓版面更整齊 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 20px;
}

/* 金額與數量的容器 */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  color: #fb7299;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.product-quantity {
  color: #999;
  font-size: 16px;
}

.empty-box {
  padding: 100px 0;
  text-align: center;
  color: #bbb;
}
</style>