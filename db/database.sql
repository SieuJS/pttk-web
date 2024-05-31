-- Create NhanVien table with generalized LoaiNV
CREATE TABLE NhanVien (
    MaNV VARCHAR(10) PRIMARY KEY,
    TenNV VARCHAR(255),
    LoaiNV VARCHAR(50)  -- LoaiNV indicates the type of employee (DangTuyen, TiepNhan, ThanhToan)
);

-- Create DoanhNghiep table
CREATE TABLE DoanhNghiep (
    MaSoThue VARCHAR(10) PRIMARY KEY,
    TenCongTy VARCHAR(255),
    NguoiDaiDien VARCHAR(255),
    DiaChi VARCHAR(255),
    Email VARCHAR(255)
);

-- Create PhieuDangKyThanhVien table
CREATE TABLE PhieuDangKyThanhVien (
    MaPhieuDangKy VARCHAR(10) PRIMARY KEY,
    NgayDangKy DATE,
    NgayXetDuyet DATE,
    MaSoThue VARCHAR(10),
	NhanVienTiepNhan VARCHAR(10)
);

-- Create PhieuDangTuyen table
CREATE TABLE PhieuDangTuyen (
    MaPhieuDangTuyen VARCHAR(10) PRIMARY KEY,
    ViTriDangTuyen VARCHAR(255),
    SoLuongTuyenDung INT,
    KhoanThoiGianDangTuyen INTERVAL,
    HinhThucQuangCao VARCHAR(255),
    ThoiGianDangTuyen TIMESTAMP,
    ThoiGianHieuChinh TIMESTAMP,
    MaPhieuDangKy VARCHAR(10),
	NhanVienDangTuyen VARCHAR(10),
	DoanhNghiep VARCHAR(10),
	LoaiQuangCao VARCHAR(10)
);

-- Create YeuCauDangTuyen table
CREATE TABLE YeuCauDangTuyen (
    MaPhieuDangTuyen VARCHAR(10) ,
	MaTieuChiTuyenDung VARCHAR(10),
	PRIMARY KEY (MaPhieuDangTuyen, MaTieuChiTuyenDung)
);

-- Create TieuChiTuyenDung table
CREATE TABLE TieuChiTuyenDung (
    MaTieuChiTuyenDung VARCHAR(10) PRIMARY KEY,
    TenTieuChiTuyenDung VARCHAR(255)
);

-- Create UuDai table
CREATE TABLE UuDai (
    MaUuDai VARCHAR(10) PRIMARY KEY,
    TenUuDai VARCHAR(255),
    ChiTietUuDai TEXT
);

-- Create MaLoai table
CREATE TABLE MaLoai (
    TenLoai VARCHAR(255) PRIMARY KEY,
    Gia MONEY
);

-- Create TiemNangDoanhNghiep table
CREATE TABLE TiemNangDoanhNghiep (
    TiemNang VARCHAR(255) PRIMARY KEY
);

-- Create GiaHan table
CREATE TABLE GiaHan (
    TrangThaiGiaHan BOOLEAN PRIMARY KEY
);

-- Create HopDong table
CREATE TABLE HopDong (
    MaHopDong VARCHAR(10) PRIMARY KEY,
    NgayBatDauHopDong DATE,
    NgayKetThucHopDong DATE,
    DoanhNghiepTiemNang VARCHAR(255)
);

-- Create UngVien table
CREATE TABLE UngVien (
    MaUngVien VARCHAR(10) PRIMARY KEY,
    CCCD VARCHAR(20),
    HoTen VARCHAR(255),
    SDT VARCHAR(20),
    DiaChi VARCHAR(255),
    Email VARCHAR(255)
);

-- Create PhieuDangKyUngTuyen table
CREATE TABLE PhieuDangKyUngTuyen (
    MaPhieuUngTuyen VARCHAR(10) PRIMARY KEY,
    MaUngVien VARCHAR(10),
    ThoiGianBoSung TEXT,
    XuLi BOOLEAN,
    TrangThai BOOLEAN,
);

-- Create DoUuTien table
CREATE TABLE DoUuTien (
    MaPhieu VARCHAR(10) PRIMARY KEY
);

-- Create ThanhToan table
CREATE TABLE ThanhToan (
    LanThanhToan VARCHAR(10) PRIMARY KEY,
    SoTienThanhToan MONEY,
    NgayThanhToan DATE,
    LoaiThanhToan VARCHAR(255),
    MaHoaDon VARCHAR(10),
	NhanVienThanhToan VARCHAR(10)
);

-- Create HoaDon table
CREATE TABLE HoaDon (
    MaHoaDon VARCHAR(10) PRIMARY KEY,
    TongTien MONEY,
    SoDotThanhToan INT,
    DaThanhToan BOOLEAN,
    SoTienLai MONEY,
    TrangThaiThanhToan BOOLEAN
);


