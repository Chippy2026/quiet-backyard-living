exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        status: 'method_not_allowed',
        message: 'Only POST is allowed.'
      })
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Missing RESEND_API_KEY');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        status: 'server_error',
        message: 'Something went wrong on our end. Please try again in a minute.'
      })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        status: 'invalid_request',
        message: 'Invalid request.'
      })
    };
  }

  const email = String(body.email || '').trim().toLowerCase();
  const source = String(body.source || 'story-signup').trim();
  const signupPage = String(body.signup_page || 'unknown').trim();

  if (!email) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        status: 'missing_email',
        message: 'Please enter your email address first.'
      })
    };
  }

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailLooksValid) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        status: 'invalid_email',
        message: 'That email address doesn\'t look quite right. Please check it and try again.'
      })
    };
  }

  const resendPayload = {
    email,
    unsubscribed: false
  };

  let resendResponse;
  let resendData;

  try {
    resendResponse = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendPayload)
    });

    resendData = await resendResponse.json();
  } catch (error) {
    console.error('Network/Resend error', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        status: 'server_error',
        message: 'Something went wrong on our end. Please try again in a minute.'
      })
    };
  }

  if (resendResponse.ok) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        status: 'created',
        message: 'Thanks, you’re on the list. We’ll let you know when the next chapter goes live.'
      })
    };
  }

  const resendMessage = String(resendData?.message || '').toLowerCase();
  const looksLikeDuplicate =
    resendResponse.status === 409 ||
    resendMessage.includes('already exists') ||
    resendMessage.includes('duplicate');

  if (looksLikeDuplicate) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        status: 'already_exists',
        message: 'You’re already on the list, so you’re all set for future chapter updates.'
      })
    };
  }

  console.error('Resend contact create failed', {
    status: resendResponse.status,
    data: resendData
  });

  return {
    statusCode: 500,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ok: false,
      status: 'server_error',
      message: 'Something went wrong on our end. Please try again in a minute.'
    })
  };
};
