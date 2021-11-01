// GLOBAL
var dsnv = new DanhSachNhanVien();

function setLocalStorage(arrayNV){
    localStorage.setItem("DSNV", JSON.stringify(arrayNV))
    // key: DSNV
}

function getLocalStorage(){
    if(localStorage.getItem("DSNV") != null){
        dsnv.arrayNV = JSON.parse(localStorage.getItem("DSNV"));
        showTableNV(dsnv.arrayNV);
    }
}
getLocalStorage();

function getELEQuery(id){
    return document.querySelector(id);
}

function getInformation(){
    var user = getELEQuery("#tknv").value;
    var name = getELEQuery("#name").value;
    var email = getELEQuery("#email").value;
    var pass = getELEQuery("#password").value;
    var date = getELEQuery("#datepicker").value;
    var salary = getELEQuery("#luongCB").value;
    var position = getELEQuery("#chucvu").value;
    var time = getELEQuery("#gioLam").value;

    // console.log(user,name,email,pass,date,salary,position,time);

    var nv = new NhanVien(user,name,email,pass,date,salary,position,time);
    dsnv.addNV(nv);
    showTableNV(dsnv.arrayNV);
    setLocalStorage(dsnv.arrayNV);
    // console.table(dsnv.arrayNV);
}

function showTableNV(arrayNV){
    var content = "";
    for (var i = 0; i < arrayNV.length; i++){
        var trNV = 
        `<tr>
            <td>${arrayNV[i].username}</td>
            <td>${arrayNV[i].fullName}</td>
            <td>${arrayNV[i].email}</td>
            <td>${arrayNV[i].password}</td>
            <td>${arrayNV[i].date_picker}</td>
            <td>${arrayNV[i].basic_salary}</td>
            <td>${arrayNV[i].position}</td>
            <td>${arrayNV[i].work_time}</td>
        </tr>`;
        content += trNV;
    }
    getELEQuery("#tableDanhSach").innerHTML = content;
}