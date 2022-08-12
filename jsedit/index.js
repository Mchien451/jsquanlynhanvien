// Design: ready
//  * Phân tích lớp đối tượng: Worker
//  *    + id
//  *    + name
//  *    + email
//  *    + pw
//  *    + fd
//  *    + salary
//  *    + position
//  *    + time
//  *    + calcSLR()
//  *
//  */
var workerList = [];

function createWorker() {
  // 1. lấy thông tin từ input
  var workerId = document.getElementById("tknv").value;
  var workerName = document.getElementById("name").value;
  var workerEmail = document.getElementById("email").value;
  var workerPw = document.getElementById("password").value;
  var workerFd = document.getElementById("datepicker").value;
  var workerSalary = document.getElementById("luongCB").value;
  var workerPosition = document.getElementById("chucvu").value;
  var workerTime = document.getElementById("gioLam").value;
  // 2.tao doi tuong worker
  var worker = new Worker(
    workerId,
    workerName,
    workerEmail,
    workerFd,
    workerPw,
    workerSalary,
    workerPosition,
    workerTime,
  );
  console.log(worker);
  // 3 push vo danh sach
  workerList.push(worker);
  console.log(workerList);

  renderWorkerList(workerList);
  //gọi hàm lưu vào localstorage sau khi thêm sinh viên
  saveLocalStorage(workerList, 'arrWK');
}

function renderWorkerList(arrWK) {
  var output = '';
  for (var index = 0; index < arrWK.length; index++) {
    var obWorker = arrWK[index];

    obWorker.calcSLR = function () {
      if (obWorker.position == "Giám đốc") {
        return obWorker.salary * 3;
      } else if (obWorker.position == "Trưởng phòng") {
        return obWorker.salary * 2;
      } else if (obWorker.position == "Nhân viên") {
        return obWorker.salary * 1;
      }
    };

    obWorker.calcXL = function () {
      if (obWorker.time >= 192) {
        return "Xuất sắc";
      } else if (obWorker.time >= 176) {
        return "Giỏi";
      } else if (obWorker.time >= 160) {
        return "Khá";
      } else {
        return "Trung bình";
      }
    };
    var trSV = `
        <tr>
          <td>${obWorker.id}</td>
          <td>${obWorker.name}</td>
          <td>${obWorker.email}</td>
          <td>${obWorker.fd}</td>
          <td>${obWorker.position}</td>
          <td>${obWorker.calcSLR()}</td>
          <td>${obWorker.calcXL()}</td>
          <td>
          <button class="btn btn-danger" onclick="delWorker('${obWorker.id}')">Del</button>
          <button class="btn btn-primary" onclick="editWorker('${obWorker.id}')">Update</button>
          </td>
        </tr>
      `;

    output += trSV;
  }
  document.querySelector('tbody').innerHTML = output;
  return output;
}

