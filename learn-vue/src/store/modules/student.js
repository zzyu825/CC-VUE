export default {
    state: {
        studentList: [],
    },
    getters: {
        studentCount: state => state.studentList.length,
        studentFilter: state => state.studentList.filter(stu => stu.age < 18)
    }
}