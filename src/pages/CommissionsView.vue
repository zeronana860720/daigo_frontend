<template>
  <div class="commissions-page">
    <div class="header">
      <h2 class="title">委託清單</h2>
      <p class="count">目前共有 {{ commissionStore.commissions.length }} 件委託</p>
    </div>

    <div class="commission-grid">
      <div v-for="item in commissionStore.commissions" :key="item.id" class="commission-card">
        <div class="card-image">
          <img :src="item.image" alt="商品圖">
          <div class="status-tag">等待接單</div>
        </div>

        <div class="card-body">
          <h3 class="item-name">{{ item.itemName }}</h3>
          <div class="info-row">
            <span class="label">預估原價：</span>
            <span class="value price">NT$ {{ item.price }}</span>
          </div>
          <div class="info-row">
            <span class="label">購買地點：</span>
            <span class="value">{{ item.location || '不限地點' }}</span>
          </div>
          <div class="info-row">
            <span class="label">截止日期：</span>
            <span class="value date">{{ item.endDate }}</span>
          </div>

          <button class="accept-btn" @click="acceptOrder(item.id)">
            接取委託
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommissionStore } from '@/stores/commission'

const commissionStore = useCommissionStore()

const acceptOrder = (id: number) => {
  alert(`接取成功,可至訂單管理確認`)
  // 這裡之後可以實作接單後的狀態變更邏輯
}
</script>

<style scoped>
.commissions-page {
  max-width: 1200px;
  margin: 120px auto 40px;
  padding: 0 20px;
}

.header {
  margin-bottom: 30px;
  border-left: 6px solid #fb7299;
  padding-left: 15px;
}

.title {
  font-size: 26px;
  color: #333;
}

.count {
  color: #999;
  margin-top: 5px;
}

.commission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.commission-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.commission-card:hover {
  transform: translateY(-5px);
}

.card-image {
  height: 200px;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #fb7299;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.card-body {
  padding: 20px;
}

.item-name {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
  height: 50px; /* 統一高度 */
}

.info-row {
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
}

.label {
  color: #999;
  width: 80px;
}

.value {
  color: #555;
}

.price {
  color: #fb7299;
  font-weight: bold;
}

.date {
  color: #ff4d4f;
}

.accept-btn {
  width: 100%;
  margin-top: 15px;
  background: #ffeef2;
  color: #fb7299;
  border: 1px solid #fb7299;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.accept-btn:hover {
  background: #fb7299;
  color: white;
}
</style>