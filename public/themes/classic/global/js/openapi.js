//全局变量
//http://gl.sach.gov.cn:9090/oauth/uias_login?appCode=SachADM&gotoUrl=http%3a%2f%2fgl.sach.gov.cn%2fca.html&p01=asdjhk
var sysType = 'debuger';
//var api_product = 'http://gl.sach.gov.cn:9090'; //这是生产环境的IP！！
var api_product = 'http://202.41.241.161:9090'; //这是测试环境的IP！！
var api_ea;
var api_aa;
var api_cm;
var api_dm;
var api_im;
var api_is;
var api_io;
if (sysType == 'product') {
    api_ea = api_product + '/ea';
    api_aa = api_product + '/aa';
    api_cm = api_product + '/cm';
    api_dm = api_product + '/zuul/dm';
    api_im = api_product + '/im';
    api_is = api_product + '/is';
    api_io = api_product + '/io';
} else {
    api_ea = 'http://192.168.211.152:7070';
    api_aa = 'http://192.168.209.220:5050';
    api_cm = 'http://192.168.209.220:6060';
    api_dm = 'http://192.168.209.220:4040';
    api_im = 'http://192.168.209.220:3030';
    api_is = 'http://192.168.209.220:1010';
    api_io = 'http://192.168.209.220:2020';
}

var LoadFileUrl = api_dm + "/DmFileInfoController/loadWebOfficeFile";
var SaveFileUrl = api_dm + "/DmFileInfoController/saveWebOfficeFile";
var WebApiUrl = api_dm + "/rest";

var public_url;
if (sysType == 'product') {
    // public_url = "http://gl.sach.gov.cn/";
    // public_url = "http://202.41.241.161/";
    public_url = '/';
} else {
    public_url = '/';
}

var weboffice_url = public_url + 'edit.html?p=';
var weboffice_url = public_url + 'edit.html?p=';
var swf = public_url + 'vendor/webuploder/Uploader.swf';

var api_setcache = public_url + 'extra/setcache'; //TODO
var api_getcache = public_url + 'extra/getcache'; //TODO

//获取功能权限
var api_getuserfunc = api_aa + '/user/getUserFunc';
//登出
var api_logout = api_aa + '/logout/logout';
var api_loginCa = api_aa + '/login/loginCa';
// 文件获取上传

var getFile = api_dm + '/DmFileInfoController/downloadFile?fileIndex=';
var getPifuFile = api_ea + '/eaPubFile/createPdfForMainBody?';
var putFile = api_dm + '/DmFileInfoController/upload';
var getFileList = api_ea + '/eaPubFile/getFilesListByParam';

var loadWebOfficeFile = api_ea + '/DmFileInfoController/loadWebOfficeFile'; //weboffice
var saveWebOfficeFile = api_ea + '/DmFileInfoController/saveWebOfficeFile'; //weboffice

var getDataDicFromRedis = api_dm + '/dmDatadic/getDataDicFromRedis';

//国局省局相对人待办列表
var api_getNeedToDo = api_ea + "/business/taskList"; //待办
var api_getHaveToDo = api_ea + "/business/haveToDoList"; //已办
var api_getHandleover = api_ea + "/business/taskCompleteProcessList";//办结
var api_getHostToDo = api_ea + "/business/hostList"; //主办
var api_getOverseeToDo = api_ea + "/business/superviseList"; //备案查看，查看省局审批报备事项
var api_getSuperviseList = api_ea + "/business/querySuperviseList"; //督办,局长、司长、处长查看所有审批事项
var api_historicalList = api_ea + "/business/taskSearchingList"; //已办结，查看原系统办结数据 taskCompleteProcessList
var api_getKaoguList = api_ea + "/eaAeAcpNorApply/getPageDataByParam"; //考古处查看56008-b专家已处理列表

//省局查看本省所有业务（包含申请、未办结和已办结的）
var api_seeAll = api_ea + '/business/getProvincialList'; //查看
var api_getUndoPageDataForPro = api_ea + '/eaPubProvinceopinion/getUndoPageDataForPro'; //审查


//专家待办列表
var api_getInspectionNeedToDo = api_ea + "/eaPubExamopinion/getUndoPageDataByForExport"; //待办
var api_getInspectionHaveToDo = api_ea + "/eaPubExamopinion/getDonePageDataByForExport"; //已办
var api_getInspectionCheckToDo = api_ea + "/eaPubApplyprecheck/getPageDataByParam"; //检查

