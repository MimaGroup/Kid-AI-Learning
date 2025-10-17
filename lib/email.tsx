import { Resend } from "resend"

let resendClient: Resend | null = null

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[v0] RESEND_API_KEY not configured. Email sending will be skipped.")
    return null
  }

  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }

  return resendClient
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const resend = getResendClient()

  if (!resend) {
    console.log("[v0] Email sending skipped (Resend not configured):", { to, subject })
    return { success: false, error: "Resend API key not configured" }
  }

  try {
    const data = await resend.emails.send({
      from: "AI Kids Learning <noreply@kids-learning-ai.com>",
      to,
      subject,
      html,
    })

    console.log("[v0] Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return { success: false, error }
  }
}

// Email Templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: "Welcome to AI Kids Learning! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 12px; margin: 20px 0; }
            .button { display: inline-block; background: #8B5CF6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
            h1 { margin: 0; font-size: 32px; }
            h2 { color: #8B5CF6; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to AI Kids Learning!</h1>
            <p style="font-size: 18px; margin: 10px 0 0 0;">Where curiosity meets artificial intelligence</p>
          </div>
          
          <div class="content">
            <h2>Hi ${name}! 👋</h2>
            <p>We're thrilled to have you join our community of parents who believe in the power of AI-enhanced learning!</p>
            
            <p><strong>Here's what you can do now:</strong></p>
            <ul>
              <li>🎨 Create your child's profile</li>
              <li>🎮 Explore free AI learning activities</li>
              <li>📊 Track your child's progress</li>
              <li>🌟 Unlock premium features with a subscription</li>
            </ul>
            
            <center>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.kids-learning-ai.com"}/parent/dashboard" class="button">
                Get Started →
              </a>
            </center>
            
            <p style="margin-top: 30px;">If you have any questions, our support team is here to help at <a href="mailto:support@kids-learning-ai.com">support@kids-learning-ai.com</a></p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} AI Kids Learning. All rights reserved.</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.kids-learning-ai.com"}/privacy-policy">Privacy Policy</a> | <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.kids-learning-ai.com"}/terms-of-service">Terms of Service</a></p>
          </div>
        </body>
      </html>
    `,
  }),

  subscriptionConfirmation: (name: string, plan: string, amount: string) => ({
    subject: "Subscription Confirmed - Welcome to Premium! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 12px; margin: 20px 0; }
            .plan-box { background: white; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #10b981; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
            h1 { margin: 0; font-size: 32px; }
            h2 { color: #10b981; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 You're Now Premium!</h1>
            <p style="font-size: 18px; margin: 10px 0 0 0;">Thank you for subscribing</p>
          </div>
          
          <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Your subscription has been confirmed. Welcome to the premium AI Kids Learning experience!</p>
            
            <div class="plan-box">
              <h3 style="margin-top: 0; color: #10b981;">Your Plan Details</h3>
              <p><strong>Plan:</strong> ${plan}</p>
              <p><strong>Amount:</strong> ${amount}</p>
              <p><strong>Status:</strong> Active ✓</p>
            </div>
            
            <p><strong>Premium Features Now Available:</strong></p>
            <ul>
              <li>✨ Unlimited AI learning activities</li>
              <li>🎯 Personalized learning paths</li>
              <li>📊 Advanced progress tracking</li>
              <li>🤖 AI friend companions</li>
              <li>🎮 Exclusive premium games</li>
              <li>📈 Detailed analytics and insights</li>
            </ul>
            
            <center>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.kids-learning-ai.com"}/parent/dashboard" class="button">
                Explore Premium Features →
              </a>
            </center>
            
            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">You can manage your subscription anytime from your dashboard.</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} AI Kids Learning. All rights reserved.</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.kids-learning-ai.com"}/privacy-policy">Privacy Policy</a> | <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.kids-learning-ai.com"}/terms-of-service">Terms of Service</a></p>
          </div>
        </body>
      </html>
    `,
  }),

  paymentReceipt: (name: string, amount: string, date: string, invoiceUrl?: string) => ({
    subject: "Payment Receipt - AI Kids Learning",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 40px 20px; text-align: center; border-radius: 12px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 12px; margin: 20px 0; }
            .receipt-box { background: white; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #8B5CF6; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
            h1 { margin: 0; font-size: 28px; }
            .amount { font-size: 36px; font-weight: bold; color: #10b981; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Payment Receipt</h1>
            <p style="font-size: 16px; margin: 10px 0 0 0;">Thank you for your payment</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1f2937;">Hi ${name},</h2>
            <p>Your payment has been processed successfully.</p>
            
            <div class="receipt-box">
              <h3 style="margin-top: 0;">Payment Details</h3>
              <p><strong>Amount Paid:</strong></p>
              <div class="amount">${amount}</div>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Service:</strong> AI Kids Learning Premium Subscription</p>
            </div>
            
            ${
              invoiceUrl
                ? `
              <center>
                <a href="${invoiceUrl}" class="button">
                  Download Invoice →
                </a>
              </center>
            `
                : ""
            }
            
            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">This is an automated receipt. Please keep it for your records.</p>
          </div>
          
          <div class="footer">
            <p>Questions? Contact us at <a href="mailto:support@kids-learning-ai.com">support@kids-learning-ai.com</a></p>
            <p>© ${new Date().getFullYear()} AI Kids Learning. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
  }),

  subscriptionExpiring: (name: string, expiryDate: string) => ({
    subject: "Your Subscription is Expiring Soon",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 12px; margin: 20px 0; }
            .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #f59e0b; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
            h1 { margin: 0; font-size: 28px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>⏰ Subscription Expiring Soon</h1>
          </div>
          
          <div class="content">
            <h2 style="color: #f59e0b;">Hi ${name},</h2>
            <p>We wanted to remind you that your premium subscription will expire soon.</p>
            
            <div class="warning-box">
              <p style="margin: 0;"><strong>Expiry Date:</strong> ${expiryDate}</p>
            </div>
            
            <p><strong>Don't lose access to:</strong></p>
            <ul>
              <li>Unlimited AI learning activities</li>
              <li>Personalized learning paths</li>
              <li>Advanced progress tracking</li>
              <li>AI friend companions</li>
              <li>Premium games and content</li>
            </ul>
            
            <center>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://www.kids-learning-ai.com"}/parent/subscription" class="button">
                Renew Subscription →
              </a>
            </center>
            
            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">If you've already renewed, please disregard this message.</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} AI Kids Learning. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
  }),

  contactFormSubmission: (name: string, email: string, subject: string, message: string) => ({
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 30px 20px; border-radius: 12px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 12px; margin: 20px 0; }
            .info-box { background: white; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; margin: 10px 0; }
            h1 { margin: 0; font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
          </div>
          
          <div class="content">
            <div class="info-box">
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div class="info-box">
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">Reply to this message at: <a href="mailto:${email}">${email}</a></p>
          </div>
        </body>
      </html>
    `,
  }),
}
