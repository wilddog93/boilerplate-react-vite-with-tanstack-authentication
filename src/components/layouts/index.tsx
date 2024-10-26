import { Outlet } from 'react-router-dom';

export default function DefaultLayouts() {
  return (
    <div className='relative flex flex-col h-screen'>
      <Outlet />
    </div>
  )
}
