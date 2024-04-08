import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch } from 'react-native';
import { updateProduct } from '../api';

const EditProductFormScreen = ({ navigation, route }) => {
    const { item } = route.params;

    const [product, setProduct] = useState({
        barcode: item.barcode,
        description: item.description,
        brand: item.brand,
        cost: item.cost.toString(),
        price: item.price.toString(),
        expiredDate: item.expiredDate,
        status: item.status.toString(), // Se convierte a cadena
        stock: item.stock.toString()
    });

    const handleChange = (name, value) => {
        setProduct({ ...product, [name]: value });
    };

    const handleEnviarFormulario = async () => {
      const res = await updateProduct(product.barcode, product);
      console.log(res)
      console.log(JSON.stringify(product));
      navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Editar Producto</Text>
            <TextInput
                placeholder="Código de barras"
                onChangeText={(text) => handleChange('barcode', text)}
                style={styles.input}
                value={product.barcode}
            />
            <TextInput
                placeholder="Descripción"
                onChangeText={(text) => handleChange('description', text)}
                style={styles.input}
                value={product.description}
            />
            <TextInput
                placeholder="Marca"
                onChangeText={(text) => handleChange('brand', text)}
                style={styles.input}
                value={product.brand}
            />
            <TextInput
                placeholder="Precio de compra"
                keyboardType='numeric'
                onChangeText={(text) => handleChange('cost', text)}
                style={styles.input}
                value={product.cost}
            />
            <TextInput
                placeholder="Precio de venta"
                keyboardType='numeric'
                onChangeText={(text) => handleChange('price', text)}
                style={styles.input}
                value={product.price}
            />
            <TextInput
                placeholder="Fecha de caducidad"
                onChangeText={(text) => handleChange('expiredDate', text)}
                style={styles.input}
                value={product.expiredDate}
            />
            <TextInput
                placeholder="Existencias"
                keyboardType='numeric'
                onChangeText={(text) => handleChange('stock', text)}
                style={styles.input}
                value={product.stock}
            />
            <View style={styles.switchContainer}>
                <Text>Estado:</Text>
                <Switch
                    value={product.status === '1'} // Convierte a booleano
                    onValueChange={(value) => handleChange('status', value ? '1' : '0')} // Convierte a cadena
                />
                <Text>{product.status === '1' ? 'Activo' : 'Inactivo'}</Text>
            </View>
            <Button
                title="Enviar"
                onPress={handleEnviarFormulario}
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffddd2",
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#e29578',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold',
        width: '40%'
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});

export default EditProductFormScreen;
