import CoinGecko from 'coingecko-api';

const client = new CoinGecko();

export default async (req, res) => {
  const coin = await client.coins.fetch('shiba-inu', {});
  res.status(200).json(coin);
}
