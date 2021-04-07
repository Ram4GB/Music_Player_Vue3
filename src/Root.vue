<template>
  <MainLayout>
    <router-view></router-view>
  </MainLayout>
</template>

<script>
import MainLayout from './hocs/MainLayout'
export default {
  components: {
    MainLayout
  }
}
</script>