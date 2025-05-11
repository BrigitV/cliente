$(document).ready(function () {
    /* Envío formulario */
    $('#btnCotizar').on('click', function (e) {
        e.preventDefault();
        /* Validar formulario */
        /* Validar nombres*/
        if ($('#nombre').val() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingrese su nombre.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        /* Validar apellidos*/
        if ($('#apellidos').val() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingrese su apellido.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        /* Validar fecha nacimiento*/
        if ($('#fechaNacimiento').val() == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingrese su fecha de nacimiento.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        /* Validar placa*/
        const placa = $('#placa').val().toUpperCase().trim();
        if (placa === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La placa no puede ir vacía.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        if (placa.length > 6) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La placa no puede tener más de 6 caracteres.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const placaRegex = /^[A-Z]{3}[0-9]{3}$/;
        if (!placaRegex.test(placa)) {
            Swal.fire({
                icon: 'error',
                title: 'Formato inválido',
                html: 'La placa debe tener el formato <b>ABC123</b>:<br>3 letras mayúsculas seguidas de 3 números.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        /* Crear json de los datos*/
        const datos = {
            nombre: $('#nombre').val(),
            apellidos: $('#apellidos').val(),
            fechaNacimiento: $('#fechaNacimiento').val(),
            placa: placa
        };

        $.ajax({
            url: 'http://localhost/proyecto-seguros/api-sga/cotizar',
            type: 'POST',
            contentType: 'application/json', // Envía datos como JSON
            data: JSON.stringify(datos),    // Convierte el objeto a JSON
            dataType: 'json',               // Espera una respuesta JSON
            success: function (response) {
                debugger;
                if (response.status == 400) {
                    mostrarResultados(response.status); 
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                } else if (response.status == 500) {
                    // Error: Notificar al usuario
                    mostrarResultados(response.status); 
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                } else if (response.status == 404) {
                    // Error: Notificar al usuario
                    mostrarResultados(response.status); 
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                } else if (response.status == 200) {
                    // Éxito: Mostrar tabla de resultados
                    mostrarResultados(response.data); 
                }
            },
            error: function (xhr, status, error) {
                // Error: Notificar al usuario
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error, respuesta inválida.',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });

    const resultadosDiv = $('#resultados');
    const tablaResultados = $('#tablaResultados');
    /* Mostrar resultados */
    function mostrarResultados(data) {
        if (data === 400 || data === 500 || data === 404) {
            // Limpiar tabla anterior
            tablaResultados.empty();
            resultadosDiv.addClass('d-none');
            return;
        }
        // Limpiar tabla anterior
        tablaResultados.empty();

        // Llenar tabla con resultados
        $.each(data, function (index, cotizacion) {
            const row = $('<tr></tr>');
            row.append(`
            <td>${cotizacion.noCotizacion}</td>
            <td>${cotizacion.placa}</td>
            <td>${cotizacion.nombreProducto}</td>
            <td>${cotizacion.valor}</td>
        `);
            tablaResultados.append(row);
        });

        // Mostrar resultados
        resultadosDiv.removeClass('d-none');
    }
});