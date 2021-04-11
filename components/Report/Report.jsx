import { useFocusEffect } from '@react-navigation/core'
import axios from 'axios'
import { Button, Card, CardItem, Icon, Right, Text } from 'native-base'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import MenuHeader from '../MenuHeader/MenuHeader'

const Report = ({ navigation }) => {

    const [months, setMonths] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchMonths();
        }, [])
    )

    const fetchMonths = async () => {
        const { data } = await axios(`https://reino-casero-api.vercel.app/api/months`);
        setMonths(data);
    }

    const renderItems = ({ item, index }) => {
        return (
            <Card>
                <CardItem style={{ flex: 1, justifyContent: 'space-between' }}>
                    <Text>
                        {item.month && item.month.name}
                    </Text>
                    <Text>
                        {item.year}
                    </Text>
                    <Right >
                        <Button bordered rounded small light style={{ backgroundColor: 'white' }} onPress={() => navigation.navigate('ReportStack', { params: { id: item.id, year: item.year } })}>
                            <Icon testID={`btnSeeProcedure${index}`} accessibilityLabel={`btnSeeProcedure${index}`}
                                name="arrow-forward"
                                style={{ color: 'black' }} />
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        )
    }

    return (
        <SafeAreaView>
            <MenuHeader title="Reporte" icon="menu" onPress={() => navigation.openDrawer()} />
            <FlatList
                data={months}
                renderItem={renderItems}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}

export default Report
