import React, { useEffect, useState } from "react";

interface CryptoResponse {
  symbol: string;
  last: string;
  last_btc: string;
  lowest: string;
  highest: string;
  daily_change_percentage: string;
}

function CryptoStats() {
  const [data, setData] = useState<{ data: CryptoResponse[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3000/api/crypto")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch crypto data");
          return res.json();
        })
        .then((json) => {
          setError(null);
          setData(json);
        })
        .catch((err) => setError(err.message));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-lg">-</div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-lg">-</div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-lg">-</div>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {data.data.map(({ highest, last, daily_change_percentage, symbol }) => {
        const change = parseFloat(daily_change_percentage);
        return (
          <div key={symbol} className="bg-white p-5 rounded-lg border border-gray-200 shadow-lg">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800">{symbol}</h4>

            {symbol ? (
              <>
                <p className="mt-2 sm:mt-3 text-4xl sm:text-5xl font-bold text-blue-600">${highest.toLocaleString()}</p>

                <p className={`mt-1 font-medium ${change > 0 ? "text-green-600" : "text-red-600"}`}>
                  {change > 0 ? "+" : ""}
                  {change.toFixed(2)}%
                </p>
              </>
            ) : (
              <p className="mt-3 text-gray-400">Loading...</p>
            )}
          </div>
        );
      })}

      {error && <div className="col-span-3 text-red-600 font-medium">Error: {error}</div>}
    </div>
  );
}

export default CryptoStats;
