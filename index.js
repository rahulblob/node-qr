const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 5900;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/generate', async (req, res) => {
  const text = req.body.text;
  const options = {
    width: req.body.width || 256,
    margin: req.body.margin || 4,
  };
  try {
    const qrCode = await QRCode.toDataURL(text, options);
    res.send(`<img src="${qrCode}" alt="QR Code"/>`);
  } catch (err) {
    res.status(500).send({ error: 'no text found make sure to send {"text":"your text/url"} in this format' });
  }
});

app.listen(port, () => {
  console.log(`QR code generator API listening at http://localhost:${port}`);
});
