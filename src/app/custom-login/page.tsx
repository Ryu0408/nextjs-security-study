'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const CustomLoginPage: React.FC = () => {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    let errorMessage: string | null = null
    if (error === 'unauthorized') {
        errorMessage = '로그인이 필요한 페이지입니다.'
    } else if (error === 'bad_credentials') {
        errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.'
    }

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>커스텀 로그인 페이지</h2>
            <p>Spring Security + Next.js(TypeScript) 연동</p>

            {errorMessage && (
                <div style={{ marginBottom: 12, color: 'red' }}>
                    {errorMessage}
                </div>
            )}

            {/* 이 form은 Next 서버가 아니라 Spring Security로 직접 POST됨 */}
            <form method="post" action="/login">
                <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>
                        아이디
                    </label>
                    {/* 스프링 시큐리티 기본 파라미터명 */}
                    <input
                        type="text"
                        name="username"
                        style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>
                        비밀번호
                    </label>
                    <input
                        type="password"
                        name="password"
                        style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                    />
                </div>

                {/* ★ Remember-Me 체크박스 */}
                <div style={{ marginBottom: 12 }}>
                    <label>
                        <input type="checkbox" name="remember-me" style={{ marginRight: 4 }} />
                        로그인 상태 유지
                    </label>
                </div>

                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    로그인
                </button>
            </form>

            <div style={{ marginTop: 16 }}>
                <a
                    href="/public"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/public';
                    }}
                >
                    /public (인증 불필요)
                </a>
            </div>
        </div>
    )
}

export default CustomLoginPage
