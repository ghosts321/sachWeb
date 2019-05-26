/*
 * @Author: lvjinxiu 
 * @Date: 2018-03-21 12:00:51 
 * @Last Modified by:   lvjinxiu 
 * @Last Modified time: 2018-03-21 12:00:51 
 */

//公民
cmx.route.model({
    index: 'getPersonList',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});
cmx.route.model({
    index: 'personInit',
    handle: function (parameter, prevModelData, send, abort) {
        personFunc.getPersonList();
        $('#cmx-pneedPage-person .first').unbind('click');
        $('#cmx-pneedPage-person .first').bind('click', function () {
            personFunc.pageNum = 1;
            personFunc.getPersonList();
        });
        $('#cmx-pneedPage-person .last').unbind('click');
        $('#cmx-pneedPage-person .last').bind('click', function () {
            personFunc.pageNum = personFunc.pageCount;
            personFunc.getPersonList();
        });
        $('#cmx-pneedPage-person .pre').unbind('click');
        $('#cmx-pneedPage-person .pre').bind('click', function () {
            if (personFunc.pageNum > 1) {
                personFunc.pageNum--;
                personFunc.getPersonList();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#cmx-pneedPage-person .next').unbind('click');
        $('#cmx-pneedPage-person .next').bind('click', function () {
            if (personFunc.pageNum < personFunc.pageCount) {
                personFunc.pageNum++;
                personFunc.getPersonList();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });
        
        $('#cmx-phavePage .jumppage').off('keydown');
        $('#cmx-pneedPage-person .jumppage').on('keydown', function (event) {
            if (event.keyCode == 13) {
                if ($('#cmx-pneedPage-person .jumppage').val() <= personFunc.pageCount) {
                    personFunc.pageNum = $('#cmx-pneedPage-person .jumppage').val();
                    personFunc.getPersonList();
                }
            }
        });
        send.go();
    }
});


//法人
cmx.route.model({
    index: 'getLegalList',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});
cmx.route.model({
    index: 'legalInit',
    handle: function (parameter, prevModelData, send, abort) {
        legalFunc.getLegalList();
        $('#cmx-pneedPage-legal .first').unbind('click');
        $('#cmx-pneedPage-legal .first').bind('click', function () {
            legalFunc.pageNum = 1;
            legalFunc.getLegalList();
        });
        $('#cmx-pneedPage-legal .last').unbind('click');
        $('#cmx-pneedPage-legal .last').bind('click', function () {
            legalFunc.pageNum = legalFunc.pageCount;
            legalFunc.getLegalList();
        });
        $('#cmx-pneedPage-legal .pre').unbind('click');
        $('#cmx-pneedPage-legal .pre').bind('click', function () {
            if (legalFunc.pageNum > 1) {
                legalFunc.pageNum--;
                legalFunc.getLegalList();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#cmx-pneedPage-legal .next').unbind('click');
        $('#cmx-pneedPage-legal .next').bind('click', function () {
            if (legalFunc.pageNum < legalFunc.pageCount) {
                legalFunc.pageNum++;
                legalFunc.getLegalList();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });
        
        $('#cmx-phavePage .jumppage').off('keydown');
        $('#cmx-pneedPage-legal .jumppage').on('keydown', function (event) {
            if (event.keyCode == 13) {
                if ($('#cmx-pneedPage-legal .jumppage').val() <= legalFunc.pageCount) {
                    legalFunc.pageNum = $('#cmx-pneedPage-legal .jumppage').val();
                    legalFunc.getLegalList();
                }
            }
        });
        send.go();
    }
});

// };