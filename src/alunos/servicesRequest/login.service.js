export async function getLogin(dados){
    return global.apiBase.get(`sec/login/aluno/${dados.login}/${dados.password}`)
    .then(function (res) {
        return res
    }).catch(function (error) {return error});
}
export async function getToken(dados){
    return global.apiBase.get(`sec/alunos/${dados.login}/app/token`,{params:dados})
    .then(function (res) {
        return res
    }).catch(function (error) {return error});
}
export async function getValidaManutencao(){
    return global.apiBase.get(`sec/plataforma/manutencao`)
    .then(function (res) {
        return res
    }).catch(function (error) {return error});
}