import { Alert } from "react-native";
import { translate } from "../Translations/Translate";

export class DialogCustom {
    static SimpleDialog = function(title: string, message: string, btnYes = translate("yes")) {
        Alert.alert(title, message, [
            {
                text: btnYes,
                onPress: () => {
                }
            }
        ]);
    };


    /*
    * Note: the function is a normal function. NOT ES6 Arrow Functions
    *
    * Example DialogCustom.funcDialog("title demo type text", "type text", func);
    *
    * function func() {
    *    console.log("text demo");
    * }
    * */
    static dialogFunctionOk = function(title: string, message: string, func: () => void, yes = translate("yes"), no = translate("cancel")) {
        Alert.alert(title, message, [
            {
                text: no,
                style: "cancel"
            },
            {
                text: yes,
                onPress: () => func()
            }
        ]);
    };

    /**
     *
     * @description: Note: the function is a normal function. NOT ES6 Arrow Functions
     * @example: DialogCustom.funcDialog("title demo type text", "type text", funcy, funcn);
     *
     * function func() {
     *    console.log("text demo");
     * }
     *
     * @param title
     * @param message
     * @param funcy: function Yes
     * @param funcn: function No
     * @param yes
     * @param no
     */
    static dialogAllFunction = function(title: string, message: string, funcy: () => void, funcn: () => void, yes = translate("yes"), no = translate("cancel")) {
        Alert.alert(title, message, [
            {
                text: no,
                style: "cancel",
                onPress: () => funcn()
            },
            {
                text: yes,
                onPress: () => funcy()
            }
        ]);
    };


    /**
     * Note: the function is ES6 Arrow Functions
     *
     * Example DialogCustom.funcParamDialog("Xoá mật khẩu cửa", "Bạn có chắc xoá mật khẩu cửa không ?", func, token_id, metaID, topic, context)
     *  @pram : token_id, metaID, topic, context
     *
     * function func(token_id, metaID, topic, context) {
     *   code here
     * }
     *
     * @param title
     * @param message
     * @param func
     * @param param
     */

    static funcParamDialog = function(title: string, message: string, func: (param: any) => void, ...param: any) {


        Alert.alert(title, message, [
            {
                text: translate("cancel"),
                style: "cancel"
            },
            {
                text: translate("yes"),
                // @ts-ignore
                onPress: () => func(...param)
            }
        ]);
    };
}
