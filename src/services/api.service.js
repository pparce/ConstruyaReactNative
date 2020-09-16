import Axios from 'axios';
import { Service } from 'axios-middleware';
import { connect } from 'react-redux';
import { showLoading, hideLoading } from '../redux/app/actions';


let instance = null;
let axio = null;

// const baseUrl = 'https://jsonplaceholder.typicode.com/';
export const onlineBAseUrl = 'http://api.storebow.scoutframe.com/api/v1.0/';
export const baseUrl = 'http://10.0.2.2:5000/';
// const baseUrl = 'http://192.168.43.228:5000/';
const header = {
    'Content-Type': 'application/json; charset=utf-8',
    'Tenant-ID': 'construyaalcosto',
    'charset': 'utf-8'
};

class ApiService {
    static USER = baseUrl + 'posts';
    static IMAGE_BASE_URL = 'http://api.storebow.scoutframe.com/media/';
    static PRODUCTS_MOST_SALED = 'products/public/?_l=7&_t=MOST_SALED';
    static PRODUCTS_ON_SALE = 'products/public/?_l=7&_t=ON_SALE';
    static PRODUCTS_RELATED = "products/{id}/related/";
    static PRODUCTS_BY_ID = "products/{id}/public/";;
    static CATEGORIES = 'product/categories/public-all/';
    static PRODUCTS_BY_CATEGORIES = 'product/categories/{id}/public/';

    constructor() {
        this.baseUrl = baseUrl;
        this.onlineBAseUrl = onlineBAseUrl;
        this.request = Axios.create({
            baseURL: this.onlineBAseUrl,
            timeout: 1000,
            headers: header
        });

        const service = new Service(this.request);
        service.register(new Middleware());
    }

    static get instance() {
        if (instance === null) {
            instance = new ApiService();
        }
        return instance;
    }


    async get(url) {
        url = this.baseUrl + url;
        console.log(url);
        return this.request.get(url);
    }

    async getById(url, id) {
        url = this.baseUrl + url + id;
        return this.request.get(url);
    }

    async post(url, value) {
        return this.request({
            url: url,
            data: value,
            method: 'post',
        });
    }

    getAxio() {
        return axio;
    }

    changeBaseUrl() {
        this.baseUrl = onlineBAseUrl;
    }

    buildUrlById(url = '', id) {
        return url.replace('{id}', id);
    }
}

class Middleware {
    constructor() {
        this.peticiones = [];
        if (typeof Middleware.instance === 'object') return Middleware.instance;
        Middleware.instance = this;
    }
    onResponse(response) {
        response = JSON.parse(response.data);
        return response;
    }

    onRequest(config) {
        return config;
    }

    onSync(promise) {
        return promise;
    }
}

export default ApiService;