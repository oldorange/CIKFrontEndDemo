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
  - context ([react context](https://reactjs.org/docs/context.html))
  - package.json ( reference packages file )
  - [server.js](#server)
  - [config.json](#config.json)
  
</details>

___
### server

server file is the custom nodejs [server](https://nextjs.org/docs/advanced-features/custom-server) for nextjs SSR.

const file: [config.json](#config.json)

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
### config.json
```json
config file contain dev & prod environment variable:
{
    "development":{
        "constant": {
            "port": 9000,
            "reCaptchaClientKey": "",
            "reCaptchaSecretKey": ""
        },
        "url":{
            "apiHost": "http://localhost",
            "apiPort": 9999
        }
    },
    "production":{
        "constant": {
            "port": 9000,
            "reCaptchaClientKey": "",
            "reCaptchaSecretKey": ""
        },
        "url":{
            "apiHost": "http://localhost",
            "apiPort": 9001
        }
    }
}
```

___
### i18n.js
Internationalize module for [next i18next](https://github.com/isaachinman/next-i18next)

___
### components

components:  use state & props to controll react component

#### footer
render three parts of html elements: MenuList, ResponsiveMenuList and IconMenuList from given json data

MenuList: display in large size device
![image](https://user-images.githubusercontent.com/25421843/76798494-0e473080-67a6-11ea-8f53-e6a2db716137.png)

ResponsiveMenuList: display in small size device
![image](https://user-images.githubusercontent.com/25421843/76798528-228b2d80-67a6-11ea-90b5-681cfd6af5a6.png)

IconMenuList:
![image](https://user-images.githubusercontent.com/25421843/76798555-2fa81c80-67a6-11ea-9116-5454dd924379.png)

#### Header
setting seo data(with translation)  & load initial css link:
```jsx
const Header = ({ t, title, desc }) => (
    <Head>
        <title>{t(title)}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={t(desc)}></meta>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
    </Head>
)
```

#### itemList:
some reusable itemList components with responsive style:
![1584392205(1)](https://user-images.githubusercontent.com/25421843/76799031-253a5280-67a7-11ea-8893-b6907a6c56b4.jpg)
![1584392252(1)](https://user-images.githubusercontent.com/25421843/76799080-3e430380-67a7-11ea-94da-3885780c08c9.jpg)


#### navbar(headline)
contain cbs customer portal entry & switch language function with responsive display

#### navbar(navbar)
hardcoded nav menu with responsive display

#### others(responsiveTable)
React hook controlled component with responsive display.
inline css styling for header/footer height.
example:
With header & footer:
```jsx
    <ResponsiveTable tableList={tableItemList} headerMinHeight={4.5} footerMinHeight={5}></ResponsiveTable>
```
![1584394514(1)](https://user-images.githubusercontent.com/25421843/76801690-84e72c80-67ac-11ea-9e08-bd59ed6a31a8.png)

![1584394564(1)](https://user-images.githubusercontent.com/25421843/76801761-a21bfb00-67ac-11ea-818a-3dbc602ab5d2.png)

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

