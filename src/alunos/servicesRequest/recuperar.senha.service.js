export async function getRecuperarSenha(parametros){
    return global.apiBase.get(`sec/plataforma/senha/aluno/${parametros.cpf}/${parametros.rgm}/recuperar`)
    .then(function (res) {return res})
    .catch(function (error) {return error});
}