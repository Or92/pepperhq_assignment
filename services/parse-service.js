const titles = require('../resources/titles.json');

class ParseService {
    constructor() {
        this.titles_obj = this.manipulateTitlesData();
    }

    manipulateTitlesData() {
        const obj = {};
        titles.forEach(el => obj[el.id] = el.title);
        return obj;
    }

    parseData(data) {
        return data.categories.map(category => {
            category.products.map(product => {
                if (this.titles_obj[product.id]) {
                    product.title = this.titles_obj[product.id];
                }
                return product;
            });

            return category;
        });
    }
}

const parseService = new ParseService();
module.exports = parseService;