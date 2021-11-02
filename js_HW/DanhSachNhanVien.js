function DanhSachNhanVien(){
    this.arrayNV = [];

    this.addNV = function(nv){
        this.arrayNV.push(nv);
    }
    this.findIndex = function(username){
        var indexNumber = -1;
        this.arrayNV.map(function(nv,index){
            if(nv.username == username){
                indexNumber = index;
            }
        });
        return indexNumber;
    }
    
    this.delete = function(username){
        var index = this.findIndex(username);
        if (index > -1){
            this.arrayNV.splice(index,1);
        }
    }

    
}