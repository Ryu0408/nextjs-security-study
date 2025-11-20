import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Spring Security + Next.js 연습 홈</h1>
      <ul>
        <li><a href="/public">/public (Spring, 인증 불필요)</a></li>
        <li><a href="/hello">/hello (Spring, 인증 필요)</a></li>
        <li><Link href="/custom-login">로그인 페이지</Link></li>
        <li><Link href="/signup">회원가입 페이지</Link></li>
      </ul>
    </main>
  )
}
