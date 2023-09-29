export interface ReturnValue {
  code?: string
  meta?: object
}
export interface MdPluginTypes {
  enforce: 'pre' | 'post' | undefined
  name: string
  transform: (_: string, id: string) => Promise<ReturnValue>
}
export type TokenMap = { [key: string]: { nesting: number; info: string; content: string } }
