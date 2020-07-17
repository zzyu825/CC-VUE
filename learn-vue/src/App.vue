<template>
  <div id="app">
    <div class="nav-box">
      <div class="logo" @click="handel">CC教育</div>
      <!-- <router-link class="logo" to="/home">CC教育</router-link> -->
      <div class="nav-list">
        <router-link to="/home">首页</router-link>
        <router-link to="/learn">课程学习</router-link>
        <router-link to="/student">学员展示</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/activity">社区</router-link>
      </div>
    </div>
    <div class="container">
      <transition>
        <router-view></router-view>
      </transition>
      <router-view name="student"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    handel() {
      // console.log(this.$router);
      // console.log(this.$route);
      // ['/a', '/b', '/home']
      // ['/a', '/home']
      this.$router.push('home');
      
      // this.$router.replace('home');
      // this.$router.go(0);
    }
  }
}
</script>

<style scoped>
@import url('./assets/reset.css');

#app {
  overflow: hidden;
}

.nav-box {
  display: flex;
  justify-content: space-around;
  height: 60px;
  line-height: 60px;
  background-color: #3385ff;
}
.nav-box .logo {
  color: #fff;
}
.nav-box a {
  text-decoration: none;
}
.nav-box .nav-list a {
  margin-left: 40px;
  color: #fff;
  text-decoration: none;
}
/* .nav-list a.abc {
  font-weight: bold;
} */
.nav-list a.router-link-active {
  font-weight: bold;
}
.container {
  margin-top: 60px;
  padding-left: 200px;
  padding-right: 200px;
}

.v-enter {
  transform: translateX(1000px);
}
.v-enter-active {
  transition: all .3s;
}
.v-enter-to {
  transform: translateX(0px);
}
</style>

