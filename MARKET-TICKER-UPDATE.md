# Birustock Customer — Dynamic Market Ticker v1

- Live crypto ticker: BTC/USD, ETH/USD, SOL/USD, BNB/USD.
- Data source: CoinGecko public API, fetched server-side and cached for 60 seconds.
- Client refresh: every 60 seconds.
- Economic events remain a second ticker row and refresh alongside the market row.
- Economic calendar backend cache reduced to 10 minutes.
- No API key or credential is stored in source code.
- Production/public display should review CoinGecko attribution and licensing requirements before launch.
