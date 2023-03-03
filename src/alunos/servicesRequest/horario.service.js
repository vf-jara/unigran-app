export async function getHorarioDoDia(contratos,dia){
    return global.apiBase.get(`sec/horario/aluno/dia/${dia}`,{params:contratos})
    .then(function (res) {return res})
    .catch(function (error) {return error});
}

export async function getHorarioDaSemana(contratos){
    return global.apiBase.get(`sec/horario/aluno`,{params:contratos})
    .then(function (res) {return res})
    .catch(function (error) {return error});
}