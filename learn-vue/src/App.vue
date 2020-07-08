<template>
  <base-level :level="3" :a="1" @click="fn">
    <template #header>
      <p>具名标题</p>
    </template>
    <template #content="props">
      <p>{{ props.msg }}</p>
    </template>
    <template #default>
      <p>默认标题</p>
    </template>
    <p>
      默认插槽，不带名字
    </p>
    <!-- <template v-slot:header>
      <p>
        first
      </p>
    </template>
    <p>second</p> -->
  </base-level>
</template>
<script>
import BaseLevel from './components/BaseLevel'
export default {
  provide() {
    return {
      name: 'abc'
    }
  },
  data() {
    return {
      a: 1
    }
  },
  methods: {
    fn() {
      console.log(1)
    }
  },
  components: {
    BaseLevel
  }
}
</script>

