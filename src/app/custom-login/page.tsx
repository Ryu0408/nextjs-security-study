'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type CsrfTokenResponse = {
    headerName: string
    parameterName: string
    token: string
}

export default function CustomLoginPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const [csrf, setCsrf] = useState<CsrfTokenResponse | null>(null)

    useEffect(() => {
        // 페이지 로드 시 CSRF 토큰 조회
        fetch('/api/csrf-token', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data: CsrfTokenResponse) => setCsrf(data))
            .catch((e) => {
                console.error('Failed to fetch CSRF token', e)
            })
    }, [])

    const errorMessage = (() => {
        switch (error) {
            case 'bad_credentials':
                return '아이디 또는 비밀번호가 올바르지 않습니다.'
            case 'locked':
                return '계정이 잠겨 있습니다. 관리자에게 문의하세요.'
            case 'disabled':
                return '비활성화된 계정입니다. 관리자에게 문의하세요.'
            case 'credentials_expired':
                return '비밀번호 유효기간이 만료되었습니다. 비밀번호를 변경해 주세요.'
            case 'account_expired':
                return '계정 유효기간이 만료되었습니다.'
            case 'unknown':
            default:
                return null
        }
    })()

    return (
        <main style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>로그인</h2>

            {errorMessage && (
                <div style={{ marginBottom: 12, color: 'red' }}>
                    {errorMessage}
                </div>
            )}

            <form method="post" action="/login">
                <div>
                    <label>
                        아이디
                        <input name="username" type="text" />
                    </label>
                </div>
                <div>
                    <label>
                        비밀번호
                        <input name="password" type="password" />
                    </label>
                </div>

                {/* CSRF 토큰 hidden 필드 */}
                {csrf && (
                    <input type="hidden" name={csrf.parameterName} value={csrf.token} />
                )}

                <div>
                    <label>
                        <input type="checkbox" name="remember-me" />
                        로그인 상태 유지
                    </label>
                </div>

                <button type="submit" disabled={!csrf}>
                    로그인
                </button>
            </form>
        </main>
    )
}
