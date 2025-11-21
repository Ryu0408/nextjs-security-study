// lib/auth.ts
import { cookies } from 'next/headers'

export type Me = {
    username: string
    role: string // "ROLE_USER" | "ROLE_ADMIN"
}

export async function fetchMe(): Promise<Me | null> {
    const cookieStore = cookies()
    const cookieHeader = cookieStore.toString() // JSESSIONID, remember-me 등 포함

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me`, {
        headers: {
            cookie: cookieHeader,
        },
        // 인증 정보가 바뀔 수 있으니 캐시 사용 안 함
        cache: 'no-store',
    })

    if (res.status === 401) {
        return null
    }

    if (!res.ok) {
        // 403, 500 등
        throw new Error(`Failed to fetch /api/me: ${res.status}`)
    }

    const data = (await res.json()) as Me
    return data
}
