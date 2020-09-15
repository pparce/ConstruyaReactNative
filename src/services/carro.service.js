import AppView from "../App-View";
import { store } from "../redux/store";


let instance = null;


export class CarroService {

    constructor() {
        this.actionRedux = null;
        this.cart = {
            items: [],
            total: 0,
            subtotal: 0,
        }
    }
    static get instance() {
        if (instance === null) {
            instance = new CarroService();
        }
        return instance;
    }

    setActionRedux(actionRedux) {
        this.actionRedux = actionRedux;
        if (actionRedux.cart.cart.items) {
            this.cart = actionRedux.cart.cart;
            console.log(this.cart);
        } else {
            this.inicializarCart()
        }

    }

    getActionRedux() {
        this.actionRedux.setCarroCompras(this.cart);
        return this.actionRedux;
    }

    inicializarCart() {
        this.cart = {
            items: [],
            total: 0,
            subtotal: 0,
        }
    }

    getCart() {
        return this.cart;
    }

    clearCart() {
        this.inicializarCart();
        this.saveCart();
    }

    addItemToCart(producto, cantidad, opciones = null) {
        if (this.isAdded(producto.id)) {
            this.buildItemAdded(producto, cantidad);
        } else {
            this.cart.items.push(this.buildItem(producto, cantidad, opciones));
        }
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
            producto: producto,
            cantidad: cantidad,
            total: this.calcularTotalItem(producto, cantidad),
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
            subtotal += element.total;
        });
        this.cart.subtotal = this.redondear(subtotal);
        this.saveCart();
    }

    saveCart() {
        this.actionRedux.setCart(this.cart);
    }
}

export default CarroService;