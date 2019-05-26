//json url
var getApplyForExhibitionData = public_url + 'data/app/f-gover-approval/56020-4/1applyForExhibition.json';
var batchUploadRelicData = public_url + 'data/app/f-gover-approval/56020-1/batchUploadRelic.json';
// modal url
var getApplyForExhibitionModal = public_url + 'app/f-gover-approval/56020-4/include/1applyForExhibition-modal.html';
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
                inOutClass: 4
            })
        })
        .turn('buildDepartApplyTable')
        .start();

    // 展览申请
    $("#cmx-applyForExhibition").unbind("click");
    $("#cmx-applyForExhibition").bind("click", function () {
        new cmx.process().
        turn('initFiles', {
            'P0002approvalDocuments': '157'
        })
        .start();
        $("#cmx-applicationForExhibition-modal").empty();
        $("#cmx-applicationForExhibition-modal").load(getApplyForExhibitionModal, function () {
            $('.cmx-save-btn').show();
            $('#cmx-applyForExhibition-info').off('shown.bs.modal');
            $('#cmx-applyForExhibition-info').on('shown.bs.modal', function () {
                
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
                    if($('#cmx-1-IDCardType').val()=="X"&&$('#otherCard').val().length>20){
                        showAlert({
                            type:'info',
                            content:"证件名称的长度不能超过20"
                        })
                        return;
                    }
                    var formData = {
                        'carryUser': $("#cmx-1-CarryUser").val(),
                        'nationality': $("#cmx-1-Nationality").val(),
                        'custPurpose': $("#cmx-1-CustPurpose").val(),
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
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/insertTempComeExhibit',
                            data: JSON.stringify({
                                token: getData("token"),
                                formData: formData,
                                index: cmx.g.filesarray.get('157')[0]
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

