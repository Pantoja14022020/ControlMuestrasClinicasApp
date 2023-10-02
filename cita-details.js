const citaSeleccionada = JSON.parse(localStorage.getItem('citaSeleccionada')).toUpperCase();
const pacienteSeleccionado = JSON.parse(localStorage.getItem('pacienteSeleccionado')).toUpperCase();
const urlGetCitasPaciente = `https://clinicalserviceapi.onrender.com/api/paciente-cita/citas/paciente/${pacienteSeleccionado}`;
const loaderAnimation = document.getElementById('loader-animation');//Selecciono el loader que hice



//Esto es obtener las citas del paciente
$.ajax({
    url: urlGetCitasPaciente,
    type: 'GET',
    success: function( {citas} ) {
        
        const cita = citas.filter(cita => cita.id_cita == citaSeleccionada);
        
        let {
            fecha, peso, imc, sobrepeso, cc, pa_sistolica, pa_diastolica, gluc_ayuno, gluc_casual, hba1c,
            fondo_de_ojo, revision_pie, colesterol_total_mg_dl, colesterol_ldl_mg_dl, colesterol_hdl_mg_dl,
            trigliceridos_mg_dl, microalbuminuria, creatinina, no_farmacologico, farmacologicos, GAMEC,
            complicaciones, grado_adiccion_al_tabaco, referencia, motivo_baja, vacuna_antiinfluenza, dm,
            hta, obe, dlp, sm
        } = cita[0];

        sobrepeso = (sobrepeso) ? "Si lo padece" : "No la padece";
        fondo_de_ojo = (fondo_de_ojo) ? "Aplicado" : "No aplicado";
        GAMEC = (GAMEC) ? "Aplica" : "No aplica";
        vacuna_antiinfluenza = (vacuna_antiinfluenza) ? "Lo padece" : "No la padece";






        //Selecciono los contenedores donde aparece o pintare la informacion
        //Hipertension
        const datosHipertension = document.getElementById('datos-hipertension');
        const htmlDatosHipertension = `
            <b>PA Sistolica:<p>${pa_sistolica}</p></b>
            <b>PA Diastolica:<p>${pa_diastolica}</p></b>
        `;
        datosHipertension.innerHTML = htmlDatosHipertension;
        //Glucosa
        const datosGlucosa = document.getElementById('datos-glucosa');
        const htmlDatosGlucosa = `
            <b>Glucosa Casual:<p>${gluc_casual}</p></b>
            <b>Glucosa Ayuno:<p>${gluc_ayuno}</p></b>
        `;
        datosGlucosa.innerHTML = htmlDatosGlucosa;
        //Colesterol
        const datosColesterol = document.getElementById('datos-colesterol');
        const htmlDatosColesterol = `
            <div>
                <b>Trigliceridos mg/dl:<p>${trigliceridos_mg_dl}</p></b>
                <b>Colesterol hdl mg/dl:<p>${colesterol_hdl_mg_dl}</p></b>
            </div>
            <div>
                <b>Colesterol ldl mg/dl:<p>${colesterol_ldl_mg_dl}</p></b>
                <b>Colesterol total mg/dl:<p>${colesterol_total_mg_dl}</p></b>
            </div>
        `;
        datosColesterol.innerHTML = htmlDatosColesterol;
        //Aqui muestro los demas datos
        const datosClinicos = document.getElementById('datos-clinicos');
        const htmlDatosClinicos = `
            <div><b>Peso: </b><p>${peso}kg</p></div>
            <div><b>IMC: </b><p>${imc}</p></div>
            <div><b>Tiene sobrepeso: </b><p>${sobrepeso}</p></div>
            <div><b>CC: </b><p>${cc}</p></div>
            <div><b>HBA1C: </b><p>${hba1c}</p></div>
            <div><b>Se aplico fondo de ojo: </b><p>${fondo_de_ojo}</p></div>
            <div><b>Estado de pies: </b><p>${revision_pie}</p></div>
            <div><b>Microalbuminuria: </b><p>${microalbuminuria}</p></div>
            <div><b>Creatinina: </b><p>${creatinina}</p></div>
            <div><b>Sugerencias</b><p>${no_farmacologico}</p></div>
            <div><b>Medicametos recetados: </b><p>${farmacologicos}</p></div>
            <div><b>GAMEC: </b><p>${GAMEC}</p></div>
            <div><b>Complicaciones: </b><p>${complicaciones}</p></div>
            <div><b>Grado de adicción al tabaco:</b><p>${grado_adiccion_al_tabaco}</p></div>
            <div><b>Referencia: </b><p>${referencia}</p></div>
            <div><b>Motivo de baja: </b><p>${motivo_baja}</p></div>
            <div><b>Tiene vacuna antinfluenza: </b><p>${vacuna_antiinfluenza}</p></div>
            <div><b>Diabetes controlada: </b><p>${dm}</p></div>
            <div><b>Hipertension controlada: </b><p>${hta}</p></div>
            <div><b>Obesidad controlada: </b><p>${obe}</p></div>
            <div><b>Dislipidemia controlada: </b><p>${dlp}</p></div>
            <div><b>Sindrome metabolico controlada: </b>${sm}</div>
        `;
        datosClinicos.innerHTML = htmlDatosClinicos;



        loaderAnimation.classList.add('hide');
    },
    error: function(xhr, status, error) {
        console.log("No se pudo hacer la peticion para obtener citas en interfaz cita-details")
    }
});
