import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '~/constants/Colors';

export default function Loading({ loading, message }) {
  return (
    <View loading={loading} style={styles.Container}>
      <Spinner
        visible={loading}
        textContent={message}
        overlayColor="rgba(255,255,255,0.9)"
        textStyle={styles.SpinnerTextStyle}
        color={Colors.COLORS.BLACK}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  SpinnerTextStyle: {
    color: Colors.COLORS.BLACK,
  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

Loading.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.string.isRequired,
};

Loading.defaultProps = {
  loading: false,
};
