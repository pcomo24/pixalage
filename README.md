# Pixalage

![screen shot 2017-07-19 at 7 50 06 pm](https://user-images.githubusercontent.com/25998142/28395709-9784cf58-6cbb-11e7-8f59-33871ba7c99d.png)

Pixalage is a personal project i created while attending DigitalCrafts Coding Bootcamp.  The goal of this project was mainly to allow me to
get familiar with React.  The app is built using React and the Pixabay API.  It creates an API query based on user selected inputs(color, category,
colorScheme) and returns a 'collage' of images that match the query.

## Getting Started

Once You fork and clone the repository, you should install the dependencies and replace the API Key constant in app.js with your own Pixabay API key.

### Pixabay API

1.) Create an account at pixabay.com 

2.) Go to pixabay.com/api/docs/

3.) On this page if you scroll down you will find your API key, along with the API documentation.

### Installation

1.) Fork this repository by clicking button in upper right
2.) Clone the fork to your machine

From the command line

```
git clone https://github.com/YOUR-USERNAME/pixalage.git
```

3.) Once cloned change directory into the pixalage root

```
cd pixalage
```
4.) Then install dependencies

```
npm install
```
5.) Once installed start create-react-app with

```
npm start
```
6.) The app will open a new tab/window in your browser hosted on your local server

### Outcome
Beyond becoming familiar with React, this project forced me to grow as a JavaScript Web Developer in general.
I didn't have a vision for how I would implement all the features when i started the project, but this forced me to expand my toolset, 
and my thinking, in ways I otherwise may not have.
#### High Points
* I figured out how to pass properties/state in all directions (parent => child, child => parent, and sibling => sibling)
* Created an algorithm to represent color scheme options on a color wheel (monochrome, complementary, analogous)
* Gained more useful knowledge and experience with es6 syntax (templates, arrow functions)
* Gained more applicable experience using a lot of built-ins and operations that I haven't been using outside of class exercises

### Stretch Goals
* Have a better solution when queries dont return enough images for the collage size
* Use a UI library to rebuild the app and make it mobile responsive
* Incorporate more styling along with UI library theming

## Acknowledgments

* Pixabay API
