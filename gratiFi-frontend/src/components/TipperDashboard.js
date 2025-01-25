import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TipperDashboard = () => {
  const [creators, setCreators] = useState([]);
  const [tippingHistory, setTippingHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of creators
    fetch("/api/creators")
      .then((response) => response.json())
      .then((data) => setCreators(data))
      .catch((error) => console.error("Error fetching creators:", error));

    // Fetch tipping history for the logged-in tipper
    fetch("/api/transactions/tipper")
      .then((response) => response.json())
      .then((data) => setTippingHistory(data))
      .catch((error) => console.error("Error fetching tipping history:", error));
  }, []);

  const handleCreatorClick = (creator) => {
    navigate(`/tipper/creator/${creator.walletAddress}`, { state: { creator } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tipper Dashboard</h1>

      {/* Creators Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Discover Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creators.map((creator) => (
            <div
              key={creator.walletAddress}
              className="border rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => handleCreatorClick(creator)}
            >
              <h3 className="text-lg font-bold">{creator.name}</h3>
              <p>{creator.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tipping History Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Tipping History</h2>
        {tippingHistory.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Creator</th>
                <th className="border px-4 py-2">Amount (ETH)</th>
                <th className="border px-4 py-2">Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {tippingHistory.map((tx) => (
                <tr key={tx._id}>
                  <td className="border px-4 py-2">{tx.creatorName}</td>
                  <td className="border px-4 py-2">{tx.amount}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={`https://etherscan.io/tx/${tx.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      View on Etherscan
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tipping history available.</p>
        )}
      </div>
    </div>
  );
};

export default TipperDashboard;
