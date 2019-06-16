const tasks = [
    {
        orderName: "百度IFE项目",
        children: [
            {
                taskName: "task1",
                children: [
                    {
                        todoName: "to-do 1",
                        time: "2015-04-28",
                        content: "完成task1的编码工作 todo1",
                        completed: false
                    },
                    {
                        todoName: "to-do 2",
                        time: "2015-04-28",
                        content: "完成task1的编码工作 todo2",
                        completed: false
                    },
                    {
                        todoName: "to-do 3",
                        time: "2015-04-29",
                        content: "完成task1的编码工作 todo3",
                        completed: false
                    },
                    {
                        todoName: "to-do 4",
                        time: "2015-04-29",
                        content: "完成task1的编码工作 todo4",
                        completed: false
                    },
                    {
                        todoName: "to-do 5",
                        time: "2015-04-30",
                        content: "完成task1的编码工作 todo5",
                        completed: false
                    },
                    {
                        todoName: "to-do 6",
                        time: "2015-04-30",
                        content: "完成task1的编码工作 todo6",
                        completed: false
                    },
                    {
                        todoName: "to-do 7",
                        time: "2015-05-04",
                        content: "完成task1的编码工作 todo7",
                        completed: true
                    }
                ]
            },
            {
                taskName: "task2",
                children: [
                    {
                        todoName: "to-do 1",
                        time: "2015-04-28",
                        content: "完成task2的编码工作 todo1",
                        completed: false
                    },
                    {
                        todoName: "to-do 2",
                        time: "2015-04-28",
                        content: "完成task2的编码工作 todo2",
                        completed: true
                    },
                    {
                        todoName: "to-do 3",
                        time: "2015-05-01",
                        content: "完成task2的编码工作 todo3",
                        completed: false
                    },
                    {
                        todoName: "to-do 4",
                        time: "2015-05-05",
                        content: "完成task2的编码工作 todo4",
                        completed: false
                    },
                    {
                        todoName: "to-do 5",
                        time: "2015-05-10",
                        content: "完成task1的编码工作 todo5",
                        completed: false
                    }
                ]
            }
        ]
    },
    {
        orderName: "毕业设计",
        children: [
            {
                taskName: "task3",
                children: [
                    {
                        todoName: "to-do 1",
                        time: "2015-04-28",
                        content: "完成task3的编码工作 todo1",
                        completed: false
                    },
                    {
                        todoName: "to-do 2",
                        time: "2015-04-20",
                        content: "完成task3的编码工作 todo2",
                        completed: true
                    },
                ]
            }
        ]
    },
    {
        orderName: "社团活动",
        children: []
    },
    {
        orderName: "家庭生活",
        children: []
    },
    {
        orderName: "默认分类",
        children: []
    }
];

export default tasks;
