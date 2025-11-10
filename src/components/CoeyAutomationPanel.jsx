import React, { useState } from 'react';

export default function CoeyAutomationPanel() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [commitMsg, setCommitMsg] = useState('Commit from Coey');
  const [loading, setLoading] = useState(false);

  // AI Chat (code writing)
  const handleAiChat = async () => {
    setLoading(true);
    setAiResponse('');
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: aiPrompt }),
    });
    const data = await res.json();
    setAiResponse(data.reply || data.error);
    setLoading(false);
  };

  // Deploy to Render
  const handleDeploy = async () => {
    setLoading(true);
    const res = await fetch('/api/deploy', { method: 'POST' });
    const data = await res.json();
    alert(data.message || data.error);
    setLoading(false);
  };

  // Commit & Push to Git
  const handleGitCommit = async () => {
    setLoading(true);
    const res = await fetch('/api/git-commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: commitMsg }),
    });
    const data = await res.json();
    alert(data.message || data.error);
    setLoading(false);
  };

  // Example dashboard style (adjust colors/fonts to match your dashboard)
  const panelStyle = {
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    padding: '2rem',
    maxWidth: 700,
    margin: '2rem auto',
    fontFamily: 'inherit',
  };
  const sectionStyle = { marginBottom: '2rem' };
  const labelStyle = { fontWeight: 600, marginBottom: 8, display: 'block', color: '#333' };
  const buttonStyle = {
    background: '#2d7ff9',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0.5rem 1.5rem',
    marginTop: 8,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(45,127,249,0.08)',
    transition: 'background 0.2s',
  };
  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: 6,
    border: '1px solid #ccc',
    marginBottom: 8,
    fontSize: 16,
  };

  return (
    <div style={panelStyle}>
      <h2 style={{ color: '#2d7ff9', marginBottom: 24 }}>Coey Automation Panel</h2>
      <div style={sectionStyle}>
        <label style={labelStyle}>AI Code Writer</label>
        <textarea
          rows={3}
          value={aiPrompt}
          onChange={e => setAiPrompt(e.target.value)}
          placeholder="Ask Coey to write code or answer a question..."
          style={inputStyle}
        />
        <br />
        <button style={buttonStyle} onClick={handleAiChat} disabled={loading || !aiPrompt}>Ask Coey</button>
        {aiResponse && (
          <pre style={{
            background: '#f8faff',
            padding: 16,
            borderRadius: 8,
            marginTop: 12,
            color: '#222',
            fontSize: 15,
            border: '1px solid #e0e0e0'
          }}>{aiResponse}</pre>
        )}
      </div>
      <div style={sectionStyle}>
        <label style={labelStyle}>Git Commit & Push</label>
        <input
          type="text"
          value={commitMsg}
          onChange={e => setCommitMsg(e.target.value)}
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={handleGitCommit} disabled={loading}>Commit & Push</button>
      </div>
      <div style={sectionStyle}>
        <label style={labelStyle}>Deploy to Render</label>
        <button style={buttonStyle} onClick={handleDeploy} disabled={loading}>Deploy Now</button>
      </div>
      {loading && <div style={{ color: '#2d7ff9', fontWeight: 600 }}>Working...</div>}
    </div>
  );
}
