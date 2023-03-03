export async function getBoletos(matriculas){
    return global.apiBase.get(`sec/boletos/aluno/${matriculas}`)
    .then(function (res) {return res})
    .catch(function (error) {return error});
}