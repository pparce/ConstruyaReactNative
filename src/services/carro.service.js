import AppView from "../App-View";
import { store } from "../redux/store";
import ReduxService from "./redux.service";


let instance = null;


export class CarroService {

    constructor() {
        this.actionRedux = null;
        this.cart = {
            items: [],
            total: 0,
            subtotal: 0,
            canal: 'store',
            check_price: 0
        }
        if (ReduxService.instance.getRedux().cart.cart.items) {
            this.cart = ReduxService.instance.getRedux().cart.cart;
        } else {
            this.inicializarCart();
        }
    }
    static get instance() {
        if (instance === null) {
            instance = new CarroService();
        }
        return instance;
    }

    inicializarCart() {
        this.cart = {
            items: [],
            total: 0,
            subtotal: 0,
            canal: 'store',
            check_price: 0
        }
    }

    getCart() {
        return this.cart;
    }

    clearCart() {
        this.inicializarCart();
        this.saveCart();
    }

    setItems(items) {
        this.cart.items = items;
        this.calcularTotal();
    }

    addItemToCart(producto, cantidad, opciones = null) {
        if (this.isAdded(producto.id)) {
            this.buildItemAdded(producto, cantidad);
        } else {
            this.cart.items.push(this.buildItem(producto, cantidad, opciones));
        }
        ReduxService.instance.getRedux().showSnackBar();
        this.calcularSubtotal();
    }

    isAdded(id) {
        return this.cart.items.map((item) => { return item.id }).includes(id);
    }

    getItemPositionById(id = 0) {
        return this.cart.items.map(function (item) { return item.id; }).indexOf(id);
    }

    buildItem(producto, cantidad, opciones = null) {
        return {
            id: producto.id,
            product: producto,
            qty: cantidad,
            product_name: producto.name,
            price: producto.product_pricing.real_price,
            subtotal: this.calcularTotalItem(producto, cantidad),
        };
    }

    buildItemAdded(producto, cantidad) {
        this.cart.items[this.getItemPositionById(producto.id)].cantidad += cantidad;
        this.cart.items[this.getItemPositionById(producto.id)].total += this.calcularTotalItem(producto, cantidad);
        this.cart.items[this.getItemPositionById(producto.id)].total = this.redondear(this.cart.items[this.getItemPositionById(producto.id)].total);
    }

    calcularTotalItem(producto, cantidad = 1) {
        return this.redondear(producto.product_pricing.real_price * cantidad);
    }

    redondear(value) {
        return Math.round(Number(value) * 100) / 100;
    }

    calcularDescuento() {

    }

    removeItem(id) {
        this.cart.items.map(item => {
            return item.id;
        }).indexOf(id)

        this.cart.items = this.cart.items.filter(item => item.id != id);
    }

    calcularSubtotal() {
        var subtotal = 0;
        this.cart.items.forEach(element => {
            subtotal += element.subtotal;
        });
        this.cart.subtotal = this.redondear(subtotal);
        this.saveCart();
    }

    saveCart() {
        ReduxService.instance.getRedux().setCart(this.cart);
    }
}

export default CarroService;