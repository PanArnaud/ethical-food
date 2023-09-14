import React from "react";
import {
  ActivityIndicator,
  ActivityIndicatorIOSProps,
  View,
} from "react-native";

const Loading = (props: ActivityIndicatorIOSProps) => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
