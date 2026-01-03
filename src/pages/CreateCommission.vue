<template>
  <div class="commission-container">
    <div class="commission-card">
      <h2 class="form-title">發佈新委託</h2>
      <p class="form-subtitle">填寫您想要尋找的日本商品資訊</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>委託商品名稱</label>
          <input
              type="text"
              v-model="form.itemName"
              placeholder="例如：限定版皮卡丘娃娃"
              required
          >
        </div>

        <div class="form-group">
          <label>商品原價 (日幣或台幣預估)</label>
          <input
              type="number"
              v-model="form.price"
              placeholder="請輸入預計價格"
              required
          >
        </div>

        <div class="form-group">
          <label>參考購買地點</label>
          <input
              type="text"
              v-model="form.location"
              placeholder="例如：東京澀谷 Pokemon Center"
          >
        </div>
        <div class="form-group">
          <label>商品參考圖片</label>
          <div class="upload-container">
            <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                ref="fileInput"
                style="display: none"
            >

            <div v-if="!imagePreview" class="upload-placeholder" @click="$refs.fileInput.click()">
              <span class="plus-icon">+</span>
              <span>上傳參考圖片</span>
            </div>

            <div v-else class="image-preview-wrapper">
              <img :src="imagePreview" class="preview-img">
              <button type="button" class="remove-btn" @click="removeImage">✕</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>委託結束日期</label>
          <input
              type="date"
              v-model="form.endDate"
              :min="today"
              required
          >
          <small class="hint">期間內若無人接取委託，系統將自動刪除此需求。</small>
        </div>

        <button type="submit" class="submit-btn">
          確認送出委託
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCommissionStore } from '@/stores/commission' // 引入倉庫
const commissionStore = useCommissionStore()

const router = useRouter()

// 取得今天的日期，用於限制日期選擇器的最小值 (不能選過去的日期)
const today = new Date().toISOString().split('T')[0]

// 新增圖片相關的變數
const imagePreview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)

// 處理檔案選取
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFile.value = file // 這是準備要傳給後端的檔案

    // 製作即時預覽圖
    imagePreview.value = URL.createObjectURL(file)
  }
}



// 表單資料結構
const form = ref({
  itemName: '',
  price: null,
  location: '',
  endDate: ''
})

// 送出邏輯
const handleSubmit = () => {
  // 1. 呼叫倉庫的 addCommission 函式存入資料
  commissionStore.addCommission({
    itemName: form.value.itemName,
    price: form.value.price,
    location: form.value.location,
    endDate: form.value.endDate,
    image: imagePreview.value // 這裡傳入預覽圖的 Blob 網址
  })

  alert('委託已發佈！')
  router.push('/commissions') // 跳轉至委託清單頁
}
</script>

<style scoped>
.commission-container {
  max-width: 600px;
  margin: 120px auto 40px;
  padding: 0 20px;
}

.commission-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.form-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 8px;
  text-align: center;
}

.form-subtitle {
  color: #999;
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #fb7299;
}

.hint {
  display: block;
  margin-top: 5px;
  color: #fb7299;
  font-size: 12px;
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
  margin-top: 10px;
  transition: opacity 0.3s;
}

.submit-btn:hover {
  opacity: 0.9;
}
.upload-container {
  width: 150px;
  height: 150px;
  border: 2px dashed #ddd;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  position: relative;
}

.upload-container:hover {
  border-color: #fb7299;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
  font-size: 14px;
}

.plus-icon {
  font-size: 32px;
  margin-bottom: 5px;
}

.image-preview-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>