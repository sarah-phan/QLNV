function NhanVien(user,name,email,pass,date,salary,position,time){
    // property
    this.username = user;
    this.fullName = name;
    this.email = email;
    this.password = pass;
    this.date_picker = date;
    this.basic_salary = salary;
    this.position = position;
    this.work_time = time;
    this.total_salary = 0;
    this.rank; 

    // function
    this.count_salary = function(){
        var total = condition_salary(this.position,this.basic_salary);
        return total;
    }
    this.showPosition = function(){
        var content = showPosition(this.position);
        return content;
    }
    this.classify = function(){
        var content = classify(this.work_time);
        return content;
    }
}
function condition_salary(position,basic_salary){
    var total_salary = 0;
    if(position == "Boss"){
        total_salary = basic_salary * 3;
    }
    else if (position == "Manager"){
        total_salary = basic_salary * 2;
    }
    else if (position == "Staff"){
        total_salary = basic_salary * 1;
    }
    return total_salary;
}

function showPosition(position){
    var content = "";
    if(position == "Boss"){
        content += "Sếp";
    }
    else if (position == "Manager"){
        content += "Trưởng phòng";
    }
    else if (position == "Staff"){
        content += "Nhân Viên";
    }
    return content;
}

function classify(work_time){
    content = "";
    if(work_time >= 80 && work_time < 160){
        content += "Nhân viên trung bình";
    }
    if(work_time >= 160 && work_time < 176){
        content += "Nhân viên khá";
    }
    if(work_time >= 176 && work_time < 192){
        content += "Nhân viên giỏi";
    }
    if(work_time >= 192){
        content += "Nhân viên xuất sắc";
    }
    return content;
}