import React from "react";
import Shimmer from "./shimmer";
import { View, Dimensions } from "react-native";
import MyTheme from '../assets/styles';

function ShimmerPlaceHolder({ style, autoRun, visible }) {

    return (
        <View style={[{ marginHorizontal: 16 }, style]}>
            <Shimmer width={Dimensions.get('window').width - 30} height={150} style={{ marginTop: 16, borderRadius: 7 }} autoRun={autoRun} />

            <Shimmer width={Dimensions.get('window').width / 4} height={15} style={{ marginTop: 16, borderRadius: 50 }} autoRun={autoRun} />
            <Shimmer width={Dimensions.get('window').width - 30} height={20} style={{ marginTop: 16, borderRadius: 7 }} autoRun={autoRun} />
            <Shimmer width={Dimensions.get('window').width - 30} height={20} style={{ marginTop: 8, borderRadius: 7 }} autoRun={autoRun} />
            <Shimmer width={Dimensions.get('window').width / 2} height={20} style={{ marginTop: 8, borderRadius: 7 }} autoRun={autoRun} />

            <Shimmer width={Dimensions.get('window').width / 5} height={15} style={{ marginTop: 32, borderRadius: 50 }} autoRun={autoRun} />
            <Shimmer width={Dimensions.get('window').width - 30} height={20} style={{ marginTop: 16, borderRadius: 7 }} autoRun={autoRun} />
            <Shimmer width={Dimensions.get('window').width - 30} height={20} style={{ marginTop: 8, borderRadius: 7 }} autoRun={autoRun} />
            <Shimmer width={Dimensions.get('window').width / 3} height={20} style={{ marginTop: 8, borderRadius: 7 }} autoRun={autoRun} />
        </View>
    );
}

export default ShimmerPlaceHolder;