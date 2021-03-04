import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home({ coin }) {
  function pumpTrend() {
    return (
      <div>
        <span>MOON</span>
        <img className={styles.trendGif} src="/happy.webp" />
      </div>
    );
  }
  function dumpTrend() {
    return (
      <div>
        <span>Dump</span>
        <img className={styles.trendGif} src="/sad.webp" />
      </div>
    );
  }
  function mehTrend() {
    return (
      <div>
        <span>meh</span>
        <img className={styles.trendGif} src="/meh.webp" />
      </div>
    );
  }
  function trend(change24h) {
    if (change24h >= 5) {
      return pumpTrend();
    } else if (change24h >= -1) {
      return mehTrend();
    } else {
      return dumpTrend();
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>$SHIB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.header}>
        <div className={styles.background}>
          <img src="/bg.jpg" />
        </div>

        <div className={styles.titleBar}>
          <img src="/logo.png" />
          <span>All hail SHIBA</span>
        </div>

        <div className={styles.coinData}>
          <div className={styles.data}>
            <span className={styles.dataValue}>{coin.totalSupply.toLocaleString()}</span>
            <span className={styles.dataTitle}>Total supply</span>
          </div>
          <div className={styles.data}>
            <span className={styles.dataValue}>${coin.currentPrice.toFixed(10).toLocaleString('fullwide', {useGrouping: false})} USD</span>
            <span className={styles.dataTitle}>Current price</span>
          </div>
          <div className={styles.data}>
            <span className={styles.dataValue}>{coin.priceChange24h >= 0 ? '+' : '-'}{coin.priceChange24h.toLocaleString()}%</span>
            <span className={styles.dataTitle}>Price change 24h</span>
          </div>
          <div className={styles.data}>
            <span className={styles.dataValue}>${coin.ath.toFixed(10).toLocaleString('fullwide', {useGrouping: false})} USD</span>
            <span className={styles.dataTitle}>All-time high</span>
          </div>
          <div className={styles.data}>
            <span className={styles.dataValue}>{trend(coin.priceChange24h)}</span>
            <span className={styles.dataTitle}>Trend</span>
          </div>
        </div>

        <div className={styles.howToBuy}>
          <h1 className={styles.title}>How to buy $SHIB</h1>

          <div className={styles.cards}>
            <div className={`${styles.howToBuyCard} ${styles.recommended}`}>
              <div className={styles.title}>Uniswap</div>
              <div className={styles.recommendedLabel}>recommended</div>
              <ol className={styles.steps}>
                <li>
                  Install <a href="https://metamask.io/download.html" rel="noopener noreferrer"  target="_blank">MetaMask</a>
                </li>
                <li>
                  Open <a href="https://app.uniswap.org/#/swap?outputCurrency=0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce" rel="noopener noreferrer"  target="_blank">Uniswap</a>
                </li>
                <li>
                  Swap some ETH to SHIB
                </li>
              </ol>
              <span>Done! You can find your SHIB in your MetaMask wallet.</span>
            </div>
            <div className={styles.howToBuyCard}>
              <div className={styles.title}>Hotbit</div>
              <span className={styles.comingSoon}>Coming soon...</span>
            </div>
          </div>
        </div>
      </main>

      <main>

      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/coin`);
  const data = await response.json();
  const coin = {
    totalSupply: data.data.market_data.total_supply,
    priceChange24h: data.data.market_data.price_change_percentage_24h,
    currentPrice: data.data.market_data.current_price.usd,
    ath: data.data.market_data.ath.usd,
  };
  console.log(coin);
  return {
    props: {
      coin
    }
  };
}