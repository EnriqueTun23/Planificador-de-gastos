import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles';
import {GastoProps} from '../../App';

type FiltroDataProps = {
  filtro: string;
  gastos: GastoProps[];
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
  setGastosFiltrados: React.Dispatch<React.SetStateAction<GastoProps[]>>;
};

export const FiltroData = ({
  filtro,
  setFiltro,
  gastos,
  setGastosFiltrados,
}: FiltroDataProps) => {
  useEffect(() => {
    if (filtro === '') {
      setGastosFiltrados([]);
    } else {
      const gastosFiltrados = gastos.filter(g => g.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro, setGastosFiltrados, gastos]);
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar gastos</Text>
      <Picker
        selectedValue={filtro}
        onValueChange={valor => {
          setFiltro(valor);
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
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.container,
    transform: [{translateX: 0}],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748B',
  },
});
