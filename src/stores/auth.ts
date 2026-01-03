import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // 狀態：從 LocalStorage 初始化，確保重新整理頁面後登入還在
    const token = ref(localStorage.getItem('token') || '')
    const userName = ref(localStorage.getItem('userName') || '')

    // 計算屬性：是否已登入
    const isLoggedIn = computed(() => !!token.value)

    // 動作：登入成功時呼叫
    function login(newToken: string, name: string,avatarUrl: string) {
        token.value = newToken
        userName.value = name
        localStorage.setItem('token', newToken)
        localStorage.setItem('userName', name)
        localStorage.setItem('userAvatar',avatarUrl || '')
    }

    // 動作：登出
    function logout() {
        token.value = ''
        userName.value = ''
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
    }

    return { token, userName, isLoggedIn, login, logout }
})