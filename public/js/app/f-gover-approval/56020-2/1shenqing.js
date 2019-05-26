//json url
var getCarryPersonInfoData = public_url + 'data/app/f-gover-approval/56020-2/1carry-person-info.json';
var getApplyForExhibitionData = public_url + 'data/app/f-gover-approval/56020-2/1applyForExhibition.json';
var batchUploadRelicData = public_url + 'data/app/f-gover-approval/56020-1/batchUploadRelic.json';
// modal url
var getCarryPersonInfoModal = public_url + 'app/f-gover-approval/56020-2/include/1carry-person-info-modal.html';
var getApplyForExhibitionModal = public_url + 'app/f-gover-approval/56020-2/include/1applyForExhibition-modal.html';
var batchUploadRelicModal = public_url + 'app/f-gover-approval/56020-1/include/batchUploadRelic-modal.html';
$(document).ready(function () {
    // 获取列表
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrApplyInfo/getApplyList',
            data: JSON.stringify({
                token: getData("token"),
                carryUser: "",
                pageNumber: 1,
                pageSize: 20,
                applyStatus: 1,
                inOutClass: 2
            })
        })
        .turn('buildDepartApplyTable')
        .start();
    // 个人携带申请    
    $("#cmx-carry-person").unbind("click");
    $("#cmx-carry-person").bind("click", function () {
        $("#cmx-carry-person-modal").empty().load(getCarryPersonInfoModal, function () {
            $('.cmx-save-btn').show();
            $('#cmx-carry-person-info').off('shown.bs.modal');
            $('#cmx-carry-person-info').on('shown.bs.modal', function () {
                $('#cmx-carrypersoninfo').empty();
                get_autoForm(getCarryPersonInfoData);
                $('#cmx-1-Nationality').selectpicker({
                    size: 'auto',
                    style: 'btn-transparent',
                    liveSearch: true
                });
                new cmx.process()
                    .turn('callajax', {
                        url: api_aa + '/user/getUserInfo',
                        data: {
                            token: getData('token'),
                        },
                        type: 'GET'
                    })
                    .turn(function (prevModelData, send, abort) {
                        $("#cmx-1-CarryUser").val(prevModelData.data.username);
                        $("#cmx-1-TelNO").val(prevModelData.data.phoneNo);
                        $("#cmx-1-IDNumber").val(prevModelData.data.idcard);
                    })
                    .start();
                //保存携运人申请信息
                $('#carrierApplication').unbind('click');
                $('#carrierApplication').bind('click', function () {
                    var temp_flag = checkFormLength('#cmx-carrypersoninfo');
                    if (!temp_flag) {
                        return;
                    }
                    if ($('#cmx-1-IDCardType').val() == "X" && $('#otherCard').val().length > 20) {
                        showAlert({
                            type: 'info',
                            content: "证件名称的长度不能超过20"
                        })
                        return;
                    }
                    var formData = {
                        'carryUser': $("#cmx-1-CarryUser").val(),
                        'nationality': $("#cmx-1-Nationality").val(),
                        'custPurpose': $("#cmx-1-CustPurpose").val(),
                        'turnDate': $("#cmx-1-Time").val(),
                        'customsId': $("#cmx-1-CustomsID").val(),
                        'telNo': $("#cmx-1-TelNO").val(),
                        'idcardType': $("#cmx-1-IDCardType").val(),
                        'idnumber': $("#cmx-1-IDNumber").val(),
                        'reviewInst': $("#cmx-1-ReviewInst").val(),
                        'address': $("#cmx-1-Address").val()
                    };
                    var otherCard = $('#otherCard').val();
                    if (!IsEmpty(otherCard)) {
                        formData.otherCard = otherCard;
                    }
                    console.log(formData);
                    btn_recovery('#carrierApplication');
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/insertTempEnterApply',
                            data: JSON.stringify({
                                token: getData("token"),
                                formData: formData,
                                inOutClass: 2
                            })
                        })
                        .turn('saveCarrierApplication')
                        .ccatch(function (msg) {
                        })
                        .cfinally(function () {
                        })
                        .start();
                });
            });
            $('#cmx-carry-person-info').modal('show');
        });
    });



    $("#cmx-applyForExhibition").unbind("click");
    $("#cmx-applyForExhibition").bind("click", function () {
        // 展览申请
        new cmx.process().
            turn('initFiles', {
                'P0002approvalDocuments': '100'
            })
            .start();
        $("#cmx-applicationForExhibition-modal").empty();
        $("#cmx-applicationForExhibition-modal").load(getApplyForExhibitionModal, function () {
            
            $('#cmx-applyForExhibition-info').off('shown.bs.modal');
            $('#cmx-applyForExhibition-info').on('shown.bs.modal', function () {
                $('.cmx-save-btn').show();
                $('#cmx-applyForExhibition-div').empty();
                get_autoForm(getApplyForExhibitionData);
                $('#cmx-1-Nationality').selectpicker({
                    size: 'auto',
                    style: 'btn-transparent',
                    liveSearch: true
                });
                new cmx.process()
                    .turn('callajax', {
                        url: api_aa + '/user/getUserInfo',
                        data: {
                            token: getData('token'),
                        },
                        type: 'GET'
                    })
                    .turn(function (prevModelData, send, abort) {
                        $("#cmx-1-CarryUser").val(prevModelData.data.username);
                        $("#cmx-1-TelNO").val(prevModelData.data.phoneNo);
                        $("#cmx-1-IDNumber").val(prevModelData.data.idcard);
                    })
                    .start();
                //保存展览申请信息
                $('#applyForExhibitionSave').click(function () {
                    var temp_flag = checkFormLength('#cmx-applyForExhibition-div');
                    if (!temp_flag) {
                        return;
                    }
                    if ($('#cmx-1-IDCardType').val() == "X" && $('#otherCard').val().length > 20) {
                        showAlert({
                            type: 'info',
                            content: "证件名称的长度不能超过20"
                        })
                        return;
                    }
                    var formData = {
                        'carryUser': $("#cmx-1-CarryUser").val(),
                        'nationality': $("#cmx-1-Nationality").val(),
                        // 'custPurpose': $("#cmx-1-CustPurpose").val(),
                        'destination': $("#cmx-1-Destination").val(),
                        'turnDate': $("#cmx-1-Time").val(),
                        'customsId': $("#cmx-1-CustomsID").val(),
                        'telNo': $("#cmx-1-TelNO").val(),
                        'idcardType': $("#cmx-1-IDCardType").val(),
                        'idnumber': $("#cmx-1-IDNumber").val(),
                        'reviewInst': $("#cmx-1-ReviewInst").val(),
                        'address': $("#cmx-1-Address").val(),
                        'exhibitName': $("#cmx-z-name").val(),
                        'applyUnit': $("#cmx-z-unit").val(),
                        'dateBeg': $("#cmx-z-startTime").val(),
                        'dateEnd': $("#cmx-z-endTime").val(),
                        'leader': $("#cmx-z-director").val(),
                        'manageUnit': $("#cmx-z-competentUnit").val(),
                        'externalInst': $("#cmx-z-externalInstitution").val(),
                        'organizer': $("#cmx-z-organizer").val(),
                        'permitNo': $("#cmx-z-licenseNumber").val(),
                        'exhibitAddr': $("#cmx-z-exhibitionVenue").val()
                    };
                    var otherCard = $('#otherCard').val();
                    if (!IsEmpty(otherCard)) {
                        formData.otherCard = otherCard;
                    }
                    console.log(formData);
                    var index = cmx.g.filesarray.get('100')[0];
                    if (IsEmpty(index)) {
                        index = ''
                    }
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/insertTempEnterExhibit',
                            data: JSON.stringify({
                                token: getData("token"),
                                formData: formData,
                                index: index
                            })
                        })
                        .turn('saveCarrierApplication')
                        .ccatch(function (msg) {
                        })
                        .cfinally(function () {
                        })
                        .start();
                });

            });
            $('#cmx-applyForExhibition-info').modal('show');
        });

    });



});

