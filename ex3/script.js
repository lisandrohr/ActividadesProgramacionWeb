let alumnos = [];

document.getElementById("alumnoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let cedula = document.getElementById("cedula").value;
  let nombre = document.getElementById("nombre").value;
  let matematica = parseFloat(document.getElementById("matematica").value);
  let fisica = parseFloat(document.getElementById("fisica").value);
  let programacion = parseFloat(document.getElementById("programacion").value);

  let alumno = {
    cedula: cedula,
    nombre: nombre,
    matematica: matematica,
    fisica: fisica,
    programacion: programacion,
  };

  alumnos.push(alumno);

  actualizarEstadisticas();
  limpiarFormulario();
});

function actualizarEstadisticas() {
  let promedios = calcularPromedios();
  let aprobados = contarAprobados();
  let reprobados = contarReprobados();
  let aprobadosTodas = contarAprobadosTodas();
  let aprobadosDos = contarAprobadosDos();
  let aprobadosUna = contarAprobadosUna();
  let maximaNota = obtenerMaximaNota();

  document.getElementById("matematicaPromedio").textContent =
    promedios.matematica.toFixed(2);
  document.getElementById("matematicaAprobados").textContent =
    aprobados.matematica;
  document.getElementById("matematicaReprobados").textContent =
    reprobados.matematica;
  document.getElementById("matematicaTotal").textContent =
    aprobados.matematica + reprobados.matematica;

  document.getElementById("fisicaPromedio").textContent =
    promedios.fisica.toFixed(2);
  document.getElementById("fisicaAprobados").textContent = aprobados.fisica;
  document.getElementById("fisicaReprobados").textContent = reprobados.fisica;
  document.getElementById("fisicaTotal").textContent =
    aprobados.fisica + reprobados.fisica;

  document.getElementById("programacionPromedio").textContent =
    promedios.programacion.toFixed(2);
  document.getElementById("programacionAprobados").textContent =
    aprobados.programacion;
  document.getElementById("programacionReprobados").textContent =
    reprobados.programacion;
  document.getElementById("programacionTotal").textContent =
    aprobados.programacion + reprobados.programacion;

  document.getElementById("aprobadosTodas").textContent =
    "Estudiantes que aprobaron todas las materias: " + aprobadosTodas;
  document.getElementById("aprobadosDos").textContent =
    "Estudiantes que aprobaron dos materias: " + aprobadosDos;
  document.getElementById("aprobadosUna").textContent =
    "Estudiantes que aprobaron una sola materia: " + aprobadosUna;
  document.getElementById("maximaNota").textContent =
    "Nota máxima de cada materia: Matemática: " +
    maximaNota.matematica.toFixed(2) +
    ", Física: " +
    maximaNota.fisica.toFixed(2) +
    ", Programación: " +
    maximaNota.programacion.toFixed(2);
}

function calcularPromedios() {
  let promedios = {
    matematica: 0,
    fisica: 0,
    programacion: 0,
  };

  for (let i = 0; i < alumnos.length; i++) {
    promedios.matematica += alumnos[i].matematica;
    promedios.fisica += alumnos[i].fisica;
    promedios.programacion += alumnos[i].programacion;
  }

  let totalAlumnos = alumnos.length;
  promedios.matematica /= totalAlumnos;
  promedios.fisica /= totalAlumnos;
  promedios.programacion /= totalAlumnos;

  return promedios;
}

function contarAprobados() {
  let aprobados = {
    matematica: 0,
    fisica: 0,
    programacion: 0,
  };

  for (let i = 0; i < alumnos.length; i++) {
    if (alumnos[i].matematica >= 10) {
      aprobados.matematica++;
    }
    if (alumnos[i].fisica >= 10) {
      aprobados.fisica++;
    }
    if (alumnos[i].programacion >= 10) {
      aprobados.programacion++;
    }
  }

  return aprobados;
}

function contarReprobados() {
  let reprobados = {
    matematica: 0,
    fisica: 0,
    programacion: 0,
  };

  for (let i = 0; i < alumnos.length; i++) {
    if (alumnos[i].matematica < 10) {
      reprobados.matematica++;
    }
    if (alumnos[i].fisica < 10) {
      reprobados.fisica++;
    }
    if (alumnos[i].programacion < 10) {
      reprobados.programacion++;
    }
  }

  return reprobados;
}

function contarAprobadosTodas() {
  let aprobadosTodas = 0;

  for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i];
    if (
      alumno.matematica >= 10 &&
      alumno.fisica >= 10 &&
      alumno.programacion >= 10
    ) {
      aprobadosTodas++;
    }
  }

  return aprobadosTodas;
}

function contarAprobadosDos() {
  let aprobadosDos = 0;

  for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i];
    let contador = 0;
    if (alumno.matematica >= 10) {
      contador++;
    }
    if (alumno.fisica >= 10) {
      contador++;
    }
    if (alumno.programacion >= 10) {
      contador++;
    }
    if (contador === 2) {
      aprobadosDos++;
    }
  }

  return aprobadosDos;
}

function contarAprobadosUna() {
  let aprobadosUna = 0;

  for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i];
    let contador = 0;
    if (alumno.matematica >= 10) {
      contador++;
    }
    if (alumno.fisica >= 10) {
      contador++;
    }
    if (alumno.programacion >= 10) {
      contador++;
    }
    if (contador === 1) {
      aprobadosUna++;
    }
  }

  return aprobadosUna;
}

function obtenerMaximaNota() {
  let maximaNota = {
    matematica: 0,
    fisica: 0,
    programacion: 0,
  };

  for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i];
    if (alumno.matematica > maximaNota.matematica) {
      maximaNota.matematica = alumno.matematica;
    }
    if (alumno.fisica > maximaNota.fisica) {
      maximaNota.fisica = alumno.fisica;
    }
    if (alumno.programacion > maximaNota.programacion) {
      maximaNota.programacion = alumno.programacion;
    }
  }

  return maximaNota;
}

function limpiarFormulario() {
  document.getElementById("cedula").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("matematica").value = "";
  document.getElementById("fisica").value = "";
  document.getElementById("programacion").value = "";
}
