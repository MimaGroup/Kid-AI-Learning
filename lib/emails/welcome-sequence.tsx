// Welcome email sequence templates in Slovenian
// All 5 emails for the 7-day onboarding sequence

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"
const BRAND_COLOR = "#534AB7"

// Base email wrapper
function emailWrapper(content: string, unsubscribeUrl: string = `${SITE_URL}/unsubscribe`): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>KidsLearnAI</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: ${BRAND_COLOR}; padding: 24px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">KidsLearnAI</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px 24px;">
          ${content}
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">
            &copy; ${new Date().getFullYear()} KidsLearnAI. Vsi pravice pridržane.
          </p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Odjava od novic</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

// CTA Button
function ctaButton(text: string, url: string): string {
  return `
    <div style="text-align: center; margin: 24px 0;">
      <a href="${url}" style="display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
        ${text}
      </a>
    </div>
  `
}

// Email 1 - Day 1 - Welcome + first lesson nudge
export function welcomeEmail1(): { subject: string; html: string } {
  const content = `
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">Pozdravljeni,</p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Hvala, ker ste se pridružili <strong>KidsLearnAI</strong> — prvi slovenski AI učni platformi za otroke.
    </p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Vaš otrok ima zdaj dostop do prvih lekcij <strong>AI umetniškega studia</strong>, kjer ga čaka <strong>Byte</strong>, njegov osebni AI tutor.
    </p>
    
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151; font-weight: 600;">Kaj storiti zdaj:</p>
    <ol style="margin: 0 0 24px 0; padding-left: 24px; color: #374151;">
      <li style="margin-bottom: 8px;">Prijavite se na <a href="${SITE_URL}" style="color: ${BRAND_COLOR};">kids-learning-ai.com</a></li>
      <li style="margin-bottom: 8px;">Kliknite na "AI umetniški studio"</li>
      <li style="margin-bottom: 8px;">Začnite s prvo lekcijo — traja samo 15 minut</li>
    </ol>
    
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151;">
      <strong>Byte je pripravljen. Je vaš otrok?</strong>
    </p>
    
    ${ctaButton("Začni prvo lekcijo", `${SITE_URL}/courses/ai-art-studio`)}
    
    <p style="margin: 24px 0 0 0; font-size: 16px; color: #374151;">
      Lep pozdrav,<br>
      <strong>Ekipa KidsLearnAI</strong>
    </p>
  `

  return {
    subject: "Dobrodošli v KidsLearnAI — Byte že čaka 🤖",
    html: emailWrapper(content),
  }
}

// Email 2 - Day 3 - Value email
export function welcomeEmail2(): { subject: string; html: string } {
  const content = `
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">Pozdravljeni,</p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Vedeli ste, da otroci, ki se učijo osnov AI že pri 7 letih, razvijejo boljše logično razmišljanje, kreativnost in samozavest pri delu s tehnologijo?
    </p>
    
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151;">
      <strong>V AI umetniškem studiu na KidsLearnAI bo vaš otrok ta teden:</strong>
    </p>
    
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="margin: 0 0 12px 0; font-size: 15px; color: #374151;">
        🎨 <strong>Odkril, kako AI ustvarja slike</strong> — in ustvaril svojo prvo AI umetnino
      </p>
      <p style="margin: 0 0 12px 0; font-size: 15px; color: #374151;">
        🎵 <strong>Spoznal glasbo in AI</strong> — kako stroji komponirajo melodije
      </p>
      <p style="margin: 0; font-size: 15px; color: #374151;">
        📖 <strong>Sestavil zgodbo s pomočjo AI</strong> — njegova domišljija + Bytova tehnologija
      </p>
    </div>
    
    <p style="margin: 16px 0; font-size: 16px; color: #374151;">
      Vsaka lekcija traja 15–30 minut in je zasnovana tako, da otrok ne more odnehati — ker se res zabava.
    </p>
    
    ${ctaButton("Nadaljuj z učenjem", `${SITE_URL}/courses`)}
    
    <p style="margin: 24px 0 0 0; font-size: 16px; color: #374151;">
      Lep pozdrav,<br>
      <strong>Ekipa KidsLearnAI</strong>
    </p>
  `

  return {
    subject: "Kaj se bo vaš otrok naučil ta teden z Byte-om?",
    html: emailWrapper(content),
  }
}

// Email 3 - Day 5 - Social proof
export function welcomeEmail3(): { subject: string; html: string } {
  const content = `
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">Pozdravljeni,</p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Starši, ki so že preizkusili KidsLearnAI, nam pišejo takole:
    </p>
    
    <div style="background-color: #f9fafb; border-left: 4px solid ${BRAND_COLOR}; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 8px 0; font-size: 15px; color: #374151; font-style: italic;">
        "Moj sin je po prvem tednu sam prosil za več lekcij. Tega prej ni nikoli naredil z nobeno šolsko nalogo."
      </p>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">— Maja K., mama 9-letnega Luka</p>
    </div>
    
    <div style="background-color: #f9fafb; border-left: 4px solid ${BRAND_COLOR}; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 8px 0; font-size: 15px; color: #374151; font-style: italic;">
        "Končno platforma, ki je resnično varna za otroke in hkrati moderna. Byte je postal Zarin najljubši učitelj."
      </p>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">— Andrej P., oče 7-letne Zare</p>
    </div>
    
    <div style="background-color: #f9fafb; border-left: 4px solid ${BRAND_COLOR}; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 8px 0; font-size: 15px; color: #374151; font-style: italic;">
        "V šoli so začeli govoriti o AI. Hvala bogu, da je naš otrok že korak naprej."
      </p>
      <p style="margin: 0; font-size: 14px; color: #6b7280;">— Nina M., mama 11-letne Eve</p>
    </div>
    
    <p style="margin: 16px 0; font-size: 16px; color: #374151;">
      Vaš otrok ima dostop do istih lekcij. Edino vprašanje je — ali jih že uporablja?
    </p>
    
    ${ctaButton("Odpri KidsLearnAI", `${SITE_URL}/kids/home`)}
    
    <p style="margin: 24px 0 0 0; font-size: 16px; color: #374151;">
      Lep pozdrav,<br>
      <strong>Ekipa KidsLearnAI</strong>
    </p>
  `

  return {
    subject: '"Moj sin je sam prosil za več lekcij" — Maja K.',
    html: emailWrapper(content),
  }
}

