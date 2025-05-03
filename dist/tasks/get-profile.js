import { __decorate } from "tslib";
import { AppException, preload, Utility } from "mercury-composable";
import fs from 'fs';
const util = new Utility();
const PROFILE_ID = "profile_id";
const TEMP_DATA_STORE = "/tmp/store";
const JSON_EXT = ".json";
export class GetProfile {
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
            throw new AppException(404, "Profile " + profileId + " not found");
        }
        const content = await util.file2str(file);
        return JSON.parse(content);
    }
}
__decorate([
    preload('v1.get.profile', 10)
], GetProfile.prototype, "initialize", null);
