<script lang="ts">
  import { tabManager } from "../../lib/store/todos";
  import { writeText } from "@tauri-apps/api/clipboard";
  import Toast from "../Toast.svelte";

  export let id: string;
  export let todoTitle: string;
  export let done: boolean;
  export let index: number;
  let openToast = false;
  let checkbox;

  let editMode = false;

  let editTitle;


  const toggleDone = (e) => {
    done = !done;
    checkbox.focus();
    tabManager.update((tm) => {
      const index = tm.tabs[tm.tabIndex].todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        tm.tabs[tm.tabIndex].todos[index].done = done;
      }
      return { ...tm };
    });
  };

  const onClickDelete = () => {
    tabManager.update((tm) => {
      const todos = tm.tabs[tm.tabIndex].todos;
      tm.tabs[tm.tabIndex].todos = todos.filter((t) => t.id !== id);
      return tm;
    });
  };

  const focus = (e) => {
    // focus out after 1s
    setTimeout(() => e.target.blur(), 300);
  };

  const onCopy = async (e) => {
    e.preventDefault();
    await writeText(todoTitle);
    openToast = true;
    setTimeout(() => openToast = false, 2000);
  };


  const onUpdateTitle = (id: string) => {
    tabManager.update((tm) => {
      const tabIndex = tm.tabIndex;
      const todoIndex = tm.tabs[tabIndex].todos.findIndex(t => t.id == id);
      tm.tabs[tabIndex].todos[todoIndex].text = editTitle.value;
      console.log(editTitle.value, tabIndex, todoIndex);
      tm.tabs[tabIndex].todos = [...tm.tabs[tabIndex].todos];
      tm.tabs = [...tm.tabs];
      console.log(tm);
      return { ...tm };
    });
  };

  const onClickUpdate = () => {
    editMode = true;
    editTitle.focus();
  };

  const accentColor = "text-purple-800 dark:text-yellow-400";

  const htmlTitle = (title= todoTitle, tagStack: string[] = []) => {
    const strongIndex = title.indexOf("**");
    const colorIndex = title.indexOf("!!");
    if(tagStack.length === 0 && strongIndex === -1 && colorIndex === -1) {
      return title;
    }
    const [index, char] = getFirstSpecialChar(title);

    if(index === -1 && tagStack.length === 0) {
      return title;
    }

    if(index === -1) {
      while(tagStack.length > 0) {
        const tag = tagStack.pop();
        title += `</${tag}>`;
      }
    }

    if(tagStack.length > 0) {
      const lastTag = last(tagStack);
      if(lastTag === "strong" && char === "**") {
        tagStack.pop();
        title = title.replace("**", "</strong>");
      } else if(lastTag === "span" && char === "!!") {
        tagStack.pop();
        title = title.replace("!!", "</span>");
      } else if(char === "**" && tagStack.includes("**")) {
        title = title.replace("**", `</strong></span><span class="${accentColor}">`);
      } else if(char === "!!" && tagStack.includes("!!")) {
        title = title.replace("!!", "</span></strong><strong style='font-weight: 900'>");
      } else if(char === "**") {
        tagStack.push("strong");
        title = title.replace("**", "<strong style='font-weight: 900'>");
      } else if(char === "!!") {
        tagStack.push("span");
        title = title.replace("!!", `<span class="${accentColor}">`);
      }
    } else {
      if(char === "**") {
        tagStack.push("strong");
        title = title.replace("**", "<strong style='font-weight: 900'>");
      } else if(char === "!!") {
        tagStack.push("span");
        title = title.replace("!!", `<span class="${accentColor}">`);
      }
    }
    return htmlTitle(title, tagStack);
  }

  const last = (arr: string[]) => arr[arr.length - 1];

  const getFirstSpecialChar = (text: string): [number, string] => {
    const strongIndex = text.indexOf("**");
    const colorIndex = text.indexOf("!!");
    if(strongIndex === -1 && colorIndex === -1) {
      return [-1, ""];
    }
    if(strongIndex === -1) {
      return [colorIndex, "!!"];
    }
    if(colorIndex === -1) {
      return [strongIndex, "**"];
    }
    return strongIndex < colorIndex ? [strongIndex, "**"] : [colorIndex, "!!"];

  }

  const html = htmlTitle()

</script>

<div
  class="w-full cursor-pointer"
  on:click|preventDefault={toggleDone}
  on:contextmenu|stopPropagation={onCopy}
>
  <Toast open={openToast} title="복사가 되었습니다!" />
  <div class="flex relative items-center pl-3 cursor-pointer">
    <input id="todo-checkbox-{id}" type="checkbox"
           bind:this={checkbox}
           bind:checked={done}
           on:click|stopPropagation={toggleDone}
           on:focus={focus}
           on:contextmenu|stopPropagation={onCopy}
           class="w-4 h-4 text-gray-500 bg-gray-100 rounded border-gray-900 focus:ring-gray-400 dark:focus:ring-gray-500 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-900 ">

    <input bind:this={editTitle} type="text" on:click|stopPropagation bind:value={todoTitle}
           class:hidden={!editMode}
           on:blur={() => editMode = false}
           on:keypress|stopPropagation={(e) => {
        if (e.key === "Enter") {
          onUpdateTitle(id);
          editMode = false;
        }
      }}
           class="ml-2 h-11 text-gray-200 bg-gray-100 rounded border-gray-900  focus:ring-2  p-2 dark:bg-gray-600 dark:border-gray-900 w-full" />

    <label on:dblclick|stopPropagation={onClickUpdate} for="todo-checkbox-{id}"
           class:hidden={editMode}
           class="py-3 ml-2 w-full text-md font-medium text-gray-900 dark:text-gray-300 overflow-ellipsis overflow-hidden pr-6 cursor-pointer"
           class:line-through={done} class:text-gray-500={done}>{@html html}</label>

    <button
      on:click={onClickDelete}
      class="text-black dark:text-white font-bold absolute right-3 top-2 bottom-2 bg-none hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-2xl px-3 leading-5 pb-1 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
      -
    </button>
  </div>
</div>
