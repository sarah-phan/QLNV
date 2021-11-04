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

    var nv = new NhanVien(user,name,email,pass,date,Number(salary),position,Number(time));
    nv.total_salary = nv.count_salary();
    nv.position = nv.showPosition();
    nv.rank = nv.classify();

    dsnv.addNV(nv);
    
    showTableNV(dsnv.arrayNV);
    
    setLocalStorage(dsnv.arrayNV);
    
    console.table(dsnv.arrayNV);
}

function showTableNV(arrayNV){
    var content = "";
    for (var i = 0; i < arrayNV.length; i++){
        var trNV = 
        `<tr>
            <td>${arrayNV[i].username}</td>
            <td>${arrayNV[i].fullName}</td>
            <td>${arrayNV[i].email}</td>
            <td>${arrayNV[i].date_picker}</td>
            <td>${arrayNV[i].position}</td>
            <td>${arrayNV[i].total_salary}</td>
            <td>${arrayNV[i].rank}</td>
            <td>
                <button onclick="deleteStaff(${arrayNV[i].username})" class="btn btn-danger">Xóa</button>
                <br></br>
                <button onclick="seeInfo(${arrayNV[i].username})" class="btn btn-info" data-toggle="modal" data-target="#myModal">Xem</button>
            </td>
            
        </tr>`;
        content += trNV;
    }
    getELEQuery("#tableDanhSach").innerHTML = content;
}

function deleteStaff(username){
    dsnv.delete(username);
    setLocalStorage(dsnv.arrayNV);
    showTableNV(dsnv.arrayNV);
}

function seeInfo(username){
    var found = dsnv.getInfo(username);
    getELEQuery("#tknv").disabled = true;
    if(found != undefined){
        getELEQuery("#tknv").value = found.username;
        getELEQuery("#name").value = found.fullName;
        getELEQuery("#email").value = found.email;
        getELEQuery("#password").value = found.password;
        getELEQuery("#datepicker").value = found.date_picker;
        getELEQuery("#luongCB").value = found.basic_salary;
        getELEQuery("#chucvu").value = found.position;
        getELEQuery("#gioLam").value = found.work_time;
    }
    else{
        console.log("Không tìm thấy");
    } 
}

function update(){
    var user = getELEQuery("#tknv").value;
    var name = getELEQuery("#name").value;
    var email = getELEQuery("#email").value;
    var pass = getELEQuery("#password").value;
    var date = getELEQuery("#datepicker").value;
    var salary = getELEQuery("#luongCB").value;
    var position = getELEQuery("#chucvu").value;
    var time = getELEQuery("#gioLam").value;

    var nv = new NhanVien(user,name,email,pass,date,Number(salary),position,Number(time));
    nv.total_salary = nv.count_salary();
    nv.position = nv.showPosition();
    nv.rank = nv.classify();

    dsnv.updateNV(nv);
    setLocalStorage(dsnv.arrayNV);
    showTableNV(dsnv.arrayNV);
}