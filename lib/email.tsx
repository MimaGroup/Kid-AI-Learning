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
    subject: `${childName}'s Weekly Learning Summary 📊`,
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
              <h1>📊 Weekly Learning Summary</h1>
              <p>${childName}'s Progress This Week</p>
            </div>
            <div class="content">
              <div style="text-align: center; margin-bottom: 15px;">
                <img src="${process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"}/images/byte-celebrating.jpg" alt="Byte celebrating" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #E9D5FF;" />
              </div>
              <p>Hi ${name},</p>
              <p>Byte is proud of ${childName}'s progress this week! Here's the summary:</p>
              
              <div class="stat-card">
                <div class="stat-number">${stats.activitiesCompleted || 0}</div>
                <p>Activities Completed</p>
              </div>
              
              <div class="stat-card">
                <div class="stat-number">${stats.timeSpent || 0} min</div>
                <p>Learning Time</p>
              </div>
              
              <div class="stat-card">
                <div class="stat-number">${stats.pointsEarned || 0}</div>
                <p>Points Earned</p>
              </div>
              
              <div class="stat-card">
                <div class="stat-number">${stats.achievementsUnlocked || 0}</div>
                <p>New Achievements</p>
              </div>
              
              <h3>🎯 This Week's Highlights:</h3>
              <ul>
                ${stats.highlights?.map((h: string) => `<li>${h}</li>`).join("") || "<li>Keep up the great work!</li>"}
              </ul>
              
              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/parent/dashboard" class="button">View Full Report</a>
              </p>
              
              <p>Keep encouraging ${childName} to explore and learn!</p>
              
              <p>Best regards,<br>The AI Kids Learning Team</p>
            </div>
            <div class="footer">
              <p>AI Kids Learning | Making education fun with AI</p>
              <p><a href="https://kids-learning-ai.com/parent/dashboard">Dashboard</a> | <a href="https://kids-learning-ai.com/contact">Contact Support</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  achievementUnlocked: (name: string, childName: string, achievement: any) => ({
    subject: `🎉 ${childName} Unlocked a New Achievement!`,
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
              <h1>🎉 Achievement Unlocked!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Great news! ${childName} just unlocked a new achievement:</p>
              
              <div class="achievement-badge">${achievement.icon || "🏆"}</div>
              <h2>${achievement.name || "Amazing Achievement"}</h2>
              <p>${achievement.description || "Keep up the excellent work!"}</p>
              
              <p style="margin-top: 30px; padding: 15px; background: #FEF3C7; border-radius: 8px; border-left: 4px solid #F59E0B;">
                <strong>Points Earned:</strong> ${achievement.points || 0}
              </p>
              
              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/parent/dashboard" class="button">View All Achievements</a>
              </p>
              
              <p>Celebrate this milestone with ${childName}!</p>
              
              <p>Proud of you both,<br>The AI Kids Learning Team</p>
            </div>
            <div class="footer">
              <p>AI Kids Learning | Making education fun with AI</p>
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
      subject: `Potrebujete pomoc? Byte vas caka!`,
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
                <h1>Potrebujete pomoc?</h1>
                <p style="margin-top: 10px; font-size: 16px; opacity: 0.9;">Opazili smo, da se niste zaceli z ucenjem</p>
              </div>
              <div class="content">
                <div style="text-align: center; margin-bottom: 20px;">
                  <img src="${process.env.NEXT_PUBLIC_SITE_URL || "https://kids-learning-ai.com"}/images/byte-waving.jpg" alt="Byte the Robot" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid #E9D5FF;" />
                </div>
                <p>${greeting}</p>
                <p>Veseli smo, da ste se pridruzili KidsLearnAI. Opazili smo, da vas otrok se ni preizkusil nobene aktivnosti — in razumemo, da je zacetek vcasih najtezji korak.</p>
                
                <p>Byte je pripravljen in caka. Tukaj je, kako zaceti v 2 minutah:</p>
                
                <ol>
                  <li>Prijavite se na <a href="https://www.kids-learning-ai.com" style="color: #534AB7;">kids-learning-ai.com</a></li>
                  <li>Odprite AI umetniski studio</li>
                  <li>Zacnite s prvo lekcijo — traja samo 15 minut</li>
                </ol>
                
                <p style="text-align: center;">
                  <a href="https://www.kids-learning-ai.com/courses" class="button">Zacni z Byte-om zdaj</a>
                </p>
                
                <p>Imate vprasanja? Nam pisite na <a href="mailto:hello@kids-learning-ai.com" style="color: #534AB7;">hello@kids-learning-ai.com</a></p>
                
                <p>Lep pozdrav,<br>Byte in ekipa KidsLearnAI</p>
              </div>
              <div class="footer">
                <p>KidsLearnAI | Ucenje z AI za otroke</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }
  },

  subscriptionConfirmation: (name: string, planName: string, amount: number) => ({
    subject: "Welcome to Premium! 🎉",
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
              <h1>🎉 Welcome to Premium!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for subscribing to <strong>${planName}</strong>! Your payment of $${(amount / 100).toFixed(2)} has been processed.</p>
              
              <h3>✨ You now have access to:</h3>
              <ul>
                <li>All 7 interactive AI games</li>
                <li>AI Friend Creator</li>
                <li>Pattern Training activities</li>
                <li>Full content library</li>
                <li>Advanced progress analytics</li>
                <li>Priority support</li>
              </ul>
              
              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/kids/home" class="button">Start Learning Now</a>
              </p>
              
              <p>If you have any questions, we're here to help!</p>
              
              <p>Thank you for choosing AI Kids Learning,<br>The AI Kids Learning Team</p>
            </div>
            <div class="footer">
              <p>AI Kids Learning | Making education fun with AI</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  paymentReceipt: (name: string, amount: number, date: string, invoiceUrl: string) => ({
    subject: "Payment Receipt - AI Kids Learning",
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
              <h1>Payment Receipt</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for your payment. Here are the details:</p>
              
              <div class="receipt-box">
                <p><strong>Amount Paid:</strong> $${(amount / 100).toFixed(2)}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Service:</strong> AI Kids Learning Subscription</p>
              </div>
              
              <p style="text-align: center;">
                <a href="${invoiceUrl}" class="button">Download Invoice</a>
              </p>
              
              <p>If you have any questions about this payment, please contact our support team.</p>
              
              <p>Best regards,<br>The AI Kids Learning Team</p>
            </div>
            <div class="footer">
              <p>AI Kids Learning | Making education fun with AI</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  contactFormSubmission: (name: string, email: string, subject: string, message: string) => ({
    subject: `New Contact Form: ${subject}`,
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
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="info-box">
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <h3>Message:</h3>
              <div class="message-box">
                <p>${message.replace(/\n/g, "<br>")}</p>
              </div>
              
              <p style="margin-top: 30px; padding: 15px; background: #FEF3C7; border-radius: 8px; border-left: 4px solid #F59E0B;">
                <strong>⚠️ Action Required:</strong> Please respond to this inquiry within 24-48 hours.
              </p>
            </div>
            <div class="footer">
              <p>AI Kids Learning Support System</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  onboardingFollowUp: (name: string, daysActive: number) => ({
    subject: "How's your learning journey going? 🌟",
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
              <h1>How's It Going? 🌟</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>It's been ${daysActive} days since you joined AI Kids Learning! We wanted to check in and see how things are going.</p>
              
              <div class="tip-box">
                <h3>💡 Quick Tips for Success:</h3>
                <ul>
                  <li><strong>Set a routine:</strong> 10-15 minutes daily works wonders</li>
                  <li><strong>Celebrate wins:</strong> Acknowledge every achievement, big or small</li>
                  <li><strong>Mix it up:</strong> Try different activities to keep learning fresh</li>
                  <li><strong>Track progress:</strong> Check the dashboard weekly to see growth</li>
                </ul>
              </div>
              
              <h3>🎮 Popular Activities This Week:</h3>
              <ul>
                <li>AI Quiz Master - Test knowledge with adaptive quizzes</li>
                <li>Word Builder - Build vocabulary through fun challenges</li>
                <li>Science Lab - Explore scientific concepts interactively</li>
              </ul>
              
              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/kids/activities" class="button">Explore Activities</a>
              </p>
              
              <p>Have questions or feedback? We'd love to hear from you! Just reply to this email.</p>
              
              <p>Keep up the great work!<br>The AI Kids Learning Team</p>
            </div>
            <div class="footer">
              <p>AI Kids Learning | Making education fun with AI</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  passwordReset: (name: string, resetLink: string) => ({
    subject: "Reset Your Password - AI Kids Learning",
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
              <h1>Reset Your Password</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We received a request to reset your password for your AI Kids Learning account.</p>
              
              <p style="text-align: center;">
                <a href="${resetLink}" class="button">Reset Password</a>
              </p>
              
              <p>This link will expire in 1 hour for security reasons.</p>
              
              <div class="warning-box">
                <p><strong>⚠️ Didn't request this?</strong></p>
                <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
              </div>
              
              <p>For security, never share this link with anyone.</p>
              
              <p>Best regards,<br>The AI Kids Learning Team</p>
            </div>
            <div class="footer">
              <p>AI Kids Learning | Making education fun with AI</p>
              <p>If the button doesn't work, copy and paste this link: ${resetLink}</p>
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
    subject: `Support Ticket Created: ${ticketNumber}`,
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
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We've received your message and our team will get back to you within 24-48 hours.</p>

              <div class="ticket-box">
                <p style="color: #666; margin: 0 0 10px 0;">Your Support Ticket Number</p>
                <div class="ticket-number">${ticketNumber}</div>
              </div>

              <h3>Your message:</h3>
              <div class="message-box">
                <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 0;">${message.replace(/\n/g, "<br>")}</p>
              </div>

              <p>Please save this ticket number for your records. You can reference it in any follow-up communications.</p>

              <p>If you have any urgent questions, feel free to reply to this email.</p>

              <p>Best regards,<br>The AI Kids Learning Team</p>
            </div>
            <div class="footer">
              <p>AI Kids Learning | Making education fun with AI</p>
              <p><a href="https://kids-learning-ai.com">Visit Website</a> | <a href="https://kids-learning-ai.com/contact">Contact Support</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
}
