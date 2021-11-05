// GLOBAL
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

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
    
    var isValid = true;

    isValid &= validation.checkEmpty(user, "Tài khoản không được để trống", "tbTKNV") && validation.checkUsername(user, "Tài khoản không được trùng", "tbTKNV", dsnv.arrayNV);

    isValid &= validation.checkEmpty(name, "Họ và tên không được để trống", "tbTen") && validation.checkName(name, "Họ và tên phải là kiểu chữ", "tbTen");

    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email không đúng định dạng", "tbEmail");
    
    isValid &= validation.checkEmpty(pass, "Password không được để trống", "tbMatKhau") && validation.checkPassword(pass, "Password phải từ 6-10 ký tự, phải có 1 ký tự số, 1 ký tự viết hoa và 1 ký tự đặc biệt", "tbMatKhau");
    
    isValid &= validation.checkEmpty(date, "Ngày làm không được để trống", "tbNgay");

    isValid &= validation.checkEmpty(salary, "Lương cơ bản không được để trống", "tbLuongCB") && validation.checkSalary(salary, "Lương cơ bản phải là số từ 1 000 000 đến 20 000 000", "tbLuongCB");

    isValid &= validation.checkPosition("chucvu", "Chức vụ phải được chọn", "tbChucVu");

    isValid &= validation.checkEmpty(time, "Giờ làm không được để trống", "tbGiolam") && validation.checkTime(time, "Giờ làm phải là số từ 80 đến 200", "tbGiolam");
    
    if(isValid){
        var nv = new NhanVien(user,name,email,pass,date,Number(salary),position,Number(time));
        nv.total_salary = nv.count_salary();
        nv.rank = nv.classify();
    
        dsnv.addNV(nv);
        showTableNV(dsnv.arrayNV);
        setLocalStorage(dsnv.arrayNV);
    }
}
// console.table(dsnv.arrayNV);

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

    var isValid = true;

    isValid &= validation.checkEmpty(user, "Tài khoản không được để trống", "tbTKNV");

    isValid &= validation.checkEmpty(name, "Họ và tên không được để trống", "tbTen") && validation.checkName(name, "Họ và tên phải là kiểu chữ", "tbTen");

    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email không đúng định dạng", "tbEmail");
    
    isValid &= validation.checkEmpty(pass, "Password không được để trống", "tbMatKhau") && validation.checkPassword(pass, "Password phải từ 6-10 ký tự, phải có 1 ký tự số, 1 ký tự viết hoa và 1 ký tự đặc biệt", "tbMatKhau");
    
    isValid &= validation.checkEmpty(date, "Ngày làm không được để trống", "tbNgay");

    isValid &= validation.checkEmpty(salary, "Lương cơ bản không được để trống", "tbLuongCB") && validation.checkSalary(salary, "Lương cơ bản phải là số từ 1 000 000 đến 20 000 000", "tbLuongCB");

    isValid &= validation.checkPosition("chucvu", "Chức vụ phải được chọn", "tbChucVu");

    isValid &= validation.checkEmpty(time, "Giờ làm không được để trống", "tbGiolam") && validation.checkTime(time, "Giờ làm phải là số từ 80 đến 200", "tbGiolam");

    if(isValid){
        var nv = new NhanVien(user,name,email,pass,date,Number(salary),position,Number(time));
        nv.total_salary = nv.count_salary();
        nv.rank = nv.classify();
    
        dsnv.updateNV(nv);
        setLocalStorage(dsnv.arrayNV);
        showTableNV(dsnv.arrayNV);
    }
}

getELEQuery("#searchName").onkeyup = function(){
    var key = getELEQuery("#searchName").value;
    var arrayKey = dsnv.searchName(key);
    showTableNV(arrayKey);
}

