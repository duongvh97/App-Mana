//
// function ExampleScreen() {
//
//     const navigation = useNavigation<any>();
//
//
//     return <SafeAreaView style={StyleGlobal.containerMainWhite}>
//         <HeaderSimple name={"Đổi mật khẩu"} icon={"chevron-left"} isNoShadow={true} isNameCenter={true}
//                       styleContainer={{ height: 60, marginBottom: 14 }} />
//
//         <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
//                                  style={{ marginHorizontal: 14 }}>
//             <CommonInput
//                 placeholder={"Mật khẩu cũ"}
//                 iconLeftName={"lock"}
//                 colorIconLeft={Colors.colorIconInput}
//                 styleViewInput={{
//                     borderRadius: 10,
//                     borderWidth: 1.5,
//                     borderColor: Colors.primary,
//                     overflow: "hidden",
//                     marginBottom: 15
//                 }}
//             />
//
//             <CommonInput
//                 placeholder={"Mật khẩu mới"}
//                 iconLeftName={"lock"}
//                 colorIconLeft={Colors.colorIconInput}
//                 styleViewInput={{
//                     borderRadius: 10,
//                     borderWidth: 1.5,
//                     borderColor: Colors.primary,
//                     overflow: "hidden",
//                     marginBottom: 15
//                 }}
//             />
//             <CommonInput
//
//                 placeholder={"Nhập lại mật khẩu mới"}
//                 iconLeftName={"lock-check"}
//                 colorIconLeft={Colors.colorIconInput}
//                 styleViewInput={{
//                     borderRadius: 10,
//                     borderWidth: 1.5,
//                     borderColor: Colors.primary,
//                     overflow: "hidden",
//                     marginBottom: 15
//                 }}
//             />
//
//             <CommonButton
//                 onPress={() => navigation.goBack()}
//                 text={"Đổi mật khẩu"}
//                 style={{ backgroundColor: Colors.primary, height: 50, marginTop: 40 }}
//             />
//         </KeyboardAwareScrollView>
//     </SafeAreaView>;
// }
