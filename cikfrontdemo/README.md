# CBS Frontend

## Requirements

For development, you will only need Node.js installed on your environement.

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v12.16.1

    $ npm --version
    6.13.6

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `_next` folder.<br>
It correctly bundles Next.js in production mode and optimizes the build for the best performance.

### `npm run start` 
Deploy production app on [http://localhost:9000](http://localhost:9000)

### Reverse Proxy from domain name to localhost on IIS

1. Host empty folder on IIS with {desire domain name}.
2. Set up in/out bound rules by URL Rewrite Module to redirect request/response between localhost:9000 to {desire domain name}<br>

## Demo Project Structure

<details>
  <summary>root</summary>
  - next (build file)
  - node_modules (Installed Dependency Folder)
  - public
    * [locales (translation file folder)](#locales)
    * index.html (Entry Point)
    * favicon.ico (Title icon)
    * [manifest.json](https://developers.google.com/web/fundamentals/web-app-manifest/)
  - components (component modules)
    * contact
  - pages (Pages to served)
    * contact-us
    * home
    * ict
  - src
    * [actions](#actions)
    * [components](#components)
    * images
    * [pages](#pages)
    * [reducers](#reducers)
    * [stores](#stores)
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

components:  use state & props to display data  &&  dispatch actions to change state

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

___
#### pages

pages Folder contains page components that wrapped one or more reuseable componets import from [components](#components) folder

e.g.:  Counter Page wraped Container component and Counter componet
```jsx
import React from 'react';
import { Container } from 'reactstrap';
import Counter from '../../components/Counter/Counter';

const CounterPage = props => {
    return (
        <Container>
            <Counter props />
        </Container>
    );
};
export default CounterPage;
```

___
#### reducers

reducers control how actions will change states

___
#### stores

stores combines all the reducers and create a redux store
