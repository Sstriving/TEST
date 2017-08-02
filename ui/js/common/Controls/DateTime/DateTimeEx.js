function DataTimeFormat(date) {
    if (date && typeof date == 'object' && date.constructor == Date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10) ? "0" + month : "" + month;
        var day = date.getDate();
        day = (day < 10) ? "0" + day : "" + day;
        return year + "-" + month + "-" + day + " 00:00:00";
    } else {
        return null;
    }
}