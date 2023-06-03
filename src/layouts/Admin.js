import React from 'react'
// core components
import Sidebar from 'components/Sidebar/Sidebar.js'
import { useSelector } from 'react-redux';

const Admin = ({ children }) => {
  const darkMode = useSelector(state => state.authUser.darkMode);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    return () => {
      document.body.classList.remove('dark-mode')
    }
  }, [window.location.pathname])

  return (
    <>
      <Sidebar />
      <div className="main-content admin">
        {children}
      </div>
    </>
  )
}

export default Admin
