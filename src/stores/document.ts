import {ref} from 'vue';
import {defineStore} from 'pinia';
import {useRequest} from "alova/client";
import type {AlovaGenerics} from "alova";
import {throttle} from "lodash-es"
import Apis from "@/api";

export const useDocumentStore = defineStore('document', () => {
  const id = ref("");
  const markdown = ref("");
  const titleElements = ref<HTMLElement[]>([]);

  function updateTitleElements(newTitleElements: HTMLElement[]) {
    titleElements.value = newTitleElements;
  }

  const {send: getContent} = useRequest<AlovaGenerics<string>, any>(Apis.file.get_file_content_by_id_file__id__get, {
    pathParams: {id: id.value},
    immediate: false,
  });

  async function init(documentId: string) {
    markdown.value = await getContent({pathParams: {id: documentId}});
    id.value = documentId;
  }

  const {send: updateContent} = useRequest(config => Apis.file.update_file_file_update_content_put(config), {immediate: false})

  const updateMarkdown = throttle(async () => {
    return await updateContent({
      data: {
        id: id.value,
        content: markdown.value
      }
    })
  }, 2000);

  async function update(newValue: string) {
    markdown.value = newValue;
    updateMarkdown();
  }

  return {id, markdown, init, update, titleElements, updateTitleElements}
})
