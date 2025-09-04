import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Demo authentication
    if (email === 'parent@demo.com' && password === 'demo123') {
      return NextResponse.json({
        user: {
          id: 'demo-parent',
          email: 'parent@demo.com',
          role: 'parent',
          name: 'Demo Parent'
        },
        token: 'demo-parent-token'
      })
    }

    if (email === 'child@demo.com' && password === 'demo123') {
      return NextResponse.json({
        user: {
          id: 'demo-child',
          email: 'child@demo.com',
          role: 'child',
          name: 'Demo Child'
        },
        token: 'demo-child-token'
      })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
