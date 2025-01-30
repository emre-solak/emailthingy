import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Playground() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleRun = () => {
    setResponse(`AI Response: ${input}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <label className="text-sm">Temperature</label>
        <input type="range" min="0" max="1" step="0.1" className="w-full mb-4" />
        <label className="text-sm">Max Tokens</label>
        <input type="number" min="1" max="4000" className="w-full text-black p-1 mb-4" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">AI Playground</h1>
        <Textarea
          className="w-full h-40 p-4 bg-gray-800 rounded-lg text-white"
          placeholder="Type your prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button 
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          onClick={handleRun}
        >
          Run
        </Button>
        
        {response && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-gray-800 rounded-lg"
          >
            <h2 className="text-lg font-semibold mb-2">Response</h2>
            <p className="text-gray-300">{response}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

