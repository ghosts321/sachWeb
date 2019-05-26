// cmx.route.model({
//     index: 'buildRelicInfoModal',
//     handle: function(parameter, prevModelData, send, abort) {
//         $("#cmx-modalDiv4").load(get56015SelectRelicModal, function() {

//             $("#cmx-select-relic").off('shown.bs.modal');
//             $("#cmx-select-relic").on('shown.bs.modal', function() {
//                 /*展开查询条件 */
//                 $(".cmx-more-research").unbind("click", function() {});
//                 $(".cmx-more-research").bind("click", function() {
//                     $(".cmx-more-search-div").show();
//                     $(".cmx-pack-up").show();
//                     $(".cmx-more-research").hide();
//                 });
//                 /*收起查询条件 */
//                 $(".cmx-pack-up").unbind("click", function() {});
//                 $(".cmx-pack-up").bind("click", function() {
//                     $(".cmx-more-search-div").hide();
//                     $(".cmx-more-research").show();
//                     $(".cmx-pack-up").hide();
//                 });
//                 //选中某一行
//                 $("#cmx-relic-info-tbody tr").each(function(index) {
//                     var _self = $(this);
//                     $(this).unbind('click');
//                     $(this).bind('click', function() {
//                         $("#cmx-relic-info-tbody tr").each(function() {
//                             $(this).removeClass("active");
//                         })
//                         _self.addClass("active");
//                     });
//                 });
//             });
//             //展示模态框
//             $("#cmx-select-relic").modal('show');
//         });
//     }
// })