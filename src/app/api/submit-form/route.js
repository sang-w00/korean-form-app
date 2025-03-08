// src/app/api/submit-form/route.js
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // 선택된 날짜 또는 장소 확인
    let selectedOption = '';
    
    // 첫 번째 폼 타입(통계작성기관 및 연구기관 등)인 경우
    if (formData.selectedDate) {
      selectedOption = formData.selectedDate;
    } 
    // 두 번째 폼 타입(지자체 등)인 경우
    else if (formData.selectedLocation) {
      selectedOption = formData.selectedLocation;
    }
    
    // 폼 유형 확인 및 제목 설정
    const formType = formData.selectedLocation ? '지자체 등' : '통계작성기관 및 연구기관 등';
    
    // SendGrid API 키 설정
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // 이메일 내용 구성
    const emailContent = `
      <h1>통계등록부 이용자 설명회 참석 신청</h1>
      <h2>신청자 정보 (${formType})</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; width: 30%;">성명</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${formData.name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">소속 기관명</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${formData.affiliation}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">소속 부서</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${formData.department}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">전화번호</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${formData.phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">이메일</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${formData.email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">참석 일정</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${selectedOption || '선택된 일정 없음'}</td>
        </tr>
      </table>
      <p>개인정보 수집 및 이용에 동의함</p>
    `;
    
    // 이메일 메시지 구성
    const msg = {
      to: process.env.EMAIL_TO || 'sogic7@korea.kr',
      from: process.env.EMAIL_FROM || 'sogic7@korea.kr', // 인증된 발신자 이메일
      subject: `통계등록부 이용자 설명회 참석 신청 (${formType})`,
      html: emailContent,
    };
    
    try {
        // 개발 환경에서도 이메일 전송을 허용하는 옵션 추가
        if (process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_EMAILS !== 'true') {
          console.log('Email would be sent with:', msg);
        } else {
          // 실제 이메일 전송
          await sgMail.send(msg);
          console.log('Email sent successfully');
        }
        
        return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        { success: false, message: '이메일 전송에 실패했습니다.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { success: false, message: '폼 제출 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}