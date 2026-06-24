import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = "Kids Learning AI <noreply@kids-learning-ai.com>"
const APP_URL = "https://www.kids-learning-ai.com"

function base(content: string) {
  const stars = [
    [8,12],[18,6],[32,18],[45,8],[58,15],[72,5],[85,20],[92,10],
    [5,35],[15,42],[28,30],[38,45],[52,38],[65,28],[78,40],[88,32],
    [12,55],[25,62],[48,58],[70,50],[90,60],[3,72],[35,78],[60,70],
  ].map(([x,y]) => `<div style="position:absolute;left:${x}%;top:${y}%;width:2px;height:2px;background:#fff;border-radius:50%;opacity:0.3"></div>`).join("")

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#07071a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#07071a;padding:40px 20px">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#0d0d2b;border-radius:20px;overflow:hidden;border:1px solid rgba(168,85,247,0.25)">

      <!-- Header -->
      <tr><td style="background:#0a0a20;padding:0;text-align:center">
        <div style="position:relative;padding:36px 32px;background:#0a0a20;border-bottom:1px solid rgba(168,85,247,0.2)">
          <div style="position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden">${stars}</div>
          <div style="position:relative">
            <span style="font-size:40px;display:block;margin-bottom:10px">🚀</span>
            <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.3px">Kids Learning AI</span>
            <br><span style="color:rgba(192,132,252,0.65);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase">Vesoljska Akademija</span>
          </div>
        </div>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:36px 40px;background:#0d0d2b">
        ${content}
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:20px 40px;background:#08081e;border-top:1px solid rgba(168,85,247,0.15);text-align:center">
        <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px">
          Kids Learning AI &middot; <a href="${APP_URL}" style="color:#a855f7;text-decoration:none">kids-learning-ai.com</a>
        </p>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.18);font-size:11px">
          Prejeli ste ta email ker ste registrirani uporabnik platforme Kids Learning AI.
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

function btn(text: string, href: string) {
  return `<table cellpadding="0" cellspacing="0" style="margin:28px 0">
    <tr><td style="background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:12px;box-shadow:0 4px 20px rgba(168,85,247,0.4)">
      <a href="${href}" style="display:inline-block;padding:15px 32px;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;letter-spacing:0.2px">${text}</a>
    </td></tr>
  </table>`
}

// ── 1. Welcome / subscription started ────────────────────────────────────────
export async function sendWelcomeEmail(to: string, planType: "monthly" | "yearly", isTrial: boolean) {
  const planLabel = planType === "yearly" ? "letni (€79,00/leto)" : "mesečni (€7,90/mes)"
  const subject = isTrial
    ? "Dobrodošli! Vaš 14-dnevni brezplačni preskus se je začel 🎉"
    : "Dobrodošli v Kids Learning AI! 🚀"

  const html = base(`
    <h2 style="margin:0 0 16px;color:#ffffff;font-size:20px;font-weight:700">Dobrodošli v Kids Learning AI! 🎉</h2>
    <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 16px">
      ${isTrial
        ? `Vaš <strong style="color:#c084fc">14-dnevni brezplačni preskus</strong> se je začel. Imate popoln dostop do vseh tečajev in dejavnosti brez obveznosti.`
        : `Vaša naročnina (<strong style="color:#c084fc">${planLabel}</strong>) je aktivna. Dobrodošli!`
      }
    </p>
    <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin:0 0 20px">
      Tukaj je vse kar vas čaka:
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 0 8px;width:100%;background:#13133a;border-radius:12px;border:1px solid rgba(168,85,247,0.2)">
      ${[
        ["🤖", "5 AI tečajev",       "Od osnov do robotike — 74 lekcij"],
        ["🎮", "3 interaktivne igre", "AI Detektiv, Kviz, Vzorci"],
        ["🏅", "Sistem nagrad",       "Badges in napredek v realnem času"],
        ["👨‍👩‍👧", "Starševska plošča",   "Sledite napredku otroka"],
      ].map(([icon, title, desc], i, arr) => `
        <tr>
          <td style="padding:14px 20px;vertical-align:top;border-bottom:${i < arr.length - 1 ? "1px solid rgba(168,85,247,0.1)" : "none"}">
            <span style="font-size:22px">${icon}</span>
          </td>
          <td style="padding:14px 16px 14px 0;vertical-align:top;border-bottom:${i < arr.length - 1 ? "1px solid rgba(168,85,247,0.1)" : "none"}">
            <strong style="color:#e8d5ff;font-size:14px">${title}</strong>
            <br><span style="color:rgba(255,255,255,0.45);font-size:13px">${desc}</span>
          </td>
        </tr>`).join("")}
    </table>
    ${btn("Začni zdaj →", `${APP_URL}/kids/home`)}
    <p style="color:rgba(255,255,255,0.35);font-size:13px;margin:0">
      Vprašanja? Odgovorimo na <a href="mailto:noreply@kids-learning-ai.com" style="color:#a855f7;text-decoration:none">noreply@kids-learning-ai.com</a>
    </p>
  `)

  return resend.emails.send({ from: FROM, to, subject, html })
}

