
let instance = null;

class ReduxService {

    constructor() {
        this.redux = null;
    }

    getRedux() {
        return this.redux;
    }

    setRedux(redux) {
        this.redux = redux;
    }

    static get instance() {
        if (instance === null) {
            instance = new ReduxService();
        }
        return instance;
    }
}
export default ReduxService;