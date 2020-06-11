import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import Modal from 'react-native-modal';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import { Dropdown } from 'react-native-material-dropdown';
import Imagens from '~/constants/Images';
import Colors from '~/constants/Colors';

export default function LancamentosCaixa({ visible, close }) {
  const listRef = useRef();

  const [valorTransacao, setValorTransacao] = useState(0);
  const [tipoLancamento, setTipoLancamento] = useState(0);

  const data = [
    {
      value: 'Sangria',
    },
    {
      value: 'Suprimento',
    },
    {
      value: 'Saldo Inicial',
    },
  ];

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}
    >
      <Modal
        isVisible={visible}
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Dropdown
            label="Tipo de Lançamento"
            textColor={Colors.COLORS.GRAY}
            baseColor={Colors.COLORS.WHITE}
            itemColor={Colors.COLORS.GRAY}
            fontSize={30}
            data={data}
            value="Saldo Inicial"
            ref={listRef}
            onChangeText={() =>
              setTipoLancamento(listRef.current.selectedIndex())
            }
          />

          {/* <NumericInput
            type="decimal"
            decimalPlaces={2}
            value={valorTransacao}
            onUpdate={setValorTransacao}
            placeholder="0,00"
            placeholderTextColor={Colors.COLORS.WHITE}
            keyboardType="phone-pad"
            returnKeyType="send"
            style={{
              flex: 1,
              margin: 8,
              color: Colors.COLORS.WHITE,
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              borderColor: Colors.COLORS.GRAY,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          /> */}

          <TouchableOpacity
            style={{
              margin: 10,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor: Colors.COLORS.BUTTON_SUCESS,
            }}
            onPress={() => alert(tipoLancamento)}
          >
            <Text
              style={{
                color: Colors.COLORS.WHITE,
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              Gravar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