var api_getProjectNumByUser = api_ea + "/eaPubAppriteminfo/selectListByRoles";
var api_getSelectListForSachUser = api_ea + "/eaPubAppriteminfo/selectListForSachUser";
var api_getProjectNumForExport = api_ea + "/eaPubAppriteminfo/selectListForExport";
var api_getProjectNumForProvince = api_ea + "/eaPubAppriteminfo/selectListForProvince";

//转发文发文对比
var getContrastList = api_ea + '/eaPubBatchFileUpdHis/getListByProjectNumApplyID'; //获取对比列表
var getContrastContent = api_ea + '/eaPubBatchFileUpdHis/getTop2List'; // 获取对比详情
var getCompareList = api_ea + '/eaPubBatchFileUpdHis/getCompareListByProjectNumApplyID'; //获取修改列表

/*******公共页面*******/
var public_html_selectRelicsProtection = public_url + "app/f-gover-approval/include/apply-modal.html";
//var public_html_protectModal = public_url + "app/f-gover-approval/include/protect-modal.html";
//var public_html_projectList = public_url + "app/f-gover-approval/include/project-list.html";

// 安全防护工程模态框
//已批准的计划模态框
var public_html_approvedPlan = public_url + "app/f-gover-approval/include/approved-plan.html";
//单位列表模态框
var public_html_unitListCRR = public_url + "app/f-gover-approval/include/unit-listCRR.html"; //可移动
var public_html_unitListCRP = public_url + "app/f-gover-approval/include/unit-listCRP.html"; //不可移动
var public_html_unitListSP = public_url + "app/f-gover-approval/include/unit-listSP.html"; //安防
//已批准的计划JSON文件
//var api_getApprovedPlan = public_url + "data/app/f-gover-approval/approved-plan.json";

var getDepartRegisterAddRelicData = public_url + 'data/app/f-administrative-platform-protal/depart-register-add-relic.json';

var getDepartRegisterEditRelicData = public_url + 'data/app/f-administrative-platform-protal/depart-register-edit-relic.json';
var getDepartIdentifyData = public_url + 'data/app/f-administrative-platform-protal/depart-identify.json';
var getDepartExamineApproveAddRelicData = public_url + 'data/app/f-administrative-platform-protal/depart-examine-approve-add-relic.json';

var getMoveRelicAddData = public_url + 'data/app/f-gover-approval/56015/move-relic-protect-data.json';
//var getMoveRelicTextareaData = public_url + 'data/app/f-gover-approval/56015/move-relic-protect-textarea.json';

var getInstitutionListModal = public_url + 'app/f-gover-approval/56015/include/institution-list-modal.html';

//var getSelectRelicModal = public_url + 'app/f-gover-approval/56015/include/select-relic-modal.html';
var getMoveRelicTableModal = public_url + 'app/f-gover-approval/56015/include/move-relic-table-modal.html';
//var get56008Modal = public_url + 'app/f-gover-approval/include/56008-modal.html';
//56016选择文物模态框
var get56016EditDetailModal = public_url + 'app/f-gover-approval/56016/include/56016-relic-detail-modal-edit.html';
//56016新加详情模态框表单
var get56016DetailFormData = public_url + 'data/app/f-gover-approval/56016/relic-detail.json';
//56016编辑模态框表单
var get56016EditDetailFormData = public_url + 'data/app/f-gover-approval/56016/relic-detail-edit.json';

var get56016DetailModal = public_url + 'app/f-gover-approval/56016/include/56016-relic-detail-modal.html';

//获取博物馆名称（56015，56016）
var getMuseumModal = public_url + 'app/f-gover-approval/include/museum-list-modal.html';

var get56015SelectRelicModal = public_url + 'app/f-gover-approval/56015/include/56015-select-relic-modal.html';
//56016
var get56016Table = public_url + 'app/f-gover-approval/56016/include/relic-info-table.html';

//获取专家模态框
var getExpertList = public_url + 'app/f-gover-approval/nation/include/selected-expert-modal.html';
//var getThirdPartyList = public_url + 'app/f-gover-approval/56012/include/evaluate-institution.html';

