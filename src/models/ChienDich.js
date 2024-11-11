export default class ChienDich {
  constructor({
    idChienDich,
    ten,
    noiDung,
    ngayBatDau,
    ngayKetThuc,
    nganSachDuKien,
    thucThu,
    thucChi,
    trangThai,
    idToChuc,
    taiKhoan,
  }) {
    this.idChienDich = idChienDich;
    this.ten = ten;
    this.noiDung = noiDung;
    this.ngayBatDau = ngayBatDau;
    this.ngayKetThuc = ngayKetThuc;
    this.nganSachDuKien = nganSachDuKien;
    this.thucThu = thucThu;
    this.thucChi = thucChi;
    this.trangThai = trangThai;
    this.idToChuc = idToChuc;
    this.taiKhoan = taiKhoan;
  }
}
