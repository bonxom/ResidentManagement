import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function DanhSachThuTien() {
  // Dữ liệu mẫu
  const fullData = [
    {
      event: "Tết Trung Thu",
      role: "Dân cư",
      name: "Nguyễn Văn A",
      chuHo: "Nguyễn Văn Chủ",
      status: "Rồi",
    },
    {
      event: "Tết Trung Thu",
      role: "Dân cư",
      name: "Nguyễn Văn B",
      chuHo: "Nguyễn Văn Hộ",
      status: "Chưa",
    },
    {
      event: "Lễ Quốc Khánh",
      role: "Kế toán",
      name: "Nguyễn Văn C",
      chuHo: "Nguyễn Văn Hộ",
      status: "Rồi",
    },
    {
      event: "Lễ Quốc Khánh",
      role: "Dân cư",
      name: "Nguyễn Văn D",
      chuHo: "Nguyễn Văn Hộ",
      status: "Chưa",
    },
  ];

  const [data, setData] = useState(fullData);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("Tất cả");

  // Lọc chỉ người chưa đóng tiền
  const handleFilterChuaDuyet = () => {
    setData((prev) => prev.filter((item) => item.status === "Chưa"));
  };

  // Tìm kiếm
  const handleSearch = () => {
    let filtered = data;

    if (searchText.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterRole !== "Tất cả") {
      filtered = filtered.filter((item) => item.role === filterRole);
    }

    setData(filtered);
  };

  // Cập nhật trạng thái
  const updateStatus = (index, newStatus) => {
    const newData = [...data];
    newData[index].status = newStatus;
    setData(newData);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>Danh sách thu tiền hoạt động xã hội</h1>

          <button
            onClick={handleFilterChuaDuyet}
            style={{
              background: "#2962ff",
              color: "white",
              fontSize: "18px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Tạo mới
          </button>
        </div>

        {/* Khung tìm kiếm */}
        <div
          style={{
            marginTop: "20px",
            background: "#f1f3f6",
            padding: "20px",
            borderRadius: "12px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>
              Tìm kiếm theo tên
            </p>
            <input
              type="text"
              placeholder="🔍 Nhập nội dung..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>Lọc theo</p>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <option>Tất cả</option>
              <option>Dân cư</option>
              <option>Kế toán</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            style={{
              height: "45px",
              padding: "0 20px",
              background: "#2962ff",
              color: "white",
              borderRadius: "8px",
              border: "none",
              alignSelf: "flex-end",
              cursor: "pointer",
            }}
          >
            Tìm kiếm
          </button>
        </div>

        {/* Bảng danh sách */}
        <div
          style={{
            background: "white",
            marginTop: "30px",
            padding: "30px",
            borderRadius: "12px",
          }}
        >
          {/* Header bảng */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1.5fr 1.5fr 1fr",
              gap: "20px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            <div>Tên sự kiện</div>
            <div>Vai trò</div>
            <div>Họ và tên</div>
            <div>Tên chủ hộ</div>
            <div>Trạng thái thanh toán tiền</div>
          </div>

          {/* Dòng dữ liệu */}
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 1.5fr 1.5fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div style={cellStyle}>{item.event}</div>
              <div style={cellStyle}>{item.role}</div>
              <div style={cellStyle}>{item.name}</div>
              <div style={cellStyle}>{item.chuHo}</div>

              <select
                value={item.status}
                onChange={(e) => updateStatus(index, e.target.value)}
                style={{
                  ...cellStyle,
                  color: item.status === "Chưa" ? "red" : "green",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <option value="Chưa">Chưa</option>
                <option value="Rồi">Rồi</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cellStyle = {
  background: "#e5e7eb",
  padding: "10px 15px",
  borderRadius: "20px",
};
