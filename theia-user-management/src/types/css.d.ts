declare module '*.css' {
  const content: string;
  export default content;
  export const locals: {
    [key: string]: string;
  };
  export = content;
}
