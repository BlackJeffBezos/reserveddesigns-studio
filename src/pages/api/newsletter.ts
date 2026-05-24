import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const email = body?.email?.toString().trim()

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 })
    }

    const res = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.LOOPS_API_KEY}`
      },
      body: JSON.stringify({ email, source: 'website' })
    })

    const loopsResponse = await res.json()
    console.log('Loops status:', res.status)
    console.log('Loops response:', loopsResponse)

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed', detail: loopsResponse }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })

  } catch (err) {
    console.log('API route error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}