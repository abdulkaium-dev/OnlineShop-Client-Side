import React from 'react';
import Slider from './Slider';
import FeaturesSection from './FeaturesSection';
import MembershipSection from './MembershipSection';
import SalesPromotion from './SalesPromotion';
import Promotion from './Promotion';
import CustomerReviews from './CustomerReviews';
import ProductsTabs from './ProductsTabs';

const Home = () => {
    return (
        <div>
            <div className="my-10">
                <Slider />                    {/* Hero section */}
            </div>
             <div className="my-10">
                <ProductsTabs/>            {/* Meal categories */}
            </div>
            <div className="my-10">
                <SalesPromotion />            {/* Limited-time offer */}
            </div>
            <div className="my-10">
                {/* <MembershipSection />        Premium subscription */}
            </div>
            <div className="my-10">
                <FeaturesSection />          {/* App / Service Features */}
            </div>
            <div className="my-10">
                <Promotion />                {/* Secondary / additional offers */}
            </div>
            <div className="my-10">
                <CustomerReviews />          {/* Social proof / Testimonials */}
            </div>
        </div>
    );
};

export default Home;
