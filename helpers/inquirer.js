import colors from "colors";
import inquirer from "inquirer";

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".brightBlue} Crear Lista`,
      },
      {
        value: "2",
        name: `${"2.".brightBlue} Listar Tareas`,
      },
      {
        value: "3",
        name: `${"3.".brightBlue} Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4.".brightBlue} Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5.".brightBlue} Completar Tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".brightBlue} Borrar Tarea`,
      },
      {
        value: "0",
        name: `${"0.".brightBlue} Salir`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".brightBlue);
  console.log("    Listado de Tareas      ".brightBlue);
  console.log("===========================\n".brightBlue);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

export const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "pausa",
      message: `Presione ${"ENTER".brightBlue} para continuar!`,
    },
  ];

  console.log("\n");

  const { pausa } = await inquirer.prompt(question);

  return pausa;
};

export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        } else {
          return true;
        }
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

export const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.brightBlue;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".brightBlue + "Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices: choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

export const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message: message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

export const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.brightBlue;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices: choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};
