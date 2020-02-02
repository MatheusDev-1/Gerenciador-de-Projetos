const express = require('express');

const server = express();

const projetos = [];

function existenciaID(req, res, next) {
  if (!projetos[req.params.id]) {
    res.status(400).json({error: 'Este id não existe'});
  }

  return next();
}

function existenciaNome(req, res, next) {
  nomes = projetos.map(nomes => nomes['name']);
  if (nomes.includes(req.body.name)) {
    return res.status(400).json({error: 'Este nome de projeto já existe'});
  }

  return next();
}

server.use(express.json());

// Pegar todos os projetos
server.get('/projects', (req, res) => {
  res.json(projetos);
});

// Criar projetos
server.post('/projects', existenciaNome, (req, res) => {
  const {name} = req.body;
  const tasks = [];

  if(projetos[0] != undefined){
    const idsExistentes = projetos.map(projeto => projeto.id)
    const ultimoIndex = Number(idsExistentes[idsExistentes.length - 1])

    projetos.push({
      "id": ultimoIndex + 1,
      name,
      tasks
    })
  }
  else(projetos.push({
    "id": 0,
    name,
    tasks
  }));

  return res.json(projetos);
});

// Editar nome do Projeto
server.put('/projects/:id', existenciaID, (req, res) => {
  const {id} = req.params;

  projetos[id].name = req.body.name;

  return res.json(projetos[id]);
});

// Adição de tarefas
server.post('/projects/:id/tasks', (req, res) => {
  const {id} = req.params;
  const {tarefa} = req.body;

  projetos[id]['tasks'].push(tarefa);

  return res.json(projetos);
});

// Deleção de Projetos
server.delete('/projects/:id', existenciaID, (req, res) => {
  const {id} = req.params;

  projetos.splice(id, 1);

  return res.json(projetos);
});

server.listen(3333);
