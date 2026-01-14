// auth.d.ts
declare module '#auth-utils' {
  // Define the structure of your user object
  interface User {
    id: number
    email: string
    firstname: string
    lastname: string
    roles: string[]
  }


  interface UserSession {
    loggedInAt: Date;

  }

  // Define secure session data if you have any server-side only data
  interface SecureSessionData {
    // Add your own fields for server-side only data
  }
}

export { };