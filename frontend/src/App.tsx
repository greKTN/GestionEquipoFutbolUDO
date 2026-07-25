{/*estos import son solo para las pruebas*/}
import Dashboard from "./pages/dashboard";
import {subidaArchivos, obtenerArchivo} from "./componentes/subidaArchivos";


function App() {
  
  return (
    <div className="App">
      <Dashboard />

      {/*esta parte es solo para probar que si se puede subir el archivo*/}
      <hr />
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
