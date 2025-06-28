import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('document', () => {
  const markdown = ref<string>(`# Milkdown Vue Crepe
## h2
### h3
#### h4
##### h5
###### h6
# Milkdown Vue Crepe
## h2
### h3
#### h4
##### h5
###### h6
`.repeat(100))

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
