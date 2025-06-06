import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { supabase } from './supabaseClient';

function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Check your email for the login link!');
  };

  return (
    <div className="App">
      <h2>Login to Diabot</h2>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Send Magic Link</button>
    </div>
  );
}

function Root() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session ? <App session={session} /> : <AuthPage />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);