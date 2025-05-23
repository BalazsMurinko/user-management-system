// Empty CSS module declaration to prevent TypeScript errors
declare module '*.css' {
  const content: string;
  export default content;
  export const locals: {
    [key: string]: string;
  };
  export = content;
}

// Declare CSS content as a string
declare module '*.css?raw' {
  const content: string;
  export default content;
}

// Declare CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
