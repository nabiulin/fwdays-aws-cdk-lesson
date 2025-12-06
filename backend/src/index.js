import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let cryptoData = null;
let lastUpdateTime = null;

async function fetchCryptoData(currency) {
  try {
    const response = await fetch(`https://api.freecryptoapi.com/v1/getData?symbol=${currency}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CRYPTO_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.symbols[0],
    };
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

async function updateCryptoData() {
  const resultBTC = await fetchCryptoData("BTC");
  const resultETH = await fetchCryptoData("ETH");
  const resultLTC = await fetchCryptoData("LTC");

  cryptoData = [resultBTC.data, resultETH.data, resultLTC.data];

  lastUpdateTime = new Date();
  console.log(`[${lastUpdateTime.toISOString()}] Crypto data updated`);
}

updateCryptoData();

setInterval(updateCryptoData, 5000);

app.get("/api/crypto", (req, res) => {
  if (!cryptoData) {
    return res.status(503).json({
      success: false,
      message: "Data not yet available. Please try again in a moment.",
    });
  }

  res.json({
    data: cryptoData,
    lastUpdate: lastUpdateTime?.toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    dataAvailable: cryptoData !== null,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Crypto data endpoint: http://localhost:${PORT}/api/crypto`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
