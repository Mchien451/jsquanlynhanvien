function Worker(id, name, email, fd, pw, salary, position, time) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.fd = fd;
  this.pw = pw;
  this.salary = salary;
  this.position = position;
  this.time = time;

  this.calcSLR = function () {
    if (this.position == "Giám đốc") {
      return this.salary * 3;
    } else if (this.position == "Trưởng phòng") {
      return this.salary * 2;
    } else if (this.position == "Nhân viên") {
      return this.salary * 1;
    }
  }

  this.calcXL = function () {
    if (this.time >= 192) {
      return "Xuất sắc";
    } else if (this.time >= 176) {
      return "Giỏi";
    } else if (this.time >= 160) {
      return "Khá";
    } else {
      return "Trung bình";
    }
  }
}