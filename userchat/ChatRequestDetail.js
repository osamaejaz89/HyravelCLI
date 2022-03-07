import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useState} from 'react';
// import SenderPost from '../../components/UI/SenderPost';
// import TravelerPost from '../../components/UI/TravelerPost';

const chatRequestDetail = (props) => {
  const userId = props.navigation.getParam('userId');
  const driverId = props.navigation.getParam('driverId');

  // const selectedTravelers = useSelector((state) => state.travelers.travelers);
  // const selectedSenders = useSelector((state) => state.senders.senders);

  /*----------------------------------------------------------finding Receiver's Request------------------------------------------*/
  // const receiverInTraveler = selectedTravelers.filter((req) => {
  //   return req.trReq_id === receiverRequestId;
  // });

  // const receiverInSender = selectedSenders.filter((req) => {
  //   return req.sndReq_id === receiverRequestId;
  // });

  /*----------------------------------------------------------finding Negotiator's Request------------------------------------------*/
  // const negotiatorInTraveler = selectedTravelers.filter((req) => {
  //   return req.uniqueReqId === senderRequestId;
  // });

  // const negotiatorInSender = selectedSenders.filter((req) => {
  //   return req.uniqueReqId === senderRequestId;
  // });

  // const [myRequest, setMyRequest] = useState(
  //   receiverInTraveler.length !== 0
  //     ? receiverInTraveler
  //     : receiverInSender.length !== 0
  //     ? receiverInSender
  //     : [],
  // );
  // const [negotiatorRequest, setNegotiatorRequest] = useState(
  //   negotiatorInTraveler.length !== 0
  //     ? negotiatorInTraveler
  //     : negotiatorInSender.length !== 0
  //     ? negotiatorInSender
  //     : [],
  // );

  // console.log(myRequest[0]);

  return (
    <View style={styles.screen}>
      <View
        style={{
          height: '40%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 25,
        }}>
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Your Request
        </Text>
        {/* {myRequest[0].snd_id ? (
          <SenderPost
            pack_weight={myRequest[0].pack_weight}
            pack_type={myRequest[0].pack_type}
            snd_source={myRequest[0].snd_source}
            snd_dest={myRequest[0].snd_dest}
            snd_arr_date={myRequest[0].snd_arr_date}
            snd_start_rate={myRequest[0].snd_start_rate}
            snd_final_rate={myRequest[0].snd_final_rate}
            snd_f_name={myRequest[0].snd_f_name}
            snd_l_name={myRequest[0].snd_l_name}
            snd_id={myRequest[0].snd_id}
            sndReq_id={myRequest[0].sndReq_id}
          />
        ) : myRequest[0].tr_id ? (
          <TravelerPost
            free_weight={myRequest[0].free_weight}
            dept_date={myRequest[0].dept_date}
            tr_source={myRequest[0].tr_source}
            tr_dest={myRequest[0].tr_dest}
            arr_date={myRequest[0].arr_date}
            tr_start_rate={myRequest[0].tr_start_rate}
            tr_final_rate={myRequest[0].tr_final_rate}
            tr_f_name={myRequest[0].tr_f_name}
            tr_l_name={myRequest[0].tr_l_name}
            tr_id={myRequest[0].tr_id}
            trReq_id={myRequest[0].trReq_id}
          />
        ) : (
          <View>
            <Text>Error!</Text>
          </View>
        )} */}
      </View>

      <View
        style={{height: '40%', justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Negotiator Request
        </Text>
        {/* {negotiatorRequest[0].snd_id ? (
          <SenderPost
            pack_weight={negotiatorRequest[0].pack_weight}
            pack_type={negotiatorRequest[0].pack_type}
            snd_source={negotiatorRequest[0].snd_source}
            snd_dest={negotiatorRequest[0].snd_dest}
            snd_arr_date={negotiatorRequest[0].snd_arr_date}
            snd_start_rate={negotiatorRequest[0].snd_start_rate}
            snd_final_rate={negotiatorRequest[0].snd_final_rate}
            snd_f_name={negotiatorRequest[0].snd_f_name}
            snd_l_name={negotiatorRequest[0].snd_l_name}
            snd_id={negotiatorRequest[0].snd_id}
            sndReq_id={negotiatorRequest[0].sndReq_id}
          />
        ) : negotiatorRequest[0].tr_id ? (
          <TravelerPost
            free_weight={negotiatorRequest[0].free_weight}
            dept_date={negotiatorRequest[0].dept_date}
            tr_source={negotiatorRequest[0].tr_source}
            tr_dest={negotiatorRequest[0].tr_dest}
            arr_date={negotiatorRequest[0].arr_date}
            tr_start_rate={negotiatorRequest[0].tr_start_rate}
            tr_final_rate={negotiatorRequest[0].tr_final_rate}
            tr_f_name={negotiatorRequest[0].tr_f_name}
            tr_l_name={negotiatorRequest[0].tr_l_name}
            tr_id={negotiatorRequest[0].tr_id}
            trReq_id={negotiatorRequest[0].trReq_id}
          />
        ) : (
          <View>
            <Text>Error!</Text>
          </View>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#F9F8F8',
  },
});

export default chatRequestDetail;
