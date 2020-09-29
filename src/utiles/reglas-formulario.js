export const reglas = {
    correo: [
        {
            regex: '',
            mensaje: 'Debe llenar el campo'
        },
        {
            regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            mensaje: 'El correo no es valido'
        }
    ],
    contrasena: [
        {
            regex: '',
            mensaje: 'Debe llenar el campo'
        },
        {
            regex: /^[\s\S]{6,}$/,
            mensaje: 'La contraseña debe tener más de 6 caracteres'
        }
    ],
    nombre: [
        {
            regex: '',
            mensaje: 'Debe llenar el campo'
        }
    ],
    apellidos: [
        {
            regex: '',
            mensaje: 'Debe llenar el campo'
        }
    ],
    direccion: [
        {
            regex: '',
            mensaje: 'Debe llenar el campo'
        }
    ],
    codigoZip: [
        {
            regex: '',
            mensaje: 'Debe llenar el campo'
        }
    ],
    pais: [
        {
            regex: '',
            mensaje: 'Debe seleccionar un País'
        }
    ],
    estado: [
        {
            regex: '',
            mensaje: 'Debe seleccionar un Estado'
        }
    ],
    ciudad: [
        {
            regex: '',
            mensaje: 'Debe seleccionar un Ciudad'
        }
    ],
    telefono: [
        {
            regex: '',
            mensaje: 'Debe llenar el campo'
        }
    ],
}