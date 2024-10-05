import pako from 'pako'

export function compress(data: string): string {
  try {
    const compressed = pako.deflate(data)
    return btoa(String.fromCharCode.apply(null, compressed as unknown as number[]))
  } catch (error) {
    console.error('圧縮中にエラーが発生しました:', error)
    return data // 圧縮に失敗した場合、元のデータを返す
  }
}

export function decompress(data: string): string {
  try {
    const binary = atob(data)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const decompressed = pako.inflate(bytes)
    return new TextDecoder().decode(decompressed)
  } catch (error) {
    console.error('解凍中にエラーが発生しました:', error)
    return data // 解凍に失敗した場合、元のデータを返す
  }
}