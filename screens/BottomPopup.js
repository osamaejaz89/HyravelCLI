import {Modal,Dimensions, TouchableWithoutFeedback, StyleSheet, Text,View} from 'react-native';
import React from 'react';
import { ThemeColors } from 'react-navigation';
import { render } from 'react-dom';
import { FontAwesome5 } from "@expo/vector-icons";


const deviceHeight = Dimensions.get('window').height
export class BottomPopup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show : false
        }
    }

    show = () =>{
        this.setState({show : true})
    }

    close = () => {
        this.setState({show : false})
    }

    renderOutsideTouchable(onTouch){
        const view = <View style={{flex: 1, width: '100%'}}/>
        if (!onTouch) return view

        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width: '100%'}}>
                    {view}
            </TouchableWithoutFeedback>
        )
    }

    render(){
        let {show} = this.state
        const {onTouchOutside, title} = this.props

        return(
            <Modal 
            animationType={'slide'}
            transparent = {true}
            visible = {show}
            onRequestClose={this.close}>
            
            <View style={{flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end' }}> 
                {this.renderOutsideTouchable(onTouchOutside)}
                <View style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    paddingHorizontal: 10,
                    maxHeight: deviceHeight * 0.4,
                }}>

                    <View style={{justifyContent:'center', alignSelf: 'center',alignItems: 'center'}}>
                    <FontAwesome5 name="check-circle" size={40} color="#32CD32" style={{marginTop: 10}} />
                        <Text style={{
                            color: '#182E44',
                            fontSize: 28,
                            fontWeight: '500',
                            margin: 15
                        }}>
                           
                            {title}

                        </Text>
                    </View>

                </View>
            </View>
            </Modal>
            
        )
    }

}

