import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Copyright } from '../Copyright';

import { styles } from './styles';

import successImg from '../../assets/success.png'

interface Props{
  onSendAnotherFeedback: () => void;
}

export function Success(props:Props) {
  return (
    <View style={styles.container}>
      <Image
        source={successImg}
        style={styles.image}
      />
      <Text style={styles.title}>
        Agradecemos o feedback
      </Text>
      <TouchableOpacity 
      style={styles.button}
      onPress={props.onSendAnotherFeedback}
      >
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>
      <Copyright />
    </View>
  );
}