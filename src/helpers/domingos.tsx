//#region Funções de apoio para o mês atual e os domingos
export const MesAtual = EncontraMesAtual();

function EncontraMesAtual() {
    switch (new Date().getMonth()) {
        case 0:
            return "Janeiro";
        case 1:
            return "Fevereiro";
        case 2:
            return "Março";
        case 3:
            return "Abril";
        case 4:
            return "Maio";
        case 5:
            return "Junho";
        case 6:
            return "Julho";
        case 7:
            return "Agosto";
        case 8:
            return "Setembro";
        case 9:
            return "Outubro";
        case 10:
            return "Novembro";
        case 11:
            return "Dezembro";
        default:
            return "Mês inválido";
    }
}

export const Hoje = new Date().getDate();
export const Domingos = EncontraDomingos();



function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
}

function EncontraDomingos() {
    var Mes = new Date();
    var getTotalDias = daysInMonth(Mes.getMonth(), Mes.getFullYear());
    var arrayDomingos = new Array();

    for (var i = 1; i <= getTotalDias; i++) {
        var newDate = new Date(Mes.getFullYear(), Mes.getMonth(), i)
        if (newDate.getDay() == 0) {
            arrayDomingos.push(i);
        }
    }

    return arrayDomingos;
}
//#endregion