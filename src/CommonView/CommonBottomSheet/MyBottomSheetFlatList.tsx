import React, {useCallback, useMemo, useState} from "react";
import {ListRenderItem, View} from "react-native";
import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";

import Colors from "../../theme/Colors";
import CommonText from "../CommonText/CommonText";
import {contextProps} from "../../redux/reducer/DeviceReducer";
import {CONTEXT_DEVICE_DEFAULT_ID} from "../../const/Const";
import {showMessageWarning} from "../../Common/FlashMessageCommon";
import {translate} from "../../Translations/Translate";
import {DialogCustom} from "../../Common/DialogCustom";
import _ from "lodash";
import {updateDevice} from "../../redux/action/DeviceAction";
import {MqttControl} from "../../Common/mqtt/MqttControl";
import {ButtonContext} from "../../Component/DetailScreen/ButtonContext";
import {useDispatch} from "react-redux";


interface CommonBottomSheetProps {
    children?: JSX.Element;
    maxHeight: number;
    label?: string;
    // renderItem: any,
    data: contextProps[]
    device: any
}

const MyBottomSheetFlatList = React.forwardRef<BottomSheet, CommonBottomSheetProps>((props, ref) => {

    // state
    const [backdropPressBehavior, setBackdropPressBehavior] = useState<"none" | "close" | "collapse">("collapse");

    const snapPoints = useMemo(() => ["25%", "50%", "60%"], []);


    const handleSheetChanges = useCallback((index: number) => {
        // console.log("handleSheetChanges", index);
    }, []);

    // renders
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior}/>
        ),
        [backdropPressBehavior]
    );

    const dispatch = useDispatch();

    const renderItem: ListRenderItem<contextProps> = ({item, index}) => {
        // console.log("🐛🐛🐛 line 50 -> MyBottomSheetFlatList.tsx -> renderItem :", item.name)

        return <ButtonContext
            onLongPress={() => {
                if (CONTEXT_DEVICE_DEFAULT_ID.includes(item.id)) {
                    showMessageWarning(translate("noRemoveContextDefault"));
                    return;
                }
                DialogCustom.dialogFunctionOk(translate("removeContext"), translate("messageRemoveContext"), () => {
                    let _device = _.cloneDeep(props.device);
                    _device.context.splice(index, 1);
                    dispatch(updateDevice(_device));
                });
            }}
            key={index + "_wrapListContext"}
            text={item.name}
            onPress={() => MqttControl.send(item.cmd, props.device.mac)}

            textStyle={{
                fontSize: 14,
                textTransform: "none"
            }}
        />
    }

    return <BottomSheet
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: Colors.background}}
        backdropComponent={renderBackdrop}
    >
        <BottomSheetFlatList
            ListHeaderComponent={<View>
                <CommonText value={translate("listContext")}
                            style={{fontSize: 18, fontWeight: "bold", margin: 14, textAlign: "center"}}/>
            </View>}
            data={props.data}
            keyExtractor={(e, i) => i + "_"}
            renderItem={renderItem}
            // contentContainerStyle={styles.contentContainer}
        />
    </BottomSheet>;
});

export default MyBottomSheetFlatList;
