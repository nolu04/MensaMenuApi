const axios = require('axios');
const DomParser = require('dom-parser');
const { getDayObjects, getMenus } = require('../util/svRestaurant');

const get = (req, res) => {

    let name = req.params.name

    switch (name) {
        case 'engehalde':
            getEngehalde(req, res)
            break

        case 'zollikofen':
            getZollikofen(req, res)
            break

        case 'wankdorf':
            getWankdorf(req, res)
            break

        case 'zofingen':
            getZofingen(req, res)
            break

        default:
            res.status(404)
            res.send({error: `There is no endpoint for the mensa '${name}'`})
            break
    }
}

const getEngehalde = (req, res) => {
    const mensaUrl = 'https://restaurant-engehalde.sv-restaurant.ch/de/menuplan/'
    getSVRestaurant(req, res, mensaUrl)
}

const getZollikofen = (req, res) => {
    const mensaUrl = 'https://bits-and-beiz.sv-restaurant.ch/de/menuplan/'
    getSVRestaurant(req, res, mensaUrl)
}

const getWankdorf = (req, res) => {
    const mensaUrl = 'https://restaurant-espace.sv-restaurant.ch/de/menuplan/'
    getSVRestaurant(req, res, mensaUrl)
}

const getZofingen = (req, res) => {
    const mensaUrl = 'https://panaroma-elements.sv-restaurant.ch/de/menuplan/'
    getSVRestaurant(req, res, mensaUrl)
}

const getSVRestaurant = (req, res, mensaUrl) => {

    axios
        .get(mensaUrl)
        .then(result => {
            if (result.status !== 200) {
                console.error(`Statuscode for ${mensaUrl} was not 200`);
                throw Error(`Statuscode for ${mensaUrl} was not 200`)
            }

            try {
                // Convert the HTML string into a document object
                let parser = new DomParser();
                let doc = parser.parseFromString(result.data, 'text/html');
                
                let days = doc.getElementsByClassName('menu-plan-grid')
                let response = []
    
                days.map((day, index) => {
    
                    let dayObjects = getDayObjects(doc)
    
                    response.push({
                        day: dayObjects[index].day,
                        date: dayObjects[index].date,
                        menus: getMenus(day)
                    })
                })
                res.send(response)

            } catch (error) { // Catches all errors while processing the data of the website
                console.error('Error while processing the data from the mensa website');
                console.error(error);
                res.status(500)
                res.send({error: 'Error while processing the data from the mensa website'})
            }

            
        })
        .catch(error => { // Catches all error while fetching the data from the mensa website
            console.log(error);
            console.log(error.data);
            res.status(500)
            res.send({error: 'Error while fetching data from the mensa website'})
        });
}

module.exports = {
    get
}