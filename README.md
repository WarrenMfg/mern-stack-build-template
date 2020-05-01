# **MERN Stack Build Template**

* Make a copy of the root folder and open in Visual Studio Code
* Press `cmd/ctl + shift + B` to display the build task in the Command Palette
* Press enter to select and start the build task

Answer three questions in the terminal, and in seconds you'll have a MERN stack 👍

## Full Tech Stack

* MongoDB
* Mongoose
* Express
  * morgan
* React
* Node
* webpack
  * css-loader
  * style-loader
* Babel
* nodemon

***

# **Getting Started**

1. Download this repo and unzip it. The starter files will be deleted automatically after the build, therefore make a copy of the root folder and open in Visual Studio Code.

2. Ensure you have the `code` shell command enabled:
    * In Visual Studio Code's Command Palette, search for and click "Shell Command: Install 'code' command in PATH"

3. Press `cmd/ctl + shift + B` to display the build task in the Command Palette, and press enter to select and start the build task.

4. Finally, complete the terminal prompts for the following:
    * HTML `<title>` innerText
    * localhost port number
    * Database name

## What Does The Build Include?

After the prompt, the build will begin and includes the following:

* Frontend build
* Backend build
* `npm install`
* Initialize git and first commit
* Starter file deletion
* Second commit to indicate starter file deletion
* Start webpack in watch mode (for frontend)
* Start Babel in watch mode (for backend)
* Start nodemon

### File Structure

```
MERN-stack-build-template
│
├── backend
│   │
│   ├── database
│   │   │
│   │   ├── crud.js
│   │   ├── index.js
│   │   ├── seeder.js
│   │   ├── URI.js
│   │   └── utils.js
│   │
│   ├── doc
│   │   │
│   │   ├── docController.js
│   │   ├── docModel.js
│   │   └── docRouter.js
│   │
│   └── server
│       │
│       └── index.js
│
├── client
│   │
│   ├── public
│   │   │
│   │   ├── bundle.js
│   │   └── index.html
│   │
│   └── src
│       │
│       ├── components
│       │   │
│       │   └── App.jsx
│       │
│       ├── index.jsx
│       └── style.css
│
├── dist (same as backend, but compiled by Babel)
│   │
│   ├── database
│   │   │
│   │   ├── crud.js
│   │   ├── index.js
│   │   ├── seeder.js
│   │   ├── URI.js
│   │   └── utils.js
│   │
│   ├── doc
│   │   │
│   │   ├── docController.js
│   │   ├── docModel.js
│   │   └── docRouter.js
│   │
│   └── server
│       │
│       └── index.js
│
├── node_modules
│
├── .babelrc
│
├── .gitignore
│
├── package-lock.json
│
├── package.json
│
├── README.md
│
├── TODO
│
└── webpack.config.js
```

### npm
* npm modules will install automatically
* Change them as necessary before running the build task

### Git
* A git repo will be initialized automatically
* The first commit will commit all files with the message "git init"
* The second commit is for the starter file deletions with the message "deleted starter files"

### webpack, Babel, nodemon
* These will all start in watch mode, split into their own panes within a single panel 👍

### Browser
* A browser tab will launch automatically
* Refresh after nodemon starts

# **Loose Ends**
For your project needs:
  * Customize docRouter.js endpoints
  * Add crud.js functionality
  * Customize schema in docModel.js

**Note:** Starter files will be deleted after they serve their purpose. Therefore, to start a new project, always copy the root folder.

***

# **Author**

* **Kent Warren** - [GitHub](https://github.com/WarrenMfg)
* **The Art of Warren** - [Portfolio](https://theartofwarren.com/)
* **LinkedIn** - [Profile](https://www.linkedin.com/in/theartofwarren/)

## Acknowledgments
* **Scott Moss** - [GitHub](https://github.com/Hendrixer) - For the backend workflow concepts taught on [Frontend Masters](https://frontendmasters.com/)

# **License**

## MIT
Copyright 2020 Kenneth Warren

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

