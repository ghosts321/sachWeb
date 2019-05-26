'use strict';
var express = require('express'),
    router = express.Router();
router.get('/index.html', function(req, res) {
    res.render('app/index.html');
});
router.get('/ca.html', function(req, res) {
    res.render('app/f-administrative-platform-protal/ca.html');
});
router.get('/ca-complete.html', function(req, res) {
    res.render('app/f-administrative-platform-protal/ca-complete.html');
});
router.get('/', function(req, res) {
    //res.render('app/index.html');
    return res.redirect("/sachhome/index.html");
});
router.get('/agreement.html', function(req, res) {
    res.render('app/agreement.html');
});
router.get('/reset.html', function(req, res) {
    res.render('app/reset.html');
});
router.get('/app-portal.html', function(req, res) {
    res.render('app/app-portal.html');
});
router.get('/edit.html', function(req, res) {
    res.render('app/f-gover-approval/weboffice/edit.html');
});
router.get('/sachhome/*', function(req, res) {
    var _path = req.path.substring(1);
    res.render(_path);
});
router.get('/collection-of-cultural-relics/*', function(req, res) {
    var _path = req.path.substring(1);
    res.render(_path);
});
/* router.get('/index.html', function(req, res) {
    if (req.headers['x-pjax']) {
        // 响应pjax请求
        res.render('app/f-administrative-platform-protal/nation-workbench.html');
    } else {
        // 响应地址栏请求
        res.render('index', {
            path: 'app/f-administrative-platform-protal/nation-workbench.html'
        });
    }
});
router.get('/', function(req, res) {
    if (req.headers['x-pjax']) {
        // 响应pjax请求
        res.render('app/f-administrative-platform-protal/nation-workbench.html');
    } else {
        // 响应地址栏请求
        res.render('index', {
            path: 'app/f-administrative-platform-protal/nation-workbench.html'
        });
    }
}); */

router.get('/error.html', function(req, res) {
    res.charset = 'utf-8';
    var _path = req.path;
    if (req.headers['x-pjax']) {
        res.render('includes/error.html');
    } else {
        res.render('error.html', {
            path: 'includes' + _path
        });
    }
});

router.get('/login.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/login.html');
});
router.get('/plogin.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/plogin.html');
});
router.get('/testlogin.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/testlogin.html');
});
router.get('/browser.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/browser.html');
});
router.get('/register.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/register.html');
});
router.get('/register-qulification.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/register-qulification.html');
});
router.get('/retrieve-password.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/retrieve-password.html');
});
router.get('/retrieve-password.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/retrieve-password.html');
});
router.get('/reset-password.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('app/f-administrative-platform-protal/reset-password.html');
});
router.get('/locked.html', function(req, res) {
    res.charset = 'utf-8';
    res.render('locked.html');
});

// string原型trim方法扩展
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

function responseCommon(req, res) {
    var _path = req.path.substring(1);
    if (req.path.indexOf('include') > 0 || req.headers['x-pjax']) {
        res.render(_path);
    } else {
        res.render('index', {
            path: _path
        });
    }
}

router.all('/*', function(req, res) {
    responseCommon(req, res);
});

module.exports = router;