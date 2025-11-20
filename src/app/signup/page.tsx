'use client'

import React, { useState } from 'react'

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setMessage(null)

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const text = await res.text()

            if (res.ok) {
                setMessage('회원가입에 성공했습니다. 이제 로그인해보세요.')
                setUsername('')
                setPassword('')
            } else {
                setMessage(text || '회원가입에 실패했습니다.')
            }
        } catch (err) {
            setMessage('서버 오류가 발생했습니다.')
        }
    }

    return (
        <main style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>회원가입</h2>

            {message && (
                <div style={{ marginBottom: 12, color: 'blue' }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>
                        아이디
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>
                        비밀번호
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                    />
                </div>

                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    회원가입
                </button>
            </form>

            <div style={{ marginTop: 16 }}>
                <a href="/custom-login">이미 계정이 있다면 로그인하기</a>
            </div>
        </main>
    )
}

export default SignupPage
