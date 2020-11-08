//lớp đối tượng chứa các phương thức giao tiếp với backend
var SinhVienService = function(){
    this.layThongTinSinhVien = function(){
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
            method: 'GET' //backend cung cap
        })
    }
}