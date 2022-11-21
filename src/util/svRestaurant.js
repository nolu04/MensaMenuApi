const getDayObjects = (doc) => {
    let dayNav = doc.getElementsByClassName('day-nav')[0]
    let dayObjects = dayNav.getElementsByTagName('li')
    let days = []

    dayObjects.map((day) => {
        days.push({
            day: day.getElementsByClassName('day')[0].innerHTML,
            date: day.getElementsByClassName('date')[0].innerHTML
        })
    })

    return days
}

const getMenus = (dayDoc) => {
    let menusDoc = dayDoc.getElementsByClassName('menu-item')
    let menus = []
    menusDoc.map((menuDoc) => {
        menus.push(getMenuObject(menuDoc))
    })
    return menus
}

const getMenuObject = (menuDoc) => {
    return ({
        type: menuDoc.getElementsByClassName('menuline')[0].innerHTML,
        title: menuDoc.getElementsByClassName('menu-title')[0].innerHTML.replace(/&shy;/g, ''),
        description: menuDoc.getElementsByClassName('menu-description')[0].innerHTML
            .replace(/<br\/>/g, '') // replaces <br/> tags
            .replace(/\n/g, ' ') // replaces \n (newline)
            .replace(/  /g, ' '), // replaces double whitespace with one whitespace
        prices: getPrices(menuDoc)
    })
}

const getPrices = (menuDoc) => {
    let pricesDoc = menuDoc.getElementsByClassName('price')
    let prices = []
    
    pricesDoc.map((priceDoc) => {
        prices.push({
            type: priceDoc.getElementsByClassName('desc')[0].innerHTML,
            value: priceDoc.getElementsByClassName('val')[0].innerHTML
        })
    })

    return prices
}


module.exports = { 
    getDayObjects,
    getMenuObject,
    getMenus
}