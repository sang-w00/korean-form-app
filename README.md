# 통계등록부 이용자 설명회 참석 신청 웹사이트

Next.js로 만든 통계등록부 이용자 설명회 참석 신청 양식 웹사이트입니다.

## 주요 기능

- 개인정보 수집 동의 체크
- 참석자 정보 입력 (성명, 소속 기관, 소속 부서, 연락처, 이메일)
- 참석 희망 일정 선택
- 폼 제출 및 이메일 전송
- 반응형 디자인

## 설치 및 실행 방법

### 환경 요구 사항

- Node.js 18.17.0 이상
- npm 또는 yarn

### 로컬 개발 환경 설정

1. 저장소 클론

```bash
git clone https://github.com/yourusername/korean-form-app.git
cd korean-form-app
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. 환경 변수 설정

`.env.local` 파일을 프로젝트 루트 디렉토리에 생성하고 다음 내용을 추가합니다:

```
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
EMAIL_FROM=noreply@yourwebsite.com
EMAIL_TO=admin@yourwebsite.com
```

4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

5. 브라우저에서 `http://localhost:3000`으로 접속하여 앱을 확인합니다.

## 메일 전송 설정

이 앱은 nodemailer를 사용하여 이메일을 전송합니다. 실제 프로덕션 환경에서는 다음과 같은 이메일 서비스를 사용하는 것이 좋습니다:

- SendGrid
- AWS SES (Simple Email Service)
- Mailgun
- SMTP 서비스

## Vercel을 이용한 배포 방법

1. Vercel 계정 만들기

먼저 [Vercel](https://vercel.com)에 가입하고 계정을 만듭니다.

2. GitHub 저장소에 코드 업로드

프로젝트를 GitHub 저장소에 업로드합니다:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/korean-form-app.git
git push -u origin main
```

3. Vercel 프로젝트 생성

- Vercel 대시보드에서 "New Project" 버튼을 클릭합니다.
- GitHub 계정을 연결하고 방금 업로드한 저장소를 선택합니다.
- 프로젝트 설정을 검토합니다. Next.js 프로젝트는 자동으로 감지됩니다.

4. 환경 변수 설정

Vercel 프로젝트 설정에서 "Environment Variables" 섹션으로 이동하여 로컬 개발 환경에서 사용했던 것과 동일한 환경 변수를 추가합니다:

```
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
EMAIL_FROM=noreply@yourwebsite.com
EMAIL_TO=admin@yourwebsite.com
```

5. 배포

"Deploy" 버튼을 클릭하여 애플리케이션을 배포합니다. Vercel은 자동으로 Next.js 프로젝트를 빌드하고 배포합니다.

6. 도메인 설정 (선택 사항)

- 배포가 완료되면 Vercel은 `https://your-project-name.vercel.app`과 같은 URL을 제공합니다.
- 사용자 정의 도메인을 사용하려면 Vercel 프로젝트 설정의 "Domains" 섹션에서 도메인을 추가하고 DNS 설정을 구성합니다.

7. 자동 업데이트

- GitHub 저장소에 새로운 변경 사항을 푸시할 때마다 Vercel은 자동으로 애플리케이션을 다시 빌드하고 배포합니다.
- 브랜치별 미리보기 기능도 제공됩니다.

## 추가 설정 및 관리

### 폼 데이터 분석 및 관리

- 제출된 데이터를 저장하고 관리하려면 데이터베이스 연결이 필요합니다.
- MongoDB, Supabase, Firebase 등의 서비스를 사용할 수 있습니다.

### 보안 강화

- reCAPTCHA 통합으로 스팸 방지
- HTTPS 적용 (Vercel에서 기본 제공)
- 환경 변수의 안전한 관리

## 라이센스

MIT

# 다중 도메인 구성 및 테스트 가이드

이 프로젝트는 두 가지 다른 양식을 도메인에 따라 다르게 제공합니다:
1. 기본 도메인 - 통계작성기관 및 연구기관을 위한 접수양식 (1)
2. 'local-gov' 도메인 - 지자체 등을 위한 접수양식 (2)

## 로컬 개발 환경에서 테스트하기

### 1. hosts 파일 수정 (로컬 테스트용)

다른 도메인을 시뮬레이션하기 위해 호스트 파일을 수정합니다:

**Windows**:
`C:\Windows\System32\drivers\etc\hosts` 파일을 관리자 권한으로 열고 다음 줄을 추가합니다:
```
127.0.0.1 local-gov.localhost
127.0.0.1 research.localhost
```

**Mac/Linux**:
`/etc/hosts` 파일을 수정하기 위해 터미널을 열고 다음 명령어를 실행합니다:
```bash
sudo nano /etc/hosts
```

그리고 다음 줄을 추가합니다:
```
127.0.0.1 local-gov.localhost
127.0.0.1 research.localhost
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 브라우저에서 테스트

다음 URL로 접속하여 각각 다른 양식이 표시되는지 확인합니다:
- http://research.localhost:3000 - 접수양식 (1) 표시
- http://local-gov.localhost:3000 - 접수양식 (2) 표시

## Vercel을 이용한 다중 도메인 배포

Vercel에서 다중 도메인 설정을 위해 다음 단계를 따릅니다:

### 1. 프로젝트 배포

먼저 프로젝트를 Vercel에 배포합니다 (README.md 파일의 기존 배포 방법 참조).

### 2. 도메인 설정

1. Vercel 대시보드에서 프로젝트 설정으로 이동합니다.
2. "Domains" 섹션으로 이동합니다.
3. 첫 번째 도메인(예: form1.example.com)을 추가하고 DNS 설정을 완료합니다.
4. 두 번째 도메인(예: form2.example.com)을 추가하고 DNS 설정을 완료합니다.

### 3. 환경 변수 설정

도메인 별로 다른 행동을 구분하기 위한 환경 변수를 설정합니다:

1. Vercel 대시보드에서 프로젝트 설정으로 이동합니다.
2. "Environment Variables" 섹션으로 이동합니다.
3. 다음 환경 변수를 추가합니다:
   ```
   LOCAL_GOV_DOMAIN=form2.example.com
   RESEARCH_DOMAIN=form1.example.com
   ```

## 다중 도메인 로직 설명

미들웨어(`middleware.js`)는 들어오는 요청의 호스트 이름을 확인하여 적절한 페이지로 라우팅합니다:

1. 호스트 이름에 'local-gov'가 포함되어 있으면 `/local-gov` 경로로 리다이렉트됩니다.
2. 다른 모든 호스트 이름은 기본 경로('/')로 유지됩니다.

각 경로는 다른 양식 UI를 제공하지만, 모든 폼 제출은 동일한 API 엔드포인트(`/api/submit-form`)로 전송됩니다.

API 핸들러는 폼 데이터의 구조를 검사하여 어떤 양식에서 제출되었는지 판단하고 그에 맞게 처리합니다.