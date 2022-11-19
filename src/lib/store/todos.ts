import {storable} from "./storable";


export type Todo = {
  id: number;
  text: string;
  done: boolean;
}

export const todos = storable<Todo[]>([{ id: 1, text: '샘플 1', done: false }, { id: 2, text: '샘플 2', done: false }, { id: 3, text: '샘플 3', done: false }]);