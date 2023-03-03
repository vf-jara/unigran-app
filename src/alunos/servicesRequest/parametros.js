export async function getParametros() {
    return global.apiBase.get(`sec/plataforma/parametros`)
        .then(function (res) { return res })
        .catch(function (error) { return error });
}