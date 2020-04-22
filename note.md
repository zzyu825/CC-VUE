# 练习_调查问卷
```js
questionList: [
  {
    type: 'short',
    title: '1.请问你的姓名是？',
    chooseList: null,
    answer: '',
    id: 0
  },
  {
    type: 'single',
    title: '2.请问您的性别是？',
    chooseList: [
      '男',
      '女',
      '保密',
    ],
    answer: '',
    id: 1,
  },
  {
    type: 'multiple',
    title: '3. 请选择您的兴趣爱好：',
    chooseList: [
      '看书',
      '游泳',
      '跑步',
      '看电影',
      '听音乐',
    ],
    answer: [],
    id: 2,
  },
  {
    type: 'long',
    title: '4. 请介绍一下自己:',
    chooseList: null,
    answer: '',
    id: 3,
  },
]
```