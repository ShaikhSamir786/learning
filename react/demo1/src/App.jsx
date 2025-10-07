import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">🔢 Counter App</h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center w-80">
        <span className="text-6xl font-extrabold text-blue-600 mb-6">
          {count}
        </span>

        <div className="flex gap-4">
          <button
            onClick={decrement}
            disabled={count === 0}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
              count === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            -
          </button>

          <button
            onClick={reset}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-semibold transition"
          >
            Reset
          </button>

          <button
            onClick={increment}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
