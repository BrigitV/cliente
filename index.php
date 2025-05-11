<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cotizador</title>

  <!-- CSS Bootstrap y personalizado -->
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/styles.css">

  <!-- Ícono -->
  <link rel="icon" href="img/icon.png" type="image/x-icon">
</head>
<body>
  <div class="container mt-5">
    <h1 class="text-center mb-4">¡Cotiza aquí tu vehículo!</h1>

    <!-- Formulario Responsive -->
    <form id="cotizadorForm" class="mb-4 needs-validation" novalidate>
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label for="nombre" class="form-label">Nombres</label>
          <input type="text" class="form-control" id="nombre" name="nombre" required placeholder="Escriba aquí su nombre">
        </div>

        <div class="col-12 col-md-6">
          <label for="apellidos" class="form-label">Apellidos</label>
          <input type="text" class="form-control" id="apellidos" name="apellidos" required placeholder="Escriba aquí sus apellidos">
        </div>

        <div class="col-12 col-md-6">
          <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
          <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento" required>
        </div>

        <div class="col-12 col-md-6">
          <label for="placa" class="form-label">Placa del Vehículo</label>
          <input type="text" class="form-control text-uppercase" id="placa" name="placa" maxlength="6" pattern="[A-Z]{3}[0-9]{3}" required placeholder="Ej: ABC123">
        </div>

        <div class="col-12 text-center mt-4">
          <button type="button" id="btnCotizar" class="btn btn-primary w-100 w-md-auto">Cotizar</button>
        </div>
      </div>
    </form>

    <!-- Resultados -->
    <div id="resultados" class="d-none">
      <h4 class="text-center">Resultados de la Cotización</h4>
      <div class="table-responsive">
        <table class="table table-bordered table-striped mt-3">
          <thead class="table-dark">
            <tr>
              <th>No. Cotización</th>
              <th>Placa</th>
              <th>Plan</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody id="tablaResultados">
            <!-- Aquí se mostrarán los resultados -->
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/jquery.min.js"></script>
  <script src="js/sweetalert2.all.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>
  <script src="js/global.js"></script>
</body>
</html>
