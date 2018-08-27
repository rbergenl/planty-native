import React from 'react';
import {
  Button
} from 'react-native';

const SocialButton = (props) => {
  return (
    <Button title="Login with Google" onPress={props.handleClick} />
  );
}
export default SocialButton;
