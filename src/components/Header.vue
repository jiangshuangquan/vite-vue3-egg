<template>
    <div class="header">
        <div class="title" @click="router.push('/')">Vite2.x + Vue3.x + TypeScript</div>
        <div class="go-github" @click="goGitHub">GitHub</div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goGitHub = () => {
    window.open('https://github.com/jiangshuangquan/vite-vue3-egg')
}
</script>

<style scoped lang="less">
.header {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    font-weight: bold;

    .title {
        font-size: 20px;
        cursor: pointer;
    }

    .go-github {
        cursor: pointer;
        font-size: 16px;

        .icon {
            font-size: 20px;
        }
    }
}
</style>
