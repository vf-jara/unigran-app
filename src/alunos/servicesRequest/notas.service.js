export async function getNotasSemestre(matriculas){
    //console.log(matriculas)
    return global.apiBase.get(`sec/notas/aluno/boletim`,{params:matriculas})
    .then(function (res) {return res})
    .catch(function (error) {return error});
}