function editWorker(idClick) {
  var wkEdit = null;
  for (var index = 0; index < workerList.length; index++) {
    if (workerList[index].id == idClick) {
      //Tại vị trí này tìm thấy idClick = id object trong mảng
      wkEdit = workerList[index];
      break;
    }
  }
  if (wkEdit !== null) {
    //Đưa dữ liệu lên các control input
    document.querySelector('#tknv').value = wkEdit.id;
    document.querySelector('#name').value = wkEdit.name;
    document.querySelector('#email').value = wkEdit.email;
    document.querySelector('#password').value = wkEdit.pw;
    document.querySelector('#datepicker').value = wkEdit.fd;
    document.querySelector('#luongCB').value = wkEdit.salary;
    document.querySelector('#chucvu').value = wkEdit.position;
    document.querySelector('#gioLam').value = wkEdit.time;
  }
}
function updateWorker() {
  var wkUpdate = new Worker();
  wkUpdate.id = document.querySelector('#tknv').value;
  wkUpdate.name = document.querySelector('#name').value;
  wkUpdate.email = document.querySelector('#email').value;
  wkUpdate.fd = document.querySelector('#password').value;
  wkUpdate.pw = document.querySelector('#datepicker').value;
  wkUpdate.salary = document.querySelector('#luongCB').value;
  wkUpdate.position = document.querySelector('#chucvu').value;
  wkUpdate.time = document.querySelector('#gioLam').value;
  console.log(wkUpdate);
  let indexEdit = -1;
  for (var index = 0; index < workerList.length; index++) {
    if (workerList[index].id === wkUpdate.id) {
      indexEdit = index; //1
      break;
    }
  }
  if (indexEdit !== -1) {
    //Nếu tìm thấy vị trí trong mảng thì lấy object trong mảng gán lại = object trên giao diện người dùng thay đổi
    
    workerList[indexEdit].name = wkUpdate.name;
    workerList[indexEdit].email = wkUpdate.email;
    workerList[indexEdit].fd = wkUpdate.fd;
    workerList[indexEdit].pw = wkUpdate.pw;
    workerList[indexEdit].salary = wkUpdate.salary;
    workerList[indexEdit].position = wkUpdate.position;
    workerList[indexEdit].time = wkUpdate.time;
    //Gọi hàm rendertable truyền cho hàm mảng mới
    renderWorkerList(workerList);
  }
}
function delWorker(idClick) { // input id: giá trị người dùng click
  //output: index    //                 0   1   2
  var indexDel = -1; // workerList = [{1},{2},{3}] workerList[2].name ='abc';
  for (var index = workerList.length - 1; index >= 0; index--) {
    //Mỗi lần duyệt lấy ra 1 phần tử của mảng so với input người dùng click
    if (workerList[index].id == idClick) {
      // indexDel = index; //Lưu lại vị trí id click = worker có mã trùng với idClick
      // break; //thoát ra khỏi vòng lặp
      workerList.splice(index, 1);
    }
  }
  renderWorkerList(workerList);

  // saveLocalStorage(workerList, 'arrSV');
  // if (indexDel !== -1) { //tìm thấy
  //   workerList.splice(indexDel, 1);
  //   //Gọi lại hàm render table mới
  //   //Lưu danh sách sau khi xoá vào storage
  // }
}
/**
 * Hàm lưu trữ object({}) hoặc array ([]) vào localstorage
 * @param {*} ob Dữ liệu cần lưu 
 * @param {*} key keyName trong localstorage
 */

function saveLocalStorage(ob, key) { // {} , []
  var str = JSON.stringify(ob);
  localStorage.setItem(key, str);
}

/**
 * Hàm nhận vào keyName để lấy ra giá trị từ localstorage theo key đó
 * @param {*} key : tên của item trong localStorage
 * @returns trả về object được lấy ra theo key
 */

function getLocalStorage(key) {
  //Lấy dữ liệu từ localstorage ra (dữ liệu lấy là string)
  if (localStorage.getItem(key)) {
    var str = localStorage.getItem(key);
    //Parse dữ liệu về lại object
    var ob = JSON.parse(str);
    return ob;
  }
  return undefined;
}

window.onload = function () {
  //Lấy ra array nhan viên từ localstorage gán vào workerList
  workerList = getLocalStorage('arrWK');
  console.log('workerList', workerList);
  if (workerList == undefined) {
    workerList = [];
  }
  debugger;
  renderWorkerList(workerList);
}




function checkAccount() {
  var account = document.getElementById("tknv").value;
  if (account == "") {
    x``
    document.getElementById("tbTKNV").innerHTML = "* Không để trống tài khoản!";
  }
  else {
    var reg = /^\d{4,6}$/
    if (reg.test(account)) {
      document.getElementById("tbTKNV").innerHTML = "";
    }
    else {
      document.getElementById("tbTKNV").innerHTML = "*Tài khoản chỉ gồm 4-6 kí tự số!";
    }
  }
}

