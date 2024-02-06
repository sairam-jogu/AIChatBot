import { View, Text, StyleSheet, Image, FlatList, Button, TouchableOpacity, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatBotsData from '../../helpers/ChatBotsData';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const [chatBotsData,setChatBotsData] = useState([]);
    const [selectedBot,setSeletedBot] = useState({});
    const navigation = useNavigation();

    useEffect(()=>{
        setChatBotsData(ChatBotsData)
        setSeletedBot(ChatBotsData[0]);
    },[])
    console.log(selectedBot);

    const onBotPressed = (id) => {
        setSeletedBot(ChatBotsData[id-1])
    }
  return (
    <View style={styles.container}>
      <Text style={styles.heading} >Hello</Text>
      <Text style={[{color:selectedBot?.primary},styles.heading]}>{`I am ${selectedBot?.name}`}</Text>
      {selectedBot && selectedBot.image && (
                <Image source={{uri:selectedBot?.image}} style={styles.image}/>
            )}
      <Text style={styles.helping} >How Can I help You ?</Text>

      <View style={styles.listContainer}>
        <FlatList
            data={chatBotsData}
            renderItem={({item}) => selectedBot.id != item.id && (
                <TouchableOpacity onPress={() => onBotPressed(item?.id)}>
                    <Image source={{uri:item.image}} style={{height:50,width:50,margin:15}}/>
                </TouchableOpacity>
            )}
            horizontal={true}
        />
        <Text style={styles.choose}>Choose Any one</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('chat',{selected:selectedBot})}
      style={[{backgroundColor : selectedBot?.primary},styles.button,{width:Dimensions.get('screen').width*0.6}]}>
                <Text style={styles.buttonText}>Let's Chat</Text>
        </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop:90
    },
    heading:{
        fontSize: 36,
        fontWeight:'bold'
    },
    image:{
        width:150,
        height:150,
        marginTop:30
    },
    helping:{
        fontSize:32,
        marginTop:30
    },
    listContainer:{
        backgroundColor:'#f5f5f5',
        marginTop:25,
        alignItems:'center',
        height:150,
        padding:10,
        borderRadius:10,
    },
    choose:{
        color:'#1a6733',
        padding:15,
        fontSize:20
    },
    button:{
        padding:10,
        margin:40,
        alignItems:'center',
        borderRadius:100
    },
    buttonText:{
        fontSize:22,
        color:'#fff'

    }
});

export default HomeScreen