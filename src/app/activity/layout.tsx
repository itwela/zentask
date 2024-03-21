import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getUserData } from '@/actions/database';
import Activity from './page';


export default async function ActivityS() {

  return (

    <div className="flex">
      <div className="flex">
        <ZenMenuS/>
        <main><Activity/></main>
      </div>
    </div>

  );
}
