const form = document.getElementById('login-form');
const errorBox = document.getElementById('error');
const submitBtn = document.getElementById('submit');

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorBox.hidden = true;

  const username = form.username.value.trim();
  const password = form.password.value;
  if (!username || !password) {
    showError('Please enter your username and password.');
    return;
  }

  submitBtn.disabled = true;
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = '/admin/';
      return;
    }

    const data = await res.json().catch(() => ({}));
    showError(data.message || 'Login failed. Please try again.');
  } catch (err) {
    showError('Could not reach the server.');
  } finally {
    submitBtn.disabled = false;
  }
});
