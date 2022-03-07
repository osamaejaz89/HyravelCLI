import React from "react";
import { View,Button, Text, StyleSheet,Image, FlatList,StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import vwcars from  './vwcars';
import { ScrollView } from "react-native-gesture-handler";


export default class ListScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'#20232B'}}>
        <TouchableOpacity
          style={{ padding: 15, marginTop:30 }}
          onPress={this.props.navigation.openDrawer}
        >
          <FontAwesome5 name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: '#fff', fontWeight:'bold',textTransform:'uppercase', opacity:0.9, marginTop: -40, marginBottom:10, alignSelf:'center'}}>Select your Car</Text>
        <FlatList
        data = {vwcars}
        keyExtractor = {(item) => item.key}
        renderItem = {({item})=> 
        {
          return(
           
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.item}>
                <View>
                
                <Text style={{fontSize: 14,fontWeight:'bold',borderRadius: 12, opacity: 0.5,left:'88%', marginTop:-10}}>{item.category}</Text>
                  <Text style={styles.model}>{item.model}</Text>
                  <Text style={styles.desc}>{item.decription}</Text>
                  <Text style={{ fontSize: 12,
                          fontWeight: 'bold',
                          opacity: 0.6,
                          marginTop: -5,
                        }}>{item.year}</Text>

                  <Text style={{fontSize: 14, opacity: 0.5, marginTop:50}}>PKR</Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={{fontSize: 14, opacity: 0.5, marginTop:-6}}>/day</Text>
                  <TouchableOpacity style={styles.categoryBtn}>
                  {/* <View style={styles.categoryIcon}>
                  <Text style={{color: '#fff', fontWeight: '700'}}>BOOK</Text>
              </View> */}
              
                  </TouchableOpacity>
                </View>
              </View>
              {/* <Image source={{uri: item.image}} style={styles.image} /> */}
          <Image style={styles.image} source={item.image}/>
            </TouchableOpacity>
          )
        }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 200,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 20,
    right: '-5%',
    marginBottom: 5,
    padding: 15,
    backgroundColor: '#fff',
  },

  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    padding: 15,
    alignSelf: "center", 
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: '-170%',
    marginTop: -30,
    width: '40%',
    
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 80,
    height: 40,
    marginTop: -60,
    right: '-170%',
    backgroundColor: "#2d2942",
    borderRadius: 10,
  },
  model:{
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.6,
    marginTop: -10,
    textTransform: 'uppercase',
  },

  desc:{
    fontSize: 28,
    fontWeight: 'bold',
    opacity: 0.7,
    marginTop: -6,
  },
  
  image:{
    height: 200,
    width: '100%',
    marginTop: 20,
    position: 'absolute',
    right: '-30%',
    resizeMode: 'contain',
  },

  price:{
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: -10,
    color: '#A00050'
  }
});
