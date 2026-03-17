// import BottomAction from '@/components/guest/about/bottomAction/bottomAction';
import BottomAction from '@/components/guest/about/bottomAction/bottomAction';
import Cta from '@/components/guest/about/cta/cta';
import Faq from '@/components/guest/about/faq/faq';
import Features from '@/components/guest/about/features/features';
import Hero from '@/components/guest/about/hero/hero';
import Pricing from '@/components/guest/about/pricing/pricing';
import WhyUs from '@/components/guest/about/whyUs/whyUs';
import React from 'react';

const AboutPage = () => {
    return (
        <div className='about-page'>
            <Hero/>
            <WhyUs/>
            <Features/>
            <Pricing/>
            <Cta/>
            <Faq/>
            <BottomAction/>
        </div>
    );
}

export default AboutPage;
