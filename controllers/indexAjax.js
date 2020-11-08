// console.log(axios);
//Ket noi backend dua vao thu vien axios
var layDanhSachSinhVienApi = function(){
    //tao ra 1 object chua cac thuoc tinh backend yeu cau (url,method)
    var svService = new SinhVienService();
    var layDanhSachSinhVienApi = function(){
        var promise = svService.layThongTinSinhVien();
    }
    //Xử lý cho trường hợp gọi thành công
    promise.then(function(result){
        console.log('kết quả',result.data);
        renderTabele(result.data);
    });
    //Xử lý cho trường hợp thất bại
    promise.catch(function(error){
        console.log(error);
    })
}
var renderTabele = function(mangSinhVien){
    var noiDungTable = '';
    for (var i = 0; i < mangSinhVien.length; i++) {
        var sv = new SinhVien();
        sv.maSinhVien = mangSinhVien[i].maSinhVien;
        sv.tenSinhVien = mangSinhVien[i].tenSinhVien;
        sv.diemToan = mangSinhVien[i].diemToan;
        sv.diemLy = mangSinhVien[i].diemLy;
        sv.diemHoa = mangSinhVien[i].diemHoa;
        sv.diemRenLuyen = mangSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien = mangSinhVien[i].loaiSinhVien;
        sv.email = mangSinhVien[i].email;
        //Tạo các tr chứa thông tin sinh viên tương ứng
        noiDungTable += `
            <tr>
                <td>${sv.maSinhVien}</td>   
                <td>${sv.tenSinhVien}</td>  
                <td>${sv.email}</td>  
                <td>${sv.tinhDiemTrungBinh()}</td>  
                <td>${sv.xepLoai()}</td>  
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
                    <button class="btn btn-danger" onclick="suaSinhVien('${sv.maSinhVien}')">chỉnh sửa</button>
                </td>  
            </tr>    
        `;
    }
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}
layDanhSachSinhVienApi();
//Chức năng thêm sinh viên lưu trữ vào sever thông qua api backend
document.querySelector('#btnXacNhan').onclick = function(){
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    console.log('sinh viên',sv);
    //Dùng axios đưa dữ liệu về serverr thông qua api backend cung cấp
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //Api backend cung cấp
        method: 'POST', //giao thức backend cung cấp\
        data: sv //Dữ liệu gửi đi (lưu ý: dữ liệu gửi đi phải đúng format dữ liệu của backend yêu cầu)
    });
    //Hàm thực thi khi gọi ajax thành công 
    promise.then(function(result){
        console.log(result.data);
        //Gọi phương thức lấy thông tin sinh viên tạo lại table omiws
        layDanhSachSinhVienApi();
    });
    //Hàm thực thi khi lỗi xảy ra
    promise.catch(function(error){
        console.log(error.response.data);
    })
    xoaSinhVien();
    suaSinhVien();
}
//Chức năng xóa sinh viên server dựa vào api backend 
var xoaSinhVien = function(maSinhVien){
    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=` +
        maSinhVien,
        method: 'DELETE',
    })
    promise.then(function(result){
        console.log(result.data);
        //Gọi phương thức lấy thông tin sinh viên tạo lại table omiws
        layDanhSachSinhVienApi();
    });
    //Hàm thực thi khi lỗi xảy ra
    promise.catch(function(error){
        console.log(error.response.data);
    })
}
var suaSinhVien = function(maSinhVien){
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVien,
        method:'GET',
    })
    promise.then(function(result){
        console.log(result.data);
        //Gọi phương thức lấy thông tin sinh viên tạo lại table omiws
        var sv = result.data;
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        document.querySelector('#diemToan').value = sv.diemToan;
        sv.diemLy = document.querySelector('#diemLy').value;
        sv.diemHoa = document.querySelector('#diemHoa').value;
        sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    });
    //Hàm thực thi khi lỗi xảy ra
    promise.catch(function(error){
        console.log(error.response.data);
    })
}
document.querySelector('#btnLuuThongTin').onclick = function(){
    //Lấy dữ liệu người dùng đưa vào đối tượng format dữ liệu của backend yêu cầu 
    
        //Gọi phương thức lấy thông tin sinh viên tạo lại table omiws
        var sv = new SinhVien;
        sv.maSinhVien = document.querySelector('#maSinhVien').value;
        sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
        sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
        sv.email = document.querySelector('#email').value;
        sv.diemToan = document.querySelector('#diemToan').value;
        sv.diemLy = document.querySelector('#diemLy').value;
        sv.diemHoa = document.querySelector('#diemHoa').value;
        sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
        var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+sv.maSinhVien,
        method: 'PUT',
        data: sv
    })
    promise.then(function(result){
        console.log(result.data);
        //Gọi phương thức lấy thông tin sinh viên tạo lại table omiws
        layDanhSachSinhVienApi();
    });
    //Hàm thực thi khi lỗi xảy ra
    promise.catch(function(error){
        console.log(error.response.data);
    })
}


