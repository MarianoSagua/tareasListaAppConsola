import colors from "colors";
import { Tarea } from "./tarea.js";

export class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((i) => {
      this._listado[i.id] = i;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    this.listadoArr.forEach((tarea, i) => {
      const numberList = i + 1;
      const estado = tarea.completadoEn !== null ? "Completada".green : "Pendiente".red;
      console.log(`${numberList}. `.brightBlue + tarea.desc + " :: " + estado);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    const newList = this.listadoArr.filter((tarea) =>
      completadas ? tarea.completadoEn !== null : tarea.completadoEn === null
    );

    newList.forEach((tarea, i) => {
      const numberList = i + 1;
      const estado = completadas ? "Completada".green : "Pendiente".red;
      console.log(`${numberList}. `.brightBlue + tarea.desc + " :: " + `${tarea.completadoEn || estado}`);
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
        console.log("Se a agregado esta tarea a las completadas!");
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }

  get listadoArr() {
    const newList = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      newList.push(tarea);
    });

    return newList;
  }
}
