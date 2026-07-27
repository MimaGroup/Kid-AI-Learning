import { Resend } from "resend"
import type { ReactElement } from "react"

let resendInstance: Resend | null = null

function getResendInstance() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("[v0] RESEND_API_KEY environment variable is not set")
      throw new Error("Email service is not configured. Please set RESEND_API_KEY environment variable.")
    }
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

export interface EmailOptions {
  to: string
  subject: string
  html?: string
  react?: ReactElement
  from?: string
  replyTo?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const { to, subject, html, react, from = "AI Kids Learning <noreply@kids-learning-ai.com>", replyTo = "support@kids-learning-ai.com" } = options

    const resend = getResendInstance()

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      react,
      replyTo,
    } as any)

    if (error) {
      console.error("[v0] Resend error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return { success: false, error }
  }
}

// Shared greeting fallback: use the name if it's a real, non-empty, non-email value, otherwise omit it.
function greetingFor(name: string): string {
  return name && name.trim() && !name.includes("@") ? `Pozdravljeni ${name},` : "Pozdravljeni,"
}

export const emailTemplates = {
  welcome: (name: string) => {
    // Fix 2: Use firstName if available and not empty, otherwise just use "Pozdravljeni,"
    const greeting = name && name.trim() && !name.includes("@") 
      ? `Pozdravljeni ${name},` 
      : "Pozdravljeni,"
    
    return {
      subject: "Dobrodošli v KidsLearnAI!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #534AB7; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #534AB7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Dobrodošli v KidsLearnAI!</h1>
                <p style="margin-top: 10px; font-size: 16px; opacity: 0.9;">Byte te pozdravlja!</p>
              </div>
              <div class="content">
                <div style="text-align: center; margin-bottom: 20px;">
                  <img src="${process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"}/images/byte-waving.jpg" alt="Byte the Robot" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid #E9D5FF;" />
                </div>
                <p>${greeting}</p>
                <p>Veseli smo, da ste se pridružili KidsLearnAI — prvi slovenski AI učni platformi za otroke!</p>
                <p>Vaš otrok ima zdaj dostop do Byte-a, svojega osebnega AI tutorja, in prvih lekcij AI umetniškega studia.</p>
                
                <h3>Začnite v 3 korakih:</h3>
                <ol>
                  <li><strong>Prijavite se</strong> → <a href="https://www.kids-learning-ai.com" style="color: #534AB7;">kids-learning-ai.com</a></li>
                  <li><strong>Odprite AI umetniški studio</strong></li>
                  <li><strong>Začnite prvo lekcijo</strong> — traja samo 15 minut</li>
                </ol>
                
                <p style="text-align: center;">
                  <a href="https://www.kids-learning-ai.com/courses" class="button">Začni z učenjem</a>
                </p>
                
                <h3>Kaj je vključeno:</h3>
                <ul>
                  <li>Prve lekcije vseh tečajev brezplačno</li>
                  <li>Byte AI tutor — osebni učitelj vašega otroka</li>
                  <li>Sledenje napredku in dosežki</li>
                  <li>Značke in nagrade</li>
                </ul>
                
                <p>Imate vprašanja? Nam pišite ali obiščite <a href="https://www.kids-learning-ai.com" style="color: #534AB7;">kids-learning-ai.com</a></p>
                
                <p>Lep pozdrav,<br>Byte in ekipa KidsLearnAI</p>
              </div>
              <div class="footer">
                <p>KidsLearnAI | Učenje z AI za otroke</p>
                <p><a href="https://www.kids-learning-ai.com">Obiščite spletno stran</a> | <a href="https://www.kids-learning-ai.com/contact">Kontakt</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
    }
  },

  weeklyProgress: (name: string, childName: string, stats: any) => ({
    subject: `Tedenski učni pregled za ${childName} 📊`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .stat-card { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #8B5CF6; }
            .stat-number { font-size: 32px; font-weight: bold; color: #8B5CF6; }
            .button { display: inline-block; background: #8B5CF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Tedenski učni pregled</h1>
              <p>Napredek otroka ${childName} ta teden</p>
            </div>
            <div class="content">
              <div style="text-align: center; margin-bottom: 15px;">
                <img src="${process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"}/images/byte-celebrating.jpg" alt="Byte praznuje" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #E9D5FF;" />
              </div>
              <p>${greetingFor(name)}</p>
              <p>Byte je ponosen na napredek otroka ${childName} ta teden! Tukaj je povzetek:</p>

              <div class="stat-card">
                <div class="stat-number">${stats.activitiesCompleted || 0}</div>
                <p>Opravljenih dejavnosti</p>
              </div>

              <div class="stat-card">
                <div class="stat-number">${stats.timeSpent || 0} min</div>
                <p>Čas učenja</p>
              </div>

              <div class="stat-card">
                <div class="stat-number">${stats.pointsEarned || 0}</div>
                <p>Zbranih točk</p>
              </div>

              <div class="stat-card">
                <div class="stat-number">${stats.achievementsUnlocked || 0}</div>
                <p>Novih dosežkov</p>
              </div>

              <h3>🎯 Vrhunci tega tedna:</h3>
              <ul>
                ${stats.highlights?.map((h: string) => `<li>${h}</li>`).join("") || "<li>Tako naprej!</li>"}
              </ul>

              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/parent/dashboard" class="button">Poglej celotno poročilo</a>
              </p>

              <p>Spodbujajte otroka ${childName}, naj raziskuje in se uči naprej!</p>

              <p>Lep pozdrav,<br>Ekipa Kids Learning AI</p>
            </div>
            <div class="footer">
              <p>Kids Learning AI | Učenje z AI za otroke</p>
              <p><a href="https://kids-learning-ai.com/parent/dashboard">Nadzorna plošča</a> | <a href="https://kids-learning-ai.com/contact">Kontaktirajte podporo</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  achievementUnlocked: (name: string, childName: string, achievement: any) => ({
    subject: `🎉 ${childName} je odklenil/a nov dosežek!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; text-align: center; }
            .achievement-badge { font-size: 80px; margin: 20px 0; }
            .button { display: inline-block; background: #F59E0B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Dosežek odklenjen!</h1>
            </div>
            <div class="content">
              <p>Pozdravljeni ${name},</p>
              <p>Odlična novica! ${childName} je pravkar odklenil/a nov dosežek:</p>

              <div class="achievement-badge">${achievement.icon || "🏆"}</div>
              <h2>${achievement.name || "Osupljiv dosežek"}</h2>
              <p>${achievement.description || "Tako naprej!"}</p>

              <p style="margin-top: 30px; padding: 15px; background: #FEF3C7; border-radius: 8px; border-left: 4px solid #F59E0B;">
                <strong>Zbranih točk:</strong> ${achievement.points || 0}
              </p>

              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/parent/dashboard" class="button">Poglej vse dosežke</a>
              </p>

              <p>Proslavite ta mejnik skupaj z ${childName}!</p>

              <p>Ponosni na vaju,<br>Ekipa Kids Learning AI</p>
            </div>
            <div class="footer">
              <p>Kids Learning AI | Učenje z AI za otroke</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  reEngagement: (name: string, childName: string) => {
    // Fix: Use name if available and not empty and doesn't contain @, otherwise just use "Pozdravljeni,"
    const greeting = name && name.trim() && !name.includes("@") 
      ? `Pozdravljeni ${name},` 
      : "Pozdravljeni,"
    
    return {
      subject: `Potrebujete pomoč? Byte vas čaka!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #534AB7; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #534AB7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Potrebujete pomoč?</h1>
                <p style="margin-top: 10px; font-size: 16px; opacity: 0.9;">Opazili smo, da se niste začeli z učenjem</p>
              </div>
              <div class="content">
                <div style="text-align: center; margin-bottom: 20px;">
                  <img src="${process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"}/images/byte-waving.jpg" alt="Byte the Robot" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid #E9D5FF;" />
                </div>
                <p>${greeting}</p>
                <p>Veseli smo, da ste se pridružili KidsLearnAI. Opazili smo, da vaš otrok še ni preizkusil nobene aktivnosti — in razumemo, da je začetek včasih najtežji korak.</p>

                <p>Byte je pripravljen in čaka. Tukaj je, kako začeti v 2 minutah:</p>

                <ol>
                  <li>Prijavite se na <a href="https://www.kids-learning-ai.com" style="color: #534AB7;">kids-learning-ai.com</a></li>
                  <li>Odprite AI umetniški studio</li>
                  <li>Začnite s prvo lekcijo — traja samo 15 minut</li>
                </ol>

                <p style="text-align: center;">
                  <a href="https://www.kids-learning-ai.com/courses" class="button">Začni z Byte-om zdaj</a>
                </p>

                <p>Imate vprašanja? Nam pišite na <a href="mailto:hello@kids-learning-ai.com" style="color: #534AB7;">hello@kids-learning-ai.com</a></p>

                <p>Lep pozdrav,<br>Byte in ekipa KidsLearnAI</p>
              </div>
              <div class="footer">
                <p>KidsLearnAI | Učenje z AI za otroke</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }
  },

  subscriptionConfirmation: (name: string, planName: string, amount: number) => ({
    subject: "Dobrodošli v Premium! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #8B5CF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Dobrodošli v Premium!</h1>
            </div>
            <div class="content">
              <p>${greetingFor(name)}</p>
              <p>Hvala za naročnino na <strong>${planName}</strong>! Vaše plačilo v znesku ${(amount / 100).toFixed(2)} € je bilo uspešno obdelano.</p>

              <h3>✨ Zdaj imate dostop do:</h3>
              <ul>
                <li>Vseh 7 interaktivnih AI iger</li>
                <li>Ustvarjalca AI prijateljev</li>
                <li>Dejavnosti za učenje vzorcev</li>
                <li>Celotne knjižnice vsebin</li>
                <li>Napredne analitike napredka</li>
                <li>Prednostne podpore</li>
              </ul>

              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/kids/home" class="button">Začni z učenjem zdaj</a>
              </p>

              <p>Če imate kakršna koli vprašanja, smo vam na voljo!</p>

              <p>Hvala, da ste izbrali Kids Learning AI,<br>Ekipa Kids Learning AI</p>
            </div>
            <div class="footer">
              <p>Kids Learning AI | Učenje z AI za otroke</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  paymentReceipt: (name: string, amount: number, date: string, invoiceUrl: string) => ({
    subject: "Plačilni račun - Kids Learning AI",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8B5CF6; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .receipt-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e5e7eb; }
            .button { display: inline-block; background: #8B5CF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Plačilni račun</h1>
            </div>
            <div class="content">
              <p>${greetingFor(name)}</p>
              <p>Hvala za vaše plačilo. Tukaj so podrobnosti:</p>

              <div class="receipt-box">
                <p><strong>Plačan znesek:</strong> ${(amount / 100).toFixed(2)} €</p>
                <p><strong>Datum:</strong> ${date}</p>
                <p><strong>Storitev:</strong> Naročnina Kids Learning AI</p>
              </div>

              <p style="text-align: center;">
                <a href="${invoiceUrl}" class="button">Prenesi račun</a>
              </p>

              <p>Če imate kakršna koli vprašanja glede tega plačila, kontaktirajte našo podporo.</p>

              <p>Lep pozdrav,<br>Ekipa Kids Learning AI</p>
            </div>
            <div class="footer">
              <p>Kids Learning AI | Učenje z AI za otroke</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  contactFormSubmission: (name: string, email: string, subject: string, message: string) => ({
    subject: `Nov kontaktni obrazec: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8B5CF6; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #8B5CF6; }
            .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nova oddaja kontaktnega obrazca</h1>
            </div>
            <div class="content">
              <div class="info-box">
                <p><strong>Od:</strong> ${name}</p>
                <p><strong>E-pošta:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Zadeva:</strong> ${subject}</p>
                <p><strong>Datum:</strong> ${new Date().toLocaleString("sl-SI")}</p>
              </div>

              <h3>Sporočilo:</h3>
              <div class="message-box">
                <p>${message.replace(/\n/g, "<br>")}</p>
              </div>

              <p style="margin-top: 30px; padding: 15px; background: #FEF3C7; border-radius: 8px; border-left: 4px solid #F59E0B;">
                <strong>⚠️ Potreben odziv:</strong> Prosimo, odgovorite na to povpraševanje v 24-48 urah.
              </p>
            </div>
            <div class="footer">
              <p>Sistem podpore Kids Learning AI</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  onboardingFollowUp: (name: string, daysActive: number) => ({
    subject: "Kako poteka vaša učna pot? 🌟",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #8B5CF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .tip-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #8B5CF6; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Kako gre? 🌟</h1>
            </div>
            <div class="content">
              <p>${greetingFor(name)}</p>
              <p>Že ${daysActive} dni ste del Kids Learning AI! Radi bi preverili, kako vam gre.</p>

              <div class="tip-box">
                <h3>💡 Hitri nasveti za uspeh:</h3>
                <ul>
                  <li><strong>Vzpostavite rutino:</strong> 10-15 minut dnevno naredi čudeže</li>
                  <li><strong>Praznujte uspehe:</strong> Priznajte vsak dosežek, velik ali majhen</li>
                  <li><strong>Menjavajte dejavnosti:</strong> Preizkusite različne aktivnosti, da učenje ostane sveže</li>
                  <li><strong>Spremljajte napredek:</strong> Tedensko preverite nadzorno ploščo</li>
                </ul>
              </div>

              <h3>🎮 Priljubljene dejavnosti tega tedna:</h3>
              <ul>
                <li>AI Kviz Mojster - Preveri znanje s prilagodljivimi kvizi</li>
                <li>Graditelj besed - Širi besedni zaklad skozi zabavne izzive</li>
                <li>Znanstveni laboratorij - Interaktivno raziskuj znanstvene koncepte</li>
              </ul>

              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/kids/activities" class="button">Razišči dejavnosti</a>
              </p>

              <p>Imate vprašanja ali povratne informacije? Z veseljem jih slišimo! Preprosto odgovorite na ta email.</p>

              <p>Tako naprej!<br>Ekipa Kids Learning AI</p>
            </div>
            <div class="footer">
              <p>Kids Learning AI | Učenje z AI za otroke</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  passwordReset: (name: string, resetLink: string) => ({
    subject: "Ponastavitev gesla - Kids Learning AI",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8B5CF6; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #8B5CF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .warning-box { background: #FEF3C7; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #F59E0B; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Ponastavitev gesla</h1>
            </div>
            <div class="content">
              <p>${greetingFor(name)}</p>
              <p>Prejeli smo zahtevo za ponastavitev gesla za vaš račun Kids Learning AI.</p>

              <p style="text-align: center;">
                <a href="${resetLink}" class="button">Ponastavi geslo</a>
              </p>

              <p>Ta povezava bo iz varnostnih razlogov potekla čez 1 uro.</p>

              <div class="warning-box">
                <p><strong>⚠️ Niste zahtevali tega?</strong></p>
                <p>Če niste zahtevali ponastavitve gesla, lahko ta email varno prezrete. Vaše geslo ostane nespremenjeno.</p>
              </div>

              <p>Zaradi varnosti te povezave nikoli ne delite z nikomer.</p>

              <p>Lep pozdrav,<br>Ekipa Kids Learning AI</p>
            </div>
            <div class="footer">
              <p>Kids Learning AI | Učenje z AI za otroke</p>
              <p>Če gumb ne deluje, kopirajte in prilepite to povezavo: ${resetLink}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  inactiveUserNudge: (name: string) => ({
    subject: "Potrebujete pomoč pri začetku? - KidsLearnAI",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #8B5CF6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; font-size: 16px; }
            .step-box { background: white; padding: 12px 20px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #8B5CF6; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Potrebujete pomoč?</h1>
              <p>Opazili smo, da še niste začeli z učenjem</p>
            </div>
            <div class="content">
              <p>Pozdravljeni${name ? ` ${name}` : ""},</p>
              <p>Hvala, da ste se prijavili na KidsLearnAI! Opazili smo, da vaš otrok še ni preizkusil nobene aktivnosti. Začetek je preprost:</p>
              
              <div class="step-box">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td style="width:32px;height:32px;background:#8B5CF6;border-radius:50%;text-align:center;vertical-align:middle;color:#ffffff;font-weight:bold;font-size:14px;font-family:Arial,sans-serif;">1</td>
                  <td style="padding-left:12px;vertical-align:middle;"><strong>Dodajte profil otroka</strong> - nastavite ime in starost</td>
                </tr></table>
              </div>
              
              <div class="step-box">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td style="width:32px;height:32px;background:#8B5CF6;border-radius:50%;text-align:center;vertical-align:middle;color:#ffffff;font-weight:bold;font-size:14px;font-family:Arial,sans-serif;">2</td>
                  <td style="padding-left:12px;vertical-align:middle;"><strong>Izberite igro</strong> - priporočamo Pattern Training za začetek</td>
                </tr></table>
              </div>
              
              <div class="step-box">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td style="width:32px;height:32px;background:#8B5CF6;border-radius:50%;text-align:center;vertical-align:middle;color:#ffffff;font-weight:bold;font-size:14px;font-family:Arial,sans-serif;">3</td>
                  <td style="padding-left:12px;vertical-align:middle;"><strong>Igrajte skupaj</strong> - samo 10 minut na dan naredi razliko</td>
                </tr></table>
              </div>
              
              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/kids/home" class="button">Začnite z učenjem</a>
              </p>
              
              <p>Če imate kakršnakoli vprašanja ali potrebujete pomoč, nam preprosto odgovorite na to sporočilo.</p>
              
              <p>Lep pozdrav,<br>Ekipa KidsLearnAI</p>
            </div>
            <div class="footer">
              <p>KidsLearnAI | AI učna platforma za otroke 5-12 let</p>
              <p><a href="https://kids-learning-ai.com">Obiščite spletno stran</a> | <a href="https://kids-learning-ai.com/contact">Kontakt</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  inactiveUserFinalNudge: (name: string) => ({
    subject: "Vas še vedno zanimamo? - KidsLearnAI",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #F59E0B 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #F59E0B; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; font-size: 16px; }
            .highlight-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #F59E0B; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Pogrešamo vas!</h1>
            </div>
            <div class="content">
              <p>Pozdravljeni${name ? ` ${name}` : ""},</p>
              <p>Že nekaj časa vas nismo videli na KidsLearnAI. Naša platforma ponuja zabavne in interaktivne AI igre, ki pomagajo otrokom pri učenju:</p>
              
              <div class="highlight-box">
                <h3>Kaj ponujamo:</h3>
                <ul>
                  <li><strong>AI Kviz</strong> - prilagodljivi kvizi za razne predmete</li>
                  <li><strong>Učenje vzorcev</strong> - razvoj logičnega mišljenja</li>
                  <li><strong>AI Detektiv</strong> - reševanje skrivnostnih zgodb</li>
                  <li><strong>Gradnik besed</strong> - širjenje besednega zaklada</li>
                  <li><strong>Matematična avantura</strong> - zabavna matematika</li>
                </ul>
              </div>
              
              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/kids/home" class="button">Preizkusite brezplačno</a>
              </p>
              
              <p>Če imate kakršnokoli vprašanje, smo vam na voljo na <a href="https://kids-learning-ai.com/contact">kontaktni strani</a>.</p>
              
              <p>Lep pozdrav,<br>Ekipa KidsLearnAI</p>
            </div>
            <div class="footer">
              <p>KidsLearnAI | AI učna platforma za otroke 5-12 let</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  supportTicketConfirmationUser: (name: string, ticketNumber: string, subject: string, message: string) => ({
    subject: `Prijava v podporo ustvarjena: ${ticketNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .ticket-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #8B5CF6; text-align: center; }
            .ticket-number { font-size: 32px; font-weight: bold; color: #8B5CF6; margin: 10px 0; }
            .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #8B5CF6; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Hvala za vaše sporočilo!</h1>
            </div>
            <div class="content">
              <p>Pozdravljeni ${name},</p>
              <p>Prejeli smo vaše sporočilo in naša ekipa vam bo odgovorila v 24-48 urah.</p>

              <div class="ticket-box">
                <p style="color: #666; margin: 0 0 10px 0;">Številka vaše prijave v podporo</p>
                <div class="ticket-number">${ticketNumber}</div>
              </div>

              <h3>Vaše sporočilo:</h3>
              <div class="message-box">
                <p style="margin: 0 0 10px 0;"><strong>Zadeva:</strong> ${subject}</p>
                <p style="margin: 0;">${message.replace(/\n/g, "<br>")}</p>
              </div>

              <p>Prosimo, shranite si to številko prijave za svoje evidence. Nanjo se lahko sklicujete v nadaljnji komunikaciji.</p>

              <p>Če imate nujna vprašanja, nam prosto odgovorite na ta email.</p>

              <p>Lep pozdrav,<br>Ekipa Kids Learning AI</p>
            </div>
            <div class="footer">
              <p>Kids Learning AI | Učenje z AI za otroke</p>
              <p><a href="https://kids-learning-ai.com">Obiščite spletno stran</a> | <a href="https://kids-learning-ai.com/contact">Kontaktirajte podporo</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
}
