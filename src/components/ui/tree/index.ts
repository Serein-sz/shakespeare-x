export {default as Tree} from './Tree.vue'

export type TreeNode = {
  id: string
  name: string
  content: string
  type: 'folder' | 'file'
  children?: TreeNode[] & { length?: number } // 限制递归深度
}
