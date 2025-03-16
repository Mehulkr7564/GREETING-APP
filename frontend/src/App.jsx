import { useState } from "react";

export default function GreetingApp() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const getGreeting = async () => {
    if (!name) {
      setMessage("Please enter your name.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/greet?name=${name}`);
      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error fetching greeting.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Greeting App</h1>
      <input
        type="text"
        className="p-2 border rounded"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={getGreeting}>
        Get Greeting
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}
