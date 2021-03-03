import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ coin }) {
  function pumpTrend() {
    return (
      <div>
        <span>MOON</span>
        <img className={styles.trendGif} src="/happy.webp"></img>
      </div>
    );
  }
  function dumpTrend() {
    return (
      <div>
        <span>Dump</span>
        <img className={styles.trendGif} src="/sad.webp"></img>
      </div>
    );
  }
  function mehTrend() {
    return (
      <div>
        <span>meh</span>
        <img className={styles.trendGif} src="/meh.webp"></img>
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

      <header className={styles.header}>
        <div className={styles.background}>
          <img src="/bg.jpg"></img>
        </div>

        <div className={styles.titleBar}>
          <img src="/logo.png"></img>
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
          <div className={styles.howToBuyCard}>
            <div className={styles.title}>Uniswap</div>
            podf
          </div>
          <div className={styles.howToBuyCard}>
            <div className={styles.title}>Hotbit</div>
          </div>
        </div>
      </header>

      <main>

      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/coin');
  const data = await response.json();
  console.log('data', data);
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