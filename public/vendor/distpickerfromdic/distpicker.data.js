/*!
 * Distpicker v1.0.4
 * https://github.com/fengyuanchen/distpicker
 *
 * Copyright (c) 2014-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-06-01T15:05:52.606Z
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define('ChineseDistricts', [], factory);
  } else {
    // Browser globals.
    factory();
  }
})(function () {
  var ChineseDistricts_copy = {};
  new cmx.process()
    .turn('callajax', {
      url: api_dm + '/dmDatadic/getDataByParam',
      data: {
        token: getData('token'),
        dataType: 'AreaCode'
      },
      type: 'GET',
      async: false
    })
    .turn(function (prevModelData, send, abort) {
      var data = prevModelData.data; 
      var temp = {};
      temp['86'] = {};
      for (var i = 0; i < data.length; i++) {
        if (data[i].pdataCode == '') {
          temp['86'][data[i].dataCode] = data[i].dataName;
          temp[data[i].dataCode] = {};
        }
      }
      for (var i = 0; i < data.length; i++) {
        if (temp[data[i].pdataCode]) {
          temp[data[i].pdataCode][data[i].dataCode] = data[i].dataName;
        }
      }
      for (index in temp) {
        if (index != 86) {
          var temp1 = temp[index];
          for (key in temp1) {
            temp[key] = {};
          }
        }
      }
      for (var i = 0; i < data.length; i++) {
        if (temp[data[i].pdataCode]) {
          temp[data[i].pdataCode][data[i].dataCode] = data[i].dataName;
        }
      }
      ChineseDistricts_copy = temp;
    })
    .start();
  if (typeof window !== 'undefined') {
    window.ChineseDistricts = ChineseDistricts_copy;
  }

  return ChineseDistricts_copy;

});