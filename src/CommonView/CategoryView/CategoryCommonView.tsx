import React from "react";
import { FlatList, ListRenderItem, TouchableOpacity, View } from "react-native";
import styles from "../../componet/News/News.style";
import CommonText from "../CommonText/CommonText";
import { dataItemFilter } from "../../componet/Search/ModalFilterSearch";
import Colors from "../../theme/Colors";
import _ from "lodash";

interface CategoryCommonViewProps {
    dataCategory: any[],
    onPressCategoryListener?: (item: any, index: number, dataSort: dataItemFilter[]) => void
}

function CategoryCommonView({ dataCategory, onPressCategoryListener }: CategoryCommonViewProps) {

    console.log(dataCategory.length);

    const CategoryListItem: ListRenderItem<dataItemFilter> = ({ item, index }) => {
        const onPress = () => {

            let listSelect: dataItemFilter[] = [];
            let listNonSelect: dataItemFilter[] = [];
            let dataCategoryChanger: dataItemFilter[] = _.cloneDeep(dataCategory);

            dataCategoryChanger[index].isCheck = !dataCategoryChanger[index].isCheck;

            dataCategoryChanger.forEach((item: dataItemFilter) => {
                if (item.isCheck) {
                    listSelect.push(item);
                } else {
                    listNonSelect.push(item);
                }
            });
            let dataSort = listSelect.concat(listNonSelect);

            onPressCategoryListener && onPressCategoryListener(item, index, dataSort);
        };
        return <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.wrapItemCat, backgroundColor: item.isCheck ? Colors.bgItemCat : Colors.bgItem }}>
            <CommonText value={item.name}
                        style={{ fontWeight: "bold", color: item.isCheck ? Colors.white : Colors.text }} />
        </TouchableOpacity>;
    };


    return <View>
        <FlatList data={dataCategory}
                  renderItem={CategoryListItem}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(e, i) => "CategoryCommonView" + i + "_" + new Date().getTime()} />
    </View>;
}

export default React.memo(CategoryCommonView);
