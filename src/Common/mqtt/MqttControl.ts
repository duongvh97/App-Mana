import { store } from "../../redux";
import { getTopicControlByMac } from "../../const/Mqtt";
import { showMessageDanger } from "../FlashMessageCommon";
import { translate } from "../../Translations/Translate";

export class MqttControl {
    static send = (mgs: string, mac: string) => {
        try {
            console.log(`send: ${mgs}`, mac);
            let client = store.getState().socket.socket;
            client.publish(getTopicControlByMac(mac), mgs, 0, false);
        } catch (e) {
            console.log(e);
            showMessageDanger(translate("notConnect"));
        }
    };

    static sendObj = (mgs: any, mac: string) => {
        console.log(`send: `, mgs, mac);
        try {
            let _mgs = JSON.stringify(mgs);
            let client = store.getState().socket.socket;
            client.publish(getTopicControlByMac(mac), _mgs, 0, false);
        } catch (e) {
            console.log(e);
            showMessageDanger(translate("notConnect"));
        }
    };
}
