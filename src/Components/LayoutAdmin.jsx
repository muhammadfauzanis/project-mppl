import { useEffect } from 'react';
import { useAuth } from '../Helper/useAuth';

function LayoutAdmin({children}) {
  const {checkisLogin} = useAuth();
  const { loginUserOnStartup } = useAuth();

  useEffect(() => {
      loginUserOnStartup();
  }, []);
  
  return (
    <div>
        {children}
    </div>
  );
}

export default LayoutAdmin;
