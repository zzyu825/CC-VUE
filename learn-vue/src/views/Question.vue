<template>
    <div class="question" v-if="question">
        <div class="main">问题：{{ question.title }}</div>
        <div class="other">
            <div
                v-for="item of otherQuestinoList"
                :key="item.id"
                :class="item.type"
                :title="item.title"
                @click="handel(item.id)"
            >
                {{ item.title }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteUpdate(to, from, next) {
        // console.log(this);
        // console.log('beforeRouteUpdate');
        next();
    },
    // beforeRouteLeave(to, from, next) {
    //     const flag = window.confirm('确定要离开吗？');
    //     flag ? next() : next(false);
    // },
    props: {
        id: {
            type: [String, Number],
            required: true
        },
        name: {
            type: String,
            default: 'question'
        }
    },
    data() {
        return {
            question: null
        }
    },
    created() {
        // this.getData();
    },
    computed: {
        otherQuestinoList() {
            const arr = [];
            if (this.question.prev) {
                const { prev, prevId } = this.question;
                arr.push({
                    title: prev,
                    id: prevId,
                    type: 'prev'
                })
            }
            if (this.question.next) {
                const { next, nextId } = this.question;
                arr.push({
                    title: next,
                    id: nextId,
                    type: 'next'
                })
            }
            return arr;
        }
    },
    watch: {
        '$route': {
            handler() {
                this.getData();
            },
            immediate: true
        }
    },
    methods: {
        getData() {
            // const { id } = this.$route.params;
            // console.log(this.$route);
            // console.log(this.id, this.name);
            const { id } = this;
            this.$axios.get(`/question/${id}`).then(res => {
                this.question = res;
            });
        },
        handel(id) {
            // const { name } = this.$route;
            const { name } = this;

            this.$router.push({
                name,
                params: {
                    id
                }
            })
        }
    }
}
</script>

<style scoped>
.main {
    margin-bottom: 200px;
}
.prev {
    float: left;
}
.next {
    float: right;
}
.prev,
.next {
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #3385ff;
    text-decoration: underline;
    cursor: pointer;
}
</style>