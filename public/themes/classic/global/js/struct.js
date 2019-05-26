/**
 * @Author: yuhao
 * @Created time: 2017-09-24.
 */

// 表格的一些格式化内容转换
var dataFormatD = {
    type: {
        "":"无",
        "[0]": "Android",
        "[1]": "IOS",
        "[2]": "Win",
        "[3]": "Linux"
    },
    scanstate: {
        "":"无",
        "[0]": "未扫描",
        "[1]": "已扫描"
    },
    simstate: {
        "":"无",
        "[0]": "SIM_STATE_UNKNOWN",
        "[1]": "SIM_STATE_ABSENT",
        "[2]": "SIM_STATE_PIN_REQUIRED",
        "[3]": "SIM_STATE_PUK_REQUIRED",
        "[4]": "SIM_STATE_NETWORK_LOCKED",
        "[5]": "SIM_STATE_READY",
        "[6]": "SIM_STATE_NOT_READY",
        "[7]": "SIM_STATE_PERM_DISABLED",
        "[8]": "SIM_STATE_CARD_IO_ERROR"
    },
    dataactivity: {
        "":"无",
        "[0]": "DATA_ACTIVITY_NONE",
        "[1]": "DATA_ACTIVITY_IN",
        "[2]": "DATA_ACTIVITY_OUT",
        "[3]": "DATA_ACTIVITY_INOUT",
        "[4]": "DATA_ACTIVITY_DORMANT"
    },
    datastate: {
        "":"无",
        "[0]": "DATA_UNKNOWN",
        "[1]": "DATA_DISCONNECTED",
        "[2]": "DATA_CONNECTING",
        "[3]": "DATA_CONNECTED",
        "[4]": "DATA_SUSPENDED"
    },
    isroot: {
        "":"无",
        "[0]": "未知",
        "[1]": "是",
        "[2]": "否"
    },
    isableadb: {
        "":"无",
        "[0]": "未知",
        "[1]": "开始",
        "[2]": "关闭"
    },
    networktype: {
        "":"无",
        "[0]": "NETWORK_TYPE_UNKNOWN",
        "[1]": "NETWORK_TYPE_GPRS",
        "[2]": "NETWORK_TYPE_EDGE",
        "[3]": "NETWORK_TYPE_UMTS",
        "[4]": "NETWORK_TYPE_CDMA",
        "[5]": "NETWORK_TYPE_EVDO_0",
        "[6]": "NETWORK_TYPE_EVDO_A",
        "[7]": "NETWORK_TYPE_1xRTT",
        "[8]": "NETWORK_TYPE_HSDPA",
        "[9]": "NETWORK_TYPE_HSUPA",
        "[10]": "NETWORK_TYPE_HSPA",
        "[11]": "NETWORK_TYPE_IDEN",
        "[12]": "NETWORK_TYPE_EVDO_B",
        "[13]": "NETWORK_TYPE_LTE",
        "[14]": "NETWORK_TYPE_EHRPD",
        "[15]": "NETWORK_TYPE_HSPAP",
        "[16]": "NETWORK_TYPE_GSM",
        "[17]": "NETWORK_TYPE_TD_SCDMA",
        "[18]": "NETWORK_TYPE_IWLAN"
    },
    state: {
        "":"无",
        "[0]": "正常",
        "[1]": "待审核",
        "[2]": "冻结"
    },
    online:{
        "":"无",
        "[0]":"不在线",
        "[1]":"在线"
    },
    arr: function(arr,option){
        if(arr.length==0){
            return '';
        }else{
            return arr[0][option];
        }
    }
};
cmx.g.regist("dataFormatD",dataFormatD);

