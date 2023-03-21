export const trimmedToLength = (text: string, length: number): string => {
  return text.length < length ? text : `${text.substring(0, length)} ...`
}
