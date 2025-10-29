import Image from "next/image";
import { PiUserCirclePlus, PiSignIn } from "react-icons/pi";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Header */}
      <header className="h-[60px] bg-[#035291] text-white shadow-lg">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Image
              src="/next.svg"
              alt="Logo"
              width={32}
              height={32}
              className="invert"
            />
            <h1 className="text-xl font-semibold">
              HỆ THỐNG NHẬP/XUẤT DỮ LIỆU GIÁM SÁT
            </h1>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-white text-[#035291] rounded-md font-medium hover:bg-opacity-90 transition-colors flex items-center space-x-2">
              <PiUserCirclePlus className="text-xl" />
              <span>ĐĂNG KÝ</span>
            </button>
            <button className="px-4 py-2 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-[#035291] transition-colors flex items-center space-x-2">
              <PiSignIn className="text-xl" />
              <span>ĐĂNG NHẬP</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Content will go here */}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[80px] bg-[#035291] text-white">
        <div className="container mx-auto h-full px-4 flex items-center justify-center">
          <p className="text-center text-sm">
            © 2025 Hệ thống nhập/xuất dữ liệu giám sát. Bản quyền thuộc về [Tên đơn vị]
          </p>
        </div>
      </footer>
    </div>
  );
}
