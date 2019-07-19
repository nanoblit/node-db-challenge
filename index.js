const express = require('express');
const knex = require('knex');
const db = knex(require('./knexfile').development);

const app = express();
app.use(express.json());

function getProject(id) {
  return db('projects')
    .where({ id })
    .first();
}

function getAction(id) {
  return db('actions')
    .where({ id })
    .first();
}

function getActionsByProjectId(project_id) {
  return db
    .select('id', 'description', 'notes', 'complete')
    .from('actions')
    .where({ project_id });
}

function postProject(data) {
  return db('projects').insert(data);
}

function postAction(data) {
  return db('actions').insert(data);
}

app.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await getProject(id);
    if (!project) {
      res.status(404).json({ error: 'No project with given ID' });
    } else {
      const actions = await getActionsByProjectId(id);
      res.status(200).json({ project, actions });
    }
  } catch (error) {
    next(error);
  }
});

app.post('/projects', async (req, res, next) => {
  try {
    const { body } = req;
    if ((!body.name, !body.description, body.complete === undefined)) {
      res.status(400).json({ error: 'Name, decscription and complete are required' });
    } else {
      const projectId = (await postProject(body))[0];
      const project = await getProject(projectId);
      res.status(200).json(project);
    }
  } catch (error) {
    next(error);
  }
});

app.post('/actions', async (req, res, next) => {
  try {
    const { body } = req;
    const project = await getProject(body.project_id);
    if (!project) {
      res.status(400).json({ error: 'Project has to exist' });
    }
    else if ((!body.description, !body.project_id, !body.notes, body.complete === undefined)) {
      res.status(400).json({ error: 'Name, notes, project_id and complete are required' });
    } else {
      const actionId = (await postAction(body))[0];
      const action = await getAction(actionId);
      res.status(200).json(action);
    }
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(4000, () => {
  console.log('listening on 4000');
});

// transaction
function addUserWithEmail({ fname, lname, email }) {
  return db.transaction(trx => trx('users')
    .insert({ fname, lname })
    .then(([id]) => trx('emails').insert({ email, user_id: id })));
}
