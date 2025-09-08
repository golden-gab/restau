import RestoInfo from '@/components/guest/restaurant/restoInfo/restoInfo';
import RestoMenu from '@/components/guest/restaurant/restoMenu/restoMenu';
import React from 'react';
import './style.css'
import RestoCart from '@/components/guest/restaurant/retoCart/restoCart';

const Page = () => {
    return (
        <main className='restaurant-page'>
            <RestoInfo/>
            <div className='resto-menu-panier'>
                <RestoMenu/>
                <RestoCart/>
            </div>
        </main>
    );
}

export default Page;
