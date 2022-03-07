import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default class ReportScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View  style={{marginTop: 32, width: '13%'}}>

            <TouchableOpacity
              style={{ padding: 15 }}
              onPress={this.props.navigation.openDrawer}
            >
              <FontAwesome5 name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={require("../assets/mj.jpg")} />

            <Text style={styles.name}>Manish Jewlani</Text>
            <Text style={styles.userInfo}>manishj@gmail.com </Text>
            <Text style={styles.userInfo}>22 | Male</Text>
            <Text style={styles.userInfo}>Karachi</Text>
            
          </View>
            
          <View style={styles.details}>
            <Text style={styles.Dtitle}>27</Text>
            <Text style={styles.Dtitle}>27</Text>
            <Text style={styles.Dtitle}>27</Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.Ddetail}>Rides</Text>
            <Text style={styles.Ddetail}>Rides</Text>
            <Text style={styles.Ddetail}>Rides</Text>
            
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1d2228",
    height: 200,
  },

  details:{
    justifyContent:'space-between',
    flexDirection: 'row',
    width: '70%',
    alignSelf: 'center',
    top: -90,
  },

  container:{
    backgroundColor: '#fff',
  },

  Dtitle:{
    fontSize: 30,
    fontWeight: 'bold',
  },

  Ddetail:{
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.5,
  },

  headerContent: {
    padding: 30,
    alignItems: "center",
    marginTop: -25,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    top: "-45%",
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    color: "#000",
    top: '-40%',
    textTransform: 'uppercase',
    fontWeight: "bold",
  },
  userInfo: {
    fontSize: 16,
    color: "#000",
    opacity: 0.5,
    top: '-36%',
    fontWeight: "600",
    marginVertical: 2,
  },
  body: {
    backgroundColor: "#fff",
    height: 500,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
});
