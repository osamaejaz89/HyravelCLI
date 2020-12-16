import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import firebase from 'react-native-firebase'
import * as authActions from '../store/actions/auth';
import * as currentUserActions from '../store/actions/currentUser';
import {auth, database} from 'firebase';
// import {useNotification} from '../context/NotificationProvider';

const LoginScreen = () => {
  const [email, setemail] = useState('');
  const [error, setError] = useState();
  const [password, setpassword] = useState('');
  const selectedCurrentUser = useSelector(
    (state) => state.currentUser.currentUser,
  );

  const emailhandler = (enteredText) => {
    setemail(enteredText);
  };

  const passwordhandler = (enteredText) => {
    setpassword(enteredText);
  };

  const dispatch = useDispatch();


  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const updateDeviceToken = () => {
    if (selectedCurrentUser) {
      firebase
        .messaging()
        .getToken()
        .then(async (token) => {
          if (selectedCurrentUser.deviceToken !== token) {
            await database().ref('users').child(auth().currentUser.uid).update({
              deviceToken: token,
            });
          }
        });
    }
  };

  const handleLogin = async () => {
    setError(null);

    try {
      await dispatch(authActions.signin(email, password));
      await dispatch(
        currentUserActions.FetchCurrentUser(auth().currentUser.uid),
      );
      await updateDeviceToken();

      props.navigation.navigate({
        routeName: 'Home',
      });
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        err.message = 'Account does not exist!';
      } else if (err.code === 'auth/wrong-password') {
        err.message = 'Incorrect Password';
      }
      setError(err.message);
    }
  };

  const handleRegister = () => {
    props.navigation.navigate({
      routeName: 'Register',
    });
  };

  return (
    <ImageBackground
      source={require("../assets/long.jpg")}
      style={styles.image}
      animation={"adeInUpBig"}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}></Text>
        </View>

        <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Enter Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={emailhandler}
              initialValue=""
            />

            <Feather name="check-circle" color="green" size={20} />
          </View>

          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />

            <TextInput
              placeholder="Enter Password"
              style={styles.textInput}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={passwordhandler}
              initialValue=""
            />

            {/* <TouchableOpacity onPress={secureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity> */}
          </View>
          <Text
            style={{ color: "#009bd1", marginTop: 15, fontWeight: "bold" }}
          >
            Forgot Password?{" "}
          </Text>
          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 32 }}
            onPress={handleRegister}
          >
            <View>
              <Text style={{ color: "#414959", fontSize: 13 }}>
                New to
                <Text style={{ fontWeight: "bold", color: "#900C3F" }}>
                  {" "}
                  HYRAVEL?
                </Text>
                <Text style={{ fontWeight: "bold", color: "#E9446A" }}>
                  {" "}
                  Sign Up
                </Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            animation={"bounceIn"}
            onPress={handleLogin}
            
          >
          
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
              Login
            </Text>
          </TouchableOpacity>
          {/* <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{error}</Text>
            )}
          </View> */}
        </Animatable.View>
      </View>
    </ImageBackground>
  );
}
export default LoginScreen;

// export default class LoginScreen extends React.Component {
//   state = {
//     email: "",
//     password: "",
//     errorMessage: null,
//   };

//   handleLogin = () => {
//     const { email, password } = this.state;

//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .catch((error) => this.setState({ errorMessage: error.message }));
//   };
//   render() {
    
//   }
// }
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    height: 250,
    justifyContent: "center",
  },

  text_header: {
    color: "white",
    fontWeight: "600",
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  text_footer: {
    color: "#05735a",
    fontSize: 18,
    fontWeight: "bold",
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05735a",
  },

  button: {
    width: "100%",
    backgroundColor: "#E9446A",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
