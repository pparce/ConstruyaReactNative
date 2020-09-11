import axio from 'axios';

// const baseUrl = 'https://jsonplaceholder.typicode.com/';
// export const baseUrl = 'http://api.storebow.scoutframe.com/api/v1.0/';
// export const baseUrl = 'http://10.0.2.2:5000/';
export const baseUrl = 'http://192.168.43.228:5000/'; 
const header = {
    'Content-Type': 'application/json; charset=utf-8',
    'Tenant-ID': 'construyaalcosto',
    'charset': 'utf-8'
};

class Request {
    USER = baseUrl + 'posts';
    PRODUCTS_MOST_SALED = 'products/public/?_l=7&_t=MOST_SALED';
    PRODUCTS_ON_SALE = 'products/public/?_l=7&_t=ON_SALE';
    PRODUCTS_RELATED = "products/{id}/related/";
    IMAGE_BASE_URL = 'http://api.storebow.scoutframe.com/media/';
    CATEGORIES = 'product/categories/public-all/';
    PRODUCTS_BY_CATEGORIES = 'product/categories/{id}/public/';

    constructor(url) {
        this.baseUrl = baseUrl;
        this.request = axio.create({
            baseURL: this.baseUrl,
            timeout: 1000,
            headers: header
        });
    }

    get(url) {
        url = this.baseUrl + url
        return this.request({ url: url });
    }

    getById(id) {
        const url = this.url + id;
        return this.request({ url: url });
    }

    post(url, value) {
        return this.request({
            url: url,
            data: value,
            method: 'post'
        });
    }

    buildUrlById(url = '', id) {
        return url.replace('{id}', id);
    }
}

export default Request;