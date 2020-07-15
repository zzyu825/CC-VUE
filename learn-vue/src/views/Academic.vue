<template>
    <div class="academic">
        <ul>
            <router-link 
                tag="li"
                v-for="question of questionList"
                :key="question.id"
                :to="{ name: 'question', params: { id: question.id } }"
            >
                {{ question.title }}
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questionList: []
        }
    },
    created() {
        this.$axios.get('/question').then(res => {
            this.questionList = res;
        });
    }
}
</script>

<style scoped>
li {
    margin-bottom: 15px;
    cursor: pointer;
}
li:hover {
    text-decoration: underline;
    color: #3385ff;
}
</style>