var getCarryPersonInfoData = public_url + 'data/app/f-gover-approval/56020-1/1carry-person-info.json';
var batchUploadRelicData = public_url + 'data/app/f-gover-approval/56020-1/batchUploadRelic.json';

var getCarryPersonInfoModal = public_url + 'app/f-gover-approval/56020-1/include/1carry-person-info-modal.html';
var batchUploadRelicModal = public_url + 'app/f-gover-approval/56020-1/include/batchUploadRelic-modal.html';
$(document).ready(function () {
    // 获取列表
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrApplyInfo/getApplyList',
            async: true,
            data: JSON.stringify({
                applyStatus: 1,
                token: getData("token"),
                pageNumber: 1,
                pageSize: 20,
                carryUser: "",
                inOutClass: 1
            })
        })
        .turn('buildDepartApplyTable')
        .start();


    $("#cmx-carry-person").unbind("click");
    $("#cmx-carry-person").bind("click", function () {
       
        $("#cmx-carry-person-modal").empty().load(getCarryPersonInfoModal, function () {
            $('.cmx-save-btn').show();
            $('#cmx-carry-person-info').off('show.bs.modal');
            $('#cmx-carry-person-info').on('show.bs.modal', function () {
                $('#cmx-carrypersoninfo').empty();
                get_autoForm();
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
                $('#carrierApplication').click(function () {
                    var temp_flag = checkFormLength('#cmx-carrypersoninfo');
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
                        'destination': $("#cmx-1-Destination").val(),
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
                            url: api_ea + '/eaScrApplyInfo/insertApply',
                            data: JSON.stringify({
                                token: getData("token"),
                                formData: formData
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

    })

});





