import { __decorate } from "tslib";
import { AppException, MultiLevelMap, preload, Utility } from "mercury-composable";
const util = new Utility();
export class CreateProfile {
    initialize() {
        return this;
    }
    async handleEvent(evt) {
        const input = evt.getBody();
        if (!('id' in input)) {
            throw new AppException(400, 'Missing id');
        }
        const requiredFields = evt.getHeader('required_fields');
        if (!requiredFields) {
            throw new AppException(400, "Missing required_fields");
        }
        const protectedFields = evt.getHeader('protected_fields');
        if (!protectedFields) {
            throw new AppException(400, "Missing protected_fields");
        }
        const data = new MultiLevelMap(input);
        const fields = util.split(requiredFields, ", ");
        for (const f of fields) {
            if (!data.exists(f)) {
                throw new AppException(400, `Missing ${f}`);
            }
        }
        const pFields = util.split(protectedFields, ", ");
        for (const f of pFields) {
            if (data.exists(f)) {
                data.setElement(f, "***");
            }
        }
        const result = {};
        result['profile'] = data.getMap();
        result['type'] = "CREATE";
        result['secure'] = pFields;
        return result;
    }
}
__decorate([
    preload('v1.create.profile', 10)
], CreateProfile.prototype, "initialize", null);
