import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('program.db');
db.transaction((tx) => tx.executeSql(`PRAGMA foreign_keys = ON`));

export class DB {
  // Auto increment or Index
  static async init() {
    const pragmaForeignKeys = initQuery(`PRAGMA foreign_keys = ON`);
    const programsTable = initQuery(
      `CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        time INTEGER NOT NULL
      );`
    );
    const stepsTable = initQuery(
      `CREATE TABLE IF NOT EXISTS steps (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        time INTEGER NOT NULL,
        program_id INTEGER REFERENCES programs(id)
      );`
    );
    const tasksTable = initQuery(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        time INTEGER NOT NULL,
        program_id INTEGER REFERENCES programs(id),
        step_id INTEGER REFERENCES steps(id)
      );`
    );
    await Promise.all([
      pragmaForeignKeys,
      programsTable,
      stepsTable,
      tasksTable,
    ]).then((data) => console.log(data));
  }

  static getFromTable(tableName, WHERE = '') {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableName} ${WHERE}`,
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        );
      });
    });
  }

  static createProgram({ title, description, time }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO programs (title, description, time) VALUES (?, ?, ?)`,
          [title, description, time],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  }

  static async updateProgram({ title, description, programId }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE programs 
            SET title=?,
                description=?
            WHERE id=${programId}`,
          [title, description],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
    await Promise.all(updatePrograms);
  }

  static async deleteProgram(id) {
    const deletePrograms = initQuery(`DELETE FROM programs WHERE id=${id}`);
    const deleteSteps = initQuery(`DELETE FROM steps WHERE program_id=${id}`);
    const deleteTasks = initQuery(`DELETE FROM tasks WHERE program_id=${id}`);
    await Promise.all(deletePrograms, deleteSteps, deleteTasks);
  }

  static createStep({ title, description, time, programId }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO steps (title, description, time, program_id) VALUES (?, ?, ?, ?)`,
          [title, description, time, programId],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  }

  static updateStep({ title, description, stepId }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE steps 
            SET title=?,
                description=?
            WHERE id=${stepId}`,
          [title, description],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  }

  static async deleteStep(id) {
    const deleteSteps = initQuery(`DELETE FROM steps where id=${id}`);
    const deleteTasks = initQuery(`DELETE FROM tasks where step_id=${id}`);
    await Promise.all(deleteSteps, deleteTasks);
  }

  static createTask({ title, description, time, stepId, programId }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO tasks (title, description, time, step_id, program_id) VALUES (?, ?, ?, ?, ?)`,
          [title, description, time, stepId, programId],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  }

  static async updateTask({
    title,
    description,
    time,
    programId,
    stepId,
    taskId,
  }) {
    const updateTasks = initQuery(
      `UPDATE tasks
        SET title=?,
            description=?,
            time=?
        WHERE id=${taskId}`,
      [title, description, time]
    );
    let newTime = 0;
    const tasks = await this.getFromTable('tasks', `WHERE step_id=${stepId}`);
    console.log(tasks);
    tasks.forEach((t) => (newTime += t.time));
    const updateSteps = initQuery(
      `UPDATE steps
        SET time=?
        WHERE id=${stepId}`,
      [newTime]
    );
    newTime = 0;
    const steps = await this.getFromTable(
      'steps',
      `WHERE program_id=${programId}`
    );
    steps.forEach((s) => (newTime += s.time));
    const updatePrograms = initQuery(
      `UPDATE programs
        SET time=?
        WHERE id=${programId}`,
      [newTime]
    );
    // await Promise.all(updateTasks, updateSteps, updatePrograms);
  }

  static async deleteTask(id) {
    const deleteTasks = initQuery(`DELETE FROM tasks where id=${id}`);
    await Promise.all(deleteTasks);
  }
}

const initQuery = (query, array = []) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query, array, resolve, (_, error) => reject(error));
    });
  });
};
