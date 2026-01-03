<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">歡迎回來</h1>
      <p class="auth-subtitle">登入以繼續您的購物行程</p>

      <form @submit.prevent="handleLogin2" class="auth-form">
        <div class="input-group">
          <label>電子郵件</label>
          <input v-model="form.email" type="email" placeholder="請輸入 Email" required />
        </div>

        <div class="input-group">
          <label>密碼</label>
          <input v-model="form.password" type="password" placeholder="請輸入密碼" required />
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? '登入中...' : '立即登入' }}
        </button>
      </form>

      <div class="auth-footer">
        還沒有帳號？ <router-link to="/register" class="reg-link">立即註冊</router-link>
      </div>

      <button class="back-link" @click="$router.push('/products')">〈 回到首頁</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import {useAuthStore} from "@/stores/auth";
import api from "@/api";

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)
const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  try {
    const res = await axios.post('http://localhost:5275/api/Auth/login', form.value)

    // 關鍵：呼叫倉庫的 login 方法，這會讓全專案都知道 MOMO 登入了
    authStore.login(res.data.token, res.data.name)

    alert(`歡迎回來，${res.data.name}！`)
    await router.push('/products')
  } catch (err: any) {
    alert('登入失敗')
  } finally {
    loading.value = false
  }
}

const handleLogin2 = async()=>{
  loading.value = true
  try{
    // api 替代axios
    const res = await api.post('/api/Auth/login', form.value)
    authStore.login(res.data.token, res.data.name,res.data.avatar)
    // 呼叫auth.store裡面的login方法
    // alert('歡迎回來')
    await router.push('/products')
    console.log(res)
  }
  catch (err: any) {
    alert('登入失敗'+err.response?.data||'帳號或密碼錯誤')
  }finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 延續 B 站粉紅風格 */
.auth-container { min-height: 100vh; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; padding: 20px; }
.auth-card { width: 100%; max-width: 400px; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); text-align: center; }
.auth-title { font-size: 24px; color: #333; margin-bottom: 8px; }
.auth-subtitle { color: #999; font-size: 14px; margin-bottom: 30px; }
.auth-form { text-align: left; }
.input-group { margin-bottom: 20px; }
.input-group label { display: block; font-size: 14px; color: #666; margin-bottom: 8px; }
.input-group input { width: 100%; padding: 12px; border: 1px solid #e7e7e7; border-radius: 10px; font-size: 15px; box-sizing: border-box; }
.input-group input:focus { outline: none; border-color: #fb7299; background-color: #fff5f7; }
.btn-login { width: 100%; padding: 14px; background: #fb7299; color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; }
.btn-login:disabled { background: #ffb3c7; }
.auth-footer { margin-top: 25px; font-size: 14px; color: #666; }
.reg-link { color: #fb7299; text-decoration: none; font-weight: bold; }
.back-link { margin-top: 25px; background: none; border: none; color: #999; cursor: pointer; }
</style>