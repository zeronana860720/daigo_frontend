<template>
  <div class="shop-page">
    <div class="page-header">
      <div class="tab-switcher">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['switch-btn', { active: currentTab === tab.id }]"
            @click="currentTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <button class="add-product-btn" @click="handleAddProduct">
        <i class="icon">+</i> 上架商品
      </button>
    </div>

    <div class="shop-grid">
      <div
          v-for="item in filteredProducts"
          :key="item.id"
          class="simple-card"
      >
        <div class="card-img-box">
          <img :src="item.image" :alt="item.name" class="product-img">
          <span class="img-tag" :class="currentTab">{{ getStatusLabel }}</span>

          <div class="card-overlay" @click.stop="handleEdit(item.id)">
            <span class="edit-text">編輯商品</span>
          </div>
        </div>

        <div class="card-info">
          <h3 class="product-name">{{ item.name }}</h3>

          <div class="detail-row">
            <span class="label">售價：</span>
            <span class="value price">NT$ {{ item.price }}</span>
          </div>

          <div class="detail-row">
            <span class="label">庫存：</span>
            <span class="value">{{ item.stock }} 件</span>
          </div>

          <div v-if="currentTab === 'failed'" class="failed-reason">
            <strong>失敗原因：</strong>{{ item.reason }}
          </div>

          <div class="card-actions">
            <button class="edit-action-btn" @click.stop="handleEdit(item.id)">
              <i class="icon">✎</i> 編輯資訊
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="empty-box">
      這裡還空空如也，快去上架商品吧 ( ﾟ∀ﾟ)
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

type TabType = 'published' | 'pending' | 'failed';

const currentTab = ref<TabType>('published');

const tabs = [
  { id: 'published', label: '已上架' },
  { id: 'pending', label: '審核中' },
  { id: 'failed', label: '審核失敗' }
];

// 模擬賣場商品資料
const shopData = ref({
  published: [
    { id: 1, name: '【現貨】吉伊卡哇 運動會系列公仔', price: 320, stock: 15, image: 'https://bucket-image.inkmaginecms.com/version/hd/9dde7c0f-a597-445c-80dd-9a93db8a4006/image/2025/06/beaafaad-a543-4d37-ad1b-da0287de9589.jpg' },
    { id: 2, name: '限定版 貓貓蟲咖波 抱枕', price: 880, stock: 5, image: '/everett.png' }
  ],
  pending: [
    { id: 3, name: '客製化 繪圖委託服務', price: 1500, stock: 99, image: '/everett.png' }
  ],
  failed: [
    { id: 4, name: '二手 輕小說出清', price: 100, stock: 1, image: '/everett.png', reason: '商品圖片解析度過低，且未註明商品保存狀況。' }
  ]
});

const filteredProducts = computed(() => shopData.value[currentTab.value]);

const getStatusLabel = computed(() => {
  if (currentTab.value === 'published') return '銷售中';
  if (currentTab.value === 'pending') return '審核中';
  return '需修改';
});

// 操作函式
const handleEdit = (id: number) => {
  alert(`編輯商品 ID: ${id}`);
};

const handleAddProduct = () => {
  alert('開啟上架商品彈窗/頁面');
};
</script>

<style scoped>
.shop-page {
  padding: 10px;
}

/* --- 頁面頂部區塊 --- */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.tab-switcher {
  display: flex;
  background: #eee;
  padding: 4px;
  border-radius: 25px;
}

.switch-btn {
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  background: transparent;
  transition: 0.3s;
}

.switch-btn.active {
  background: white;
  color: #fb7299;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 上架按鈕 */
.add-product-btn {
  background-color: #fb7299;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-product-btn:hover {
  background-color: #ff85a7;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(251, 114, 153, 0.3);
}

/* --- 網格佈局 --- */
.shop-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* --- 卡片美化 --- */
.simple-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.simple-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  border-color: #fb7299;
}

.card-img-box {
  position: relative;
  height: 160px;
  background-color: #f8f8f8;
  overflow: hidden;
}

/* 懸浮編輯層 */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
}

.simple-card:hover .card-overlay {
  opacity: 1;
}

.edit-text {
  color: white;
  border: 1px solid white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- 狀態標籤 --- */
.img-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 20px;
  z-index: 2;
}
.published { background-color: #fb7299; }
.pending { background-color: #ffb11b; }
.failed { background-color: #9499a0; }

/* --- 內容資訊 --- */
.card-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 15px;
  color: #222;
  margin-bottom: 12px;
  height: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.detail-row {
  display: flex;
  font-size: 13px;
  margin-bottom: 6px;
}

.label { color: #9499a1; width: 50px; }
.value { color: #222; }
.price { color: #fb7299; font-weight: bold; }

/* 失敗原因 */
.failed-reason {
  margin-top: 10px;
  padding: 8px;
  background-color: #fff1f0;
  border-radius: 4px;
  font-size: 11px;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

/* ✨ 編輯按鈕區塊 */
.card-actions {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px dotted #eee;
}

.edit-action-btn {
  width: 100%;
  background: white;
  border: 1px solid #ccd0d7;
  color: #666;
  padding: 6px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.edit-action-btn:hover {
  border-color: #fb7299;
  color: #fb7299;
  background-color: #fff0f3;
}

.empty-box {
  padding: 100px 0;
  text-align: center;
  color: #bbb;
}
</style>