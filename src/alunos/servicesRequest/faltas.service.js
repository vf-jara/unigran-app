export async function getTodasFaltas(matriculas){
    return global.apiBase.get(`sec/chamada/faltas/aluno`,{params:matriculas})
    .then(function (res) {return res})
    .catch(function (error) {return error});
}

export async function getTodosDias(mdc){
    return global.apiBase.get(`sec/chamada/faltas/aluno/detalhes/${mdc}`)
    .then(function (res) {return res})
    .catch(function (error) {return error});
}

export async function getTodosDetalhes(mdc,data){
    return global.apiBase.get(`sec/chamada/falta/conteudo/mapa/${mdc}/data/${data}`)
    .then(function (res) {return res})
    .catch(function (error) {return error});
}