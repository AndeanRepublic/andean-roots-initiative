import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const ALLOWED_TOPICS = [
  'volunteer',
  'donate',
  'partnership',
  'media',
  'general',
] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY as string | undefined;
  const toEmail = import.meta.env.CONTACT_TO_EMAIL as string | undefined;

  if (!apiKey || !toEmail) {
    return new Response(JSON.stringify({ error: 'Server misconfigured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
  const honey = typeof body._honey === 'string' ? body._honey : '';

  // Honeypot anti-spam
  if (honey) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!name || !isValidEmail(email) || !message || !topic) {
    return new Response(JSON.stringify({ error: 'Missing or invalid fields.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  // TODO: switch from to your verified domain once added in resend.com/domains
  const { error } = await resend.emails.send({
    from: 'Andean Roots Initiative <onboarding@resend.dev>',
    to: [toEmail],
    replyTo: email,
    subject: `Contacto web — ${topic}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <table cellpadding="6">
        <tr><td><strong>Nombre</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td><strong>Tema</strong></td><td>${topic}</td></tr>
      </table>
      <hr />
      <p style="white-space:pre-wrap">${message}</p>
    `,
  });

  if (error) {
    console.error('[contact] Resend error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
