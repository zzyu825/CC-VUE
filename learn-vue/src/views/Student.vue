<template>
    <div class="student">
        <student-add />
        <hr>
        <student-list />
    </div>
</template>

<script>
import StudentAdd from '@/components/StudentAdd';
import StudentList from '@/components/StudentList';

export default {
    components: {
        StudentAdd,
        StudentList
    },
    data() {
        return {
            list: []
        }
    },
    beforeRouteEnter(to, from, next) {  
        // console.log(this);
        // this.$axios
        // console.log('beforeRouteEnter');
        next(vm => {
            // console.log(vm);
            // 数据请求
        });
    },
    // beforeRouteUpdate(to, from, next) {
    //     console.log('beforeRouteUpdate');
    //     next();
    // },
    beforeRouteLeave(to, from, next) {
        // console.log('beforeRouteLeave');
        next();
    }

}
</script>