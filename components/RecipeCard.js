import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../api/Instance";
import RecipeModal from "./RecipeModal";
import TagFlatList from "./TagFlatList";
const RecipeCard = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    try {
      const response = await api.get("/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

const handleRecipePress = (recipe) => {
  setSelectedRecipe(recipe)
  setModalVisible(true)
}


  const renderCard = ({ item }) => {
    const words = item.text.split(" ");
    const maxWords = 20;
    const editedText = words.slice(0, maxWords).join(" ");

    return (
      <Pressable onPress={() => handleRecipePress(item)}>
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{editedText}...</Text>
            <View style={styles.tagWrapper}>
      <TagFlatList data={item.tags}></TagFlatList>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
    <FlatList
      data={recipes}
      renderItem={renderCard}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.flatListContent}
      />
      <RecipeModal
      recipe={selectedRecipe}
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      />
      </>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  contentWrapper: {
    flex: 2,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    marginVertical: 5,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
});

export default RecipeCard;
