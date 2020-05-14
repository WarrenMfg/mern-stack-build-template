const { writeFile, mkdir } = require('fs').promises;
const { exec } = require('child_process');
const { createInterface } = require('readline');


const questions = [
  'HTML <title> innerText? ',
  'localhost port number? ',
  'database name? '
];

const answers = []; // [title, port, dbName]

// create interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// ask questions from questions array
const ask = (i = 0) => {
  rl.question(questions[i], answer => {
    answers.push(answer.trim());
    if (answers.length !== questions.length) {
      ask(answers.length);
    } else {
      rl.close();
      process.stdout.write('\033c'); // clear terminal
      console.log('The innerText, port number, and database name have been applied.');
      makeDirectories();
    }
  });
};

ask();


// functions and variables for file content
function html(title) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'Document'}</title>
  </head>
  <body>
    <div id="app">Loading...</div>
    <script src="bundle.js"></script>
  </body>
  </html>`;
}

const indexJSX =
`import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './style.css';

ReactDOM.render(<App />, document.getElementById('app'));
`;

const appJSX =
`import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>Hello world!</div>
    );
  }
}

export default App;
`;

function server(port) {
  return `import express from 'express';
import morgan from 'morgan';
import { connect } from '../database/index';
import docRouter from '../doc/docRouter';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { resolve } from 'path';


const PORT = process.env.PORT || ${Number(port) || 50000};
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', docRouter);

/*
uncomment before app deploys
app.get('/bundle.js', (req, res) => {
  const gzip = createGzip();
  const bundle = createReadStream(resolve(__dirname, '../../client/public/bundle.js'));
  res.set({ 'Content-Encoding': 'gzip', 'Cache-Control': 'max-age=86400' });
  bundle.pipe(gzip).pipe(res);
});
*/

app.use('/', express.static('client/public'));

connect();
app.listen(PORT, () => console.log('Listening on port', PORT));
`;
}

const crud =
`import { utils } from './utils';


const getOne = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const getMany = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const createOne = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const updateOne = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


const deleteOne = model => async (req, res) => {
  try {

  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};


export const crud = (model) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model)
});`;

function dbIndex(dbName) {
  return `import mongoose from 'mongoose';
  import { URI } from './URI';

  export const connect = (location = URI) => {
    mongoose.connect(location, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    const db = mongoose.connection;
    db.on('error', (err) => console.log('connection error:', err));
    db.once('open', () => console.log('Connected to ${dbName || 'template'}!'));
  };`;
}

function URI(dbName) {
  return `export const URI = 'mongodb://localhost/${dbName || 'template'}';`;
}

const docRouter =
`import { Router } from 'express';
import controller from './docController';


const router = Router();

// one
router.route('/doc/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

router.route('/doc')
  .post(controller.createOne);

// many
router.route('/docs')
  .get(controller.getMany);


export default router;
`;

const docController =
`import { crud } from '../database/crud';
import Doc from './docModel';

// receives object of methods from crud.js
export default crud(Doc);
`;

const docModel =
`import mongoose from 'mongoose';


const docSchema = new mongoose.Schema({
  // example
  item: {
    type: String,
    required: true
  }
});

const Doc = mongoose.model('Doc', docSchema);
export default Doc;
`;

const babelrc =
`{
  "presets": [
    ["@babel/env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
`;

const gitignore =
`node_modules
bundle.js
dist
URI.js
`;

const webpack =
`const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/public')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  mode: 'development'
};
`;

const package =
`{
  "name": "mern-stack-build-template",
  "version": "1.0.0",
  "description": "Template build for MERN stack projects",
  "keywords": ["react", "node", "express", "mongoDB", "mongoose", "babel", "webpack", "MERN", "template"],
  "author": "Kent Warren",
  "license": "MIT",
  "homepage": "https://github.com/WarrenMfg",
  "repository": {
    "type": "git",
    "url": "https://github.com/WarrenMfg/mern-stack-build-template"
  },
  "main": "backend/server/index.js",
  "scripts": {
    "seed": "node dist/database/seeder.js",
    "buildFrontend": "npx webpack",
    "watchFrontend": "npx webpack --watch",
    "buildBackend": "npx babel backend --out-dir dist",
    "watchBackend": "npx babel backend --watch --out-dir dist",
    "start": "node dist/server/index.js",
    "startDev": "nodemon dist/server/index.js"
  },
  "nodemonConfig": {
    "watch": [
      "backend/*"
    ]
  },
  "devDependencies": {
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5",
    "@babel/preset-react": "^7.9.4",
    "babel-loader": "^8.1.0",
    "css-loader": "^3.5.3",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.3",
    "style-loader": "^1.2.1",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.9.10",
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
}
`;


// make directories
const directories = [];
function makeDirectories() {
  directories.push(
    mkdir('./client')
      .then(() => mkdir('./client/public').catch(console.log))
      .then(() => mkdir('./client/src').catch(console.log))
      .then(() => mkdir('./client/src/components').catch(console.log))
      .catch(console.log),

    mkdir('./backend')
      .then(() => mkdir('./backend/server').catch(console.log))
      .then(() => mkdir('./backend/database').catch(console.log))
      .then(() => mkdir('./backend/doc').catch(console.log))
      .catch(console.log)
  );

  makeFiles();
}


// make files
const files = [];
function makeFiles() {

  const [ title, port, dbName ] = answers;

  Promise.all(directories)
    .then(() => {
      files.push(

        // frontend
        // public
        writeFile('./client/public/index.html', html(title)).catch(console.log),
        // source
        writeFile('./client/src/style.css', '').catch(console.log),
        writeFile('./client/src/index.jsx', indexJSX).catch(console.log),
        writeFile('./client/src/components/App.jsx', appJSX).catch(console.log),

        // backend
        // server
        writeFile('./backend/server/index.js', server(port)).catch(console.log),
        // database
        writeFile('./backend/database/crud.js', crud).catch(console.log),
        writeFile('./backend/database/index.js', dbIndex(dbName)).catch(console.log),
        writeFile('./backend/database/seeder.js', '').catch(console.log),
        writeFile('./backend/database/URI.js', URI(dbName)).catch(console.log),
        writeFile('./backend/database/utils.js', '').catch(console.log),
        // database document
        writeFile('./backend/doc/docRouter.js', docRouter).catch(console.log),
        writeFile('./backend/doc/docController.js', docController).catch(console.log),
        writeFile('./backend/doc/docModel.js', docModel).catch(console.log),
        // miscellaneous
        writeFile('./.babelrc', babelrc).catch(console.log),
        writeFile('./.gitignore', gitignore).catch(console.log),
        writeFile('./README.md', '').catch(console.log),
        writeFile('./TODO', '').catch(console.log),
        writeFile('./webpack.config.js', webpack).catch(console.log),
        writeFile('./package.json', package).catch(console.log)
      );
    })
    .catch(console.log);

  buildComplete();
}


// build complete
function buildComplete() {
  Promise.all(files)
    .then(() => {
      console.log('Build complete! 👍');
      openFiles(answers[1]);
    })
    .catch(console.log);
}


// open files and browser
function openFiles(port) {
  const package = 'package.json';
  const appJSX = 'client/src/components/App.jsx';
  const server = 'backend/server/index.js';
  const docRouter = 'backend/doc/docRouter.js';
  const crud = 'backend/database/crud.js';
  const docModel = 'backend/doc/docModel.js';

  // open files
  exec(`code ${package} ${appJSX} ${server} ${docRouter} ${crud} ${docModel}`);
  // open browser
  exec( `open http://localhost:${port}` );
  console.log('Refresh your browser after nodemon starts.');
}