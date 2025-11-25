'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Thực hiện call API đăng nhập ở đây
      // Đây là mock data, bạn cần thay thế bằng API thật
      if (username === 'admin' && password === 'admin') {
        // Lưu trạng thái đăng nhập vào cookie
        Cookies.set('isLoggedIn', 'true', { path: '/' });
        // Chuyển hướng về trang chủ
        router.push('/');
      } else {
        alert('Sai tên đăng nhập hoặc mật khẩu!');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Có lỗi xảy ra khi đăng nhập!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/vn-nature.jpg')" }}>
      <div className="p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-md w-96">
        <h2 className="text-lg font-medium text-gray-600 text-center mb-2">HỆ THỐNG NHẬP/XUẤT DỮ LIỆU GIÁM SÁT</h2>
        <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}