<template>
    <teleport to='body'>
        <div :class="{ myModal: true, isShow: isShow }">
            <slot name="introduceString">
                <h1>Chào mừng bạn đến với web nghe nhạc của Nhóm 5</h1>
            </slot>
            <img src="../assets/91f5ce6e7be20ac41c088ef8fac9a776.gif" alt="" srcset="">
            <!-- <div>{{ isShow }} Đây là một Modal</div> -->
            <div class="group-feedback">
                <suspense>
                    <template #default>
                        <comments />
                    </template>
                    <template #fallback>
                        <div>
                            Loading...
                        </div>
                    </template>
                </suspense>
            </div>
            <div>
                <button class="btn btn-modal" v-on:click="hideModal()">Nhấn để đóng lại</button>
            </div>
        </div>
    </teleport>
</template>

<script>
// import { defineAsyncComponent } from 'vue'
import comments from './Comments'
export default {
    props: ['isShow', 'hideModal'],
    components: {
        // comments: defineAsyncComponent(() => import ('./Comments'))
        comments
    }
}
</script>

<style>
    .myModal {
        display: none;
    }
    .myModal.isShow {
        display: block;
        position: absolute;
        width: 900px;
        z-index: 99999999;
        background-color: #fff;
        border: 5px solid #111;
        padding: 30px;
        text-align: center;
        animation: zoomOut 0.5s ease-in-out both
    }
    @keyframes zoomOut {
        0% {
            left: 0;
            top: 0;
            transform: scale(0) translate(-50%, -50%);
        }
        100%{
            left: 50%;
            top: 50%;
            transform: scale(1) translate(-50%, -50%);
        }
    }
    .btn-modal {
        border: 1px solid blue;
        border-radius: 30px;
        margin: 20px 0px !important;
    }
</style>

<style scoped>
    ::v-global(body) {
        background-image: url("../assets/50-Beautiful-and-Minimalist-Presentation-Backgrounds-03.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    ::v-slotted(#tag) {
        background-color: #111;
        color: #fff;
        padding: 4px;
        border-radius: 10px;
        display: inline-block;
        margin: 8px 0px;
    }
    ::v-slotted(.linkMember) {
        color: #003c8f;
        font-weight: bold;
        margin-bottom: 10px;
    }
    ::v-slotted(p) {
        font-size: 30px;
    }
</style>