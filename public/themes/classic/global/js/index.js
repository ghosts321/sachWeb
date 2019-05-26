/*
 * @Author: liuxiangnan 
 * @Date: 2017-09-20 15:31:32 
 * @Last Modified by: liuxiangnan
 * @Last Modified time: 2017-11-28 22:19:35
 */
'use strict';

if (IsEmpty(getData('adminid')) || IsEmpty(getData('organizeid'))) {
    location.href = "/login.html";
}

function logout() {
    clearData('adminid');
    clearData('organizeid');
    location.href = "/login.html";
}