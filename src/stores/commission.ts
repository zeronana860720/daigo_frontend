import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommissionStore = defineStore('commission', () => {
    // 存放所有委託的陣列
    const commissions = ref([
        {
            id: 1,
            itemName: '日本限定 哆啦A夢 50週年公仔',
            price: 1500,
            location: '大阪心齋橋 官方商店',
            endDate: '2024-12-31',
            image: 'src/assets/everett.png', // 預設或測試圖
            status: 'waiting' // waiting: 等待接單, accepted: 已被接單
        }
    ])

    // 新增委託的函式
    const addCommission = (data: any) => {
        commissions.value.push({
            id: Date.now(), // 用時間戳當簡單 ID
            ...data,
            status: 'waiting'
        })
    }

    return { commissions, addCommission }
})