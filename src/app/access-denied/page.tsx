export default function AccessDeniedPage() {
    return (
        <main style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>접근 권한이 없습니다</h2>
            <p>요청하신 페이지를 볼 수 있는 권한이 없습니다.</p>
            <p>다른 계정으로 로그인하거나, 관리자에게 권한을 요청하세요.</p>
            <a href="/" style={{ display: 'inline-block', marginTop: 16 }}>
                홈으로 돌아가기
            </a>
        </main>
    )
}
