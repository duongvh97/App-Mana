import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";

import Colors from "../../theme/Colors";
import CommonText from "../CommonText/CommonText";


interface CommonBottomSheetProps {
    children?: JSX.Element;
    maxHeight: number;
    label?: string;
}

const CommonBottomSheet = React.forwardRef<BottomSheet, CommonBottomSheetProps>((props, ref) => {

    // state
    const [backdropPressBehavior, setBackdropPressBehavior] = useState<"none" | "close" | "collapse">("collapse");

    const snapPoints = useMemo(() => [1, props.maxHeight / 2, props.maxHeight], []);

    const handleSheetChanges = useCallback((index: number) => {
        // console.log("handleSheetChanges", index);
    }, []);

    // renders
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
        ),
        [backdropPressBehavior]
    );

    return <BottomSheet
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: Colors.background }}
        backdropComponent={renderBackdrop}
    >
        <View style={{ backgroundColor: Colors.background }}>
            <CommonText value={props.label}
                        style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 14 }} />
            <BottomSheetView style={{ height: "100%", justifyContent: "center" }}>
                {props.children}
            </BottomSheetView>
        </View>
    </BottomSheet>;
});

export default CommonBottomSheet;
