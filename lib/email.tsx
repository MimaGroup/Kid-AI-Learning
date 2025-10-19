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
}

export async function sendEmail(options: EmailOptions) {
  try {
    const { to, subject, html, react, from = "AI Kids Learning <noreply@kids-learning-ai.com>" } = options

    const resend = getResendInstance()

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      react,
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
  welcome: (name: string) => ({
    subject: "Welcome to AI Kids Learning! 🎉",
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
              <h1>Welcome to AI Kids Learning! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We're thrilled to have you join our community of parents helping their children learn with AI-powered activities!</p>
              
              <h3>🚀 Get Started in 3 Easy Steps:</h3>
              <ol>
                <li><strong>Add Your Child's Profile</strong> - Set up their age and learning level</li>
                <li><strong>Explore Activities</strong> - Try our interactive games and quizzes</li>
                <li><strong>Track Progress</strong> - Watch them grow and achieve milestones</li>
              </ol>
              
              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/parent/dashboard" class="button">Go to Dashboard</a>
              </p>
              
              <h3>✨ What's Included:</h3>
              <ul>
                <li>7 Interactive AI-powered games</li>
                <li>Personalized learning paths</li>
                <li>Progress tracking and analytics</li>
                <li>Achievement badges and rewards</li>
              </ul>
              
              <p>Need help getting started? Check out our <a href="https://kids-learning-ai.com/getting-started">Getting Started Guide</a> or reply to this email.</p>
              
              <p>Happy learning!<br>The AI Kids Learning Team</p>
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
              <p>Hi ${name},</p>
              <p>Here's how ${childName} did this week:</p>
              
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

  reEngagement: (name: string, childName: string) => ({
    subject: `We miss ${childName}! Come back and learn 🌟`,
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
            .highlight-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #EC4899; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>We Miss You! 🌟</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We noticed ${childName} hasn't been learning with us lately. We'd love to see them back!</p>
              
              <div class="highlight-box">
                <h3>🎮 New Activities Added!</h3>
                <p>We've added exciting new games and challenges that ${childName} will love:</p>
                <ul>
                  <li>Interactive storytelling adventures</li>
                  <li>New math puzzles</li>
                  <li>Creative AI art projects</li>
                </ul>
              </div>
              
              <p style="text-align: center;">
                <a href="https://kids-learning-ai.com/kids/home" class="button">Continue Learning</a>
              </p>
              
              <p><strong>💡 Quick Tip:</strong> Just 10 minutes a day can make a big difference in ${childName}'s learning journey!</p>
              
              <p>We're here to help if you need anything.</p>
              
              <p>Looking forward to seeing you,<br>The AI Kids Learning Team</p>
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
}

export function SupportTicketConfirmation({
  name,
  ticketNumber,
  subject,
  message,
}: {
  name: string
  ticketNumber: string
  subject: string
  message: string
}) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <style>{`
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .ticket-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #8B5CF6; text-align: center; }
          .ticket-number { font-size: 32px; font-weight: bold; color: #8B5CF6; margin: 10px 0; }
          .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #8B5CF6; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>Thank You for Contacting Us!</h1>
          </div>
          <div className="content">
            <p>Hi {name},</p>
            <p>We've received your message and our team will get back to you within 24-48 hours.</p>

            <div className="ticket-box">
              <p style={{ color: "#666", margin: "0 0 10px 0" }}>Your Support Ticket Number</p>
              <div className="ticket-number">{ticketNumber}</div>
            </div>

            <h3>Your message:</h3>
            <div className="message-box">
              <p style={{ margin: "0 0 10px 0" }}>
                <strong>Subject:</strong> {subject}
              </p>
              <p style={{ margin: 0 }}>{message}</p>
            </div>

            <p>
              Please save this ticket number for your records. You can reference it in any follow-up communications.
            </p>

            <p>If you have any urgent questions, feel free to reply to this email.</p>

            <p>
              Best regards,
              <br />
              The AI Kids Learning Team
            </p>
          </div>
          <div className="footer">
            <p>© 2025 AI Kids Learning. All rights reserved.</p>
            <p>
              <a href="https://kids-learning-ai.com">Visit Website</a> |{" "}
              <a href="https://kids-learning-ai.com/contact">Contact Support</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
