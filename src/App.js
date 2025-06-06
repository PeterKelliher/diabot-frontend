import React, { useState, useEffect, useRef } from 'react';
import './app.css';
import MemoryHandler from './MemoryHandler';
import { supabase } from './supabaseClient';

function App({ session }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const memory = useRef(new MemoryHandler());
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    memory.current.store(newUserMessage);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: memory.current.buildPrompt(updatedMessages),
          userId: session.user.id,
          memoryEnabled
        })
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, { sender: 'diabot', text: `Error: ${data.error}` }]);
        return;
      }

      const diabotReply = { sender: 'diabot', text: data.reply };
      setMessages(prev => [...prev, diabotReply]);
      memory.current.store(diabotReply);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages(prev => [...prev, { sender: 'diabot', text: 'Error talking to Diabot.' }]);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="App">
      <h1>Diabot: Diabeat the shit out of diabetes</h1>

      <label className="memory-toggle">
        <input
          type="checkbox"
          checked={memoryEnabled}
          onChange={e => setMemoryEnabled(e.target.checked)}
        />
        Enable Memory
      </label>

      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'You' : 'Diabot'}:</strong> {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <input
        type="text"
        placeholder="Say something..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;