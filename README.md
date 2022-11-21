# Mensa Menu Api

This is a Api to fetch the menu plans of mensas. The Api is built with [NodeJS](https://nodejs.org/) and [express](https://github.com/expressjs/express).

## Run in development mode

```bash
# Install dependencies
npm i
# Run developement mode
npm run dev
```

*Note that [Nodemon](https://www.npmjs.com/package/nodemon) is active when you run the project in development. Nodemon restarts the nodeserver after changes have been made.*

## Run in production mode
```bash
# Install dependencies
npm i
# Run developement mode
npm run start
```

## Api Endpoints

### GET /api/mensa/{name}

Gets the menu plans of a mensa, which is identified by the param 'name'

|Name |Type  | Description|
--- | --- | --- |
| `name` | string | The name of the mensa. Valid values: 'engehalde', 'zollikofen', 'wankdorf', 'zofingen' |

**Response - Status 200**

<details>
<summary>Description</summary>

- `body`: An array with objects
    - `day`: Abrevation of the day e.g friday -> FR
    - `date`: Date in the format DD.MM. e.g 20.07
    - `menus`: An array with the menu-objects
        - `type`: The type of the menu e.g 'Postino' or 'Green'
        - `title`: -
        - `description`: -
        - `prices`: An array with the prices of the menu
            - `type`:  Contains one of the values 'EXT', 'INT' or 'CHF' (When INT price and EXT price are the same) 
            - `value`: The price in CHF

</details>
</br>

  **Example**

```
[
    {
        "day": "string",
        "date": "string",
        "menus": [
            {
                "type": "string",
                "title": "string",
                "description": "string",
                "prices": [
                    {
                        "type": "string",
                        "price": 0
                    }
                ]
            }
        ]
    }
]
```

**Response Status 500**

This error may occur while processing the data from the mensa-website. (E.g the website structure of the mensa changed)

