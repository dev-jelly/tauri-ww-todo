import { appWindow } from '@tauri-apps/api/window'
import {writable} from "svelte/store";

export const alwaysOnTop = writable(false)

// 상태 변경 함수
export const toggleAlwaysOnTop = async () => {
  alwaysOnTop.update(current => {
    const newValue = !current
    appWindow.setAlwaysOnTop(newValue)
    return newValue
  })
}
