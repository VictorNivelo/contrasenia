function EntradaContrasena() {
    const [valorEntrada, setValorEntrada] = React.useState('');
    const [esVisible, setEsVisible] = React.useState(true);
    const [valorMostrado, setValorMostrado] = React.useState('');
    const [estaAnimando, setEstaAnimando] = React.useState(false);
    const iniciarAnimacion = () => {
        if (!valorEntrada) return;
        setEstaAnimando(true);
        let contador = 0;
        const intervaloAnimacion = setInterval(() => {
            const caracteresAleatorios = Array.from(valorEntrada).map(() => {
                const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                return caracteres[Math.floor(Math.random() * caracteres.length)];
            }).join('');
            setValorMostrado(caracteresAleatorios);
            contador++;
            if (contador >= 10) {
                clearInterval(intervaloAnimacion);
                setValorMostrado(esVisible ? valorEntrada : '*'.repeat(valorEntrada.length));
                setEstaAnimando(false);
            }
        }, 50);
    };
    const manejarCambioEntrada = (e) => {
        const nuevoValor = e.target.value;
        if (!esVisible && nuevoValor.length < valorEntrada.length) {
            setValorEntrada(valorEntrada.slice(0, -1));
        } else if (!esVisible && nuevoValor.length > valorEntrada.length) {
            setValorEntrada(valorEntrada + nuevoValor.slice(-1));
        } else {
            setValorEntrada(nuevoValor);
        }
        setValorMostrado(esVisible ? nuevoValor : '*'.repeat(nuevoValor.length));
    };
    const alternarVisibilidad = () => {
        const nuevaVisibilidad = !esVisible;
        setEsVisible(nuevaVisibilidad);
        if (!estaAnimando) {
            iniciarAnimacion(nuevaVisibilidad);
        }
    };
    const obtenerValorMostrado = () => {
        if (estaAnimando) {
            return valorMostrado;
        }
        return esVisible ? valorEntrada : '*'.repeat(valorEntrada.length);
    };
    return (
        <div className="contrasenia-contenedor">
            <label>Contraseña</label>
            <div className="contrasenia-input">
                <input
                    type="text"
                    value={obtenerValorMostrado()}
                    onChange={manejarCambioEntrada}
                    placeholder="Ingresa tu contraseña"
                />
                <button onClick={alternarVisibilidad} disabled={!valorEntrada}>
                    <i className={`fas fa-eye${esVisible ? '-slash' : ''}`}></i>
                    {esVisible ? 'Ocultar' : 'Mostrar'}
                </button>
            </div>
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EntradaContrasena />);