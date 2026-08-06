declare module 'pym.js' {
  // type retrieved from : https://pym.nprapps.org/pym.v1.js
  export class Parent {
    constructor(id: string, url: string, config: object)
    remove(): void
  }
  export class Child {
    constructor(options: any)
    sendHeight(): void
  }
}
