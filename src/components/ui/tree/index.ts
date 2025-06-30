import type {Component} from "vue";

export {default as Tree} from './Tree.vue'

export type TreeNode = {
  id: string
  label: string
  value: string
  icon?: Component
  children?: TreeNode[]
}
