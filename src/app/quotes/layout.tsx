import { ReactNode } from 'react';
import { ZenMenuS } from '../dashComponents/menu_S';
import { getUserData } from '@/actions/database';
import Projects from '../projects/page';
import Quotes from './page';


export default async function QuotesS() {

  return (

    <div className="flex">
      <div className="flex">
        <ZenMenuS/>
        <main><Quotes/></main>
      </div>
    </div>

  );
}
