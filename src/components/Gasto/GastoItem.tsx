import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {GastoProps} from '../../../App';
import globalStyles from '../../styles';
import {formatearCantidad, formatearFecha} from '../../helpers';

type GastoItemProps = {
  gastoItem: GastoProps;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGasto: React.Dispatch<React.SetStateAction<GastoProps>>;
};

type diccionarioIconosProps = Record<string, any>;

const diccionarioIconos: diccionarioIconosProps = {
  ahorro: require('../../img/icono_ahorro.png'),
  comida: require('../../img/icono_comida.png'),
  casa: require('../../img/icono_casa.png'),
  gastos: require('../../img/icono_gastos.png'),
  ocio: require('../../img/icono_ocio.png'),
  salud: require('../../img/icono_salud.png'),
  suscripciones: require('../../img/icono_suscripciones.png'),
};

const GastoItem = ({gastoItem, setModal, setGasto}: GastoItemProps) => {
  const {nombre, categoria, cantidad, fecha} = gastoItem;
  const handleActions = () => {
    setModal(true);
    setGasto(gastoItem);
  };
  return (
    <Pressable onLongPress={handleActions}>
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          <View style={styles.contenedorImagen}>
            <Image
              style={styles.imagen}
              source={diccionarioIconos[categoria]}
            />
            <View style={styles.contenedorTexto}>
              <Text style={styles.categoria}>{categoria}</Text>
              <Text style={styles.nombre}>{nombre}</Text>
              <Text style={styles.fecha}>{formatearFecha(fecha && fecha)}</Text>
            </View>
          </View>
          <Text style={styles.cantidad}>
            {formatearCantidad(parseInt(cantidad, 10))}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.container,
    marginBottom: 20,
  },
  contenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contenedorImagen: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contenedorTexto: {
    flex: 1,
  },
  categoria: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 20,
    fontWeight: '800',
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  fecha: {
    fontWeight: '700',
    color: '#DB2777',
  },
});

export default GastoItem;
