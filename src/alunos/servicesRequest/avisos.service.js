export async function getTodosAvisos(idAluno, parametros) {
    return global.apiBase.get(`sec/avisos/aluno/${idAluno}`, { params: parametros })
        .then(function (res) { return res })
        .catch(function (error) { return error });
}

export async function getTodosAvisosGeral() {
    return global.apiBase.get(`sec/avisos/aluno`)
        .then(function (res) { return res })
        .catch(function (error) { return error });
}