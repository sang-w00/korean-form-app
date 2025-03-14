// File: src/app/local-gov/page.js
'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function LocalGovForm() {
  const [formData, setFormData] = useState({
    personalInfoConsent: false,
    name: '',
    affiliation: '',
    department: '',
    phone: '',
    email: '',
    selectedLocation: ''  // 단일 선택용 상태로 변경
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.personalInfoConsent) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    
    if (!formData.selectedLocation) {
      alert('신청일자 및 장소를 선택해주세요.');
      return;
    }
    
    setIsLoading(true);
    setSubmitError(null);
    
    try {
      // Send form data to API route
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after successful submission
        setFormData({
          personalInfoConsent: false,
          name: '',
          affiliation: '',
          department: '',
          phone: '',
          email: '',
          selectedLocation: ''
        });
      } else {
        setSubmitError('답변 전송에 실패했습니다. 담당자에게 문의바랍니다.');
        console.error('Form submission error:', data.message);
      }
    } catch (error) {
      setSubmitError('답변 전송에 실패했습니다. 담당자에게 문의바랍니다.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>접수양식 (2)</h1>
          <div className={styles.categoryBox}>지자체 등</div>
        </div>
        
        {isSubmitted ? (
          <div className={styles.successMessage}>
            <h2>답변이 전송되었습니다.</h2>
            <button 
              className={styles.button} 
              onClick={() => setIsSubmitted(false)}
            >
              새 양식 작성
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* 개인정보 수집·이용·동의 섹션 */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.emptyCheckbox}></div>
                <label className={styles.sectionTitle}>
                  개인정보 수집·이용·동의
                </label>
              </div>
              
              <div className={styles.subSection}>
                <h3>필수사항</h3>
                
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>수집목적</th>
                      <th>수집항목</th>
                      <th>보유기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan="4">통계등록부 관련 의견수렴 및 서비스 제공</td>
                      <td>성명</td>
                      <td rowSpan="4">2년</td>
                    </tr>
                    <tr>
                      <td>소속기관 정보</td>
                    </tr>
                    <tr>
                      <td>전화번호(핸드폰)</td>
                    </tr>
                    <tr>
                      <td>이메일</td>
                    </tr>
                  </tbody>
                </table>
                
                <p className={styles.note}>
                  · 귀하는 통계등록부 이용자 설명회에 필요한 최소한의 개인정보 수집·동의하지 않을 수 있으나, 동의를 거부할 경우 이용자 설명회 참석이 불가합니다.
                </p>
                
                <div className={styles.consentBox}>
                  <input 
                    type="checkbox" 
                    id="consentCheckbox"
                    name="personalInfoConsent"
                    checked={formData.personalInfoConsent}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                    required
                  />
                  <label htmlFor="consentCheckbox">위 개인정보 수집 및 이용에 동의 합니다.(필수)</label>
                </div>
              </div>
            </div>
            
            {/* 통계등록부 이용자 설명회 참석 신청서 섹션 */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <label className={styles.sectionTitle}>
                  통계등록부 이용자 설명회 참석 신청서 (지자체 등)
                </label>
              </div>
              
              <table className={styles.registrationTable}>
                <tbody>
                  <tr>
                    <td>성명</td>
                    <td>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="예시) 홍길동"
                        required
                      />
                    </td>
                    <td>소속 기관명</td>
                    <td>
                      <input 
                        type="text" 
                        name="affiliation"
                        value={formData.affiliation}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="예: 통계청"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>소속 부서</td>
                    <td>
                      <input 
                        type="text" 
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="예: 통계등록부과"
                        required
                      />
                    </td>
                    <td>전화번호(핸드폰)</td>
                    <td>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="예: 010-0000-0000"
                        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>이메일</td>
                    <td>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="예: Hong7777@korea.kr"
                        required
                      />
                    </td>
                    <td>신청일자 및 장소</td>
                    <td>
                      <div className={styles.locationSelection}>
                        <div>
                          <input 
                            type="radio" 
                            id="location_busan" 
                            name="selectedLocation"
                            value="4.15.(화), 동남지방통계청(부산)"
                            checked={formData.selectedLocation === "4.15.(화), 동남지방통계청(부산)"}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="location_busan">4.15.(화), 동남지방통계청(부산)</label>
                        </div>
                        <div>
                          <input 
                            type="radio" 
                            id="location_daegu" 
                            name="selectedLocation"
                            value="5.02.(금), 동북지방통계청(대구)"
                            checked={formData.selectedLocation === "5.02.(금), 동북지방통계청(대구)"}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="location_daegu">5.02.(금), 동북지방통계청(대구)</label>
                        </div>
                        <div>
                          <input 
                            type="radio" 
                            id="location_gwacheon" 
                            name="selectedLocation"
                            value="5.08.(목), 경인지방통계청(과천)"
                            checked={formData.selectedLocation === "5.08.(목), 경인지방통계청(과천)"}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="location_gwacheon">5.08.(목), 경인지방통계청(과천)</label>
                        </div>
                        <div>
                          <input 
                            type="radio" 
                            id="location_gwangju" 
                            name="selectedLocation"
                            value="5.14.(수), 호남지방통계청(광주)"
                            checked={formData.selectedLocation === "5.14.(수), 호남지방통계청(광주)"}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="location_gwangju">5.14.(수), 호남지방통계청(광주)</label>
                        </div>
                        <div>
                          <input 
                            type="radio" 
                            id="location_daejeon" 
                            name="selectedLocation"
                            value="5.20.(화), 충청지방통계청(대전)"
                            checked={formData.selectedLocation === "5.20.(화), 충청지방통계청(대전)"}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="location_daejeon">5.20.(화), 충청지방통계청(대전)</label>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {submitError && (
              <div className={styles.errorMessage}>
                {submitError}
              </div>
            )}
            
            <div className={styles.buttonContainer}>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? '제출 중...' : '제출하기'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}