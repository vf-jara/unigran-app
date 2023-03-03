export async function getPermissao(curso) {
    return global.apiBase.post(`bib/permissao`, { parametros: curso })
        .then(function (res) { return res.data })
        .catch(function (error) { return error });
}

export async function getBiblioteca(rgm, dados) {
    return global.apiBase.post(`bib/aluno`, { parametros: dados })
        .then(function (res) { return res.data })
        .catch(function (error) { return error });
}