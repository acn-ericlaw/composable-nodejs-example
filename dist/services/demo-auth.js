import { __decorate } from "tslib";
import { preload, AsyncHttpRequest, Logger } from 'mercury-composable';
const log = Logger.getInstance();
export class DemoAuth {
    initialize() {
        return this;
    }
    async handleEvent(evt) {
        const req = new AsyncHttpRequest(evt.getBody());
        const method = req.getMethod();
        const url = req.getUrl();
        log.info(`${method} ${url} authenticated`);
        // this is a demo so we approve all requests
        return true;
    }
}
__decorate([
    preload('v1.api.auth')
], DemoAuth.prototype, "initialize", null);
