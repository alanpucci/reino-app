import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import { Item, Spinner } from 'native-base';
import { Button, Card, CardItem, Form, Text, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, SafeAreaView, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { useCallback } from 'react/cjs/react.development';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MenuHeader from '../MenuHeader/MenuHeader';
import { sleep } from '../../utils/utils';

const Sales = ({ navigation }) => {
    const [cash, setCash] = useState("");
    const [MP, setMP] = useState("");
    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());

    useFocusEffect(
        useCallback(() => {
            clearAll();
        }, []))

    const handleAccept = async () => {
        if (cash || MP) {
            setVisibleModal(true);
            if (!cash) setCash(0.0)
            if (!MP) setMP(0.0)
        }
    }

    const clearAll = () => {
        setCash("");
        setMP("");
        setDate(new Date());
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = async (newDate) => {
        await sleep(50);
        setDate(newDate);
        hideDatePicker();
    };

    const handleSubmit = async () => {
        const data = { cashValue: cash, MPValue: MP, date }
        await axios({
            method: 'post',
            url: 'https://reino-casero-api-alanpucci.vercel.app/api/sales',
            data,
            headers: { "Content-Type": "application/json" }
        });
        setVisibleModal(false);
        clearAll();
    }

    return (
        <SafeAreaView style={styles.container}>
            <MenuHeader title="Ventas" onPress={() => navigation.openDrawer()} />
            <KeyboardAvoidingView
                behavior="height" keyboardVerticalOffset={-50}
                style={styles.container}
            >
                {loading ? <Spinner />
                    :
                    <ScrollView contentContainerStyle={styles.centerContainer}>
                        <Card style={{ width: '90%', height: '90%' }}>
                            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                <View>
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        date={date}
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        onHide={hideDatePicker}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', paddingTop: 25 }}>
                                    <Button rounded onPress={() => showDatePicker()}>
                                        <Text>{date.toDateString().substr(4)}</Text>
                                    </Button>
                                </View>
                                <Form style={{ flex: 1, justifyContent: 'space-around' }}>
                                    <Item style={{ marginRight: 20 }}>
                                        <TextInputMask
                                            testID={"inputSalary"}
                                            accessibilityLabel={"inputSalary"}
                                            keyboardType="decimal-pad"
                                            type={"money"}
                                            includeRawValueInChangeText={true}
                                            options={{
                                                precision: 2,
                                                separator: ',',
                                                delimiter: '.',
                                                unit: '$',
                                                suffixUnit: ''
                                            }}
                                            value={cash}
                                            style={{ width: '100%', height: 50, fontSize: 20 }}
                                            onChangeText={(maskedText, rawText) => setCash(rawText)}
                                            placeholder="Efectivo"
                                        />
                                    </Item>
                                    <Item style={{ marginRight: 20 }}>
                                        <TextInputMask
                                            testID={"inputSalary"}
                                            accessibilityLabel={"inputSalary"}
                                            keyboardType="decimal-pad"
                                            type={"money"}
                                            includeRawValueInChangeText={true}
                                            options={{
                                                precision: 2,
                                                separator: ',',
                                                delimiter: '.',
                                                unit: '$',
                                                suffixUnit: ''
                                            }}
                                            style={{ width: '100%', height: 50, fontSize: 20 }}
                                            value={MP}
                                            onChangeText={(maskedText, rawText) => setMP(rawText)}
                                            placeholder="MercadoPago"
                                        />
                                    </Item>
                                    <Button block rounded style={{ marginHorizontal: 20 }} onPress={handleAccept}>
                                        <Text>Aceptar</Text>
                                    </Button>
                                </Form>
                            </View>
                        </Card>
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
                    </ScrollView>
                }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue'
    },
    centerContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '100'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
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
});

export default Sales;