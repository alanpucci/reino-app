import { useFocusEffect } from '@react-navigation/core'
import axios from 'axios'
import { Body, Card, CardItem, Text, Header } from 'native-base'
import React, { useCallback, useState, useContext } from 'react'
import { Dimensions, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { TabsContext } from '../../navigation/ReportTabs/ReportTabs'
import { DATE_FORMAT_DD_MM_YYYY_WITH_SLASH, format } from '../../utils/DateUtils'
import MenuHeader from '../MenuHeader/MenuHeader'

const ReportSalesDetail = ({ navigation }) => {

    const { params } = useContext(TabsContext);
    const [sales, setSales] = useState([]);

    const initialDate = new Date(params.year, params.id - 1, 9);
    const toDate = new Date(params.year, params.id, 8);

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [])
    )

    const fetchUserData = async () => {
        const { data } = await axios(`https://reino-casero-api.vercel.app/api/sales?initialDate=${initialDate.toISOString()}&toDate=${toDate.toISOString()}`);
        setSales(data);
    }

    const renderItems = ({ item }) => {

        return (
            <Card>
                <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10, paddingTop: 10 }}>{format(item.date, DATE_FORMAT_DD_MM_YYYY_WITH_SLASH)}</Text>
                <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginBottom: 5, justifyContent: 'space-between' }}>
                    <View style={{ width: Dimensions.get('window').width / 3, alignItems: 'flex-start', paddingLeft: 5 }}>
                        <Text>${item.cashValue}</Text>
                    </View>
                    <View style={{ width: Dimensions.get('window').width / 3, alignItems: 'center' }}>
                        <Text>${item.MPValue}</Text>
                    </View>
                    <View style={{ width: Dimensions.get('window').width / 3, alignItems: 'center' }}>
                        <Text>${item.totalValue}</Text>
                    </View>
                </View>
            </Card>
        )
    }

    return (
        <View style={{ marginBottom: 90 }}>
            <MenuHeader title="Detalle reporte" icon="arrow-back-outline" onPress={() => navigation.navigate('MonthsList')} />
            <Header style={{ height: 30, marginHorizontal: 10, backgroundColor: 'lightblue', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Efectivo</Text>
                <Text>MP</Text>
                <Text>Total</Text>
            </Header>
            <FlatList
                data={sales}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItems}
            />
        </View>
    )
}

export default ReportSalesDetail
