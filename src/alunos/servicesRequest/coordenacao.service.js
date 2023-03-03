export async function informacoesContato(){
    return global.apiBase.get(`sec/plataforma/coordenacao/informacoes`)
    .then(function (res) {return res})
    .catch(function (error) {return error});
}