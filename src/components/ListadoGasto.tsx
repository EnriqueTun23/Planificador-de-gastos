import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {GastoProps} from '../../App';
import GastoItem from './Gasto/GastoItem';

type ListadoGastoProps = {
  gastos: GastoProps[];
  gastosFiltrados: GastoProps[];
  filtro: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGasto: React.Dispatch<React.SetStateAction<GastoProps>>;
};

const ListadoGasto = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}: ListadoGastoProps) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>
      {filtro
        ? gastosFiltrados.map(gasto => (
            <GastoItem
              gastoItem={gasto}
              key={gasto.id}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))
        : gastos.map(gasto => (
            <GastoItem
              gastoItem={gasto}
              key={gasto.id}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))}
      {(gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
        <Text style={styles.noGasto}>No hay gastos</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 20,
    marginBottom: 100,
  },
  titulo: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    color: '#64748B',
    marginTop: 20,
  },
  noGasto: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});
export default ListadoGasto;
