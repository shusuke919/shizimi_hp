"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function ReservationPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  // 利用可能な時間の選択肢（21:00～05:00）
  const times = [
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // 日付が入力されていれば、選択された日が月曜日かどうかチェック
    if (date) {
      const selectedDate = new Date(date);
      // JavaScriptのgetDay()は、月曜日が 1 を返します
      if (selectedDate.getDay() === 1) {
        setMessage("月曜日は定休日です。別の日付を選択してください。");
        return;
      }
    }

    if (!date || !time || !email || !numPeople || !phone || !details) {
      setMessage(
        "日付、時間、メールアドレス、人数、電話番号、ご来店内容をすべて入力してください。"
      );
      return;
    }

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, email, numPeople, phone, details }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("予約が送信されました。ありがとうございます！");
        setDate("");
        setTime("");
        setEmail("");
        setNumPeople("");
        setPhone("");
        setDetails("");
      } else {
        setMessage("送信に失敗しました: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setMessage("エラーが発生しました。");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>📅 来店希望時間連絡</h1>
        確定次第、メールまたはお電話にてご連絡いたします。
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 日付選択 */}
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              日付：
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {/* 時間選択 */}
          <div className={styles.formGroup}>
            <label htmlFor="time" className={styles.label}>
              時間：
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className={styles.input}
            >
              <option value="">選択してください</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* メールアドレス入力 */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス：
            </label>
            <input
              type="email"
              id="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {/* 人数入力 */}
          <div className={styles.formGroup}>
            <label htmlFor="numPeople" className={styles.label}>
              人数：
            </label>
            <input
              type="number"
              id="numPeople"
              placeholder="例: 2"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              required
              className={styles.input}
              min="1"
            />
          </div>

          {/* 電話番号入力 */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              電話番号：
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="例: 090-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {/* 来店内容入力 */}
          <div className={styles.formGroup}>
            <label htmlFor="details" className={styles.label}>
              ご来店時のご希望：
            </label>
            <textarea
              id="details"
              placeholder="ご来店に関するご希望や備考を入力してください"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              className={styles.textarea}
            />
          </div>

          {/* 送信ボタン */}
          <button type="submit" className={styles.button}>
            送信する
          </button>
        </form>
        {/* メッセージ表示 */}
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
