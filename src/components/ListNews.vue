<template>
    <h3 style="text-align: center; font-weight: bold">Tin tức nổi bật</h3>
    <ol>
        <li class="post" v-for="item in news" :key="item.id">
            <div class="post-title">
                {{ item.title }}
            </div>
            <div class="post-description">
                {{ item.description }}
            </div>
            <a href="">Đọc thêm</a>
        </li>
    </ol>
</template>

<script>
export default {
    setup:  function() {
        return {
        }
    },
    data: function() {
        return {
            news: []
        }
    },
    mounted: async function() {
        await new Promise((resolve) => {
            setTimeout(() => {
                let news = []
                for(let i = 0 ; i < 5; i++) {
                    news.push({
                        id: 1,
                        title: "Top News " + i,
                        description: `
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque dolore at dolorem perspiciatis porro iste qui voluptate molestiae aliquid unde? Iste maxime nulla maiores consequuntur, nesciunt quo consectetur eum itaque.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque dolore at dolorem perspiciatis porro iste qui voluptate molestiae aliquid unde? Iste maxime nulla maiores consequuntur, nesciunt quo consectetur eum itaque.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque dolore at dolorem perspiciatis porro iste qui voluptate molestiae aliquid unde? Iste maxime nulla maiores consequuntur, nesciunt quo consectetur eum itaque.
                        `
                    })
                    this.news = news
                }
                resolve()
            }, 2000)
        })
    }
}
</script>

<style scoped>
    ::v-global(body) {
        overflow-y: scroll !important;
    }
</style>