const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: "Olá do backend!" });
});

const PORT = process.env.PORT || 400;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
