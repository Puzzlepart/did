export const header = (title: string) => {
  return `
-----------------------------------------\n
\tTESTS: ${title.toUpperCase()}\n
-----------------------------------------
`
}

export const subHeader = (subTitle: string) => {
  return `[${subTitle.toUpperCase()}]`
}
