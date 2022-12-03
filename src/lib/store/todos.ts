import {storable} from "./storable";


export type Todo = {
  id: number;
  text: string;
  done: boolean;
}

export type Tab = {
  id: string;
  title: string;
  todos: Todo[];
}

export type TabManager = {
  tabIndex: number;
  tabs: Tab[];

}

export const tabManager = storable<TabManager>('tabManager', {
  tabIndex: 0,
  tabs: [{
    id: "tab1",
    title: "탭1",
    todos: [{ id: 1, text: '샘플 1', done: false }, { id: 2, text: '샘플 2', done: false }, { id: 3, text: '샘플 3', done: false }]
  }, {
    id: "tab2",
    title: "탭 2",
    todos: [{ id: 1, text: '샘플 1', done: false }, { id: 2, text: '샘플 2', done: false }, { id: 3, text: '샘플 3', done: false }]
  }]
});
