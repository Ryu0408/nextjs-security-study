// app/(protected)/layout.tsx
import React from 'react'
import { redirect } from 'next/navigation'
import { fetchMe } from '@/lib/auth'
import Link from 'next/link'

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
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

                <a href="/logout" style={{ marginLeft: 16 }}>로그아웃</a>
            </header>

            <main style={{ padding: 24 }}>
                {children}
            </main>
        </div>
    )
}
