<script setup lang="ts">
</script>

<template>
    <div id="app">
        <div class="login-bar">
            <div class="login">
                <h1 class="title-login">Login</h1>
                <input class="account input mt-12" type="text" placeholder="账号">
                <input class="password input mt-14" type="password" placeholder="密码">
                <div class="button mt-40">GO</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#app {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/images/bg-login.png');
    background-size: cover;
}


.login-bar {
    width: 342px;
    height: 250px;
    border-radius: 10px;
    padding: 34px 40px;
    box-sizing: border-box;
    background: linear-gradient(to right bottom,
            rgba(255, 255, 255, .7),
            rgba(255, 255, 255, .5),
            rgba(255, 255, 255, .3));
    backdrop-filter: blur(10px);
    box-shadow: 0 0 20px rgb(248, 247, 247);
}

.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;

}



.title-login {
    font-size: 26px;
    font-weight: 700;
    user-select: none;
}



.button {
    width: 100%;
    padding: 10px 0;
    font-size: 10px;
    box-sizing: border-box;
    background: linear-gradient(to right,
            #a4a0fa, #ff8aab);
    user-select: none;
    color: white;

}

.input {
    padding: 8px 0;
    font-size: 10px;
    outline: none;
    border: 0;
    background-color: transparent;
    border-bottom: solid 1px #999cdd;

}
</style>
