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

  static getFromTable(tableName) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableName}`,
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

  static async deleteProgram(id) {
    const deletePrograms = initQuery(`DELETE FROM programs WHERE id=${id}`);
    const deleteSteps = initQuery(`DELETE FROM steps WHERE program_id=${id}`);
    const deleteTasks = initQuery(`DELETE FROM tasks WHERE program_id=${id}`);
    await Promise.all(deletePrograms, deleteSteps, deleteTasks);
  }
}

const initQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query, [], resolve, (_, error) => reject(error));
    });
  });
};
