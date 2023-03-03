export async function getTodosBanners(){
    return global.apiBase.get(`sec/plataforma/banners`)
    .then(function (res) {return res})
    .catch(function (error) {return error});
}