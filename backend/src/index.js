import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let cryptoData = null;
let lastUpdateTime = null;

async function fetchCryptoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true"
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
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
  const result = await fetchCryptoData();
  cryptoData = result;
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
    ...cryptoData,
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
