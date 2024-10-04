import { COLORS } from '@/constants/theme'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, View } from 'react-native'
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat'
import { IoIosSend } from "../assets/icons/io";
import getColors from '@/hooks/getColors'


export const renderInputToolbar = props => { 
    const backgroundColor = getColors('background')

    return(
    <InputToolbar
    {...props}
    containerStyle={{
        backgroundColor: backgroundColor,
        paddingVertical: 12,
        paddingHorizontal: 12,
        paddingBottom: 10,
        borderWidth: 0,
        borderColor: 'transparent',
    }}
    primaryStyle={{ alignItems: 'center' }}
    />
    )
}
export const renderActions = props => {
const inputTxt = getColors('inputtxt')
    return(
    <Actions
    {...props}
    containerStyle={{
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    }}
    icon={() => (
       <MaterialIcons name='add' size={26} color={inputTxt}/>
       )}
    options={{
        'Choose From Library': () => {
            console.log('Choose From Library')
        },
        Cancel: () => {
            console.log('Cancel')
        },
    }}
    optionTintColor="#222B45"
    />
    )
} 

export const renderComposer = props => {
    const textColor = getColors('text')
    const inputColor = getColors('inputbg')
    const inputTxt = getColors('inputtxt')
    return(
    <Composer
    {...props}
    textInputStyle={{
        color: textColor,
        backgroundColor: inputColor,
        borderRadius: 4,
        paddingHorizontal: 12,
        marginLeft: 0,
        marginRight: 0
    }}
    containerStyle={{

    }}
    placeholder='Message'
    placeholderTextColor={inputTxt}
    />
    )
}   
export const renderSend = props => {
    const sendColor = getColors('send');
    return(
    <Send
    {...props}
    disabled={false}
    containerStyle={{
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        marginLeft: 20
    }}
    >
        <View>
            <IoIosSend size={26} color={sendColor}/>
        </View>
    </Send>
    )
}
