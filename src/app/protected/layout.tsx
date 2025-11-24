// app/(protected)/layout.tsx
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { fetchMe } from '@/lib/auth'
import Link from 'next/link'

type CsrfTokenResponse = {
    headerName: string
    parameterName: string
    token: string
}

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [csrf, setCsrf] = useState<CsrfTokenResponse | null>(null)

    useEffect(() => {
        // 페이지 렌더링 후 CSRF 토큰 받아오기
        fetch('/api/csrf-token', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data: CsrfTokenResponse) => {
                setCsrf(data)
            })
            .catch((e) => {
                console.error('Failed to fetch CSRF token', e)
            })
    }, [])
    const me = await fetchMe()

    if (!me) {
        redirect('/custom-login?error=unauthorized')
    }

    const isAdmin = me.role === 'ROLE_ADMIN'

    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <header style={{ padding: '12px 24px', borderBottom: '1px solid #ddd' }}>
                <span style={{ marginRight: 16 }}>안녕하세요, {me.username} 님</span>
                <Link href="/hello" style={{ marginRight: 8 }}>Hello</Link>
                <Link href="/user/home" style={{ marginRight: 8 }}>User 홈</Link>

                {isAdmin && (
                    <Link href="/admin" style={{ marginRight: 8 }}>
                        관리자 대시보드
                    </Link>
                )}

                <form method="post" action="/logout" style={{ display: 'inline' }}>
                    {/* 로그인 페이지와 마찬가지로 csrf 재활용 or 별도 fetch */}
                    {csrf && <input type="hidden" name={csrf.parameterName} value={csrf.token} />}
                    <button type="submit">로그아웃</button>
                </form>
            </header>

            <main style={{ padding: 24 }}>
                {children}
            </main>
        </div>
    )
}
