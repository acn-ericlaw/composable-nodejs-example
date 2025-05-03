import { __decorate } from "tslib";
import { AppException, MultiLevelMap, preload, Utility, CryptoApi, PostOffice } from "mercury-composable";
const util = new Utility();
const crypto = new CryptoApi();
export class DecryptFields {
    initialize() {
        return this;
    }
    async handleEvent(evt) {
        const input = evt.getBody();
        const protectedFields = input['protected_fields'];
        const key = input['key'];
        if (!protectedFields) {
            throw new AppException(400, "Missing protected_fields");
        }
        if (!key) {
            throw new AppException(400, "Missing key");
        }
        if (!(key instanceof Buffer)) {
            throw new AppException(400, "key must be byte array");
        }
        const dataset = input['dataset'];
        if (!dataset) {
            throw new AppException(400, "Missing dataset");
        }
        // IMPORTANT:
        // Since composable function's handleEvent scope is isolated,
        // we must obtain the class instance to access private functions
        const po = new PostOffice(evt.getHeaders());
        const self = po.getMyClass();
        // select the fields to encrypt
        const multiLevels = new MultiLevelMap(dataset);
        const fields = util.split(input['protected_fields'], ", ");
        for (const f of fields) {
            if (multiLevels.exists(f)) {
                const cipherText = util.base64ToBytes(String(multiLevels.getElement(f)));
                multiLevels.setElement(f, self.decryptField(cipherText, key));
            }
        }
        return multiLevels.getMap();
    }
    decryptField(cipherText, key) {
        const b = crypto.aesDecrypt(cipherText, key);
        return b.toString('utf-8');
    }
}
__decorate([
    preload('v1.decrypt.fields', 10)
], DecryptFields.prototype, "initialize", null);
