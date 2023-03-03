export async function getRematricula(rgm) {
    return global.apiBase.get(`sec/rematricula/aluno/${rgm}`)
        .then(function (res) { return res })
        .catch(function (error) { return error.response });
}

export async function getVerificaRematricula(rgm) {
    return global.apiBase.get(`sec/rematricula/validar/${rgm}`)
        .then(function (res) { return res })
        .catch(function (error) { return error.response });
}
export async function getValidaRematricula() {
    return global.apiBase.get(`sec/rematricula/anoSemestre`)
        .then(function (res) { return res })
        .catch(function (error) { return error.response });
}