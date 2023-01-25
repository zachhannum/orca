<div align="center">

  <img src="assets/icon.png" alt="logo" width="200" height="auto" />
  <h1>Calamus</h1>
  
  <p>
    Write and Publish Novels With Ease
  </p>
    
  [![Build and Test](https://github.com/midnightprioriem/calamus/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/midnightprioriem/calamus/actions/workflows/build-and-test.yml)
  [![Release](https://github.com/midnightprioriem/calamus/actions/workflows/release.yml/badge.svg)](https://github.com/midnightprioriem/calamus/actions/workflows/release.yml)
  <a href="https://github.com/midnightprioriem/calamus/releases"><img src="https://img.shields.io/github/release/midnightprioriem/calamus.svg" alt="github release version"></a>
  <a href="https://github.com/midnightprioriem/calamus/releases"><img src="https://img.shields.io/github/downloads/midnightprioriem/calamus/total.svg" alt="github release downloads"></a>

  <img width="1391" alt="app" src="assets/app_preview.png">

  
</div>
  


<br />

<!-- About the Project -->
## :star2: About the Project

Calamus is a React Electron application for writing and publishing novels.

<!-- Features -->
### :dart: Features

Calamus is currently still in pre-alpha stages---not all features are available. For a feature roadmap, please visit our <a href="https://github.com/midnightprioriem/calamus/projects/2" target="_blank">Project Board</a>.

#### 🖊️ Write Your Next Novel

Calamus has what you need to organize and write your next novel. Organize your project into folders and use Markdown to make writing a breeze.

https://user-images.githubusercontent.com/6120081/172926916-38874b37-d46b-4995-8378-2fb09e563f38.mp4

#### 👐 Open Format

Calamus stores all of your project data in a human readable json format. In addition, all book content is written using Markdown, making all of your work truly portable. You can export all of your book's content into markdown files at any time.

https://user-images.githubusercontent.com/6120081/172928356-98c0f824-c98c-47cb-83b2-14ae3df1077b.mp4

##### .cala Format

<details>

Calamus project files use the `.cala` file extension, but are really just `json` files (yes this means you can edit `.cala` files by hand, but it is not recommended!). See below for a table detailing the properties inside of a `.cala` file.

| Property Name | Description                                                                      |
|---------------|----------------------------------------------------------------------------------|
| bookTitle    	| The novel's title.                                                           	   |
| bookSubTitle 	| YThe novel's sub title. This is an optional property.                        	   |
| authorName   	| The novel's author name.                                                     	   |
| seriesName   	| The name of the series the novel is a part of. This is an optional property. 	   |
| ISBN         	| The novel's ISBN number.                                                     	   |
| language     	| The language the novel is written in.                                        	   |
| publisher    	| The name of the novel's publisher.                                           	   |
| content      	| Array containing the novel's content. See a table detailing the `Section` below. |

The content property contains a JSON array of the `Section` object type, detailed below.

| Property Name   | Description                                                                                                 |
|-----------------|-------------------------------------------------------------------------------------------------------------|
| id            	| The name of the section. Appears as the name in the project sidebar. **Must be unique**.    	              |
| content       	| Minified string of markdown content. Newlines are replaced with `\n` and `"` with `\"`.   	                |
| type          	| Section type. One of 4 values: `folder`, `maincontent`, `frontmatter`, `backmatter`.        	              |
| canHaveChildren | `true` or `false` value indicating whether the Section can have children. Only valid for `folder` sections.	|
| children      	| A JSON array of `Section[]`. Only valid for `folder` sections.                                             	|
| collapsed     	| `true` or `false` value indicating whether then section is collapsed. Only valid for `folder` sections.    	|


</details>


#### 📕 Print-ready PDF and EBook

Calamus is equipped to format your novel for Print and Ebook publication, with pre-made themes and endless customization.

https://user-images.githubusercontent.com/6120081/172929343-21c5411f-2e3e-4b0d-9c42-8e9a98dee466.mp4

https://user-images.githubusercontent.com/6120081/172929360-425be8b4-3f57-43f6-9dd9-4e84905a99ae.mp4

<!-- Installation -->
## :gear: Installation

Download the [latest release here](https://github.com/midnightprioriem/calamus/releases).



## ⌨️ Contributing 

<details>

### 📜 Contribution Guidelines

TODO

<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/midnightprioriem/calamus.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install
```

Start the app

```bash
  yarn start
```

<!-- Running Tests -->
### :test_tube: Running Tests

To run tests, run the following command

```bash
  yarn test
```

</details>

<!-- Acknowledgments -->
## :gem: Acknowledgements

 - [⚡ Electron](https://www.electronjs.org/)
 - [⚛️ React](https://reactjs.org/)
 - [🏗️ Electron React Boilerplate](https://electron-react-boilerplate.js.org/)
 - [📝 Codemirror](https://codemirror.net/6/)
 - [💅 Styled Components](https://styled-components.com/)
 - [🐻 Zustand](https://github.com/pmndrs/zustand)
 - [📖 pagedjs](https://pagedjs.org/)
 - [🌳 Unified (rehype, remark)](https://unifiedjs.com/)
 - [👆 dnd kit](https://dndkit.com/)
