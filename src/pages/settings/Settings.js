export default class Settings {
    static KEYS = {
        SERVER_IP: "@RM:SERVER_IP",
        SERVER_PORT: "@RM:SERVER_PORT"
    };

    static changed(s1, s2){
        let changed = false;
        Object.keys(Settings.KEYS).forEach(key => {
            if(s1[Settings.KEYS[key]] !== s2[Settings.KEYS[key]]){
                changed = true;
            }
        });
        return changed;
    }
}