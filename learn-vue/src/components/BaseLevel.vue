<script>
export default {
    functional: true,
    inject: ['name'],
    props: {
        level: {
            type: Number,
            required: true
        },
        a: Number
    },
    render(h, context) {
        // slots、children共同点
        // 都能获取到默认插槽
        // 区别
        // 1、slots还可以获取具名插槽，children不能
        // 2、如果默认插槽有两种，slots获取带有default名字的默认插槽，如果只有不带名字的，也可以获取到该默认插槽
        // children只能获取到不带名字的默认插槽
        // console.log(context);
        const { props, slots, scopedSlots, data, parent, listeners, injections, children } = context;
        console.log(slots())
        // console.log(scopedSlots);
        // console.log(parent);
        // console.log(data)
        // console.log(data.on)
        console.log(children)

        const tag = `h${props.level}`;
        // return (
        //     <tag>
        //         { slots().default }
        //         标题
        //         { slots().header }
        //         { scopedSlots.content({
        //             msg: 'hello vue'
        //         }) }
        //         { injections.name }
        //         { children }
        //     </tag>
        // )
        return <div></div>
        // return (
        //     <div>{ slots().header }</div>
        // )
    }
}
</script>