// Email 4 - Day 6 - Upgrade nudge
export function welcomeEmail4(): { subject: string; html: string } {
  const content = `
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">Pozdravljeni,</p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Vaš <strong>7-dnevni brezplačni dostop</strong> se izteka jutri.
    </p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Z brezplačnim računom imate dostop do prvih 2 lekcij vsakega tečaja. Z <strong>KidsLearnAI Pro</strong> pa se odpre vse:
    </p>
    
    <div style="background-color: #f0fdf4; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="margin: 0 0 8px 0; font-size: 15px; color: #166534;">✅ Vse lekcije vseh tečajev — zdaj in v prihodnosti</p>
      <p style="margin: 0 0 8px 0; font-size: 15px; color: #166534;">✅ Certifikat ob zaključku vsakega tečaja</p>
      <p style="margin: 0 0 8px 0; font-size: 15px; color: #166534;">✅ Tedenska poročila o napredku direktno na vaš email</p>
      <p style="margin: 0 0 8px 0; font-size: 15px; color: #166534;">✅ Novi tečaji takoj ob izidu — brez doplačila</p>
      <p style="margin: 0; font-size: 15px; color: #166534;">✅ Byte AI tutor brez omejitev</p>
    </div>
    
    <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
      <p style="margin: 0 0 8px 0; font-size: 18px; color: #92400e; font-weight: 600;">
        Samo €9.99/mesec — manj kot skodelica kave na teden.
      </p>
      <p style="margin: 0; font-size: 16px; color: #92400e;">
        Ali pa €99/leto — prihranite 2 meseca.
      </p>
    </div>
    
    ${ctaButton("Nadgradi na Pro", `${SITE_URL}/pricing`)}
    
    <p style="margin: 24px 0 0 0; font-size: 16px; color: #374151;">
      Lep pozdrav,<br>
      <strong>Ekipa KidsLearnAI</strong>
    </p>
  `

  return {
    subject: "Vaš brezplačni dostop je skoraj potekel — poglejte, kaj zamujate",
    html: emailWrapper(content),
  }
}

// Email 5 - Day 7 - Final push
export function welcomeEmail5(): { subject: string; html: string } {
  const content = `
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">Pozdravljeni,</p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Danes je <strong>zadnji dan</strong> vašega brezplačnega dostopa.
    </p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Vaš otrok je že naredil prve korake z Byte-om. Škoda bi bilo, da se tu ustavi.
    </p>
    
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">
      Z <strong>KidsLearnAI Pro</strong> nadaljuje točno tam, kjer je končal — z vsemi lekcijami, certifikati in tedenskimi poročili za vas.
    </p>
    
    <div style="background-color: #ede9fe; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
      <p style="margin: 0 0 16px 0; font-size: 18px; color: #5b21b6; font-weight: 600;">
        Posebna ponudba za vas:
      </p>
      <div style="margin-bottom: 12px;">
        <a href="${SITE_URL}/pricing?plan=monthly" style="display: inline-block; background-color: ${BRAND_COLOR}; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 4px;">
          Mesečno: €9.99/mesec
        </a>
      </div>
      <div>
        <a href="${SITE_URL}/pricing?plan=yearly" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 4px;">
          Letno: €99/leto — prihranite 2 meseca
        </a>
      </div>
    </div>
    
    <p style="margin: 16px 0; font-size: 15px; color: #6b7280; text-align: center;">
      Brez obveznosti. Odpoveste kadarkoli.
    </p>
    
    <p style="margin: 16px 0; font-size: 16px; color: #374151;">
      Če imate kakršnakoli vprašanja, nam pišite — z veseljem pomagamo.
    </p>
    
    <p style="margin: 24px 0 0 0; font-size: 16px; color: #374151;">
      Lep pozdrav,<br>
      <strong>Ekipa KidsLearnAI</strong>
    </p>
    
    <p style="margin: 16px 0 0 0; font-size: 14px; color: #9ca3af;">
      P.S. Vaš brezplačni dostop ostane aktiven za vedno za prve 2 lekciji vsakega tečaja — nikoli ne izgubite dostopa.
    </p>
  `

  return {
    subject: "Zadnji dan — nadgradite danes in ohranite napredek vašega otroka 🎓",
    html: emailWrapper(content),
  }
}

// Get email by step number
export function getWelcomeEmail(step: 1 | 2 | 3 | 4 | 5): { subject: string; html: string } {
  switch (step) {
    case 1:
      return welcomeEmail1()
    case 2:
      return welcomeEmail2()
    case 3:
      return welcomeEmail3()
    case 4:
      return welcomeEmail4()
    case 5:
      return welcomeEmail5()
    default:
      return welcomeEmail1()
  }
}
