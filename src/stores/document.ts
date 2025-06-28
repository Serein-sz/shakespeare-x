import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('document', () => {
  const markdown = ref<string>(`# Milkdown 编辑器
重写内部组件

## 使用自定义字体
### 注册全局组件
## 布局插槽
### 使用视图过渡 API
#### 关于外观切换
`)

  const titleElements = ref<HTMLElement[]>([])

  function updateTitleElements(newTitleElements: HTMLElement[]) {
    titleElements.value = newTitleElements
  }

  function update(newValue: string) {
    markdown.value = newValue
    console.log("markdown.value: ", markdown.value);
  }

  return { markdown, update, titleElements, updateTitleElements }
})
