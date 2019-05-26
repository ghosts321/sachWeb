function getProvinceApplyApi(projectNum) {
    var api_url = '';
    switch (projectNum) {
        case '56014-3_e':
            api_url = 'eaAecrApplyE';
            break;
        case '56014_d':
            api_url = 'eaIchPphApply';
            break;
        case '56015_c':
            api_url = 'eaMohCopApply';
            break;
        case '56022_b':
            api_url = 'eaIchProApply';
            break;
        default:
            break;
    }
    return api_url;
}