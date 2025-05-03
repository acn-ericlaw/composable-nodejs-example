import { __decorate } from "tslib";
import { AppException, preload, Utility } from "mercury-composable";
import fs from 'fs';
const PROFILE_ID = "profile_id";
const TEMP_DATA_STORE = "/tmp/store";
const JSON_EXT = ".json";
const util = new Utility();
export class DeleteProfile {
    initialize() {
        return this;
    }
    async handleEvent(evt) {
        const profileId = evt.getHeader(PROFILE_ID);
        if (!profileId) {
            throw new AppException(400, 'Missing profile_id');
        }
        const file = `${TEMP_DATA_STORE}/${profileId}${JSON_EXT}`;
        if (!fs.existsSync(file)) {
            throw new AppException(400, "Profile " + profileId + " not found");
        }
        fs.rmSync(file);
        const result = {};
        result['id'] = util.isDigits(profileId) ? util.str2int(profileId) : profileId;
        result['deleted'] = true;
        return result;
    }
}
__decorate([
    preload('v1.delete.profile', 10)
], DeleteProfile.prototype, "initialize", null);
