// app/(protected)/admin/page.tsx
import React from 'react'
import { redirect } from 'next/navigation'
import { fetchMe } from '@/lib/auth'

export default async function AdminPage() {
    const me = await fetchMe()

    if (!me) {
        redirect('/custom-login?error=unauthorized')
    }

    // ROLE 체크
    if (me.role !== 'ROLE_ADMIN') {
        redirect('/access-denied')
    }

    return (
        <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
            <h2>관리자 대시보드</h2>
            <p>안녕하세요, 관리자 {me.username} 님.</p>
        </main>
    )
}
