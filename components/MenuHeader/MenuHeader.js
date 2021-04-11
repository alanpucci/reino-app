import React from 'react'
import { Body, Header, Icon, Left, Right, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'

const MenuHeader = ({ title, onPress, icon }) => {
    return (
        <View >
            <Header>
                <Left style={{ flex: 0.2 }}>
                    <Icon name={icon} style={{ color: 'white' }} onPress={onPress} />
                </Left>
                <Body style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>{title}</Text>
                </Body>
                <Right style={{ flex: 0.2 }}>
                </Right>
            </Header>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'red',
        paddingBottom: 10
    }
})

export default MenuHeader
