      // Configuración Firebase (Sustituye con tus datos)
      const firebaseConfig = {
        apiKey: "AIzaSyBJZP8IVUfAIW4WQW4P2aRW1PEI7SVvp_g",
        authDomain: "terapy-e10d1.firebaseapp.com",
        databaseURL: "https://terapy-e10d1-default-rtdb.firebaseio.com",
        projectId: "terapy-e10d1",
        storageBucket: "terapy-e10d1.appspot.com",
        messagingSenderId: "585078394619",
        appId: "1:585078394619:web:53f8bed6d0e27b3563ea5e"
        };
        
              // Inicializar Firebase
              const app = firebase.initializeApp(firebaseConfig);
              const db = firebase.database();
        
              // Función para buscar la patología en Firebase
              async function buscarPatologia() {
                  const patologiaNombre = document.getElementById('patologia-input').value.trim();
                  const resultadosDiv = document.getElementById('resultados');
                  resultadosDiv.innerHTML = ''; // Limpiar resultados previos
        
                  if (!patologiaNombre) {
                      resultadosDiv.innerHTML = '<p>Por favor ingresa un nombre de patología</p>';
                      return;
                  }
        
                  try {
                      const patologiaRef = firebase.database().ref(patologiaNombre);
        
                      // Usamos 'once' para obtener los datos una vez
                      patologiaRef.once('value', (snapshot) => {
                          if (snapshot.exists()) {
                              const data = snapshot.val();
        
                              // Mostrar la información de la patología
                              resultadosDiv.innerHTML = `
                                  <h5>${patologiaNombre}</h5>
                                  <ul class="collection">
                                      <li class="collection-item"><strong>Definición:</strong> ${data.Definicion}</li>
                                      <li class="collection-item"><strong>Causas:</strong> ${data.Causas}</li>
                                      <li class="collection-item"><strong>Síntomas:</strong> ${data.Sintomas}</li>
                                      <li class="collection-item"><strong>Tratamiento:</strong> ${data.Tratamiento}</li>
                                      <img src="${data.Img}" alt="${data.Img}" class="patologia-imagen">  
                                  </ul>
                              `;
                          } else {
                              resultadosDiv.innerHTML = `<p>No se encontró información para la patología "${patologiaNombre}".</p>`;
                          }
                      });
                  } catch (error) {
                      console.error('Error al buscar la patología:', error);
                      resultadosDiv.innerHTML = '<p>Error al obtener los datos. Intenta nuevamente.</p>';
                  }
              }

              function buscarPatologiaPorDefault(nombrePatologia) {
                document.getElementById('patologia-input').value = nombrePatologia; // Setea el valor en el input
                buscarPatologia(); // Llama a la función de búsqueda
            }
