'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../config';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const queryParams = new URLSearchParams({
        Username: username,
        Password: password,
      }).toString();

      const response = await fetch(`${API_BASE_URL}/authen/login?${queryParams}`, {
        method: 'GET',
      });

      if (response.ok && response.status === 200) {
        const data = await response.json();
        // Save login information in cookies
        Cookies.set('isLoggedIn', 'true', { path: '/' });

        // Redirect to the homepage
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Sai tên đăng nhập hoặc mật khẩu!');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Có lỗi xảy ra khi đăng nhập!');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/vn-nature.jpg')" }}>
      <div className="p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold text-sky-800 text-center mb-5">HỆ THỐNG NHẬP/XUẤT DỮ LIỆU VẬN HÀNH</h2>
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
              className="mt-1 text-stone-900 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={isLoading} // Disable input when loading
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
              className="mt-1 text-stone-900 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              disabled={isLoading} // Disable input when loading
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
          </button>
        </form>
      </div>
    </div>
  );
}