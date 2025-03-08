// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host');
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 기본 경로인 경우 (루트 페이지)
  if (pathname === '/') {
    // hostname에 따라 다른 페이지로 리다이렉트
    if (hostname.includes('local-gov') || hostname.includes('localhost:3001')) {
      url.pathname = '/local-gov';
      return NextResponse.rewrite(url);
    } else {
      // 기본 도메인은 원래 페이지로
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * 미들웨어가 실행될 경로들 매칭:
     * - 홈 페이지 (/)
     */
    '/',
  ],
};