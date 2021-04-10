import axios from 'axios';
import { Button, Text, View } from 'native-base';
import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';

const InfoModal = ({ visibleModal, setVisibleModal, cash, MP, setSubmitted }) => {

    const handleSubmit = async () => {
        setVisibleModal(false);
        const data = { cashValue: cash, MPValue: MP }
        console.log(data)
        await axios({
            method: 'post',
            url: 'https://reino-casero-api-alanpucci.vercel.app/api/sales',
            data,
            headers: { "Content-Type": "application/json" }
        });
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleModal}
                onRequestClose={() => {
                    setVisibleModal(!visibleModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={{ flexGrow: 2, paddingTop: 30 }}>Total: ${cash + MP}</Text>
                            <View style={styles.btnsContainer}>
                                <Button onPress={handleSubmit}>
                                    <Text>Aceptar</Text>
                                </Button>
                                <Button onPress={() => setVisibleModal(false)}
                                >
                                    <Text>Cancelar</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        // margin: 20,
        // backgroundColor: "white",
        // borderRadius: 20,
        // padding: 35,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5
        backgroundColor: '#dee4e9',
        borderRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        elevation: 5,
        height: 200,
        padding: 22,
    },
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-end'
    },
})

export default InfoModal;