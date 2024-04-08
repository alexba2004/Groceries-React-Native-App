import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductItem from "./ProductItem";
import { deleteProduct, getProducts } from "../api";

const ProductList = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const deleteProd = async (barcode) => {
    const res = await deleteProduct(barcode);
    await loadProducts();
    console.log(JSON.stringify(res));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ProductItem
        item={item}
        deleteProd={deleteProd}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.barcode}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#6c757d"]}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Color de fondo blanco/gris claro
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default ProductList;
