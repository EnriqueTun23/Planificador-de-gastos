import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import globalStyles from '../styles';
import {formatearCantidad} from '../helpers';
import {GastoProps} from '../../App';

type Control = {
  presupuesto: number;
  gastos: GastoProps[];
  resetApp: () => void;
};
const ControlPresupuesto = ({presupuesto, gastos, resetApp}: Control) => {
  const [disponible, setDisponible] = useState<number>(0);
  const [gastado, setGastado] = useState<number>(0);
  const [porcentaje, setPorcentaje] = useState<number>(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total: number, g) => parseInt(g.cantidad, 10) + total,
      0,
    );

    const totalDisponible = presupuesto - totalGastado;

    const nuevoProcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setPorcentaje(nuevoProcentaje);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos, presupuesto]);

  return (
    <View style={styles.container}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          duration={1000}
          radius={150}
          valueSuffix={'%'}
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={15}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={15}
        />
      </View>
      <View style={styles.contenedorTexto}>
        <Pressable style={styles.btnReiniciar} onLongPress={resetApp}>
          <Text style={styles.txtReiniciar}>Reiniciar app</Text>
        </Pressable>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
  btnReiniciar: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 8,
  },
  txtReiniciar: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default ControlPresupuesto;
