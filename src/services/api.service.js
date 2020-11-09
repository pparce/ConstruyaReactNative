import CookieManager from '@react-native-community/cookies';
import Axios from 'axios';
import { Service } from 'axios-middleware';
import { Keyboard } from 'react-native';
import ReduxService from './redux.service';


let instance = null;
let axio = null;
const CancelToken = Axios.CancelToken;
const source = CancelToken.source();

// const baseUrl = 'http://api.storebow.scoutframe.com/api/v1.0/';
const baseUrl = 'http://192.168.43.228:5000/';
// const baseUrl = 'http://10.0.2.2:5000/';
export const onlineBAseUrl = 'http://api.storebow.scoutframe.com/api/v1.0/';
const header = {
    'Content-Type': 'application/json; charset=utf-8',
    'Tenant-ID': 'construyaalcosto',
    'charset': 'utf-8'
};

class ApiService {
    static BASE_URL = baseUrl;
    static USER = baseUrl + 'posts';
    static IMAGE_BASE_URL = 'http://api.storebow.scoutframe.com/media/';
    static IMAGE_BASE_URL_WITHOUT_MEDIA = 'http://api.storebow.scoutframe.com/';
    static PRODUCTS = 'products/public/';
    static PRODUCTS_MOST_SALED = 'products/public/?_l=7&_t=MOST_SALED';
    static PRODUCTS_ON_SALE = 'products/public/?_l=7&_t=ON_SALE';
    static PRODUCTS_RELATED = 'products/{id}/related/';
    static PRODUCTS_BY_ID = 'products/{id}/public/';;
    static CATEGORIES = 'product/categories/public-all/';
    static PRODUCTS_BY_CATEGORIES = 'product/categories/{id}/public/';
    static LOGIN = 'auth/login/';
    static REGISTRO = 'customers/public/';
    static EDIT_BILLING = 'customer/billing_information/{id}/edit/';
    static EDIT_SHIPPING = 'customer/shipping_information/{id}/edit/';
    static EDIT_ACCES_INFORNATION = 'customers/{id}/login_data/';
    static ORDER = 'orders/';
    static ORDER_NEW = 'orders/public/?_o=NUEVOS/';
    static ORDER_LAST = 'orders/lasts/';
    static ORDER_BY_ID = 'orders/{id}/';
    static ADDRESS = 'customer/addresses/all';
    static EDIT_ADDRESS = 'customer/addresses/{id}/';
    static ADD_ADDRESS = 'customer/addresses/';
    static PAISES = 'core/countries/all/';
    static PROVINCIAS = 'core/states/{id}/country/';
    static CIUDADES = 'core/cities/{id}/state/';

    //FILTROS
    static PRECIO_FILTER = 'products/filters/price/';
    static MANUFACTURER_FILTER = 'setting/manufacturer/filters/';
    static CATEGORIES_FILTER = 'products/filters/categories/';

    //GEOLOCALIZACION
    static BASE_URL_HERE_MAP = 'https://geocode.search.hereapi.com/v1/';
    static API_CODE = 'oHXsvuMnydSp6OBKhvAjKUYW5ugE40T1iJgOi5d87rc';

    constructor() {
        this.baseUrl = baseUrl;
        this.onlineBAseUrl = onlineBAseUrl;
        this.axioConfig = Axios.create({
            baseURL: this.baseUrl,
            timeout: 10000,
            headers: header,
        });
        this.axioConfigPaginator = Axios.create({
            baseURL: this.baseUrl,
            timeout: 10000,
            headers: header,
        });

        const service = new Service(this.axioConfig);
        service.register(new Middleware());
        const servicePaginator = new Service(this.axioConfigPaginator);
        servicePaginator.register(new MiddlewarePaginator());
    }

    static get instance() {
        if (instance === null) {
            instance = new ApiService();
        }
        return instance;
    }

    get(url) {
        url = this.baseUrl + url;
        CookieManager.clearAll()
        return this.axioConfig.get(url);
    }

    getById(url, id) {
        url = this.baseUrl + url + id;
        return this.axioConfig.get(url);
    }

    post(url, data) {
        data = {
            ...data,
            'role': 'CUSTOMER'
        }
        return this.axioConfig({
            url: this.baseUrl + url,
            data: data,
            method: 'post',
        });
    }

    put(url, data) {
        data = {
            ...data,
            'role': 'CUSTOMER'
        }
        return this.axioConfig({
            url: this.baseUrl + url,
            data: data,
            method: 'put',
        });
    }

    delete(url) {
        return this.axioConfig({
            url: this.baseUrl + url,
            method: 'delete',
        });
    }

    all(peticiones = []) {
        return this.axioConfigPaginator.all(peticiones);
    }

    getWithPaginator(url) {
        CookieManager.clearAll()
        return this.axioConfigPaginator.get(url, {
            cancelToken: source.token
        });
    }
    getWwithoutLoading(url) {
        return this.axioConfigPaginator.get(url);
    }

    cancelarBusqueda() {
        return source.cancel();
    }

    _findAddress(address) {
        let url = ApiService.BASE_URL_HERE_MAP + 'geocode?q=' + address + '&apiKey=' + ApiService.API_CODE;
        return Axios.get(url);
    }

    _findAddressByCoordinates = (latitude, longitude) => {
        let url = ApiService.BASE_URL_HERE_MAP + 'geocode?q=' + address + '&apiKey=' + ApiService.API_CODE;
        return Axios.get(url);
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

    // onResponseError(error) {
    //     /* this.peticiones = this.peticiones.filter(item => item.url != config.url);
    //     this.peticionesConError.push(config); */
    //     ReduxService.instance.getRedux().hideLoading();
    //     /* if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
    //         ReduxService.instance.getRedux().showErrorConnectionDialog({
    //             action: this.retryRequest,
    //             params: config
    //         });
    //     } */
    //     return error;
    // }

    retryRequest = (config) => {
        this.peticionesConError.forEach(element => {
            Axios.request(element).catch((error) => {
            });
        });
        this.peticionesConError = [];
    }

    onRequest(config) {
        if (config.url != 'http://api.storebow.scoutframe.com/api/v1.0/auth/login/') {
            Keyboard.dismiss();
            let login = ReduxService.instance.getRedux().login;
            if (login.isLogin) {
                config.headers = {
                    ...config.headers,
                    Authorization: ('JWT ' + login.login.token),
                    'X-User': login.login.id
                }
            }
            ReduxService.instance.getRedux().showLoading();
        }
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

class MiddlewarePaginator {
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
        /* ReduxService.instance.getRedux().hideLoading();
        if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
            ReduxService.instance.getRedux().showErrorConnectionDialog({
                action: this.retryRequest,
                params: config
            });
        } */
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
                'X-User': login.login.id
            }
        }
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