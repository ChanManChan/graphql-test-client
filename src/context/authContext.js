import React, { useReducer, createContext } from 'react';
import { auth } from '../firebase';

// reducer (responsible to update the state)
const firebaseReducer = (state, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// state
const initialState = {
  user: null,
};

// context
const AuthContext = createContext();

// context provider (wrapper)
const AuthProvider = ({ children }) => {
  React.useEffect(() => {
    // if user is logged in, we can extract user info
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // if page reloads and if the user is logged in, the context state is populated again. (unless user logs out, they will be always logged in)
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: { email: user.email, token: idTokenResult.token },
        });
      } else {
        dispatch({ type: 'LOGGED_IN_USER', payload: null });
      }
    });
    return () => unsubscribe();
  }, []);
  // update state using dispatch
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// export the context and the provider
export { AuthContext, AuthProvider };
