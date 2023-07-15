import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
  confirmar,
  inquirerMenu,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoChecklist,
  pausa,
} from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";

console.clear();

const main = async () => {
  let opcion = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opcion = await inquirerMenu();

    switch (opcion) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        if (tareas.listadoArr.length === 0) {
          console.log("No hay nada por el momento!");
        } else {
          tareas.listadoCompleto();
        }
        break;
      case "3":
        if (tareas.tareasCompletadasState === false) {
          console.log("No hay nada por el momento!");
        } else {
          tareas.listarPendientesCompletadas(true);
        }
        break;
      case "4":
        if (tareas.tareasPendientesState === false) {
          console.log("No hay nada por el momento!");
        } else {
          tareas.listarPendientesCompletadas(false);
        }
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id !== "0") {
          const confirmarOk = await confirmar("¿Estas seguro?");

          if (confirmarOk) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada correctamente!");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opcion !== "0");
};

main();
