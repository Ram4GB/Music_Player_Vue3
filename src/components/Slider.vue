<template>
  <img class="animation" style="width:350px;height: 350px;border: 5px solid #111" v-bind:src="listImage[count]" alt="">
  <p style="text-align: center;margin-top: 10px;font-weight: bold">{{quotes[count]}}</p>
</template>

<script>
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import image3 from '../assets/3.jpg'
import image4 from '../assets/4.jpg'

export default {
    data: function() {
        return {
            count: 1,
            listImage: [image1, image2, image3, image4],
            quotes: ["Nâng niu bàn chân Việt", "Khơi nguồn sáng tạo", "Luôn luôn lắng nghe, luôn luôn thấu hiểu", "Vị ngon trên từng ngón tay"]
        }
    },
    mounted: function() {
        this.run()
    },
    methods: {
        run: function() {
            setInterval(() => {
                let temp = this.count + 1
                if(temp == this.listImage.length) {
                    this.count = 0
                } else {
                    this.count++
                }
            }, 1500)
        }
    }
}
</script>

<style>

</style>