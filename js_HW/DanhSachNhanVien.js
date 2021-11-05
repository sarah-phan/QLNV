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
    this.getInfo = function(username){
        var index = this.findIndex(username);
        if (index > -1){
            return this.arrayNV[index];
        }
        else{
            console.log("Không tìm thấy");
        }
    }
    this.updateNV = function(nv){
        var index = this.findIndex(nv.username);
        if (index > -1){
            this.arrayNV[index] = nv;
        }
    }
}

DanhSachNhanVien.prototype.searchName = function(key){
    var arrayKey = [];
    var key = key.trim().toLowerCase();
    this.arrayNV.map(function(nv){
        var rank = nv.rank.toLowerCase();
        if(rank.indexOf(key) > -1){
            arrayKey.push(nv);
        }
    });
    return arrayKey;
}