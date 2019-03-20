export default  {
    makePriceType:[
        {
            label: '全部',
            value: '',
            text: '全部'
        },
        {
            label: '已开票',
            value: 1,
            text: '已开票'
        },
        {
            label: '未开票',
            value: 0,
            text: '未开票'
        }
    ],
    closingFlagType:[
        {
            value: '',
            text: '全部'
        },{
            value: 0,
            text: '未交车'
        },
        {
            value: 1,
            text: '已交车'
        }
    ],
    orderTypes: [
        {
            value: 'NewCarIntentionOrderWfType',
            label: '意向'
        },{
            value: 'NewCarOrderWfType',
            label: '订单'
        },{
            value: 'NewCarContractWfType',
            label: '合同'
        },{
            value: 'NewCarRefuseWfType',
            label: '退订'
        }
    ],
    statusList:[
        {
            text: '待审批',
            value: 0,
            arr: [-1,-2],
        }, {
            text: '审批中',
            value: 1,
            arr: [0]
        }, {
            text: '审批通过',
            value: 2,
            arr: [1]
        }, {
            text: '全部',
            value: 3,
            arr: []
        }
    ]
}