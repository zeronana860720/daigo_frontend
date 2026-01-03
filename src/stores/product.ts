import{defineStore} from 'pinia'
import {ref} from "vue";
export const useProductStore = defineStore('product', ()=>{
    const products = ref([
        {
            id: 1,
            name: 'EVE A錠 止痛藥 (60錠)',
            price: 350,
            image: '/eve.png',
            description: '日本家庭必備，有效緩解生理痛與頭痛，小顆粒設計非常容易吞服喔！'
        },
        {
            id: 2,
            name: '一蘭拉麵 經典博多細麵 (5入)',
            price: 750,
            image: '/一蘭.png',
            description: '在家也能享受正宗福岡一蘭風味，濃郁豚骨湯頭跟特製赤紅辣粉超絕配！'
        },
        {
            id: 3,
            name: '安耐曬 金鑽高效防曬露 60ml',
            price: 680,
            image: '/安耐曬.png',
            description: '地表最強防曬！防水抗汗技術再升級，夏天去海邊玩水完全不怕曬黑。'
        },
        {
            id: 4,
            name: '大正製藥 百保能感冒顆粒 (44包)',
            price: 420,
            image: '/百寶能.png',
            description: '日本代購人氣第一名！初期感冒症狀必備，獨立包裝攜帶超級方便。'
        },
    ])
    return {products}
})