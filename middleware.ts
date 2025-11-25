import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Kiểm tra nếu người dùng đang truy cập trang chủ
  if (request.nextUrl.pathname === '/') {
    // Lấy trạng thái đăng nhập từ localStorage
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value;

    // Nếu chưa đăng nhập, chuyển hướng về trang login
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Cho phép tiếp tục nếu đã đăng nhập hoặc đang ở trang login
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login']
};