import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// 環境変数で Gmail 認証情報を管理
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

// メール送信先
const TO_EMAIL = "sh091965@gmail.com";

//
export async function POST(request: Request) {
  try {
    // フロントエンドから送られたJSONデータを取得
    const { date, time, email, numPeople, phone, details } =
      await request.json();

    // Nodemailerのトランスポートを設定
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    // メール内容を設定
    const mailOptions = {
      from: email, // 送信者（ユーザーのメール）
      to: TO_EMAIL, // 受信者（管理者のGmail）
      subject: "【新規予約】来店予約のリクエストがありました",
      text: `
        🔹 予約が入りました 🔹
        📅 日付: ${date}
        ⏰ 時間: ${time}
        👥 人数: ${numPeople}
        📞 電話番号: ${phone}
        📧 お客様メールアドレス: ${email}
        ✏️ ご来店時のご希望:
        ${details}

        ----------------------------------------
        自動送信メールです。
      `,
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    // 成功時のレスポンス
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("メール送信エラー:", error);
    return NextResponse.json({ success: false });
  }
}
