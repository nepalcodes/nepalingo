import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyCi239eredIAEEJkI8xzvGwW1GPS7B1vxQ';

// Proxy for Google Translate
app.get('/translate', async (req, res) => {
  const { target, text } = req.query;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}&q=${text}&target=${target}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching translation');
  }
});

// Placeholder for password reset feature
// app.post('/reset-password', async (req, res) => {
//   const { email } = req.body;
//   res.send(`Password reset link sent to ${email}`);
// });

// Placeholder for Google Sign-In (additional setup needed)
// app.get('/auth/google', (req, res) => {
//   res.redirect('YOUR_GOOGLE_SIGN_IN_URL');
// });

// app.listen(PORT, () => {
//   console.log(`Proxy server running on http://localhost:${PORT}`);
// });
