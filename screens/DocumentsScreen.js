import React, { useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import base64 from 'react-native-base64'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'


const openDoc = async() => {
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        // const fileName = res.uri.replace("file://","");
        // let data = ''
        // RNFetchBlob.fs.readStream(
        //     fileName,
        //     'base64',
        //     4095
        // ).then((ifstream)=>{
        //     ifstream.open()
        //     ifstream.onData((data) => {
        //         console.log("Check data ifstream ==>", data);
        //         let base64 = `data:${res.type}; base64,` + data
        //         const param = {
        //             base64: base64,
        //             width: 300,
        //             height: 300,
        //             name: res.name,
        //             type: res.type,
        //             size: 7391,
        //             fileName: res.name
        //         }
                
        //         console.log('Params document Select ==>', param)
        //     })
        //     ifstream.onError((err) => {
        //         console.log('error', err)
        //     })
        // })
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
          res
        );
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
}
const DocumentsScreen = () => {
    return(
        <View style = {styles.container}>
            <Button title = 'Image' onPress = {openDoc}/>
        </View>
    )

}

export default DocumentsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})