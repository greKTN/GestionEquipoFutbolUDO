{/*estos import son solo para las pruebas*/}
import RegistroPage from "./pages/registro";
import {subidaArchivos, obtenerArchivo} from "./componentes/subidaArchivos";

function App() {
  
  return (
    <div className="App">
      <RegistroPage />
      {/*esta parte es solo para probar que si se puede subir el archivo*/}
      <input type="file" onChange={(e) => {
        if(e.target.files && e.target.files.length > 0) {
          const archivo = e.target.files[0];
          subidaArchivos(archivo).then(() => {
            obtenerArchivo(archivo);
          });
        }
      }}></input>
    </div>
  )
}

export default App
