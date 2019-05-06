# CIK Frontend Demo

## Requirements

For development, you will only need Node.js installed on your environement.

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v10.15.13

    $ npm --version
    6.7.0

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

___

## Demo Project Structure

<details>
  <summary>root</summary>

  - node_modules (Installed Dependency Folder)
  - public
    * [locales (translation file folder)](#locales)
    * index.html (Entry Point)
    * favicon.ico (Title icon)
    * [manifest.json](https://developers.google.com/web/fundamentals/web-app-manifest/)
  - src
    * [actions](#actions)
    * [components](#components)
    * [images](#images)
    * [pages](#pages)
    * [reducers](#reducers)
    * [store](#store)
  - package.json ( App Setting File )
</details>

___
#### actions

actions folder contains all the server-connected functions in this app.

 - const.js export all the const variable for server connections:
   ```js
      export const request_URI = "https://localhost:44344/gql";
   ```

 - index.js combine & export all the actions into one file.

___
#### components

basic reuseable components example:
- Footer (Folder)
    * Footer.css
    * Footer.js
        ```jsx
        import React from 'react';
        import './Footer.css';
        const Footer = () => {
            return (
                <div className="footer">
                    <div className="container">
                        <span className="text-muted">Copyright ©2019. All Right Reserved By</span> CIKTELECOM 
                    </div>
                    <br />
                </div>
            );
        }
        export default Footer;
        ```







