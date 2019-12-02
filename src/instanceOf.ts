export function instanceOf<T = any>(Class: new (...args: any[]) => T) {
  return (value: any): value is T => value instanceof Class
}
