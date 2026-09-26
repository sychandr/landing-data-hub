import { type FormEvent, useState } from 'react';
import '../App.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function SubmitInquiryPage() {
  const [projectId, setProjectId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inquiries`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            name,
            email,
            phone: phone || undefined,
            message,
            sourceUrl: window.location.href,
          }),
        },
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.error ?? `Request failed with status ${response.status}`,
        );
      }

      setStatus('success');
      setProjectId('');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    }
  };

  return (
    <section id="center">
      <h1>Submit an inquiry</h1>
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <label htmlFor="projectId">Project ID</label>
        <input
          id="projectId"
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
          required
        />

        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="phone">Phone (optional)</label>
        <input
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />

        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send'}
        </button>
      </form>

      {status === 'success' && <p role="status">Inquiry submitted.</p>}
      {status === 'error' && <p role="alert">{errorMessage}</p>}
    </section>
  );
}

export default SubmitInquiryPage;
