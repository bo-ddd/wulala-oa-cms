<script setup lang="ts">
let avatarName = sessionStorage.getItem('avatarName')
let content = sessionStorage.getItem('content')
let title = sessionStorage.getItem('title')
</script>

<template>
    <div class="body">
        <div class="content">
            <div class="content_l clearfix">
                <h3>{{ title }}</h3>
                <p class="deeppink">{{ avatarName }}</p>
                <p class="cc">{{ content }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

h3{
    margin: 20px 0;
}

.body {
    width: 100%;
    height: 100%;
    display: inline-block;
    background: url(@/assets/images/6a947018821f45f9119b6cfd3cd88bad.png) no-repeat;
    background-size: 100%;
}

.content {
    width: 600px;
    margin: 200px auto 0 auto;
    border-radius: 10px;
    background-color: rgba(236, 236, 236, 0.59);
    transition: all 1.0s;
}

.content:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.52);
}

.content_l {
    text-align: center;
}
.cc {
    width: 550px;
    height: 300px;
    margin: 0 auto;
    margin-top: 10px;
    color: #1F2023;
    font-size: 18px;
}
.deeppink {
    color: deeppink;
}
</style>