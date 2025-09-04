import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    // Handle demo tokens
    if (token === 'demo-parent-token') {
      return NextResponse.json({
        user: {
          id: 'demo-parent',
          email: 'parent@demo.com',
          role: 'parent',
          name: 'Demo Parent'
        }
      })
    }

    if (token === 'demo-child-token') {
      return NextResponse.json({
        user: {
          id: 'demo-child',
          email: 'child@demo.com',
          role: 'child',
          name: 'Demo Child'
        }
      })
    }

    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
