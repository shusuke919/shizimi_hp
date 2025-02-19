"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function PaymentPage() {
  return (
    <div className={styles.container}>
      {/* ヘッダー部分 */}
      <header className={styles.header}>
        <h1 className={styles.companyName}>しじみ庵</h1>
      </header>

      {/* メインコンテンツ */}
      <main className={styles.main}>
        {/* 決済リンク */}
        <section className={styles.section}>
          <h2>決済リンク</h2>
          <p className={styles.note}>
            以下のQRコードを読み取ってお支払いください
          </p>
          <div className={styles.qrWrap}>
            {/* PayPayのQRコード */}
            <div className={styles.qrItem}>
              <Image
                src="/QR_950143しじみpaypay.png"
                alt="PayPay決済用QRコード"
                width={200}
                height={200}
                className={styles.qrImage}
              />
              <p>PayPay</p>
            </div>
            {/* PayどんのQRコード */}
            <div className={styles.qrItem}>
              <Image
                src="/sizimipayどん.png"
                alt="Payどん決済用QRコード"
                width={200}
                height={200}
                className={styles.qrImage}
              />
              <p>Payどん</p>
            </div>
          </div>
        </section>

        {/* 商品購入ページリンク */}
        <section className={styles.section}>
          <h2>商品購入決済ページ</h2>
          <p>しじみ庵のWebサイトからお買い物が可能です。</p>
          <a
            href="https://sizimian.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.purchaseLink}
          >
            しじみ庵商品購入決済ページへ
          </a>
        </section>

        {/* 予約ページへのリンクを追加 */}
        <section className={styles.section}>
          <h2>来店予約予約</h2>
          <p>しじみ庵への来店予約フォームです。</p>
          <Link href="/reservation" className={styles.purchaseLink}>
            予約フォームへ
          </Link>
        </section>
      </main>

      {/* フッター */}
      <footer className={styles.footer}>
        <small>© 2023 しじみ庵</small>
      </footer>
    </div>
  );
}
