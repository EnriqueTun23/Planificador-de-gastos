import React, {Dispatch, SetStateAction} from 'react';

import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import globalStyles from '../styles';

type NuevoPresupuestoProp = {
  handleNewPresupuesto: (presupuesto: number) => void;
  presupuesto: number;
  setPresupuesto: Dispatch<SetStateAction<number>>;
};

const NuevoPresupuesto = ({
  handleNewPresupuesto,
  presupuesto,
  setPresupuesto,
}: NuevoPresupuestoProp) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir presupuesto </Text>
      <TextInput
        keyboardType="numeric"
        value={presupuesto.toString()}
        onChangeText={e => setPresupuesto(Number(e))}
        placeholder="Agrega tu presupuesto: Ej. 300"
        style={styles.input}
      />
      <Pressable
        style={styles.btn}
        onPress={() => handleNewPresupuesto(presupuesto)}>
        <Text style={styles.btnText}>Agregar presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.container,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B85F6',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default NuevoPresupuesto;
