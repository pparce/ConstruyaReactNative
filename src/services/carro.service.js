import AppView from "../App-View";
import { store } from "../redux/store";
import Utiles from "../utiles/funciones_utiles";
import ReduxService from "./redux.service";


let instance = null;


export class CarroService {

    constructor() {
        this.actionRedux = null;
        this.cart = {
            items: [],
            total: 0,
            subtotal: 0,
            canal: 'STORE',
            discount: 0,
            channel_references: [],
            check_price: 0,
            facturacion: "CONSUMIDOR_FINAL"
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
            canal: 'STORE',
            discount: 0,
            shipping: 0,
            channel_references: [],
            check_price: 0,
            facturacion: "CONSUMIDOR_FINAL"
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
        ReduxService.instance.getRedux().showSnackBarCart();
        this.saveCart();
    }

    editItem(item, qty) {
        this.cart.items[this.findItem(item)] = this.buildItem(item.product, qty);
        this.saveCart()
    }

    removeItem(item) {
        this.cart.items = this.cart.items.filter(element => element != this.cart.items[this.findItem(item)])
        // this.cart.items.splice(this.findItem(item), 1);
        console.log(this.cart.items);
        this.saveCart();
        return this.cart.items.length;
    }

    isAdded(id) {
        return this.cart.items.map((item) => { return item.id }).includes(id);
    }

    getItemPositionById(id = 0) {
        return this.cart.items.map(function (item) { return item.id; }).indexOf(id);
    }

    buildItem(producto, cantidad, opciones = []) {
        return {
            id: producto.id,
            product: producto,
            qty: cantidad,
            product_name: producto.name,
            options: opciones,
            price: producto.product_pricing.real_price,
            subtotal: this.calcularTotalItem(producto, cantidad),
        };
    }

    buildItemAdded(producto, cantidad) {
        this.cart.items[this.getItemPositionById(producto.id)].qty += cantidad;
        this.cart.items[this.getItemPositionById(producto.id)].subtotal += this.calcularTotalItem(producto, cantidad);
        this.cart.items[this.getItemPositionById(producto.id)].total = Utiles._redondearValorDecimal(this.cart.items[this.getItemPositionById(producto.id)].total);
    }

    calcularTotalItem(producto, cantidad = 1) {
        let discount = this.calcularDescuento(producto, cantidad);
        return Utiles._redondearValorDecimal(producto.product_pricing.real_price * cantidad - discount)
    }

    calcularDescuento(producto, cantidad) {
        let discount = 0;
        let precio = producto.product_pricing.real_price;
        if (producto.product_product_discount) {
            for (let index = 0; index < producto.product_product_discount.length; index++) {
                let range = producto.product_product_discount[index];
                if (cantidad >= range.min_qty && cantidad <= range.max_qty) {
                    discount = range.discount;
                    if (range.percentage) {
                        discount = this.round(precio * range.discount / 100);
                    }
                    break;
                }
            }
        }
        return discount;
    }

    /* removeItem(id) {
        this.cart.items.map(item => {
            return item.id;
        }).indexOf(id)

        this.cart.items = this.cart.items.filter(item => item.id != id);
    } */

    calcularSubtotal() {
        var subtotal = 0;
        this.cart.items.forEach(element => {
            subtotal += element.subtotal;
        });
        this.cart.subtotal = Utiles._redondearValorDecimal(subtotal);
    }

    saveCart() {
        this.calcularSubtotal()
        ReduxService.instance.getRedux().setCart(this.cart);
    }

    findItem(item) {
        let position = this.cart.items.map((element) => { return element.id }).indexOf(item.id);
        return position;
    }

    round(value) {
        return Math.round(Number(value) * 100) / 100;
    }
}

export default CarroService;