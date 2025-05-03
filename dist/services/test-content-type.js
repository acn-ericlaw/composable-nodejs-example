import { __decorate } from "tslib";
import { preload, EventEnvelope, Logger, AsyncHttpRequest, PostOffice } from 'mercury-composable';
const log = Logger.getInstance();
export class TestContent {
    initialize() {
        return this;
    }
    async handleEvent(evt) {
        const input = new AsyncHttpRequest(evt.getBody());
        log.info("Receiving " + JSON.stringify(evt.getHeaders()));
        if (input.getQueryParameter("test")) {
            const req = new AsyncHttpRequest();
            req.setTargetHost('http://127.0.0.1:8086').setUrl('/api/hello/test').setMethod('GET');
            const po = new PostOffice(evt.getHeaders());
            const event = new EventEnvelope().setTo('async.http.request').setBody(req.toMap());
            const res = po.request(event);
            const resBody = await res;
            console.log(typeof resBody.getBody());
            const x = { "x": resBody.getBody() };
            console.log(typeof x);
            console.log(x);
        }
        return new EventEnvelope().setBody({ "hello": "world" }).setHeader("content-type", "application/x-json");
    }
}
__decorate([
    preload('test.content.type', 50)
], TestContent.prototype, "initialize", null);
