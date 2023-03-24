import { showMessageDanger, showMessageSuccess, showMessageWarning } from "../../common/FlashMessageCommon";
import { api, postFormData } from "../../common/api/api";
import { API_URL, ApiConfigs } from "../../common/api/api-config";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerProps } from "../../redux/reducer";
import ImagePicker1 from "react-native-image-crop-picker";
import { isIos } from "../../common/FunctionCustom";
import { img_images_avatar } from "../../assets/images";
import { ImageRequireSource } from "react-native";
import { setDataUser } from "../../redux/action/userAction";

type apiUpdateInfoUser = {
    "data": {
        "id": number,
        "name": string
        "description": string
        "email": string
        "email_verified_at": null,
        "created_at": string
        "updated_at": string
        "avatar"?: string
    },
    "code": number,
    "success": boolean,
    "message": string
}

let isChangerAvatar = false;

function useChangerInfoUser() {
    const user = useSelector((state: RootReducerProps) => state.user.data);

    const [name, setName] = React.useState<string>(user?.name ? user.name : "");
    const [description, setDescription] = React.useState<string>(user?.description ? user.description : "");
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [avatar, setAvatar] = React.useState<ImageRequireSource>(user?.avatar ? { uri: user.avatar } : img_images_avatar);

    useEffect(() => {
        return () => {
            isChangerAvatar = false;
        };
    }, [user]);

    const checkEmpty = () => {
        if (name.trim().length <= 0) {
            showMessageWarning("Vui lòng nhập tên");
            return true;
        }
        // if (description.trim().length <= 0) {
        //     showMessageWarning("Vui lòng nhập mô tả");
        //     return true;
        // }
        return false;
    };

    const onSubmit = async () => {
        if (checkEmpty()) return;
        setIsLoading(true);

        try {
            const data: any = {
                "name": name,
                "description": description
            };

            if (isChangerAvatar) {
                let linkAvtar = await postFormData(ApiConfigs.baseURL + API_URL.auth.uploadAvatar, { avatar: avatar });
                console.log(linkAvtar);
                data["avatar"] = linkAvtar?.url;
            }

            console.log("data", data);
            api.put<apiUpdateInfoUser>(API_URL.auth.infoUser, data,
                { showMessage: true, showMessageError: true })
                .then(res => {
                    if (res.success) {
                        showMessageSuccess("Cập nhật thành công");
                        dispatch(setDataUser(res.data));
                    }
                })
                .catch(err => {
                    __DEV__ && console.log(err);
                    showMessageDanger("Cập nhật thất bại");
                }).finally(() => {
                setIsLoading(false);
            });

        } catch (e) {
            __DEV__ && console.log(e);
            setIsLoading(false);
            return;
        }
    };


    function selectImage() {
        ImagePicker1.openPicker({
            width: 500,
            height: 500,
            cropping: true
        }).then(image => {
            const uriPart = image.path.split(".");
            const fileExtension = uriPart[uriPart.length - 1];

            let photo = {
                uri: isIos() ? `file://${image.path}` : image.path,
                type: "image/" + fileExtension,
                name: "winci" + "_" + new Date().getTime() + "." + fileExtension
            };
            isChangerAvatar = true;
            setTimeout(() => doChangerAvatar(photo), 100);
        }).catch(e => {
            showMessageWarning("Error " + e.message);
        });
    }

    function selectCamera() {

        ImagePicker1.openCamera({
            width: 500,
            height: 500,
            cropping: true
        }).then(image => {
            const uriPart = image.path.split(".");
            const fileExtension = uriPart[uriPart.length - 1];

            let photo = {
                uri: image.path,
                type: "image/" + fileExtension,
                name: new Date().getTime() + "." + fileExtension
            };
            isChangerAvatar = true;
            doChangerAvatar(photo);
        }).catch(e => {
            showMessageDanger("Error " + e.message);
        });
    }

    const doChangerAvatar = (photo: any) => {
        // code...
        setAvatar(photo);
    };

    return {
        name, setName,
        description, setDescription,
        isLoading,
        onSubmit,
        selectImage,
        selectCamera,
        user,
        avatar
    };
}

export default useChangerInfoUser;
