      // Configuración de Firebase
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

    // Obtener el parámetro 'patologia' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const nombrePatologia = urlParams.get('patologia');

    if (nombrePatologia) {
        // document.getElementById('titulo-patologia').innerText = nombrePatologia;
        
        // Referencia a la patología en Firebase
        const patologiaRef = db.ref(nombrePatologia);
        
        patologiaRef.once('value').then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Mostrar datos
            document.getElementById('titulo-patologia').innerText = data.Titulo || 'No disponible';
            document.getElementById('definicion').innerText = data.Definicion || 'No disponible';

            const factoresList = document.getElementById('factores-de-riesgo');
            (data.Factores_de_Riesgo || '').split('|').forEach(factor => {
              const li = document.createElement('li');
              li.innerText = factor.trim();
              factoresList.appendChild(li);
            });

            const sintomasList = document.getElementById('sintomas');
            (data.Sintomas || '').split('|').forEach(sintoma => {
              const li = document.createElement('li');
              li.innerText = sintoma.trim();
              sintomasList.appendChild(li);
            });

            const tratamientoList = document.getElementById('tratamiento');
            (data.Tratamiento || '').split('|').forEach(tratamiento => {
              const li = document.createElement('li');
              li.innerText = tratamiento.trim();
              tratamientoList.appendChild(li);
            });

            // Actualizar las imágenes dinámicamente con las URLs
            const imagen1 = document.getElementById('imagen1');
            if (data.Image1) {
              imagen1.src = data.Image1;
            } else {
              imagen1.style.display = 'none'; // Ocultar si no hay imagen
            }

            const imagen2 = document.getElementById('imagen2');
            if (data.Image2) {
              imagen2.src = data.Image2;
            } else {
              imagen2.style.display = 'none'; // Ocultar si no hay imagen
            }
          } else {
            document.getElementById('titulo-patologia').innerText = 'Patología no encontrada';
          }
        }).catch((error) => {
          console.error('Error al cargar la patología:', error);
          document.getElementById('titulo-patologia').innerText = 'Error al cargar los datos';
        });
      } else {
        document.getElementById('titulo-patologia').innerText = 'No se proporcionó ninguna patología';
      }
