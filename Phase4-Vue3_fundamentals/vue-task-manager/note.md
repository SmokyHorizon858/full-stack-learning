Project Introduction

## .vscode
# This is a VSCode project configuration folder.

containing:
- settings.json
- extension.json
- launch.json

Its purpose is to save the project's setting in VSCode, such as recommended plugins and formating rules.

Its not business code and doesn't affect the Vue page logic

## node_modules
# This is the folder where dependencies are installed.

run:
   npm install

and then, all dependencies listed in package.json will be downloaded here.

Tools such as Vue, Vite, TypeScript will be available here.

## public
# This is a static resource folder.

The content will be copied exactly to the final website root directory.

such as:
- public / favicon.ico
- public / logo.png

If I put:
- public / test.png

I can access directly like this on the page:
- <img src="/test.png">

It is suitable for storing static files that do not need to be processed by Vite.

## src: the most important source code folder
# Most of Vue page, components, CSS, TypeScript Logic are written here.

# src/assets
This is also a place to put resources, like pictures, logo and fonts.

Its difference with public:
The resources inside assests will be coped, optimisted and packed by Vite.

For example:
<img src="./assets/logo.png">

or:
import logo from './assets/logo.png'

In general projects, it's recommended to put images used by component in src/assets

# src/component
This is folder to put Vue components

Component is individual module in page.

such as:
- HelloWorld.vue
- TaskItem.vue
- TodoList.vue
- UserCard.vue
- Navbar.vue

# src/components/HelloWorld.vue

This is a component file

There are 3 parts in .vue file in general

<script setup lang="ts">
Writing JS/TS logic

<template>
Writing HTML structure
</template>

<style scoped>
Writing CSS style
</style>

For instance, a button component could be like:
<script setup lang="ts">
const message = "Hello Vue"
</script>

<template>
    <h1>{{ message }}</h1>
</template>

<style scoped>
h1 {
    color: red;
}
</style>

Current HelloWorld.vue is being imported and used by App.vue.

# src/App.vue
This is the root component of the entire project.

<script setup lang="ts">
import HelloWorld from './component/HelloWorld.vue'
</script>

<template>
    <HelloWorld />
</template>

Meaning:

First row:
    import HelloWorld from './component/HelloWorld.vue'

Import the HelloWorld.vue component from the components folder.

Then:
<HelloWorld />
Use this component on the page.

So what the page display mainly depends on written in HelloWorld.vue.

I can understand it as.
App.vue is a big page
HelloWorld.vue is a small component placed inside App.vue

# src/main.ts
This is an entry file of Vue project

It usually contains code like this:

  import { createApp } from 'vue'
  import './style.css'
  import App from './App.vue'
 
  createApp(App).mount('#app')

Meaning:
  import App from './App.vue'

Import the root component App.vue

createApp(App)
Create a Vue app

.mount('#app')
Mount this Vue application to index.html:
<div id="app"></div>

So the whole relation is:
The index.html file contains a #app container
main.ts attaches App.vue to #app
App.vue then displays HelloWorld.vue
HelloWorld handles the actual content

# src/style
This is the global CSS file
It is usuall imported in main.ts
  import './style.css'
The styles written here will affect the entire project

such as:
body {
    margin: 0;
    font-familty: Atial, sans-serif;
}
These global styles are best placed in style.css.

If I only want a specific component to have its own style, I can write it in the .vue file:
<style scoped>
</style>

# index.html
This is the outermost HTML file of the entire webpage.

Although Vue projects primarily written in .vue format, they ultimately run within an HTML page.

It usually contains:
<div id="app"></div>
<script type="module" src="/src/main.ts"></script>
These two are very crucial.

The div id="app" is the location where Vue is mounted.

src="/src/main.ts" tells the browser to start running the project from 'main'.

relation:
  'index.html' -> 'main.ts' -> 'App.vue' -> 'components'

# package.json
This is the project description and the npm configuration file.

It contains:
{
    "script": {
        "dev": "vite",
        "build": "vue-tsc -b && vite build",
        "preview": "view preview"
    },
    "dependencies": {
        "vue": "^3.x.x"
    },
    "devDependencies": {
        "vite": "...",
        "typescript": "..."
    }
}

The most commonly used are scripts:
  npm run dev
Start the development server

  npm run build
package project

  npm run preview
preview the packaged project

# The core relationship between them
The most important execution chain is this:
  index.html
      V
  src/main.ts
      V
  src/App.vue
      V
  src/components/HelloWorld.vue

# More specific:
index.html provides `<div id="app"></div>`

main.ts contains `#app`, where the Vue application is attached.

App.vue is the root component, determining the overall page structure.

HelloWorld.vue is a child component used by App.vue.

style.css provides global styles.

assets / public provide resources such as images.

package.json manages startup commands and dependencies.

vite.config.ts manages Vite build configuration.

tsconfig is responsible for TypeScript checks.