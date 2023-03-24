import { FlashMessageProps, showMessage } from "react-native-flash-message";
import { Platform } from "react-native";
import colors from "../theme/Colors";
import { translate } from "../Translations/Translate";


const DURATION = 3000;

export const showMessageDanger = (message: string) => {
    showMessage({
        type: "danger",
        message: translate("anErrorOccurred"),
        description: message,
        duration: DURATION,
        //@ts-ignore
        titleStyle: {
            // color: colors.pink_active,
            // ...FontWeight[600],
            fontSize: 15
        },
        textStyle: {
            color: colors.white,
            // ...FontWeight[500],
            fontSize: 15
        },
        style: {
            paddingTop: Platform.OS === "android" ? 25 : 5
        }
    });
};

export const showMessageSuccess = (message: string, props?: FlashMessageProps) => {
    showMessage({

        type: "success",
        message: props?.message ? props.message : translate("success"),
        description: message,
        duration: DURATION,
        style: {
            paddingTop: Platform.OS === "android" ? 25 : 0
        },
        //@ts-ignore
        titleStyle: {
            // color: colors.pink_active,
            // ...FontWeight[600],
            fontSize: 17
        },
        textStyle: {
            color: colors.white,
            // ...FontWeight[500],
            fontSize: 15
        },
        ...props
    });
};

export const showMessageWarning = (message: string) => {
    showMessage({
        type: "warning",
        // ,
        duration: DURATION,
        message: translate("warning"),
        description: message,
        //@ts-ignore
        titleStyle: {
            // color: colors.pink_active,
            // ...FontWeight[600],
            fontSize: 17
        },
        textStyle: {
            color: colors.white,
            // ...FontWeight[500],
            fontSize: 15
        },
        style: {
            paddingTop: Platform.OS === "android" ? 25 : 0
        }
    });
};