//获取司秘选择人员模态框
var getSelectPerson = public_url + 'app/f-gover-approval/nation/include/select-person-modal.html';
var getSelectLeader = public_url + 'app/f-gover-approval/nation/include/select-leader-modal.html';
var getSelectRole = public_url + 'app/f-gover-approval/nation/include/select-role-modal.html';
//获取选择机构模态框
var getThirdInstitutionList = public_url + 'app/f-gover-approval/nation/include/evaluate-institution-modal.html';

//56014-a选择文物保护单位模态框
var get56014aChooseUnitModal = public_url + 'app/f-gover-approval/56014/include/56014-a-chooseunit-modal.html';
//56014-a编辑文物详情模态框
var get56014aEditRelicModal = public_url + 'app/f-gover-approval/56014/include/56014-a-editrelic-modal.html';

//56008-b选择主申请单位模态框
var getMainUnitModal = public_url + 'app/f-gover-approval/56008/include/choose-mainunit-modal.html';
//56014-d批复文件模态框
var getReplyModal = public_url + 'app/f-gover-approval/56014/include/56014-d-reply-modal.html';
//博物馆专家意见选择文物模态框
var getExpertRelicModal = public_url + 'app/f-gover-approval/inspection/include/expert-select-relic-modal.html';
//转发文选择相关文件
var getRelatedFile = public_url + 'app/f-gover-approval/include/related-file.html';

//56020
var editRelicInfoModal = public_url + 'app/f-gover-approval/56020-1/include/1edit-relic-info-modal.html';
var getRelicInfoModal = public_url + 'app/f-gover-approval/56020-1/include/1relic-info-modal.html';
var getAddRelicData = public_url + 'data/app/f-gover-approval/56020-1/1relic-info.json';
var allRelicInfoModal = public_url + 'app/f-gover-approval/56020-1/include/all-relicInfo-modal.html';
var getWarnRelicModal = public_url + 'app/f-gover-approval/56020-1/include/warnRelicInfo-modal.html';
var getyuyueAcceptModal = public_url + 'app/f-gover-approval/56020-1/include/2accept-receipt-modal.html';
var geNoAcceptModal = public_url + 'app/f-gover-approval/56020-1/include/2noAccept-receipt-modal.html';
var gebushouliModal = public_url + 'app/f-gover-approval/56020-1/include/3bushouli-modal.html';
var geyicibuzhengModal = public_url + 'app/f-gover-approval/56020-1/include/3yicibuzheng-modal.html';
var getDepartDistributeHandlerModal = public_url + 'app/f-gover-approval/56020-1/include/4depart-distribute-handle-modal.html';
var getShenpiRelicData = public_url + 'data/app/f-gover-approval/56020-1/7shenpi-info.json';
var getPrintModal = public_url + 'app/f-gover-approval/56020-1/include/print-modal.html';
var getPrintData = public_url + 'data/app/f-gover-approval/56020-1/7print-modal.json';
var getAcceptanceNoticeModal = public_url + 'app/f-gover-approval/56020-1/include/acceptance-notice.html';


/*******行业综合管理*******/
//国局省局列表
var api_im_getNeedToDo = api_ea + "/businesspplan/taskList"; //待办
var api_im_getHaveToDo = api_ea + "/businesspplan/haveToDoList"; //已办
var api_im_getHostToDo = api_ea + "/businesspplan/hostList"; //主办
var api_im_getOverseeToDo = api_ea + "/businesspplan/superviseList"; //备案查看，查看省局审批报备事项
var api_im_getSuperviseList = api_ea + "/businesspplan/querySuperviseList"; //督办,局长、司长、处长查看所有审批事项
var api_im_historicalList = api_ea + "/businesspplan/taskSearchingList"; //查询检索
var api_im_seeAll = api_ea + '/businesspplan/getProvincialList'; //省局查看本省所有业务（包含申请、未办结和已办结的）

//文物进出境申请项点击携运人查看详情
//注意注意！！！！！！！public-model.js里面还有一份！
var getCarryDetailModal = public_url + 'app/f-gover-approval/56020-2/include/1carry-person-info-modal.html';
var getExhibitionDetailModal = public_url + 'app/f-gover-approval/56020-2/include/1applyForExhibition-modal.html';
var getCarryDetailData = public_url + 'data/app/f-gover-approval/56020-2/getCarryDetail.json';
var getExhibitionDetailData = public_url + 'data/app/f-gover-approval/56020-2/getExhibitionDetail.json';
