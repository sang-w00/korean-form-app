// File: src/app/layout.js
import './globals.css';

export const metadata = {
  title: '통계등록부 이용자 설명회 참석 신청',
  description: '통계등록부 이용자 설명회 참석 신청 양식입니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}