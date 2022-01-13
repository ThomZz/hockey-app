import { singleton } from "tsyringe";

export interface ILogger {
  info(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

@singleton()
export default class Logger implements ILogger {

  constructor() {
    debugger;
  }
  
  info(message: string) {
    console.log(`info: ${message}`);
  }

  error(message: string) {
    console.log(`error: ${message}`);
  }

  debug(message: string) {
    console.log(`debug: ${message}`);
  }
}