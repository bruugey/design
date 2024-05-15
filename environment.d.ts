declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CONTENTSTACK_API_KEY: string;
      NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN: string;
      NEXT_PUBLIC_ENVIRONMENT: 'dev' | 'main' | 'production' | 'staging';
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
