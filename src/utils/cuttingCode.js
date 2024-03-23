export const Element = {
    Title : (item) => `${item?.title?.replaceAll(" ",'-').toLowerCase()}`
}