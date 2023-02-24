<template>
  <div>
    <input
      type="text"
      v-model="state.phone"
      class="phone"
      placeholder="请输入手机号码"
    />
    <input
      type="text"
      v-model="state.password"
      class="password"
      placeholder="请输入密码"
    />
    <button class="btn" @click="Login">登录</button>
    <div class="test">999</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const state = reactive({
  phone: "",
  password: "",
});
async function Login() {
  let res = await store.dispatch("getLogin", {
    phone: state.phone,
    password: state.password,
  });
  console.log(res);
  if (res.code === 200) {
    router.push("/InfoUser");
  }
}
</script>

<style lang="less" scoped>
.test {
  position: absolute;
  left: 30%;
  width: 100px;
  height: 100px;
  background-color: aqua;
  border-radius: 50%;
  animation: tea 5s linear infinite ;
}
// .test:hover{
//     position: absolute;
//     left: 30%;
//     width: 100px;
//     height: 100px;
//     background-color: aqua;
//     border-radius: 30px;
// }
@keyframes tea {
  0% {
    border-radius: 50%;
  }
  25% {
    border-radius: 40%;
  }
  50% {
    border-radius: 30%;
  }
  75% {
    border-radius: 40%;
  }
  100% {
    border-radius: 50%;
  }
}
</style>