# Mensa <span style="color:rgb(255, 119, 171)">Buddy</span> Api

This is a Api to fetch the menu plans of mensas. The Api is built with [NodeJS](https://nodejs.org/) and [express](https://github.com/expressjs/express).

## Run in development mode

```bash
# Install dependencies
npm i
# Run developement mode
npm run dev
```

*Note that [Nodemon](https://www.npmjs.com/package/nodemon) is active when you run the project in development. Nodemon restarts the nodeserver after changes have been made.*

### Fiddler

You can run the project with fiddler. To run it with fiddler, use following npm-script command:

```bash
# Run in developement mode with fiddler
npm run dev-fiddler
```

You can modify the fiddler config [here](src/config/fiddler-config.js). 

*Note that you have to enable the protocol **tls1.2** in fiddler -> tools -> options -> https*


## Run in production mode
```bash
# Install dependencies
npm i
# Run developement mode
npm run start
```

## Api Endpoints

### GET /api/mensas/menuplan/{website}

Gets the menu plans of a mensa, which is identified by the param 'website'

|Name |Type  | Description|
--- | --- | --- |
| `website` | string | The subdomain of the mensa E.g "bits-and-beiz" |

**Response - Status 200**

<details>
<summary>Description</summary>

- `body`: An array with objects
    - `day`: Abrevation of the day e.g friday -> FR
    - `date`: Date in the format DD.MM. e.g 20.07
    - `menus`: An array with the menu-objects
        - `type`: The type of the menu e.g 'Postino' or 'Green', can be empty
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

This error may occur while processing the data from the mensa-website. (E.g the website structure of the mensa changed).

**Response Status 502**

This error may occur, when the mensa-website is unavailable or return an error.

</br>

### GET /api/mensas

Gets all available mensas

**Response - Status 200**

<details>
<summary>Description</summary>

- `body`: An array with objects
    - `name`: The name of the mensa. E.g "Restaurant bits&beiz"
    - `address`: A object of the address of the mensa (can have empty attributes)
        - `postalCode`: The postal-code of the address
        - `city`: The city name of the address
        - `street`: The street of the address (with houses number)
    - `link`: The link of the website (can be a empty string)

</details>
</br>

  **Example**

```
[
    {
        "name": "string",
        "address": {
            "postalCode": "string",
            "city": "string",
            "street": "string"
        }
        "link": "string"
    }
]
```

**Response Status 500**

This error may occur while processing the data from the mensa-website. (E.g the response structure of the api changed).

**Response Status 502**

This error may occur, when the mensa-website is unavailable or return an error.
