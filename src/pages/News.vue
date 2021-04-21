<template>
  <div class="container">
      <list-news></list-news>
      <list-news2></list-news2>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '../components/Loading'

export default {
    components: { 
        ListNews: defineAsyncComponent({
            loader: () => {
                console.log('loader new1')
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(import('../components/ListNews'))
                    }, 2000)
                })
            },
            loadingComponent: LoadingComponent,
        }),
        ListNews2: defineAsyncComponent({
            loader: () => {
                console.log('loader new1')
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(import('../components/ListNews2'))
                    }, 5000)
                })
            },
            loadingComponent: LoadingComponent,
        }),
    //   ListNews: defineAsyncComponent(() => {
    //       return import('../components/ListNews')
    //   })
    },
    mounted: function() {
        // in ra query
        console.log(this.$route.query)
    }
}
</script>

<style>

</style>