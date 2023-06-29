export const formatearCantidad = (cantidad: number) => {
  return cantidad.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'});
};

export const generarId = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const fecha = Date.now().toString(36);

  return random + fecha;
};

export const formatearFecha = (fecha: number | undefined) => {
  if (fecha) {
    const fechaNueva = new Date(fecha);
    return fechaNueva.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  }
  const fechaLocal = new Date();
  return fechaLocal.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};
