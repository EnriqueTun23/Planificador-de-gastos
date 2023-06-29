import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import globalStyles from '../styles';
import {GastoProps} from '../../App';

type FormularioGastoProps = {
  gasto: GastoProps;
  setModal: Dispatch<SetStateAction<boolean>>;
  handleGasto: (gasto: GastoProps) => void;
  removeGasto: (id: string | undefined) => void;
  setGasto: React.Dispatch<React.SetStateAction<GastoProps>>;
};

const FormularioGasto = ({
  setModal,
  handleGasto,
  setGasto,
  gasto,
  removeGasto,
}: FormularioGastoProps) => {
  const [nombre, setNombre] = useState<string>('');
  const [cantidad, setCantidad] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [id, setId] = useState<string>();
  const [fecha, setFecha] = useState<number>();

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerBtn}>
        <Pressable
          style={[styles.btn, styles.btnCancelar]}
          onLongPress={() => {
            setModal(false);
            setGasto({} as GastoProps);
          }}>
          <Text style={styles.btnCancelarTxt}>Cancelar</Text>
        </Pressable>
        {!!id && (
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => removeGasto(gasto.id && gasto.id)}>
            <Text style={styles.btnCancelarTxt}>Eliminar</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
        </Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del gasto. ej. Comida"
            onChangeText={setNombre}
            value={nombre}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del gasto. ej. 300"
            keyboardType="numeric"
            onChangeText={setCantidad}
            value={cantidad}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Categoria gasto</Text>
          <Picker
            style={styles.input}
            selectedValue={categoria}
            onValueChange={valor => {
              setCategoria(valor);
            }}>
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Gastos varios" value="gastos" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="Suscripciones" value="suscripciones" />
          </Picker>
        </View>
        <Pressable
          style={styles.submitBtn}
          onPress={() =>
            handleGasto({
              nombre,
              cantidad,
              categoria,
              id,
              fecha,
            })
          }>
          <Text style={styles.submitBtnTxt}>
            {gasto?.nombre ? 'Guardar cambios' : 'Agregar gasto'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E60AF',
    flex: 1,
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formulario: {
    ...globalStyles.container,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginVertical: 30,
    color: '#647482',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#647482',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
  },
  submitBtn: {
    backgroundColor: '#3B82F5',
    padding: 10,
    marginTop: 20,
  },
  submitBtnTxt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btnCancelar: {
    backgroundColor: '#DB2771',
  },
  btnEliminar: {
    backgroundColor: 'red',
  },
  btnCancelarTxt: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 30,
    flex: 1,
  },
});

export default FormularioGasto;
