import { storable } from "./storable";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type Tab = {
  id: string;
  title: string;
  todos: Todo[];
};

export type TabManager = {
  tabIndex: number;
  tabs: Tab[];
};

export const tabManager = storable<TabManager>("tabManager", {
  tabIndex: 0,
  tabs: [
    {
      id: "tab1",
      title: "탭1",
      todos: [
        { id: "1", text: "샘플 1", done: false },
        { id: "2", text: "샘플 2", done: false },
        { id: "3", text: "샘플 3", done: false },
      ],
    },
    {
      id: "tab2",
      title: "탭 2",
      todos: [
        { id: "1", text: "샘플 1", done: false },
        { id: "2", text: "샘플 2", done: false },
        { id: "3", text: "샘플 3", done: false },
      ],
    },
  ],
});

export const backupTabManager = () => {
  const backupJson = JSON.stringify(tabManager.get());
  const blob = new Blob([backupJson], { type: 'text/plain' }); // MIME 타입을 'text/plain'으로 설정

    // 가상의 a 태그 생성
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ww-todo-backup.json'; // 다운로드 파일 이름 설정

    // 링크 클릭 시 다운로드
    document.body.appendChild(a);
    a.click();

    // URL 객체 메모리 해제
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

const validateTab = (tab: Tab) => {
  if (!tab.todos) {
    throw new Error("todos가 없습니다.");
  }
  if (!tab.todos[tab.todos.length - 1]) {
    throw new Error("todos가 없습니다.");
  }
  tab.id = `tab-${Math.random().toString(36).substring(2)}`
}

const validateTabManager = (tabManager: TabManager) => {
  if (!tabManager.tabs) {
    throw new Error("tabs가 없습니다.");
  }

  for(const tab of tabManager.tabs) {
    validateTab(tab);
  }
  return true;
}

export const appendTabManager = async (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const backupJson = e.target.result as string;
    const currentManager = tabManager.get();
    const newManager = JSON.parse(backupJson) as TabManager;
    if(validateTabManager(newManager)) {
      currentManager.tabs = currentManager.tabs.concat(newManager.tabs);
      tabManager.set(currentManager);
    }
  };
  reader.readAsText(file);
}
