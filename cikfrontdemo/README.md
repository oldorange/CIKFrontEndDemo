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
    
  - .next (build file)
  - node_modules (Installed Dependency Folder)
  - public/static
    - images (for images without language preference, set image path under 'en' subfolder)
      * en
      * fr
      * zh
      * icons
    - locales (translation file folder)
      * en
      * fr
      * zh
    * favicon.ico (Title icon)
    * variables.scss (shared scss const value)
    * styleFunctions.scss (sharded scss util function)
  - [components (component modules)](#components)
    * footer
    * header
    * itemLists
    * navbar
    * others
    * slideShow
    * reCaptcha
  - [pages](#pages) (Pages to served)
    * [layout.js](#layout) (all pages wrap their content with this page component)
    * _error.js (futhur 404 page)
    * _app.js (frontend startup page)
    * contact-us
    * home
    * ict
    * internet
    * phone
    * sd-wan
    * support
    * tos
  - package.json ( reference packages file )
  - [server.js](#server)
  
</details>

___
### server

server file is the custom nodejs [server](https://nextjs.org/docs/advanced-features/custom-server) for nextjs SSR.

Routing 1:
Fix icon fetch error in production.
```jsx
    server.get('/favicon.ico', (req, res) => (
        res.status(200).sendFile('favicon.ico', { root: __dirname + '/public/static/' })
    ));
```

Routing 2:
i18n middleware init.
```jsx
    const nextI18NextMiddleware = require('next-i18next/middleware').default
    const nextI18next = require('./i18n')
    await nextI18next.initPromise
    server.use(nextI18NextMiddleware(nextI18next));
```

Routing 3:
MultiLanguages switch auto fetch pages under current language 404 fixed:
```jsx
   server.get('/_next/static/*/pages/zh.js', (req, res) => {
    return res.sendStatus(200);
   });

   server.get('/_next/static/*/pages/zh/*', (req, res) => {
     return res.sendStatus(200);
   });
```

Routing 4:
Contact us form api
```jsx
    server.post('/api/contactForm', (req, res) => {
    const internalError = {meta:{code:-500, code_description: "Internal Server Error"}};
    const badRequestError = {meta:{code:-400, code_description: "Bad Request bb"}};
    try{
      if(req.body.token){
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${config.constant.reCaptchaSecretKey}&response=${req.body.token}`;
        axios.post(url).then((ReCaptCharesponse) => {
          if(ReCaptCharesponse.data.success){
            axios.post(apiHost + ":" + apiport + "/api/Contact/SendContactEmail", req.body).then((APIResponse) => {
              return res.json(APIResponse.data);
            }).catch((error) => {
              return res.json(internalError);
            });
          };
        }).catch((err) => {
          return res.json(internalError);
        });
      }
      else{
        return res.json(badRequestError);
      }
    }catch(e){
      console.log('Catch an error: ', e);
      return res.json(internalError);
    }
  });
```



___
### components

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
### pages

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
### reducers

reducers control how actions will change states

___
### stores

stores combines all the reducers and create a redux store
