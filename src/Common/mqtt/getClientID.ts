import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { equalVal, isTextEmpty } from "../FunctionCommon";


// @ts-ignore
export function getClientID(dataUser) {
    return AsyncStorage.getItem("clientid").then(value => {
        let client_id = "";
        if (value != null && dataUser) {
            let list_clientid = JSON.parse(value);
// @ts-ignore
            list_clientid.forEach((item, index) => {
                if (equalVal(item.user_id, dataUser.id)) {
                    client_id = item.client_id;
                }
            });

            if (isTextEmpty(client_id)) {
                let id = Math.random()
                    .toString(36)
                    .substr(2, 12);
                list_clientid.push({
                    user_id: dataUser.id,
                    client_id: id
                });
                AsyncStorage.setItem("clientid", JSON.stringify(list_clientid));
                client_id = id;
            }
        } else {
            let id = Math.random()
                .toString(36)
                .substr(2, 12);
            let data_save = [
                {
                    user_id: dataUser.id,
                    client_id: id
                }
            ];
            AsyncStorage.setItem("clientid", JSON.stringify(data_save));
            client_id = id;
        }
        let userId = dataUser?.id ? dataUser.id : "";
        return `Mana_light_of_App_${Platform.OS}_${userId}_${client_id}`;
    });
}
