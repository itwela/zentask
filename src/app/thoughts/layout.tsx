import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getUserData } from '@/actions/database';
import Thoughts from './page';


export default async function ThoughtsS() {

  return (

    <div className="flex">
      <div className="flex">
        <ZenMenuS/>
        <main>
            <Thoughts/>
        </main>
      </div>
    </div>

  );
}
