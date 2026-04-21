import { Resend } from "resend"

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null
function getResend() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set")
    }
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

const FROM_EMAIL = "Byte iz KidsLearnAI <noreply@kids-learning-ai.com>"
const SITE_URL = "https://www.kids-learning-ai.com"

// Email timing in hours from trial start
export const EMAIL_TIMING_HOURS = {
  1: 0,      // Immediate
  2: 48,     // Day 2
  3: 96,     // Day 4
  4: 144,    // Day 6
  5: 192,    // Day 8
} as const

export type EmailStep = 1 | 2 | 3 | 4 | 5

// Calculate next send time based on step and trial start
export function getNextSendTime(step: EmailStep, trialStartedAt: Date): Date {
  const hours = EMAIL_TIMING_HOURS[step]
  return new Date(trialStartedAt.getTime() + hours * 60 * 60 * 1000)
}

// Calculate days remaining in trial (7 day trial)
export function getDaysRemaining(trialStartedAt: Date): number {
  const trialEndDate = new Date(trialStartedAt.getTime() + 7 * 24 * 60 * 60 * 1000)
  const now = new Date()
  const remaining = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(0, remaining)
}

// Base email template wrapper
function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KidsLearnAI</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #7C3AED;
      padding: 24px 32px;
      text-align: center;
    }
    .header-logo {
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }
    .header-mascot {
      font-size: 20px;
      margin-top: 8px;
    }
    .content {
      background-color: #ffffff;
      padding: 32px;
    }
    h1, h2, h3 {
      color: #2D2A3D;
      margin-top: 0;
    }
    h1 { font-size: 24px; }
    h2 { font-size: 20px; }
    h3 { font-size: 18px; }
    p { margin: 16px 0; }
    .cta-button {
      display: inline-block;
      background-color: #7C3AED;
      color: #ffffff !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 16px;
      margin: 24px 0;
    }
    .cta-button:hover {
      background-color: #6B2FD6;
    }
    .cta-wrapper {
      text-align: center;
      margin: 24px 0;
    }
    .trust-line {
      color: #64748B;
      font-size: 14px;
      text-align: center;
      margin-top: 8px;
    }
    .highlight-box {
      background-color: #F5F3FF;
      border-left: 4px solid #7C3AED;
      padding: 16px 20px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .achievement-card {
      background-color: #F0FDF4;
      border: 1px solid #BBF7D0;
      border-radius: 8px;
      padding: 12px 16px;
      margin: 12px 0;
    }
    .achievement-card strong {
      color: #166534;
    }
    .urgency-box {
      background-color: #FEF3C7;
      border: 1px solid #FCD34D;
      border-radius: 8px;
      padding: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .special-offer {
      background-color: #ECFDF5;
      border: 2px solid #10B981;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .special-offer .price {
      font-size: 32px;
      font-weight: bold;
      color: #059669;
    }
    .special-offer .original-price {
      text-decoration: line-through;
      color: #9CA3AF;
      font-size: 18px;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
    .footer {
      background-color: #F3F4F6;
      padding: 24px 32px;
      text-align: center;
      font-size: 14px;
      color: #6B7280;
    }
    .footer a {
      color: #7C3AED;
      text-decoration: none;
    }
    .unsubscribe {
      margin-top: 16px;
      font-size: 12px;
      color: #9CA3AF;
    }
    @media only screen and (max-width: 600px) {
      .content { padding: 24px 16px; }
      .header { padding: 20px 16px; }
      .footer { padding: 20px 16px; }
      h1 { font-size: 22px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="header-logo">KidsLearnAI</p>
      <p class="header-mascot">🤖 Byte</p>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>KidsLearnAI · <a href="${SITE_URL}">kids-learning-ai.com</a> · Kranj, Slovenia</p>
      <p class="unsubscribe">
        <a href="${SITE_URL}/unsubscribe">Odjava od e-novic</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}

// Email 1 - Day 0 (immediate on signup)
function getEmail1(): { subject: string; html: string } {
  const content = `
    <p>Pozdravljeni! Jaz sem <strong>Byte</strong>, vaš osebni AI učni pomočnik. 🤖</p>
    
    <p>Vaš otrok ima <strong>7 dni brezplačnega dostopa</strong> do vseh tečajev. Začnite danes z <strong>Robotika in AI</strong> — najboljši tečaj za začetnike.</p>
    
    <div class="highlight-box">
      <strong>Kaj vas čaka:</strong>
      <ul>
        <li>5 interaktivnih tečajev o AI in robotiki</li>
        <li>Zabavne igre in izzivi</li>
        <li>Osebni AI tutor Byte</li>
        <li>Značke in nagrade za napredek</li>
      </ul>
    </div>
    
    <div class="cta-wrapper">
      <a href="${SITE_URL}/kids/home" class="cta-button">Začni prvi tečaj →</a>
    </div>
    
    <p class="trust-line">Brez kreditne kartice. Prekliči kadarkoli.</p>
    
    <p>Veselim se, da vam lahko pomagam!</p>
    <p>Vaš Byte 🤖</p>
  `
  
  return {
    subject: "Dobrodošli v KidsLearnAI! 🤖 Byte vas že čaka",
    html: emailWrapper(content),
  }
}

// Email 2 - Day 2 (48 hours after signup)
function getEmail2(): { subject: string; html: string } {
  const content = `
    <p>Pozdravljeni!</p>
    
    <p>Opazili smo, da vaš otrok še ni začel prvega tečaja. Samo <strong>10 minut na dan</strong> zadostuje za prve korake v svetu AI.</p>
    
    <div class="highlight-box">
      <strong>🌟 Ta teden se je 12 otrok iz Slovenije naučilo zgraditi svojega prvega robota.</strong>
    </div>
    
    <h3>V prvi lekciji se bo vaš otrok naučil:</h3>
    <ul>
      <li>✅ Kaj je umetna inteligenca (na preprost način)</li>
      <li>✅ Kako roboti "razmišljajo"</li>
      <li>✅ Svojo prvo AI nalogo — gradnja preprostega robota</li>
    </ul>
    
    <div class="cta-wrapper">
      <a href="${SITE_URL}/kids/home" class="cta-button">Nadaljuj kjer si ostal →</a>
    </div>
    
    <p>Tukaj sem, če potrebujete pomoč!</p>
    <p>Vaš Byte 🥺</p>
  `
  
  return {
    subject: "Byte pogreša vašega otroka 🥺",
    html: emailWrapper(content),
  }
}

// Email 3 - Day 4 (96 hours after signup)
function getEmail3(daysRemaining: number): { subject: string; html: string } {
  const content = `
    <p>Pozdravljeni!</p>
    
    <p>Otroci na KidsLearnAI ustvarjajo neverjetne stvari. Poglejte, kaj so že naredili:</p>
    
    <div class="achievement-card">
      <strong>🤖 Luka, 9 let</strong> — zgradil svojega prvega robota
    </div>
    
    <div class="achievement-card">
      <strong>🎨 Maja, 11 let</strong> — ustvarila AI sliko svojega hišnega ljubljenčka
    </div>
    
    <div class="achievement-card">
      <strong>💻 Tim, 8 let</strong> — napisal svoj prvi AI program
    </div>
    
    <p>Vaš otrok je lahko naslednji!</p>
    
    <div class="cta-wrapper">
      <a href="${SITE_URL}/kids/home" class="cta-button">Začni svojo zgodbo →</a>
    </div>
    
    <div class="urgency-box">
      ⏰ <strong>Ostalo vam je še ${daysRemaining} ${daysRemaining === 1 ? 'dan' : daysRemaining < 5 ? 'dni' : 'dni'} brezplačnega preizkusa</strong>
    </div>
    
    <p>Z veseljem pomagam!</p>
    <p>Vaš Byte 🚀</p>
  `
  
  return {
    subject: "Poglejte, kaj so otroci že naredili 🚀",
    html: emailWrapper(content),
  }
}

// Email 4 - Day 6 (144 hours after signup)
function getEmail4(): { subject: string; html: string } {
  const content = `
    <p>Pozdravljeni!</p>
    
    <div class="urgency-box">
      <strong>⏰ Jutri se vaš brezplačni preizkus izteče.</strong>
    </div>
    
    <p>Za samo <strong>€7,90/mesec</strong> vaš otrok dobi:</p>
    
    <ul>
      <li>✅ Neomejen dostop do <strong>vseh tečajev</strong></li>
      <li>✅ Osebni AI učni pomočnik <strong>Byte</strong></li>
      <li>✅ <strong>Nove vsebine</strong> vsak mesec</li>
      <li>✅ <strong>Varno okolje</strong> brez reklam</li>
      <li>✅ Sledenje napredku in poročila</li>
    </ul>
    
    <div class="cta-wrapper">
      <a href="${SITE_URL}/pricing" class="cta-button">Nadaljuj za €7,90/mesec →</a>
    </div>
    
    <p style="text-align: center; color: #64748B; font-size: 14px;">
      Ali potrebujete več časa? Pišite nam na <a href="mailto:support@kids-learning-ai.com" style="color: #7C3AED;">support@kids-learning-ai.com</a>
    </p>
    
    <p>Upam, da ostanete z nami!</p>
    <p>Vaš Byte ⏰</p>
  `
  
  return {
    subject: "⏰ Še 1 dan brezplačnega dostopa",
    html: emailWrapper(content),
  }
}

// Email 5 - Day 8 (192 hours after signup)
function getEmail5(): { subject: string; html: string } {
  const content = `
    <p>Pozdravljeni!</p>
    
    <p>Vemo, da je čas dragocen. Zato imamo za vas <strong>posebno ponudbo</strong>.</p>
    
    <div class="special-offer">
      <p style="margin: 0 0 8px 0;">Pridružite se danes in dobite</p>
      <p class="price">€6 <span class="original-price">€9</span></p>
      <p style="margin: 8px 0 0 0;">za prvi mesec</p>
    </div>
    
    <p style="text-align: center;">Uporabite kodo: <strong style="background: #F3E8FF; padding: 4px 12px; border-radius: 4px; color: #7C3AED;">WELCOME33</strong></p>
    
    <div class="urgency-box">
      ⏰ <strong>Ta ponudba velja samo 48 ur.</strong>
    </div>
    
    <div class="cta-wrapper">
      <a href="${SITE_URL}/pricing?coupon=WELCOME33" class="cta-button">Uveljavi popust →</a>
    </div>
    
    <p style="text-align: center; color: #64748B; font-size: 14px;">
      Če imate kakršnakoli vprašanja, smo vedno tu: <a href="mailto:support@kids-learning-ai.com" style="color: #7C3AED;">support@kids-learning-ai.com</a>
    </p>
    
    <p>Upam, da se kmalu vidimo!</p>
    <p>Vaš Byte 💜</p>
  `
  
  return {
    subject: "Vaš preizkus je potekel — posebna ponudba samo za vas",
    html: emailWrapper(content),
  }
}

// Get email content by step number
export function getSequenceEmail(step: EmailStep, trialStartedAt?: Date): { subject: string; html: string } {
  switch (step) {
    case 1:
      return getEmail1()
    case 2:
      return getEmail2()
    case 3:
      const daysRemaining = trialStartedAt ? getDaysRemaining(trialStartedAt) : 3
      return getEmail3(daysRemaining)
    case 4:
      return getEmail4()
    case 5:
      return getEmail5()
    default:
      throw new Error(`Invalid email step: ${step}`)
  }
}

// Send a sequence email
export async function sendSequenceEmail(
  email: string,
  step: EmailStep,
  trialStartedAt?: Date
): Promise<{ success: boolean; error?: unknown; messageId?: string }> {
  try {
    const resend = getResend()
    const emailContent = getSequenceEmail(step, trialStartedAt)
    
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: emailContent.subject,
      html: emailContent.html,
    })
    
    if (error) {
      console.error(`[v0] Failed to send sequence email ${step} to ${email}:`, error)
      return { success: false, error }
    }
    
    console.log(`[v0] Sent sequence email ${step} to ${email}, messageId: ${data?.id}`)
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error(`[v0] Error sending sequence email ${step} to ${email}:`, error)
    return { success: false, error }
  }
}
