import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Modal,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';

import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGasto from './src/components/ListadoGasto';
import {generarId} from './src/helpers';
import {FiltroData} from './src/components/Filtro';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type GastoProps = {
  nombre: string;
  cantidad: string;
  categoria: string;
  id?: string | undefined;
  fecha?: number | undefined;
};

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState<boolean>(false);
  const [presupuesto, setPresupuesto] = useState<number>(0);
  const [gastos, setGastos] = useState<GastoProps[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [gasto, setGasto] = useState<GastoProps>({} as GastoProps);

  const [filtro, setFiltro] = useState<string>('');

  const [gastosFiltrados, setGastosFiltrados] = useState<GastoProps[]>([]);

  useEffect(() => {
    const getPresupuesto = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem('panificador_presupuesto')) ?? '0';
        if (parseInt(presupuestoStorage, 10) > 0) {
          setPresupuesto(parseInt(presupuestoStorage, 10));
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPresupuesto();
  }, []);

  useEffect(() => {
    const getGasto = async () => {
      try {
        const newgastos = await AsyncStorage.getItem('panificador_gastos');
        setGastos(newgastos ? JSON.parse(newgastos) : []);
      } catch (error) {
        console.log(error);
      }
    };
    getGasto();
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      const savePresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem(
            'panificador_presupuesto',
            JSON.stringify(presupuesto),
          );
        } catch (e) {
          console.log(e);
        }
      };
      savePresupuestoStorage();
    }
  }, [isValidPresupuesto, presupuesto]);

  useEffect(() => {
    const saveGastos = async () => {
      try {
        await AsyncStorage.setItem(
          'panificador_gastos',
          JSON.stringify(gastos),
        );
      } catch (error) {
        console.log(error);
      }
    };
    saveGastos();
  }, [gastos]);

  const handleNewPresupuesto = (data: number) => {
    if (data > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0', [{text: 'Ok'}]);
    }
  };

  const handleGasto = (gasto: GastoProps) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (gasto.id) {
      const gastoActulizado = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastoActulizado);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setModal(!modal);
  };
  const removeGasto = (id: string | undefined) => {
    if (id) {
      Alert.alert(
        '¿Deseas eliminar este gasto?',
        'Un gasto eliminado no se puede recuperar',
        [
          {text: 'No', style: 'cancel'},
          {
            text: 'Si, eliminar',
            onPress: () => {
              const gastosActualizados = gastos.filter(
                gState => gState.id !== id,
              );
              setGastos(gastosActualizados);
              setModal(!modal);
              setGasto({} as GastoProps);
            },
          },
        ],
      );
    }
  };

  const resetApp = () => {
    Alert.alert(
      '¿Desear resetear la app?',
      'Esto eliminará presupuesto y gastos',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Si, eliminar',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValidPresupuesto(false);
              setPresupuesto(0);
              setGastos([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              resetApp={resetApp}
              presupuesto={presupuesto}
              gastos={gastos}
            />
          ) : (
            <NuevoPresupuesto
              handleNewPresupuesto={handleNewPresupuesto}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <FiltroData
              setGastosFiltrados={setGastosFiltrados}
              gastos={gastos}
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGasto
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
            />
          </>
        )}
        {isValidPresupuesto && (
          <Pressable onPress={() => setModal(!modal)}>
            <Image
              style={styles.img}
              source={require('./src/img/nuevo-gasto.png')}
            />
          </Pressable>
        )}
      </ScrollView>

      {modal && (
        <Modal
          visible={modal}
          animationType="fade"
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <FormularioGasto
            gasto={gasto}
            setModal={setModal}
            setGasto={setGasto}
            handleGasto={handleGasto}
            removeGasto={removeGasto}
          />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  img: {
    width: 60,
    height: 60,
    position: 'absolute',
    // top: -150,
    bottom: 20,
    right: 25,
  },
});

export default App;
