export async function codigosClasssroom(parametros){
    let req = JSON.stringify(parametros.rgms)
    return global.apiBase.get(`sec/disciplinas/aluno/codigos/classroom?rgms=${req}`)
    .then(function (res) {return res})
    .catch(function (error) {return error});
}