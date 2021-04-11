import React, { useState, useCallback } from 'react';
import { Card, CardItem, Text, View, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import MenuHeader from '../MenuHeader/MenuHeader';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/core';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { sleep } from '../../utils/utils';

const Home = ({ navigation }) => {

    const [total, setTotal] = useState(0);
    const [mp, setMP] = useState(0);
    const [cash, setCash] = useState(0);
    const [initialDate, setInitialDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 9));
    const [toDate, setToDate] = useState(new Date());
    const [isInitialDatePickerVisible, setInitialDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

    const showDatePicker = (type) => {
        if (type === "initial") setInitialDatePickerVisibility(true);
        if (type === "to") setToDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setInitialDatePickerVisibility(false);
        setToDatePickerVisibility(false);
    };

    const handleConfirm = async (date, type) => {
        await sleep(50);
        if (isInitialDatePickerVisible) setInitialDate(date);
        if (isToDatePickerVisible) setToDate(date);
        hideDatePicker();
    };

    const fetchUserData = async () => {
        const { data } = await axios(`https://reino-casero-api.vercel.app/api/sales?initialDate=${initialDate.toISOString()}&toDate=${toDate.toISOString()}`);
        let { totalValue, cashValue, mpValue } = { totalValue: 0, cashValue: 0, mpValue: 0 }
        data.forEach(item => {
            totalValue += parseInt(item.totalValue);
            cashValue += parseInt(item.cashValue);
            mpValue += parseInt(item.MPValue);
        })
        setTotal(totalValue);
        setCash(cashValue);
        setMP(mpValue);
    }

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
            clearAll();
        }, []))

    const clearAll = () => {
        setInitialDate(new Date(new Date().getFullYear(), new Date().getMonth(), 9));
        setToDate(new Date());
    }

    return (
        <View style={styles.container}>
            <MenuHeader icon="menu" title="Ganancias" onPress={() => navigation.openDrawer()} />
            <View style={styles.centerContainer}>
                <Card style={{ width: '90%', height: '90%' }}>
                    <CardItem style={{ alignSelf: 'center', paddingTop: 25 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ganancias del mes</Text>
                    </CardItem>
                    <CardItem>
                        <View>

                            <DateTimePickerModal
                                isVisible={isInitialDatePickerVisible || isToDatePickerVisible}
                                mode="date"
                                date={isInitialDatePickerVisible ? initialDate : toDate}
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                onHide={hideDatePicker}
                            />
                        </View>
                    </CardItem>
                    <View style={{ flex: 1, justifyContent: 'space-around' }}>
                        <CardItem>
                            <Text>Total: ${total}</Text>
                        </CardItem>
                        <CardItem>
                            <Text>Efectivo: ${cash}</Text>
                        </CardItem>
                        <CardItem>
                            <Text>MercadoPago: ${mp}</Text>
                        </CardItem>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                            <Button rounded onPress={() => showDatePicker("initial")} >
                                <Text>{initialDate.toDateString().substr(4)}</Text>
                            </Button>
                            <Button rounded onPress={() => showDatePicker("to")}>
                                <Text>{toDate.toDateString().substr(4)}</Text>
                            </Button>
                        </View>
                    </View>
                    <Button onPress={async () => await fetchUserData()} block>
                        <Text>Aceptar</Text>
                    </Button>
                </Card>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue'
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Home;