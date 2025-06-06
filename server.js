const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const upload = multer();
const app = express();

const DISCORD_WEBHOOK = 'PON_AQUI_TU_WEBHOOK_URL';

app.post('/api/vacante', upload.any(), async (req, res) => {
  try {
    const {
      nombre, keko, discord, correo, puesto, experiencia,
      motivo1, motivo2, motivo3, motivo4, motivo5, salaurl
    } = req.body;
    let content =
      `**Nueva postulación KusFM**\n` +
      `**Nombre:** ${nombre}\n` +
      `**Keko:** ${keko}\n` +
      `**Discord:** ${discord}\n` +
      `**Correo:** ${correo}\n` +
      `**Puesto:** ${puesto}\n` +
      `**Experiencia:** ${experiencia}\n` +
      `**Motivo1:** ${motivo1}\n` +
      `**Motivo2:** ${motivo2}\n` +
      `**Motivo3:** ${motivo3}\n` +
      `**Motivo4:** ${motivo4}\n` +
      `**Compromiso:** ${motivo5}`;
    if (salaurl) content += `\n**Link Sala Habbo:** ${salaurl}`;
    const form = new FormData();
    form.append('content', content);
    if (req.files) {
      req.files.forEach((file, i) => {
        form.append(`files[${i}]`, file.buffer, file.originalname);
      });
    }
    await axios.post(DISCORD_WEBHOOK, form, { headers: form.getHeaders() });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});
app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
