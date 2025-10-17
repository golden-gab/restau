import React from 'react';
import './restoLoader.css'
import { SkeletonLoaderBox, SkeletonLoaderLine } from '@/components/shared/skeletonLoader/skeletonLoader';

const RestoLoader = () => {
    return (
        <section className='resto-loader'>
            <SkeletonLoaderLine className={"resto-loader-info"}/>
            <div className='resto-loader-plats-panier'>
                <div className='resto-loader-plats'>
                    <SkeletonLoaderBox/>
                    <SkeletonLoaderBox/> 
                    <SkeletonLoaderBox/>
                    <SkeletonLoaderBox/>
                    <SkeletonLoaderBox/>
                </div>
                <SkeletonLoaderBox className={"resto-loader-panier"}/>
            </div>
        </section>
    );
}

export default RestoLoader;
