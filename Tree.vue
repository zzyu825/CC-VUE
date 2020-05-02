<template>
    <ul class="tree">
        <li 
            class="tree-node"
            v-for="(item, index) of data"
            :key="item[defaultProps.label]"
        >
            <i 
                class="iconfont"
                :class="[show[index] ? 'icon-down' : 'icon-right']"
                v-if="item[defaultProps.children]"
            ></i>
            <span
                class="node-label"
                @click="changeShow(index)"
            >
                {{ item[defaultProps.label] }}
            </span>
            <keep-alive>
                <base-tree 
                    :data="item[defaultProps.children]"
                    v-if="show[index] && item[defaultProps.children]"
                />
            </keep-alive>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'base-tree',
    props: {
        data: {
            type: Array,
            required: true
        },
        defaultProps: {
            type: Object,
            default: () => ({
                label: 'label',
                children: 'children',
            })
        }
    },
    data() {
        return {
            // show: false
            show: []
        }
    },
    methods: {
        changeShow(i) {
            const flag = !this.show[i];
            // this.show = !this.show;
            // this.show[i] = true;
            // this.show.splice(i, 1, true);
            this.$set(this.show, i, flag);
        }
    }
}
</script>

<style scoped>
@import './assets/font.css';

li {
  list-style: none;
}

.tree-node {
  cursor: pointer;
}

.tree-node .iconfont {
  color: #c0c4cc;
  font-size: 12px;
  margin-right: 5px;
  vertical-align: middle;
}

.tree-node .node-label {
  font-size: 14px;
  color: #606266;
  vertical-align: middle;
}
</style>