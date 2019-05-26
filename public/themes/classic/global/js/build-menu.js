cmx.g.regist('func_arr', [], '用于menu初始化函数调用');

(function (window, document, $) {
	'use strict';
	$.ajax({
		type: "get",
		url: api_aa + '/user/getUserMenus',			 //菜单权限
		data: {
			token: getData('token')
		},
		async: false,
		success: function (json) {
			var func = json.data;

			//去除func数组里ID重复的数据，然后临时存放在arrF数组
			var arrF = {};
			$.each(func, function (index, obj) {
				arrF[obj.menuId] = obj;
			});

			//清空func数组备用
			func.splice(0, func.length);

			$.each(arrF, function (item) {
				func.push(arrF[item]);
			});

			if (Array.isArray(func)) {
				//				func.push({
				//					menuId: '0000000000000000',
				//			    	pmenuCode: '',
				//			    	menuName: 'root',
				//			    	url: 'javascript:void(0);',
				//			    	funcClass: 1,
				//			    	dispOrder: 1
				//				});
			}

			console.log(json);
			//菜单权限列表
			var menuArray = [];
			//功能权限列表 （菜单）
			var btnObj = {};
			//所有对象的funcId
			var allFuncId = {};
			$.each(func, function () {
				menuArray.push(this);
				allFuncId[this.menuId] = '';
			});

			$.ajax({
				type: "get",
				url: api_aa + '/user/getUserFuncs',			//按钮权限
				data: {
					token: getData('token')
				},
				async: false,
				success: function (result) {
					console.log(result);

					//按钮权限存入cmx.g里
					$.each(result.data, function () {
						btnObj[this.funcId] = this.funcName;
					});
					console.log(btnObj);
					console.log(btnObj.F000000000000016);
					cmx.g.regist("btnPmsn", btnObj);

					//菜单权限列表按父节点分类，key是pfuncCode，value是直接子节点集合
					var funcJsonByParent = {};
					$.each(menuArray, function (index, obj) {
						if (funcJsonByParent[obj.pmenuCode] == undefined) {
							funcJsonByParent[obj.pmenuCode] = [];
						}

						funcJsonByParent[obj.pmenuCode].push(obj);

					});

					//菜单按照dispOrder排序
					$.each(funcJsonByParent, function (index, array) {
						function NumDescSort(a, b) {
							return parseInt(a.dispOrder) - parseInt(b.dispOrder);
						}
						array.sort(NumDescSort);
						funcJsonByParent[index] = array;
					});

					//导航栏菜单创建
					function createNavMenu(navMenu) {
						var temp = {};
						temp.icon = '';
						temp.id = navMenu.menuId;
						temp.disable = '0';
						temp.text = navMenu.menuName;
						temp.title = '';
						temp.url = IsEmpty(navMenu.url) ? "javascript:void(0);" : navMenu.url;
						temp.menu = [];

						//左侧Tab的第一层菜单
						$.each(funcJsonByParent[navMenu.menuId], function () {
							var ttemp = {};
							ttemp.icon = 'fa-file-text';
							ttemp.id = this.menuId;
							ttemp.disable = '0';
							ttemp.text = this.menuName;
							ttemp.url = IsEmpty(this.url) ? "javascript:void(0);" : this.url;
							ttemp.submenu = [];

							$.each(funcJsonByParent[this.menuId], function () {
								//左侧Tab的非第一层的所有菜单
								ttemp.submenu.push(createTabMenu(this));
							});

							temp.menu.push(ttemp);
						});

						return temp;
					}

					//左侧Tab菜单
					function createTabMenu(obj) {
						var temp = {};
						temp.icon = '';
						temp.id = obj.menuId;
						temp.disable = '0';
						temp.text = obj.menuName;
						temp.url = IsEmpty(obj.url) ? "javascript:void(0);" : obj.url;
						temp.submenu = [];

						$.each(funcJsonByParent[obj.menuId], function () {
							temp.submenu.push(createTabMenu(this));
						});

						return temp;
					}

					//root虚拟节点
					var rootNode = undefined;
					if (typeof (rootNode) == "undefined") {
						$.each(funcJsonByParent, function (index, obj) {
							if (typeof (allFuncId[index]) == "undefined") {
								rootNode = obj[0];
								return false;
							}
						})
					}

					if (typeof (rootNode) != "undefined") {
						//导航栏菜单组数
						var navMenu = funcJsonByParent[rootNode.menuId];

						//生成菜单解析用的json格式
						var menuJson = [];
						$.each(navMenu, function () {
							menuJson.push(createNavMenu(this));
						});

						var data = menuJson;
						L('----');
						L(data)
						var mnumber = data.length;
						var first_li = 0;
						for (var i = 0; i < mnumber; i++) {
							//遍历导航    
							if (!IsEmpty(data[i].text) && data[i].disable == '0') {
								if (!IsEmpty(data[i].custom)) {
									cmx.g.func_arr.push(data[i].custom.js);
								}

								var a_html = '<a id="cmx-menu-r-' + i + '" href="' + data[i].url + '">';
								if (data[i].menu.length > 0) {
									first_li++;
									a_html = '<a id="cmx-menu-r-' + i + '" data-toggle="tab" href="#admui-navTabsItem-' + i + '" aria-controls="admui-navTabsItem-' + i + '" role="tab" aria-expanded="false" >';
								} else {
									if (first_li <= 0) {
										first_li = -1;
									}
								}
								$("#admui-navTabs").append([
									'<div class="tab-pane animation-fade height-full' + (mnumber == 1 ? ' active' : (first_li == 0 ? ' active' : '')) + '" id="admui-navTabsItem-' + i + '" role="tabpanel"> ',
									'<ul class="site-menu" id="auto-menu-sub-' + i + '" submenu-id="' + i + '">',
									'<li class="site-menu-category">' + data[i].title + '</li>',
									'</ul>',
									'</div>'
								].join(''));
								fmenu(i, data[i].menu);
								$("#admui-navMenu ul").append([
									'<li role="presentation" class="rmenu-id-' + i + '">',
									a_html,
									'<i class="' + data[i].icon + '"></i> <span>' + data[i].text + '</span>',
									'</a>',
									'</li>'
								].join(''));
							}
						}
						if (getData('role') == "gongzhongyonghu") {
							$('#returnWorkbench').css('display', 'none');
							$('#remindersList').css('display', 'none');
						}
						if (getData('role') == "nation") {
							$("#duban").html("督办查看");
							$('#dubanList').text("督办查看列表");
						}
						//审核站左侧树形菜单和右上角的提醒小标功能
						if (getData('role') == "wenwujinchujingshenhe") {
							new cmx.process()
								.turn('callajax', {
									url: api_ea + '/eaScrQuery/getTaskCount',
									data: JSON.stringify({
										token: getData("token")
									})
								})
								.turn(function (prevModelData, send, abort) {
									if (prevModelData.state == "200" && !IsEmpty(prevModelData)) {
										var arr = prevModelData.data.mapInOutClass;
										// var eq = [];
										// console.log(arr);
										// for (var i = 0; i < arr.length; i++) {
										// 	for (var j in arr[i]) {
										// 		eq.push(arr[i][j]);
										// 	}
										// }
										// console.log(eq);
										$('span').each(function () {
											switch ($(this).attr('title-name')) {
												case '出境预约':
													$(this).append(arr[0].A != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total  badge badge-danger center msg-num">' + arr[0].A + '</span>' : '');
													break;
												case '出境受理':
													$(this).append(arr[0].B != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[0].B + '</span>' : '');
													break;
												case '出境分办':
													$(this).append(arr[0].C != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[0].C + '</span>' : '');
													break;
												case '出境登记':
													$(this).append(arr[0].D != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[0].D + '</span>' : '');
													break;
												case '出境鉴定':
													$(this).append(arr[0].E != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[0].E + '</span>' : '');
													break;
												case '出境审批':
													$(this).append(arr[0].F != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[0].F + '</span>' : '');
													break;

												case '临时进境预约':
													$(this).append(arr[1].A != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[1].A + '</span>' : '');
													break;
												case '临时进境受理':
													$(this).append(arr[1].B != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[1].B + '</span>' : '');
													break;
												case '临时进境分办':
													$(this).append(arr[1].C != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[1].C + '</span>' : '');
													break;
												case '临时进境登记':
													$(this).append(arr[1].D != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[1].D + '</span>' : '');
													break;
												case '临时进境查验':
													$(this).append(arr[1].E != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[1].E + '</span>' : '');
													break;
												case '临时进境审批':
													$(this).append(arr[1].F != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[1].F + '</span>' : '');
													break;

												case '复出境预约':
													$(this).css('color', '#f2a654')
													$(this).append(arr[2].A != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[2].A + '</span>' : '');
													break;
												case '复出境受理':
													$(this).css('color', '#f2a654')
													$(this).append(arr[2].B != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[2].B + '</span>' : '');
													break;
												case '复出境分办':
													$(this).css('color', '#f2a654')
													$(this).append(arr[2].C != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[2].C + '</span>' : '');
													break;
												case '复出境登记':
													$(this).css('color', '#f2a654')
													$(this).append(arr[2].D != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[2].D + '</span>' : '');
													break;
												case '复出境查验':
													$(this).css('color', '#f2a654')
													$(this).append(arr[2].E != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[2].E + '</span>' : '');
													break;
												case '复出境审批':
													$(this).css('color', '#f2a654')
													$(this).append(arr[2].F != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[2].F + '</span>' : '');
													break;
												case '临时出境预约':
													$(this).append(arr[3].A != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[3].A + '</span>' : '');
													break;
												case '临时出境受理':
													$(this).append(arr[3].B != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[3].B + '</span>' : '');
													break;
												case '临时出境分办':
													$(this).append(arr[3].C != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[3].C + '</span>' : '');
													break;
												case '临时出境登记':
													$(this).append(arr[3].D != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[3].D + '</span>' : '');
													break;
												case '临时出境查验':
													$(this).append(arr[3].E != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[3].E + '</span>' : '');
													break;
												case '临时出境审批':
													$(this).append(arr[3].F != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[3].F + '</span>' : '');
													break;
												case '复进境预约':
													$(this).css('color', '#f2a654')
													$(this).append(arr[4].A != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[4].A + '</span>' : '');
													break;
												case '复进境受理':
													$(this).css('color', '#f2a654')
													$(this).append(arr[4].B != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[4].B + '</span>' : '');
													break;
												case '复进境分办':
													$(this).css('color', '#f2a654')
													$(this).append(arr[4].C != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[4].C + '</span>' : '');
													break;
												case '复进境登记':
													$(this).css('color', '#f2a654')
													$(this).append(arr[4].D != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[4].D + '</span>' : '');
													break;
												case '复进境查验':
													$(this).css('color', '#f2a654')
													$(this).append(arr[4].E != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[4].E + '</span>' : '');
													break;
												case '复进境审批':
													$(this).css('color', '#f2a654')
													$(this).append(arr[4].F != 0 ? '<span style="text-indent: 0;" class="margin-3 cal-total badge badge-danger center msg-num">' + arr[4].F + '</span>' : '');
													break;
												default:
													break;
											}
										})
										$('[title="电子标签登记"]').find('span').each(function () {
											switch ($(this).attr('title-belong')) {
												case '/app/f-gover-approval/56020-1/8RFID.html':
													$(this).append(parseInt(arr[0].G) != 0 ? '<span style="" class="cal-total">(' + parseInt(arr[0].G) + ')</span>' : '');
													break;
												case '/app/f-gover-approval/56020-2/8RFID.html':
													$(this).append(parseInt(arr[1].G) != 0 ? '<span style="" class="cal-total">(' + parseInt(arr[1].G) + ')</span>' : '');
													break;
												case '/app/f-gover-approval/56020-3/8RFID.html':
													$(this).css('color', '#f2a654')
													$(this).append(parseInt(arr[2].G) != 0 ? '<span style="" class="cal-total">(' + parseInt(arr[2].G) + ')</span>' : '');
													break;
												case '/app/f-gover-approval/56020-4/8RFID.html':
													$(this).append(parseInt(arr[3].G) != 0 ? '<span style="" class="cal-total">(' + parseInt(arr[3].G) + ')</span>' : '');
													break;
												case '/app/f-gover-approval/56020-5/8RFID.html':
													$(this).css('color', '#f2a654')
													$(this).append(parseInt(arr[4].G) != 0 ? '<span style="" class="cal-total">(' + parseInt(arr[4].G) + ')</span>' : '');
													break;
												default:
													break;
											}
										})
										$('a').each(function () {
											switch ($(this).attr('title')) {
												case '文物出境审核':
													$(this).css(
														{ "color": "#57c7d4", "font-weight": "700" }
													);
													var total1 = 0;
													$(this).siblings('ul').find('.cal-total').each(function (index, obj) {
														if ($(this).text().charAt(0) == '(') {
															total1 += parseInt($(this).text().substr(1, $(this).text().length - 2));
														} else {
															total1 += parseInt($(this).text());
														}
													})
													$(this).append(total1 != 0 ? '<span style="text-indent: 0;" class="margin-3 badge badge-danger center msg-num">' + total1 + '</span>' : '');
													break;
												case '临时进境复出境审核':
													$(this).css(
														{ "color": "#57c7d4", "font-weight": "700" }
													);
													var total2 = 0;
													$(this).siblings('ul').find('.cal-total').each(function (index, obj) {
														if ($(this).text().charAt(0) == '(') {
															total2 += parseInt($(this).text().substr(1, $(this).text().length - 2));
														} else {
															total2 += parseInt($(this).text());
														}
													})
													$(this).append(total2 != 0 ? '<span style="text-indent: 0;" class="margin-3 badge badge-danger center msg-num">' + total2 + '</span>' : '');
													break;
												case '临时出境复进境审核':
													$(this).css(
														{ "color": "#57c7d4", "font-weight": "700" }
													);
													var total3 = 0;
													$(this).siblings('ul').find('.cal-total').each(function (index, obj) {
														if ($(this).text().charAt(0) == '(') {
															total3 += parseInt($(this).text().substr(1, $(this).text().length - 2));
														} else {
															total3 += parseInt($(this).text());
														}
													})
													$(this).append(total3 != 0 ? '<span style="text-indent: 0;" class="margin-3 badge badge-danger center msg-num">' + total3 + '</span>' : '');
													break;
												default:
													break;
											}
										})
									} else {
										showAlert({
											type: 'error',
											content: prevModelData.msg
										});
									}
								})
								.start();
							$('#returnWorkbench').css('display', 'none');
							$('#remindersList').css('display', 'none');
						}
						setTimeout(function () {
							$.site.run();
							for (var o = 0; o < cmx.g.func_arr.length; o++) {
								safeEval(cmx.g.func_arr[o]);
							}
							var now_id = GetUrlParamString('nowid');
							if (IsEmpty(now_id)) {
								$('#cmx-menu-r-0').trigger("click");
							} else {
								var activeMenu = function (_nowid) {
									if ($('#auto-menu-body-' + _nowid).length > 0) {
										var submenuId = $('#auto-menu-body-' + _nowid).parents('ul.site-menu').attr('submenu-id');
										$('.navbar-menu>.nav>li').removeClass('active');
										$('.rmenu-id-' + submenuId + ' a').trigger("click");
										$("#auto-menu-body-" + _nowid + " a").addClass('menuOn').css('color', '#62a8ea');
										$('#auto-menu-body-' + _nowid).parents('li.site-menu-item').addClass('open');
									}
								};
								activeMenu(now_id);
							}
							$('.site-menubar-body').css('visibility', 'visible');
							$("#admui-navMenu ul").empty().append([
								'<li role="presentation" class="rmenu-id-cmx-nav-01 active" style="display: block;"><a style="padding: 0 10px 0 10px;height: 60px;display: table-cell;vertical-align: middle;" id="a0" data-toggle="tab" href="#admui-navTabsItem-0" aria-controls="admui-navTabsItem-0" role="tab" aria-expanded="false"></a></li>'
							].join(''));
							if (getData('role') == 'province') {
								$(".rmenu-id-cmx-nav-01 a").html('<span style="vertical-align: middle;">欢迎你，' + (IsEmpty(getData('instName')) ? '' : getData('instName')) + ' ' + getData('userName') + '，上次登录时间：' + (IsEmpty(getData('lastlogintime')) ? '首次登录' : getData('lastlogintime')) + '</span>');
							} else {
								$(".rmenu-id-cmx-nav-01 a").html('<span style="vertical-align: middle;">欢迎你，' + getData('userName') + '，上次登录时间：' + (IsEmpty(getData('lastlogintime')) ? '首次登录' : getData('lastlogintime')) + '</span>');
							}
							$('#cmx-role-name').html('角色：' + getData('roleName'));
						}, 0);


					}
				}
			});



		}
	});

})(window, document, jQuery);

function fmenu(i, menuData) {
	for (var j = 0; j < menuData.length; j++) {
		if (!IsEmpty(menuData[j].text)) {
			if (!IsEmpty(menuData[j].custom)) {
				cmx.g.func_arr.push(menuData[j].custom.js);
			}
			var hasSubMenu = false;
			if (!IsNull(menuData[j].submenu) && menuData[j].submenu.length > 0) {
				hasSubMenu = true;
			}
			if (menuData[j].disable == '0') {
				var p10 = "";
				if (!IsEmpty(i) && i.length >= 5) {
					p10 = "style='margin-left:10px'";
				}
				var turnDisabled = '';
				if (menuData[j].url == "disabled") {
					turnDisabled = '<span class="second-menu" diabled><span class="site-menu-title" style="color:grey">' + menuData[j].text + '</span></span>';
				} else {
					var p28 = "";
					if (menuData[j].text == "新申请") {
						menuData[j].icon = "icon wb-edit";
						p28 = "style='margin-left:28px'";
					}
					turnDisabled = ['<a class="second-menu"   title="' + menuData[j].text + '" href="' + menuData[j].url + (hasSubMenu ? '' : '?nowid=' + i + '-' + j) + '">',
					!IsEmpty(menuData[j].icon) ? '<i ' + p28 + ' class="site-menu-icon ' + menuData[j].icon + '" aria-hidden="true"></i>' : '',
					'<span class="site-menu-title" title-name="' + menuData[j].text + '" title-belong="' + menuData[j].url + '">' + menuData[j].text + '</span>',
					(hasSubMenu ? '<span class="site-menu-arrow"></span>' : ''),
						'</a>'].join('');
				}
				if (getData('role') == "wenwujinchujingshenhe" || getData('role') == "gongzhongyonghu") {
					var pOpen = 'open';
				}
				$("#auto-menu-sub-" + i + "").append(
					['<li class="' + pOpen + ' active site-menu-item ',
					(hasSubMenu ? 'has-sub ' : ''),
					'" id="auto-menu-body-' + i + '-' + j + '" menu-id="' + menuData[j].id + '">',
						turnDisabled,
					(hasSubMenu ? '<ul ' + p10 + ' class="site-menu-sub" id="auto-menu-sub-' + i + '-' + j + '"></ul>' : ''),
						'</li>'
					].join(''));

				if (i.length > 6) {
					$("#auto-menu-sub-" + i + " li").removeClass('open');
					$("#auto-menu-sub-" + i + " li ul").css('font-size', '12px')
				}
				if (hasSubMenu) {
					fmenu(i + '-' + j, menuData[j].submenu);
				}
			}
		}
	}
}