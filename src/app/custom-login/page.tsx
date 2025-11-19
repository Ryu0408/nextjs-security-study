'use client'

import React from 'react'

const CustomLoginPage: React.FC = () => {
    return (
        <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>커스텀 로그인 페이지</h2>
            <p>Spring Security + Next.js(TypeScript) 연동</p>

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

                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    로그인
                </button>
            </form>

            <div style={{ marginTop: 16 }}>
                <a href="/public">/public (인증 불필요)</a>
            </div>
        </div>
    )
}

export default CustomLoginPage
