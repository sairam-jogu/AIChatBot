import { StyleSheet, Text, View, Image,SafeAreaView } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import GlobalApi from '../../helpers/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';


export default function ChatScreen() {
    const param = useRoute().params;

    const [messages, setMessages] = useState([])
    const [loading,setLoading] = useState(false);
    const [selectedBot, setSelectedBot] = useState([]);
    

    useEffect(() => {
        // console.log(param.selected);
        setSelectedBot(param.selected);
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: param.selected?.image,
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
      setLoading(true)
      if(messages[0].text){
        getBotResp(messages[0].text)
      }
    }, [])

    const getBotResp = (msg) => {
        GlobalApi.getBotResponse(msg).then(resp => {
            // console.log(resp.data.response);
            if(resp.data?.response){
                setLoading(false)
                const chatBotResp = {
                    _id: Math.random() * (9999999-1),
                    text: resp.data?.response,
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: param.selected?.image,
                    },
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages,chatBotResp))
            } else {
                setLoading(false)
                const chatBotResp = {
                    _id: Math.random() * (9999999-1),
                    text: "Don't know! I can't do anything with it",
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: param.selected?.image,
                    },
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages,chatBotResp))
            }
           
        },
        error=>{
          
        })
        
    }

    const renderBubble = (props) => {
        return (
            <Bubble {...props} 
                wrapperStyle={{
                    right: {
                        backgroundColor: param.selected.primary,
                    },
                }}

                textStyle={{
                    right:{
                        // fontSize:20,
                        padding:2
                    },
                    left: {
                      color: param.selected.primary,
                      // fontSize:20,
                      padding:2
                    }
                }}
            
            />
        )
    }
    const  renderInputToolbar =(props)=> {
       return <InputToolbar {...props} 
       containerStyle={{
        padding:3,
        backgroundColor:'#fff',
        color:'black',
        }} 
        
        textInputStyle={{ color: "black" }}
         />
     }

     const  renderSend=(props)=> {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 10, marginBottom: 5}}>
                <FontAwesome name="send" size={24} color={param.selected.primary} resizeMode={'center'} />
                   
                </View>
            </Send>
        );
    }

    const renderHeader = () => (
    <View style={[styles.header,{backgroundColor: param.selected?.primary}]}>
        <Image
        source={{ uri: param.selected?.image }}
        style={styles.headerImage}
      />
      <Text style={styles.headerText}>{param.selected?.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
        {renderHeader()}
        <GiftedChat
            messages={messages}
            isTyping = {loading}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
    />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header: {
    flexDirection:'row',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: {pa}, // Set your desired background color
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Set your desired text color
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
})