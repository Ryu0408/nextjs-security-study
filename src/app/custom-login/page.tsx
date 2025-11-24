'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const CustomLoginPage: React.FC = () => {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const getErrorMessage = (code: string | null) => {
        switch (code) {
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
    }

    const errorMessage = getErrorMessage(error)

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
                <div>
                    <label>
                        <input type="checkbox" name="remember-me" />
                        로그인 상태 유지
                    </label>
                </div>
                <button type="submit">로그인</button>
            </form>
        </main>
    )
}

export default CustomLoginPage
