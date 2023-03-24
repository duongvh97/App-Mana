import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";
import { Dimensions, Platform } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get('window');


export const Device = {
    width: width,
    height,
    isIos: Platform.OS === 'ios',
    isPhoneX: isIphoneX(),
    statusHeight: getStatusBarHeight(),
}


const BASE_FONT_SIZE = 2;

function ReduceTextFor18_9(number: number) {
    return Math.ceil(Device.width / Device.height * 100) === 52 ? number - 0.5 : number;
}

function calculateFontsize(current: number, max: number) {
    return current <= max ? current : max;
}

export const Spacing = {};

export const sizeHeightResponsive = (size: number) => {
    return Device.height * (size / Device.height);
};
export const sizeWidthResponsive = (size: number) => {
    return Device.width * (size / Device.width);
};


export const sizeHeightResponsivePercent = (size: number) => {
    return String((size / (Device.height + Device.statusHeight - 160)) * 100) + "%";
};
export const sizeWidthResponsivePercent = (size: number) => {
    return String((size / Device.width + Device.statusHeight - 160) * 100) + "%";
};

export const FontSize = {
    10: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(-0.6)), 10),
    11: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(-0.5)), 11),
    12: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(-0.25)), 12),
    13: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0)), 13),
    14: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.2)), 14),
    15: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.25)), 15),
    17: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.5)), 17),
    18: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.6)), 18),
    19: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.75)), 19),
    20: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.75)), 20),
    21: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(1)), 21),
    22: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(1.25)), 22),
    24: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(1.4)), 24),
    25: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(1.5)), 25),
    27: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(2)), 27),
    32: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(2.5)), 32),
    33: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(2.75)), 33),
    34: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(3.0)), 34),
    36: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(3.0)), 36),
};
