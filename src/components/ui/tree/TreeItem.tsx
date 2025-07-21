import type {PropType, SlotsType} from "vue"
import {computed, defineComponent, h, ref} from "vue";
import type {TreeNode} from "@/components/ui/tree/index.ts";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ChevronRight, FileMinus, Folder} from "lucide-vue-next";

const TreeItem = defineComponent(
  (props, {slots}) => {
    const isOpen = ref<boolean>(false)
    const hasChildren = computed(() => props.node?.children !== void 0 && props.node.children.length > 0)
    return () => (
      <>
        <Collapsible
          open={isOpen.value}
          onUpdate:open={value => isOpen.value = value}
          style={{'padding-left': `${props.depth * 0.5}rem`}}
        >
          <div
            class="flex justify-between items-center h-[32px] mx-2 p-2 rounded-md dark:hover:bg-sidebar-accent">
            {
              slots.content ? slots.content?.({node: props.node}) :
                <div class="flex justify-start items-center gap-2 w-full">
                  {props.node.type === 'folder' ? <Folder class="size-4"/> :
                    <FileMinus class="size-4"/>}
                  <span class="text-sm select-none">{props.node.name}</span>
                </div>
            }
            {
              hasChildren.value ? <CollapsibleTrigger as-child>
                <ChevronRight
                  class={"size-4 transition-all transition-duration-300" + (isOpen.value ? ' rotate-90' : '')}/>
              </CollapsibleTrigger> : null
            }
          </div>
          <CollapsibleContent>
            {
              props.node.children?.map(node => h(TreeItem, {
                key: node.id,
                node,
                depth: props.depth + 1
              }, slots))
            }
          </CollapsibleContent>
        </Collapsible>
      </>
    )
  },
  {
    props: {
      node: {
        type: Object as PropType<TreeNode>,
        required: true
      },
      depth: {
        type: Number,
        default: 0
      }
    },
    slots: Object as SlotsType<{
      content: { node: TreeNode }
    }>,
  }
)
export default TreeItem