function checkName() {
  var name = document.getElementById("name").value;
  var reg = /\d|[!@#$%^&*-+=,.<>/]/;
  if (name == "") {
    document.getElementById("tbTen").innerHTML = "* Không để trống tên nhân viên!";
  }
  else {
    if (reg.test(name) == false) {
      document.getElementById("tbTen").innerHTML = "";
    }
    else {
      document.getElementById("tbTen").innerHTML = "* Tên nhân viên chỉ được chứa kí tự chữ cái";
    }
  }

}

function checkPassword() {
  var pd = document.getElementById("password").value;
  if (pd == "") {
    document.getElementById("tbMatKhau").innerHTML = "* Không để trống password!";
  }
  else {
    var reg ="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
    if(reg.test(pd)) {

      document.getElementByID("#tbMatKhau").innerHTML = "";}
      
      else{
      document.getElementByID("#tbMatKhau").innerHTML = "* Mật khẩu không hợp lệ!";
      }
  }
}

function checkEmail() {
  var email = document.getElementById("email").value;
  var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if (email == "") {
    document.getElementById("tbEmail").innerHTML = "* Không để trống Email!";
  }
  else {
    if (reg.test(email)) {
      document.getElementById("tbEmail").innerHTML = "";
    }
    else {
      document.getElementById("tbEmail").innerHTML = "* Email sai định dạng!";
    }
  }
}

function checkDatePicker() {
  var dp = document.getElementById("datepicker").value;
  if (dp == "") {
    document.getElementById("tbNgay").innerHTML = "* Không để trống ngày làm việc!";
  }
  else {
    document.getElementById("tbEmail").innerHTML = "";
  }
}

function checkSalary() {
  var salary = document.getElementById("luongCB").value;
  if (salary == "") {
    document.getElementById("tbLuongCB").innerHTML = "* Không để trống lương cơ bản!";
  }
  else {
    if ((Number)(salary) >= 1000000 && (Number)(salary) <= 20000000) {
      document.getElementById("tbLuongCB").innerHTML = "";
    }
    else {
      document.getElementById("tbLuongCB").innerHTML = "* Lương cơ bản chỉ từ 1.000.000 - 20.000.000!";
    }
  }
}

function checkPosition() {
  var position = document.getElementById("chucvu").value;
  if (position == "Giám đốc" || position == "Trưởng phòng" || position == "Nhân viên") {
    document.getElementById("tbChucVu").innerHTML = "";
  }
  else {
    document.getElementById("tbChucVu").innerHTML = "* Vui lòng chọn chức vụ cho nhân viên!";
  }
}

function checkTime() {
  var time = document.getElementById("gioLam").value;
  if (time == "") {
    document.getElementById("tbGiolam").innerHTML = "* Không để trống giờ làm!";
  }
  else {
    if ((Number)(time) >= 80 && (Number)(time) <= 200) {
      document.getElementById("tbGiolam").innerHTML = "";
    }
    else {
      document.getElementById("tbGiolam").innerHTML = "* Vui lòng nhập giờ làm từ 80-200 giờ!";
    }
  }
}



var searchWorker = function () {  
  //input: tuKhoa : string
  var tuKhoa = document.querySelector('#searchName').value; //a
  tuKhoa = removeVietnameseTones(tuKhoa);// 
  var output = [];
  for (var index = 0; index < workerList.length; index++) {
    var tenWorker = removeVietnameseTones(workerList[index].name); // => nguyen van a.search(nguyen)
    if (tenWorker.search(tuKhoa) != -1 || workerList[index].id == tuKhoa) {
      //Tìm thấy => add object tại vị trí đó vào output
      output.push(workerList[index]);
    }
  }
  //Dùng output render ra table
  renderWorkerList(output);
}
//Dom đến txtSearch cài đặt sự kiện oninput 
document.querySelector('#searchName').oninput = searchWorker;
//Tìm kiếm
document.querySelector('#btnTimNV').onclick = searchWorker;


var searchWorkerRank = function () {  
  //input: tuKhoa : string
  var tuKhoaRank = document.querySelector('#searchNameRank').value; //a
  
  var output = [];
  for (var index = 0; index < workerList.length; index++) {
    
    if (workerList[index].calcXL.search(tuKhoaRank) != -1 ) {
      //Tìm thấy => add object tại vị trí đó vào output
      output.push(workerList[index]);
    }
  }
  //Dùng output render ra table
  renderWorkerList(output);
}
//Dom đến txtSearch cài đặt sự kiện oninput cho nó
document.querySelector('#searchNameRank').oninput = searchWorkerRank;
//Tìm kiếm
document.querySelector('#btnTimNVRank').onclick = searchWorkerRank;


function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}