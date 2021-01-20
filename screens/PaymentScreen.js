import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Alert
} from 'react-native';
import * as firebase from 'firebase';
// import Button from '../../components/UI/Button';
import stripe from 'tipsi-stripe';

import Feather from "react-native-vector-icons/Feather";

stripe.setOptions({
  publishableKey:
    'pk_test_51I9pLfIr23z0Bl2uf1Q7f4gAWxGuYyYebmSiVXijOCbPrCW6qNaV4MrMrrAmXVEt8oyjZ6iNZUgXwffNlUevIIXy00YRc1qv4U',
});

const PaymentScreen = (props) => {
  const [cardName, setCardName] = useState('');
  const [amount, setAmount] = useState('');
  const [spareFees, setSpareFees] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [success, setSuccess] = useState(null);

  const next = () => {
    props.navigation.navigate('Ids', {
      amount: amount,
    });
  };
  const currenttotalamount = props.navigation.getParam('payment');
  console.log(currenttotalamount);
  const calculate = (text) => {
    setAmount(text);
    setSpareFees(text * 0.2);
    setTotalAmount(parseFloat(text) + parseFloat(text * 1));

    // if(amount < currenttotalamount){
    //   Alert('UnSufficient Amount');
    // }
  };

  const requestPayment = () => {
    var email = firebase.auth().currentUser.email;

    stripe.paymentRequestWithCardForm().then(async (stripeTokenInfo) => {
      try {
        const response = await fetch(
          `http://172.16.69.175:5000/api/doPayment/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              amount: totalAmount,
              tokenId: stripeTokenInfo.tokenId,
              email: email,
            }),
          },
        ).then(() => {
          setSuccess(true);
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <View style={styles.screen}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4%',
        }}>
        <View style={styles.header}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: 14,
            }}>
            PAYMENT INFORMATION
          </Text>
        </View>
      </View>

      <View style={styles.paymentInfo}>
        <ScrollView>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 2,
              color: '#4E4D4D',
              fontWeight: '700',
              marginTop: 25,
            }}>
            Name on card
          </Text>
          <View style={{ ...styles.cardNum, borderRadius: 8, elevation: 1 }}>
            <TextInput
              style={styles.cardNumText}
              id="cardName"
              label="cardName"
              keyboardType="default"
              required
              autoCapitalize="none"
              value={cardName}
              onChangeText={(text) => setCardName(text)}
            />
          </View>

          <Text
            style={{
              fontSize: 15,
              marginLeft: 2,
              color: '#4E4D4D',
              fontWeight: '700',
              marginTop: 25,
            }}>
            Amount to transfer
          </Text>
          <View style={{ ...styles.cardNum, borderRadius: 8, elevation: 1 }}>
            <TextInput
              style={styles.cardNumText}
              id="amount"
              label="amount"
              keyboardType="decimal-pad"
              required
              autoCapitalize="none"
              value={amount}
              onChangeText={(text) => calculate(text)}
            />
          </View>

          <View
            style={{
              ...styles.cardNum,
              borderRadius: 8,
              elevation: 1,
              marginTop: 10,
              padding: 15,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, color: '#4E4D4D', fontWeight: '700' }}>
                Total Amount =
              </Text>
              <Text style={{ fontSize: 15, color: '#4E4D4D', marginLeft: 5 }}>
                Rs. {amount ? amount : 0}
              </Text>
            </View>

            {/* <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, color: '#4E4D4D', fontWeight: '700' }}>
                Hyravel fees =
              </Text>
              <Text style={{ fontSize: 15, color: '#4E4D4D', marginLeft: 5 }}>
                Rs. {spareFees ? spareFees : 0}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, color: '#4E4D4D', fontWeight: '700' }}>
                Total amount =
              </Text>
              <Text style={{ fontSize: 15, color: '#4E4D4D', marginLeft: 5 }}>
                Rs. {totalAmount ? totalAmount : 0}
              </Text>
            </View> */}
          </View>
          <Text style={{ color: '#929191', marginTop: 6, marginLeft: 2 }}>
            {/* 20% of your amount will be charged as Hyravel fees. */}
          </Text>
        </ScrollView>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {!success ? (
          <Button title='Pay' onPress={requestPayment} />
        ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 19, marginBottom: 5, fontWeight: 'bold' }}>
                Payment Successful!
            </Text>
              <Feather name="check-circle" color="green" size={45} />

              <TouchableOpacity style={styles.next} onPress={next}>
                <Text style={styles.buttonText}>Proceed</Text>
                <Feather name='arrow-right' size={23} color={'#07104C'} />
              </TouchableOpacity>
            </View>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },

  paymentInfo: {
    marginLeft: 25,
    marginTop: 25,
    height: '53%',
  },

  header: {
    backgroundColor: '#f3a005',
    width: '50%',
    color: '#07104C',
    marginBottom: '2%',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardNum: {
    borderColor: '#cfd7df',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '90%',
    padding: 0,
    borderWidth: 1,
    marginTop: 5,
  },

  cardNum2: {
    borderColor: '#cfd7df',
    width: '45%',
    padding: 0,
    borderWidth: 1,
    marginTop: -1,
  },

  cardNumText: {
    fontSize: 15,
    padding: 9,
  },

  next: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '23%',
    justifyContent: 'space-between',
    top: 20,
  },

  buttonText: {
    fontSize: 18,
    color: '#07104C',
  },
});

export default PaymentScreen;
