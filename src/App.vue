<template>
  <XtxButton type="primary">msg</XtxButton>
  <!--  <nav>-->
  <!--    <router-link to="/">Home</router-link>-->
  <!--    |-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </nav>-->
  <!--  <router-view/>-->
  <div>
    <p>{{ $store.state.user.profile }}</p>
    <button @click="$store.commit('user/setToken', Math.random() * 10)">修改token</button>
  </div>
</template>
