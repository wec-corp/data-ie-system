"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PiInfoBold,
  PiSignIn,
  PiMagnifyingGlass,
  PiFloppyDisk,
} from "react-icons/pi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { fetchConstructionList } from "../utils/api";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"operational" | "quality">(
    "operational"
  );
  const [constructionNames, setConstructionNames] = useState<
    { value: string; label: string }[]
  >([]);
  const router = useRouter();

  const isLoggedIn = Cookies.get("isLoggedIn") === "true";

  const handleLogout = () => {
    Cookies.remove("isLoggedIn", { path: "/" });
    router.push("/login");
  };

  // Sửa lại mảng parameters, thay đổi các unit có chứa m3/s
  const parameters = [
    { id: 1, name: "MƯA THƯỢNG LƯU", value: "MUATHUONGLUU", unit: "mm" },
    { id: 2, name: "THƯỢNG LƯU", value: "THUONGLUU", unit: "m" },
    { id: 3, name: "HẠ LƯU", value: "HALUU", unit: "m" },
    { id: 4, name: "DUNG TÍCH", value: "DUNGTICH", unit: "triệu m³" },
    { id: 5, name: "Q ĐẾN", value: "QDEN", unit: "m³/s" },
    { id: 6, name: "Q XẢ TRÀN", value: "QUATRAN", unit: "m³/s" },
    { id: 7, name: "NHÀ MÁY", value: "NHAMAY", unit: "m³/s" },
    { id: 8, name: "DCTT", value: "DCTT", unit: "m³/s" },
    { id: 9, name: "LƯU LƯỢNG HẠ DU", value: "LUULUONGHADU", unit: "m³/s" },
    { id: 10, name: "DỰ KIẾN LƯU LƯỢNG HẠ DU", value: "DUKIENLUULUONGHADU", unit: "m³/s" },
    { id: 11, name: "MỰC NƯỚC HỒ DỰ KIẾN 12 GIỜ", value: "MUCNUOCHODUKIEN12GIO", unit: "m" },
  ];

  useEffect(() => {
    const loadConstructionNames = async () => {
      const params = {
        TypeOfConstructionId: 0,
        LicenseId: -1,
        ProvinceId: 0,
        DistrictId: 0,
        CommuneId: 0,
        BasinId: -1,
        StartDate: -1,
        Status: true,
        LicensingAuthorities: -1,
        Keyword: '',
        PageIndex: 1,
        PageSize: 0,
        DamType: '',
      };

      const constructionNames = await fetchConstructionList(params);
      console.log(constructionNames);
      setConstructionNames(constructionNames);
    };

    loadConstructionNames();
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Header */}
      <header
        className="h-[60px] text-white shadow-lg"
        style={{ background: "linear-gradient(145deg, #035291, #3ba6ff)" }}
      >
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Image
              src="/img/logo-tai-nguyen-va-moi-truong.png"
              alt="Logo"
              width={32}
              height={32}
            />
            <h1 className="text-xl font-semibold">
              HỆ THỐNG NHẬP/XUẤT DỮ LIỆU GIÁM SÁT
            </h1>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-white text-[#035291] rounded-md font-medium hover:bg-opacity-90 transition-colors flex items-center space-x-2">
              <PiInfoBold className="text-xl" />
              <span>GIỚI THIỆU</span>
            </button>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="cursor-pointer px-4 py-2 border-white text-white rounded-md font-medium hover:bg-red-600 hover:text-white transition-colors flex items-center space-x-2 bg-red-500">
                <span>ĐĂNG XUẤT</span>
              </button>
            ) : (
              <button className="cursor-pointer px-4 py-2 border-white text-white rounded-md font-medium hover:bg-[#193f8f] hover:text-[#fff] transition-colors flex items-center space-x-2 bg-[#0052d3]">
                <PiSignIn className="text-xl" />
                <span>ĐĂNG NHẬP</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Existing search form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

              {/* Tên công trình */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Tên công trình
                </label>
                <input
                  list="construction-list"
                  placeholder="Tìm kiếm công trình..."
                  className="w-full text-black text-sm p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <datalist id="construction-list">
                  {constructionNames.map((construction) => (
                    <option key={construction.value} value={construction.label} />
                  ))}
                </datalist>
              </div>

              {/* Button Chọn công trình */}
              <button className="text-sm h-10 px-4 bg-[#035291] text-white rounded-md font-medium hover:bg-[#0466b6] transition-colors flex items-center justify-center space-x-2 w-1/2">
                <PiMagnifyingGlass className="text-xl" />
                <span>CHỌN CÔNG TRÌNH</span>
              </button>
            </div>

            {/* New data input form */}
            <div className="mt-8 border-t border-slate-400 pt-5">
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Thời gian nhập dữ liệu
                </label>
                <input
                  type="datetime-local"
                  className="w-full text-sm text-black md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Tabs */}
              <div className="mb-4">
                <div className="flex space-x-2 border-b border-slate-400">
                  <button
                    onClick={() => setActiveTab("operational")}
                    className={`px-4 py-2 -mb-px rounded-t-md ${
                      activeTab === "operational"
                        ? "bg-[#349bf0] text-white border border-b-0"
                        : "bg-gray-200"
                    }`}
                  >
                    Thông số vận hành
                  </button>
                  <button
                    onClick={() => setActiveTab("quality")}
                    className={`px-4 py-2 -mb-px rounded-t-md ${
                      activeTab === "quality"
                        ? "bg-[#349bf0] text-white border-b-0"
                        : "bg-gray-200"
                    }`}
                  >
                    Chất lượng nước
                  </button>
                </div>

                <div className="pt-4">
                  {activeTab === "operational" && (
                    <>
                      <div className="grid grid-cols-1 gap-4">
                        <label className="text-sm font-medium text-gray-700 block">
                          Thông số vận hành
                        </label>
                        {parameters.map((param) => (
                          <div
                            key={param.id}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4"
                          >
                            <div>
                              <input
                                type="text"
                                defaultValue={param.name}
                                disabled
                                className="w-full text-sm text-black p-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <div
                                className="w-full text-sm text-black p-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                dangerouslySetInnerHTML={{ __html: param.unit }}
                              />
                            </div>
                            <div>
                              <input
                                type="number"
                                placeholder="Giá trị"
                                className="w-1/2 text-sm text-black p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {activeTab === "quality" && (
                    <div className="text-sm text-gray-500">
                      {/* Nội dung tab "Chất lượng nước" để trống theo yêu cầu */}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-start">
                <button className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <PiFloppyDisk className="text-xl" />
                  <span>LƯU DỮ LIỆU</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[80px] bg-[#035291] text-white">
        <div className="container mx-auto h-full px-4 flex items-center justify-center">
          <p className="text-center text-sm">
            © 2025 Hệ thống nhập/xuất dữ liệu giám sát.
          </p>
        </div>
      </footer>
    </div>
  );
}
