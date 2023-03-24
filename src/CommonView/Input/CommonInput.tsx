import React, { forwardRef, useState } from "react";
import {
    Image,
    ImageSourcePropType,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./InputText.style";
import colors from "../../theme/Colors";
import { img_icon_eye, img_icon_eye_off } from "../../assets/images/icon";


interface Props extends TextInputProps {
    isPhoneInput?: boolean
    title?: string;
    source?: ImageSourcePropType;
    viewInput?: ViewStyle;
    titleInput?: string;
    hasImage?: boolean,
    isFocus?: boolean,
    isPassword?: boolean,
    err?: string,
    onPress?: () => void,
    refc?: React.Ref<any>
    isTextarea?: boolean
    // ref?: any
}

interface State {
    isFocus: boolean;
}

const slideDown = {
    from: {
        top: -8,
        opacity: 0
    },
    to: {
        top: 0,
        opacity: 1
    }
};

export const CommonInput = forwardRef<TextInput, Props>((props, ref) => {
    const {
        title,
        source = null,
        viewInput,
        titleInput,
        err,
        onPress,
        isTextarea = false,
        isPhoneInput = false,
        ...rest
    } = props;

    const [isFocus, setFocus] = useState(false);
    const [isShowPass, setShowPass] = useState(false);

    const renInput = () => {
        if (isTextarea) {
            return <TextInput
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={styles.textarea}
                returnKeyType={"done"}
                multiline={true}
                numberOfLines={6}
                ref={ref}
                {...rest}
                secureTextEntry={isShowPass ? false :  props.secureTextEntry}
            />;
        } else {
            return <TextInput
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                autoCapitalize={"none"}
                ref={ref}
                placeholder={title}
                style={styles.styleInput}
                {...rest}
                secureTextEntry={isShowPass ? false :  props.secureTextEntry}
                placeholderTextColor={colors.grey01}

            />;
        }
    };

    return (
        <>
            <View style={{ ...viewInput }}>
                <Text style={styles.title}>{titleInput}</Text>
                <View style={[styles.wrapInput, isFocus && { borderColor: colors.pink, borderBottomWidth: 1.5 }]}>
                    {renInput()}
                    {source && (
                        <TouchableOpacity
                            style={styles.edge}
                            onPress={onPress}>
                            <Image source={source} style={{ width: 30, height: 30 }} />
                            {/*<Animatable.Image*/}
                            {/*  source={source}*/}
                            {/*  animation={"flipInY"}*/}
                            {/*/>*/}
                        </TouchableOpacity>
                    )}
                    {props.isPassword && (
                        <TouchableOpacity
                            style={styles.edge}
                            onPress={() => setShowPass(!isShowPass)}>
                            <Image source={isShowPass ? img_icon_eye : img_icon_eye_off}
                                   style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    )}

                </View>

                {!!err &&
                <View style={{ paddingTop: 6 }}>
                    <Animatable.Text style={styles.err} animation={slideDown} duration={500}>{err}</Animatable.Text>
                </View>}
            </View>
        </>
    );
});

// export default InputText;
