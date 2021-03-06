export default class Utiles {
    static _formatDate(fecha) {
        let date = new Date(fecha);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    static _getFirstLetter(cadena) {
        return cadena.charAt(0).toUpperCase();
    }

    static _redondearValorDecimal(value){
        return Math.round(Number(value) * 100) / 100;
    }
}