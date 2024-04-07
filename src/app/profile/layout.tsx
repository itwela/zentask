import { updateUserData } from '@/actions/database';
import { ZenMenuS } from '../dashComponents/menu_S';
import ProfilePage from './page';


export default async function ProfileS() {

  const updateuser = await updateUserData();

  return (

    <div className="w-screen   bg-[#FFFDF6]  ">
        <div className="flex w-full  h-screen overflow-hidden">
        <ZenMenuS/>
        <main className="w-full h-full   bg-[#FFFDF6]">
          <ProfilePage/>
        </main>
      </div>
    </div>

  );
}
