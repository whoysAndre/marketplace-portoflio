export const useAuthentication = () => {

  const { loggedIn, session, user, clear, fetch } = useUserSession();

  const login = async (email: string, password: string) => {
    try {

      await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email,
          password
        },

      });

      await fetch();
      navigateTo('/?message=Login successful');

      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const register = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          email,
          password,
          firstname,
          lastname
        }
      });

      await fetch();
  

      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const logout = async () => {
    await clear();
    navigateTo('/?message=Logout successful');
  };


  return {
    loggedIn,
    session,
    user,

    //GETTERS
    isLoggedIn: loggedIn,

    //Methods
    login,
    register,
    logout,
    fetch

  }
}