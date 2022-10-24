interface BoxStyle {
  style: string,
  subClass?: string
}

type ContentPlaceholderRowBoxes = Array<Array<number | string>>

interface ContentPlaceholderRow {
  height: number | string,
  boxes: ContentPlaceholderRowBoxes
}

type ContentPlaceholderRows = Array<ContentPlaceholderRow>