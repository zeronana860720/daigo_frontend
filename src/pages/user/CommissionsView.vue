<template>
  <div class="commissions-page">
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

    <div class="commissions-grid">
      <div
          v-for="item in filteredCommissions"
          :key="item.id"
          class="simple-card"
      >
        <div class="card-img-box">
          <img :src="item.image" :alt="item.name" class="product-img">
          <span class="img-tag" :class="currentTab">{{ getStatusLabel }}</span>
        </div>

        <div class="card-info">
          <h3 class="product-name">{{ item.name }}</h3>

          <div class="detail-row">
            <span class="label">參考價格：</span>
            <span class="value price">NT$ {{ item.price }}</span>
          </div>

          <div class="detail-row">
            <span class="label">購買地點：</span>
            <span class="value">{{ item.location }}</span>
          </div>

          <div class="detail-row">
            <span class="label">截止日期：</span>
            <span class="value date">{{ item.deadline }}</span>
          </div>

          <div v-if="currentTab === 'failed'" class="failed-reason">
            <strong>失敗原因：</strong>{{ item.reason }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredCommissions.length === 0" class="empty-box">
      目前沒有相關的委託內容 (｡･ω･｡)
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

type TabType = 'published' | 'pending' | 'failed';

const currentTab = ref<TabType>('published');

const tabs = [
  { id: 'published', label: '已發佈' },
  { id: 'pending', label: '審核中' },
  { id: 'failed', label: '審核失敗' }
];

// 模擬委託資料
const commissionsData = ref({
  published: [
    { id: 1, name: '吉伊卡哇沖繩限定吊飾', price: 500, location: '日本沖繩', deadline: '2026-02-01', image: 'https://bucket-image.inkmaginecms.com/version/hd/9dde7c0f-a597-445c-80dd-9a93db8a4006/image/2025/06/beaafaad-a543-4d37-ad1b-da0287de9589.jpg' },
    { id: 2, name: '排球少年快閃店周邊', price: 1200, location: '台北三創', deadline: '2026-01-15', image: '/everett.png' }
  ],
  pending: [
    { id: 3, name: '虛擬歌手演唱會手燈', price: 1800, location: '日本官方通販', deadline: '2026-03-20', image: '/everett.png' }
  ],
  failed: [
    { id: 4, name: '非法違禁品委託測試', price: 9999, location: '不明', deadline: '2026-01-01', image: '/everett.png', reason: '委託內容違反平台安全守則，請重新修改。' }
  ]
});

const filteredCommissions = computed(() => commissionsData.value[currentTab.value]);

const getStatusLabel = computed(() => {
  if (currentTab.value === 'published') return '已上架';
  if (currentTab.value === 'pending') return '審核中';
  return '未通過';
});
</script>

<style scoped>
.commissions-page {
  padding: 10px;
}

/* --- 切換鈕 --- */
.tab-switcher {
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

/* --- 網格 --- */
.commissions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* --- 卡片 --- */
.simple-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #eee;
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
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- 狀態標籤 (繼承膠囊樣式) --- */
.img-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 13px;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.published { background-color: #fb7299; } /* 粉色 */
.pending { background-color: #ffb11b; }   /* 橙色 */
.failed { background-color: #9499a0; }    /* 灰色 */

/* --- 資訊內文 --- */
.card-info {
  padding: 15px;
}

.product-name {
  font-size: 16px;
  color: #222;
  margin-bottom: 12px;
  height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.detail-row {
  display: flex;
  font-size: 13px;
  margin-bottom: 6px;
  line-height: 1.4;
}

.label {
  color: #9499a1;
  width: 70px;
  flex-shrink: 0;
}

.value {
  color: #222;
}

.price {
  color: #fb7299;
  font-weight: bold;
}

.date {
  color: #ff6699;
}

/* 失敗原因區塊 */
.failed-reason {
  margin-top: 10px;
  padding: 8px;
  background-color: #fff1f0;
  border-radius: 4px;
  font-size: 12px;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

.empty-box {
  padding: 100px 0;
  text-align: center;
  color: #bbb;
}
</style>