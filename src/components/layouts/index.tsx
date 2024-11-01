import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/navbar';

export default function DefaultLayouts() {
  return (
    <div className='relative flex flex-col h-screen text-xl'>
      <Navbar />
      <Outlet />
    </div>
  )
}
