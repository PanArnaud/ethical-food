import MasonryList from "@react-native-seoul/masonry-list";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CachedImage } from "../helpers/Image";
import Loading from "./Loading";

type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

const Recipes = ({
  meals,
  categories,
}: {
  meals: Array<Meal>;
  categories: Array<string>;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item): any => item.strMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }: { item: any; i: number }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

const RecipeCard = ({
  item,
  index,
  navigation,
}: {
  item: Meal;
  index: number;
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()}
      style={{ paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
    >
      <Pressable
        style={{ width: "100%" }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag={item.strMeal}
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Recipes;
