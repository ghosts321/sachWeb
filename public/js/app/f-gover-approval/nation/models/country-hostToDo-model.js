cmx.route.model({
    index: 'projectNumByUserInit',
    handle: function (parameter, prevModelData, send, abort) {
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});
cmx.route.model({
    index: 'gethaveToDoList',
    handle: function (parameter, prevModelData, send, abort) {
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});

cmx.route.model({
    index: 'provinceHaveInit',
    handle: function (parameter, prevModelData, send, abort) {
        haveFunc.getHaveToDo();
        $('#cmx-phavePage .first').unbind('click');
        $('#cmx-phavePage .first').bind('click', function () {
            haveFunc.pageNum = 1;
            haveFunc.getHaveToDo();
        });
        $('#cmx-phavePage .last').unbind('click');
        $('#cmx-phavePage .last').bind('click', function () {
            haveFunc.pageNum = haveFunc.pageCount;
            haveFunc.getHaveToDo();
        });
        $('#cmx-phavePage .pre').unbind('click');
        $('#cmx-phavePage .pre').bind('click', function () {
            if (haveFunc.pageNum > 1) {
                haveFunc.pageNum--;
                haveFunc.getHaveToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#cmx-phavePage .next').unbind('click');
        $('#cmx-phavePage .next').bind('click', function () {
            if (haveFunc.pageNum < haveFunc.pageCount) {
                haveFunc.pageNum++;
                haveFunc.getHaveToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });

        $('#cmx-phavePage .jumppage').off('keydown');
        $('#cmx-phavePage .jumppage').on('keydown', function (event) {
            if (event.keyCode == 13) {
                if ($('#cmx-phavePage .jumppage').val() <= haveFunc.pageCount) {
                    haveFunc.pageNum = $('#cmx-phavePage .jumppage').val();
                    haveFunc.getHaveToDo();
                }
            }
        });
        send.go();
    }
})