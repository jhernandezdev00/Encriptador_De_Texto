const velAnimacion = 100;
let currentIndex = 0;


function animacion_TituloEncriptar(){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const titulo_bar = "Encriptador de Texto";
    const titulo_element = document.getElementById("barra-titulo")
    
    if (currentIndex <= titulo_bar.length){
        let Texto_Mostrar = "";

        for (let i=0; i< titulo_bar.length; i++){
            if(i<currentIndex){
                Texto_Mostrar += titulo_bar[i];
            }else{
                Texto_Mostrar += caracteres[Math.floor(Math.random()* caracteres.length)]
            }
        }

        titulo_element.textContent = Texto_Mostrar;
        currentIndex++;
        setTimeout(animacion_TituloEncriptar, velAnimacion);
    }
}

animacion_TituloEncriptar();

/// FUNCIONES

const caracteres_cifrado = 'abcdefghijklmnopqrstuvwxyz0123456789';

const textencriptador = document.getElementById('encriptado');
const clave_Encriptado = (document.getElementById('clave_cifrado'));
const btn_encriptado = document.getElementById('button-encriptar');
const txt_desencriptado = document.getElementById('encriptado');
const btn_desencriptado = document.getElementById('button-desencriptar');
const persona_encriptado = document.getElementById('person-encrip');
const area_desencriptado = document.getElementById('desencriptado')
const texto_area = document.getElementById('titulo-desencr');
const btn_copiar = document.getElementById('btn_copiar');

function limpiar_texto(value){
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function limpiar_clave(value){
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

textencriptador.addEventListener('input',function() {
    this.value = limpiar_texto(this.value);
});

clave_Encriptado.addEventListener('input',function(){
    this.value = limpiar_clave(this.value)
});

function encriptar_texto(texto, llave){
    let encriptado = '';

    for (let i=0; i< texto.length; i++){
        const char = texto[i];
        const charIndex = caracteres_cifrado.indexOf(char)

        if (charIndex === -1){
            encriptado += char;
        }else{
            const llaveChar = llave[i % llave.length];
            const llaveindex = caracteres_cifrado.indexOf(llaveChar);
            const newIndex = (charIndex+llaveindex) % caracteres_cifrado.length
            encriptado += caracteres_cifrado[newIndex]; 
        }
    }
    return encriptado
}

function desencriptar_texto(texto, llave){
    let desencriptado = '';

    for (let i=0; i< texto.length; i++){
        const char = texto[i];
        const charIndex = caracteres_cifrado.indexOf(char);

        if (charIndex === -1){
            desencriptado += char;
        }else{
            const llaveChar = llave[i % llave.length];
            const llaveindex = caracteres_cifrado.indexOf(llaveChar);

            let nIndex = (charIndex-llaveindex) % caracteres_cifrado.length;
            if (nIndex<0) nIndex += caracteres_cifrado.length;
            
            desencriptado += caracteres_cifrado[nIndex];
        }
    }
    return desencriptado;
}

btn_encriptado.addEventListener('click', function(){
    const key_encriptado = clave_Encriptado.value;
    const txt_sinEncriptar = txt_desencriptado.value;

    if (key_encriptado.length===0 || txt_sinEncriptar.length === 0){
        console.log("Cadena Vacia");
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Uppps! Has dejado algún campo vacio"
          });
    }else{
        console.log(key_encriptado);
        console.log(txt_sinEncriptar);
        const texto_Encrip = encriptar_texto(txt_sinEncriptar,key_encriptado);
        persona_encriptado.style.display="none";
        area_desencriptado.style.display="inline-block";
        area_desencriptado.textContent = texto_Encrip;
        texto_area.style.display = "none";
        //console.log(texto_Encrip);
    }
});

btn_desencriptado.addEventListener('click', function(){
    const key_encriptado = clave_Encriptado.value;
    const texto = txt_desencriptado.value;

    if (key_encriptado.length===0 || texto.length === 0){
        console.log("Cadena Vacia");
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Uppps! Has dejado algun campo vacio"
          });

    }else{
        console.log(key_encriptado);
        console.log(texto);
        const texto_desncrip = desencriptar_texto(texto,key_encriptado);
        persona_encriptado.style.display="none"
        area_desencriptado.style.display="inline-block"
        area_desencriptado.textContent = texto_desncrip;
        texto_area.style.display = "none";
        //console.log(texto_desncrip);
    }
});

const copiarContenido = async() => {
    try{
        const text = document.getElementById('desencriptado').value;
        console.log(text)
        await navigator.clipboard.writeText(text);

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Texto Copiado"
          });

        console.log('Contenido copiado al portapeles');
    }catch (err){
        console.error('Error ak copiar: ',err);
    }
}