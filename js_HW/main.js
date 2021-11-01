function getELEQuery(id){
    return document.querySelector(id);
}

function getInformation(){
    var user = getELEQuery("#tknv");
    var name = getELEQuery("#name");
    var email = getELEQuery("#email");
    var password = getELEQuery("#password");
    var dayte_picker = getELEQuery("#datepicker");
    var basic_salary = getELEQuery("#luongCB");
    var position = getELEQuery("#chucvu");
    var work_time = getELEQuery("#gioLam");
}