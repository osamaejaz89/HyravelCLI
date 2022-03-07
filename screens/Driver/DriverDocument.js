import * as React from 'react';
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  Separator,
  Left,
  Right,
  Title,
  Body,
  Icon,
} from 'native-base';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

import {FlatList, Image, Dimensions, ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as firebase from "firebase";

export const DriverDocumenteScreen = ({navigation}) => {
  const [allImages, setAllImages] = React.useState([]);
  const [database64, selectbase64] = React.useState('');
  const [docurl, selectdocurl] = React.useState([]);
  const [path, selectpath] = React.useState([]);
  const [docname, selectdocname] = React.useState('');
  const userId = auth().currentUser.uid;
  const displayName = auth().currentUser.displayName;

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const openDoc = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      // Same code as in above section!
      console.log('Response = ', response);
 
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };
    selectdocname((docname) => response.fileName);
    // You can also display the image using data:
    const mybase64 = { uri: 'data:image/jpeg;base64,' + response.data };
    console.log('My Base64 of this file is: ' + 'data:image/jpeg;base64,' + response.data)
    selectbase64((database64) => `data:image/jpeg;base64,` + response.data)
    console.log('This is a source ' + auth().currentUser.uid)
  }
  
    });
  }
//   const openDoc = async() => {
//     const res = await DocumentPicker.pick({
//       type: [DocumentPicker.types.allFiles],
//     });
//     const fileName = res.uri.replace("file://","");
//     // firebase.storage().ref('/Documents/' + fileName);
//     selectdocurl(res.name);
//     selectpath(res.uri);
//     // console.log(res.name);

//     // if(res.uri){
//     //   const fileExtension = res.uri.split('.').pop();
//     //   console.log('EXT: ' + fileExtension);

//     //   var uuid = uuidv4();

//     //   const fileName = `${uuid}.${fileExtension}`;
//     //   console.log(fileName);

//     // }
//     RNFetchBlob.fs.readStream(
//         fileName,
//         'base64',
//         4095
//     ).then((ifstream)=>{
//         ifstream.open()
//         ifstream.onData((data) => {
//             // console.log("Check data ifstream ==>", data);
//             let base64 = `data:${res.type}; base64,` + data
//             console.log('It is the base64 ' + base64);
//             const param = {
//                 base64: base64,
//                 width: 300,
//                 height: 300,
//                 name: res.name,
//                 type: res.type,
//                 size: 7391,
//                 fileName: res.name
//             }
//             selectbase64(base64);

//             // var uploadTask = storageRef.put(fileName);

//             // uploadTask.on('state_changed', function(snapshot){

//             // }, function(){

//             // })
//             // console.log('Params document Select ==>', param)
//         })
//         ifstream.onError((err) => {
//             console.log('error', err)
//         })
//     })
//     console.log(
//       res.uri,
//       res.type, // mime type
//       res.name,
//       res.size
//     );

//     // if (DocumentPicker.isCancel(err)) {
//     //   // User cancelled the picker, exit any dialogs or menus and move on
//     // } else {
//     //   throw err;
//     // }
//     // try {
        
//     //   } catch (err) {
        
//     //   }
// }

  const dataURL = `${database64}`;
    const storageRef = storage().ref('DriverDocuments'+`/${userId}/`+ docname);
    //const data = path;

  const uploadImage = () => {
    const task = storageRef.putString(dataURL, storage.StringFormat.DATA_URL);
    //const task = storageRef.putFile(data);
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });
    task.then((imageSnapshot) => {
      console.log('Image Upload Successfully');
      storage()
        .ref(imageSnapshot.metadata.fullPath)
        .getDownloadURL()
        .then((downloadURL) => {
          setAllImages((allImages) => [...allImages, downloadURL]);
          database().ref(`DriverDocuments/${userId}`).update({
            imageURL: downloadURL,
            displayName
          });
        });
    });
  };

  const renderImages = (item) => {
    return (
      <Image
        source={{uri: item.item}}
        key={item.index}
        style={{
          width: Dimensions.get('window').width / 2,
          height: Dimensions.get('window').width / 2,
        }}
      />
    );
  };

  const getAllImages = () => {
    const ref = storage().ref('DriverDocuments'+`/${userId}/`);
    ref.list().then((result) => {
      setAllImages([]);
      result.items.forEach((itemsRef) => {
        itemsRef.getDownloadURL().then((downloadURL) => {
          setAllImages((allImages) => [...allImages, downloadURL]);
        });
      });
    });
  };
  return (
    <Container>
      <Header>
        <Left style={{flex: 0.2}}>
          <Button transparent icon onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{flex: 1, justifyContent: 'center'}}>
          <Title>Documents</Title>
        </Body>
        <Right style={{flex: 0.2}} />
      </Header>
      <Content>
      <Button transparent icon onPress={openDoc}>
          <Text>Select Image</Text>
        </Button>
        <Button transparent icon onPress={uploadImage}>
          <Text>Upload Image</Text>
        </Button>
        <Separator />
        <Button transparent icon onPress={getAllImages}>
          <Text>Get Image Library</Text>
        </Button>

        <FlatList
          data={allImages}
          horizontal={false}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderImages}
        />
      </Content>
    </Container>
  );
};