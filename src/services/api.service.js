import Axios from 'axios';
import { Service } from 'axios-middleware';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { showLoading, hideLoading } from '../redux/app/actions';
import ReduxService from './redux.service';


let instance = null;
let axio = null;

const baseUrl = 'http://api.storebow.scoutframe.com/api/v1.0/';
// const baseUrl = 'http://10.0.2.2:5000/';
// const baseUrl = 'http://192.168.43.228:5000/';
export const onlineBAseUrl = 'http://api.storebow.scoutframe.com/api/v1.0/';
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
    static LOGIN = 'auth/login/';
    static REGISTRO = 'customers/public/';
    static EDIT_BILLING = 'customer/billing_information/{id}/edit/';
    static EDIT_SHIPPING = 'customer/shipping_information/{id}/edit/';
    static EDIT_ACCES_INFORNATION = 'customers/{id}/login_data/';
    static ORDER = 'orders/';
    static ORDER_LAST = 'orders/public/?_o=NUEVOS/';
    static ORDER_BY_ID = 'orders/{id}/';
    static PAISES = "core/countries/all/";
    static PROVINCIAS = "core/states/{id}/country/";
    static CIUDADES = "core/cities/{id}/state/";

    constructor() {
        this.baseUrl = baseUrl;
        this.onlineBAseUrl = onlineBAseUrl;
        this.axioConfig = Axios.create({
            baseURL: this.baseUrl,
            timeout: 1000,
            headers: header,
        });

        const service = new Service(this.axioConfig);
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
        return this.axioConfig.get(url);
    }

    async getById(url, id) {
        url = this.baseUrl + url + id;
        return this.axioConfig.get(url);
    }

    async post(url, data) {
        data = {
            ...data,
            'role': 'CUSTOMER'
        }
        return this.axioConfig({
            url: url,
            data: data,
            method: 'post',
        });
    }

    getAxio(config) {
        return config;
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
        this.peticionesConError = [];
        if (Middleware.instance === 'object') return Middleware.instance;
        Middleware.instance = this;
    }
    onResponse(response) {
        this.peticiones = this.peticiones.filter(item => item.url != response.config.url);
        if (this.isTheLastRequest()) {
            ReduxService.instance.getRedux().hideLoading();
        }
        response = JSON.parse(response.data);
        return response;
    }

    onResponseError({ config }) {
        this.peticiones = this.peticiones.filter(item => item.url != config.url);
        this.peticionesConError.push(config);
        ReduxService.instance.getRedux().hideLoading();
        if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
            ReduxService.instance.getRedux().showErrorConnectionDialog({
                action: this.retryRequest,
                params: config
            });
        }
        return config;
    }

    retryRequest = (config) => {
        this.peticionesConError.forEach(element => {
            Axios.request(element).catch((error) => {
            });
        });
        this.peticionesConError = [];
    }

    onRequest(config) {
        Keyboard.dismiss();
        let login = ReduxService.instance.getRedux().login;
        if (login.isLogin) {
            config.headers = {
                ...config.headers,
                Authorization: ('JWT ' + login.login.token),
                'X-User': login.login.customer.user.id
            }
        }
        ReduxService.instance.getRedux().showLoading();
        console.log(config);
        this.peticiones.push(config);
        return config;
    }

    onSync(promise) {
        return promise;
    }

    isTheLastRequest() {
        return this.peticiones.length ? false : true;
    }
}

export default ApiService;