// 全局变量
var _constant = {
    testApi: 'http://192.168.10.204:8050',
    platformKey: 'project_platform',
    loginKey: 'staff_center_login_key',
    powerCode: 'power_code',
    // 卡材质
    materials: [
        {
            id: 1,
            name: '卡材质'
        },
        {
            id: 2,
            name: '劵材质'
        }
    ],
    // 是否标准
    standards: [
        {
            id: 1,
            name: '标准'
        },
        {
            id: 2,
            name: '非标准'
        }
    ],
    // 状态
    states: [
        {
            id: 1,
            name: '开启'
        },
        {
            id: 2,
            name: '冻结'
        }
    ],
    // 是否制作卡套
    isMakeCovers: [
        {
            id: 1,
            name: '是'
        },
        {
            id: 2,
            name: '否'
        }
    ],
    // 入库状态
    enterStates: [
        {
            id: 1,
            name: '待入库'
        },
        {
            id: 2,
            name: '已入库'
        }
    ],
    // 出库状态
    outStates: [
        {
            id: 1,
            name: '待出库'
        },
        {
            id: 2,
            name: '已出库'
        },
        {
            id: 3,
            name: '待补卡'
        }
    ],
    // 作废类型
    invalidTypes: [
        {
            id: 2,
            name: '可再售'
        },
        {
            id: 3,
            name: '不可再售'
        }
    ],
    // 储值类型
    storedTypes: [
        {
            id: 1,
            name: '点卡'
        },
        {
            id: 2,
            name: '次卡'
        }
    ],
    // 补卡类型
    supplementTypes: [
        {
            id: 1,
            name: '正品库存'
        },
        {
            id: 2,
            name: '废卡可售库存'
        }
    ],
    // 支持中影线下刷卡
    isPayByCards: [
        {
            id: 2,
            name: '否'
        },
        {
            id: 1,
            name: '是'
        }
    ]
}

export default _constant
