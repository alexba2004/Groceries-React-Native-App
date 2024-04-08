import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Switch,
} from "react-native";
import { insertProduct } from "../api";

const ProductFormScreen = ({ navigation }) => {
  const [product, setProduct] = useState({
    barcode: "",
    description: "",
    brand: "",
    cost: 0,
    price: 0,
    expiredDate: "",
    status: false, // Cambiado a false para representar "inactivo" por defecto
    stock: 0,
  });

  const handleChange = (name, value) =>
    setProduct({ ...product, [name]: value });

  const handleEnviarFormulario = async () => {
    const res = await insertProduct(product);
    console.log(JSON.stringify(product));
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Producto</Text>
      <TextInput
        placeholder="Código de barras"
        onChangeText={(text) => handleChange("barcode", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        onChangeText={(text) => handleChange("description", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Marca"
        onChangeText={(text) => handleChange("brand", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio de compra"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("cost", parseInt(text))}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio de venta"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("price", parseInt(text))}
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha de caducidad"
        onChangeText={(text) => handleChange("expiredDate", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Existencias"
        keyboardType="numeric"
        onChangeText={(text) => handleChange("stock", parseInt(text))}
        style={styles.input}
      />

      {/* Interruptor para el estado */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Inactivo</Text>
        <Switch
          value={product.status}
          onValueChange={(value) => handleChange("status", value)}
        />
        <Text style={styles.switchText}> Activo</Text>
      </View>

      <Button title="Enviar" onPress={handleEnviarFormulario} color="#16A085" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#314D70",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#3D7EAA",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#fff",
    backgroundColor: "#3D7EAA",
  },
  button: {
    padding: 15,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    width: "40%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  switchText: {
    marginRight: 10,
    color: "#fff",
  },
});

export default ProductFormScreen;
