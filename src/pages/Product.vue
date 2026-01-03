<template>
  <div class="product-page">
    <section class="hot-section">
      <div class="section-header">
        <h2 class="section-title">熱門商品</h2>
        <span class="more-text">查看更多 〉</span>
      </div>

      <div class="hot-grid">
        <div
            v-for="item in productStore.products"
            :key="item.id"
            class="simple-card"
            @click="goToDetail(item.id)"
        >
          <div class="card-img-box">
            <img :src="item.image" :alt="item.name" class="product-img">

            <span class="img-tag">JP</span>
          </div>

          <div class="card-info">
            <h3 class="product-name">{{ item.name }}</h3>
            <p class="product-price">NT$ {{ item.price }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// ✨ 引入我們剛才寫好的 Pinia 倉庫
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import router from "@/router";
// 取得倉庫實例
const productStore = useProductStore()
const goToDetail = (id:number)=>{
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.product-page {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}

.section-title {
  color: #333;
  font-size: 24px;
  border-left: 5px solid #fb7299; /* Bilibili 粉色小裝飾 */
  padding-left: 15px;
}

.more-text {
  color: #999;
  font-size: 14px;
  cursor: pointer;
}

/* 網格佈局：每排 4 個 */
.hot-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* 簡約商品卡片樣式 */
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
  height: 180px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-label {
  color: #ddd;
  font-size: 40px;
  font-weight: bold;
}

.card-info {
  padding: 15px;
}

.product-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  /* 讓文字超過兩行變省略號，維持美觀 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 44px;
}

.product-price {
  color: #fb7299; /* 使用標誌性的粉紅色 */
  font-size: 18px;
  font-weight: bold;
}
.card-img-box {
  position: relative; /* 為了讓 JP 標籤能定位在圖片上 */
  height: 180px;
  background-color: #f8f8f8;
  overflow: hidden; /* 確保圖片超出圓角時被剪裁 */
}

.product-img {
  width: 100%;
  height: 100%;
  /* 這是重點！圖片會自動充滿容器且不變形 */
  object-fit: cover;
  display: block;
}

.img-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
</style>