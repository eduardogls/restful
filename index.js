const express = require('express');
const pessoas = require('./banco.js')
const app = express();
app.use(express.json());

let novoId = 5; 

app.get('/pessoa', (req, res) => {
  res.json(pessoas);
});

app.get('/pessoa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = pessoas.find((p) => p.id === id);

  if (!pessoa) {
    return res.json({ 
      mensagem: 'ID não encontrado!' 
    });
  }
  res.json(pessoa);
});

app.post('/pessoa', (req, res) => {
  const pN = req.body;
  pN.id = novoId++;
  pessoas.push(pN);
  res.json(pN);
});

app.delete('/pessoa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const remover = pessoas.findIndex((p) => p.id === id);

  if (remover == -1) {
    return res.json({ mensagem: 'ID não encontrado!' });
  }

  pessoas.splice(remover, 1);
  res.send();
});

app.patch('/pessoa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const atualizarPessoa = req.body;
  const remover = pessoas.findIndex((p) => p.id === id);

  if (remover == -1) {
    return res.json({ mensagem: 'ID não encontrado!' });
  }

  pessoas[remover] = { ...pessoas[remover], ...atualizarPessoa };
  res.json(pessoas[remover]);
});

app.listen(80, () => {
  console.log(`Servidor rodando na porta 80`);
});
