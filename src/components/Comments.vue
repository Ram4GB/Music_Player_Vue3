<template>
    <h3 style="margin-top: 15px">Nhận xét từ người dùng</h3>
    <ul>
        <li v-for="item in data" :key="item.id">{{ item.message }}</li>
    </ul>
</template>

<script>
import { ref } from 'vue'
export default {
    setup: async function() {
        let data = ref([])
        await new Promise((resolve) => {
            setTimeout(() => {
                data.value = [
                    {
                        id: 1,
                        message: "Trang web rất tuyệt vời"
                    },
                    {
                        id: 2,
                        message: "Cảm ơn các bạn"
                    },
                    {
                        id: 3,
                        message: "Thật tuyệt vời"
                    }
                ]
                resolve()
            }, 2000)
        })

        return {
            data
        }    
    }
}
</script>

<style>
    ul {
        text-align: left;
    }
</style>