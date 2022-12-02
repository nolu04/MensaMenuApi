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
            res.send({ error: `There is no endpoint for the mensa '${name}'` })
            break
    }
}

/**
 * Gets all available mensas
 * @param {*} req the request object
 * @param {*} res the result object to send the reponse to
 */
const getAll = (req, res) => {
    axios
        .get('https://bits-and-beiz.sv-restaurant.ch/de/menuplan/persrest-data.json')
        .then(result => {
            try {
                // Reads the items
                let items = result.data.items;

                // Maps the objects in the array to a new object
                items = items.map(x => ({
                    name: x.name,
                    address: getAddressObject(x.address),
                    link: x.link
                }));

                // Sends the items to the client
                res.send(items);
            } catch (error) {
                res.status(500);
                res.send({ error: 'Error while processing the data from the mensa website' })
            }

        })
        .catch(error => { // Catches all error while fetching the data from the mensa website
            console.log(error);
            console.log(error.data);
            res.status(502)
            res.send({ error: 'Error while fetching data from the mensa website' })
        });
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
                res.send({ error: 'Error while processing the data from the mensa website' })
            }


        })
        .catch(error => { // Catches all error while fetching the data from the mensa website
            console.log(error);
            console.log(error.data);
            res.status(502)
            res.send({ error: 'Error while fetching data from the mensa website' })
        });
}

/**
 * Parse a address string to a address object
 * @param {string} address The address string
 * @returns a address object
 */
const getAddressObject = (address) => {
    let array = address.split('\n');

    switch (array.length) {
        case 2:
            array = ['', array[0], array[1]];
            break;
        case 1:
            return {
                postalCode: '',
                city: '',
                street: ''
            };
        case 0:
            return {
                postalCode: '',
                city: '',
                street: ''
            };
    }

    let street = array[1];

    let postalCode = array[2].split(' ')[0];
    let city = array[2]
        .split(' ')
        .slice(1)
        .join(' ');

    return {
        postalCode: postalCode,
        city: city,
        street: street
    }
}

module.exports = {
    get,
    getAll
}