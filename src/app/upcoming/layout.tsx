import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getUserData } from '@/actions/database';
import Upcoming from './page';


export default async function UpcomingS() {

  return (

    <div className="flex w-screen"> 
      <div className="flex w-full relative">
        <ZenMenuS/>
        <main className='w-full'><Upcoming/></main>
      </div>
    </div>

  );
}