// ── 2. Trial ending reminder (3 days before) ─────────────────────────────────
export async function sendTrialReminderEmail(to: string, daysLeft: number) {
  const html = base(`
    <h2 style="margin:0 0 16px;color:#ffffff;font-size:20px;font-weight:700">⏰ Vaš preskus se izteka čez ${daysLeft} ${daysLeft === 1 ? "dan" : "dni"}</h2>
    <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 16px">
      Vaš brezplačni preskus Kids Learning AI se konča čez <strong style="color:#c084fc">${daysLeft} ${daysLeft === 1 ? "dan" : "dni"}</strong>.
    </p>
    <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin:0 0 20px">
      Da ohranite dostop do vseh tečajev in napredka otroka, aktivirajte naročnino. Izberite plan ki vam ustreza:
    </p>
    <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 8px;background:#13133a;border-radius:12px;border:1px solid rgba(168,85,247,0.2)">
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid rgba(168,85,247,0.1)">
          <strong style="color:#e8d5ff">Mesečni plan</strong>
          <span style="float:right;color:#a855f7;font-weight:700">€7,90/mes</span>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px">
          <strong style="color:#e8d5ff">Letni plan</strong>
          <span style="float:right;color:#a855f7;font-weight:700">€79,00/leto</span>
          <br><span style="color:#4ade80;font-size:12px">Prihranite €15,80 letno</span>
        </td>
      </tr>
    </table>
    ${btn("Aktiviraj naročnino →", `${APP_URL}/subscribe`)}
    <p style="color:rgba(255,255,255,0.35);font-size:13px;margin:0">
      Če ne nadaljujete, bo vaš dostop po poteku preskusa onemogočen. Napredek bo shranjen.
    </p>
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: `⏰ Vaš brezplačni preskus poteče čez ${daysLeft} ${daysLeft === 1 ? "dan" : "dni"}`,
    html,
  })
}

// ── 3. Payment failed ─────────────────────────────────────────────────────────
export async function sendPaymentFailedEmail(to: string) {
  const html = base(`
    <h2 style="margin:0 0 16px;color:#f87171;font-size:20px;font-weight:700">⚠️ Plačilo ni uspelo</h2>
    <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 16px">
      Žal nam ni uspelo zaračunati vaše naročnine za Kids Learning AI.
    </p>
    <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin:0 0 20px">
      Da ohranite dostop, preverite in posodobite podatke o plačilni metodi:
    </p>
    ${btn("Posodobi plačilno metodo →", `${APP_URL}/parent/dashboard`)}
    <div style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);border-radius:10px;padding:16px;margin-top:8px">
      <p style="margin:0;color:rgba(252,165,165,0.9);font-size:13px;line-height:1.6">
        Stripe bo poskusil zaračunati še 2× v naslednjih dneh. Če plačilo ne uspe, bo naročnina prekinjena.
      </p>
    </div>
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: "⚠️ Plačilo za Kids Learning AI ni uspelo",
    html,
  })
}

// ── 4. Subscription canceled ──────────────────────────────────────────────────
export async function sendCancellationEmail(to: string, accessUntil: string) {
  const date = new Date(accessUntil).toLocaleDateString("sl-SI", { day: "numeric", month: "long", year: "numeric" })
  const html = base(`
    <h2 style="margin:0 0 16px;color:#ffffff;font-size:20px;font-weight:700">Vaša naročnina je preklicana</h2>
    <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 16px">
      Naročnina je bila preklicana. Dostop do vseh vsebin ohranite do <strong style="color:#c084fc">${date}</strong>.
    </p>
    <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin:0 0 8px">
      Napredek in dosežki otroka so shranjeni — kadarkoli se lahko vrnete.
    </p>
    ${btn("Obnovi naročnino →", `${APP_URL}/subscribe`)}
    <p style="color:rgba(255,255,255,0.35);font-size:13px;margin:16px 0 0">
      Žal nam je, da odhajate. Če imate kakšno povratno informacijo, nam pišite na
      <a href="mailto:noreply@kids-learning-ai.com" style="color:#a855f7;text-decoration:none">noreply@kids-learning-ai.com</a>
    </p>
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: "Vaša naročnina Kids Learning AI je preklicana",
    html,
  })
}

// ── 5. Re-engagement (never active) ──────────────────────────────────────────
export async function sendReengagementEmail(to: string) {
  const html = base(`
    <h2 style="margin:0 0 16px;color:#ffffff;font-size:20px;font-weight:700">🤖 Byte vas pogreša!</h2>
    <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;margin:0 0 16px">
      Opazili smo, da še niste začeli z učenjem na Kids Learning AI. Byte je pripravil vašo prvo misijo!
    </p>
    <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin:0 0 8px">
      Začnite s tečajem <strong style="color:#c084fc">"AI osnove za otroke"</strong> — prva lekcija traja samo <strong style="color:#c084fc">10 minut</strong>.
    </p>
    ${btn("Začni svojo prvo lekcijo →", `${APP_URL}/kids/courses`)}
    <p style="color:rgba(255,255,255,0.35);font-size:13px;margin:0">
      Imate vprašanja? Smo tu na <a href="mailto:noreply@kids-learning-ai.com" style="color:#a855f7;text-decoration:none">noreply@kids-learning-ai.com</a>
    </p>
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: "🤖 Byte vas čaka — začnite svojo prvo AI lekcijo",
    html,
  })
}
