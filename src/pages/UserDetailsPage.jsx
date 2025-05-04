import React from 'react';
import { Link } from 'react-router-dom';
import ColorInit from '../helper/ColorInit';
import ScrollToTop from 'react-scroll-to-top';
import Preloader from '../helper/Preloader';
import HeaderThree from '../components/HeaderThree';
import Breadcrumb from '../components/Breadcrumb';
import UserDashboard from '../components/userDashboard/UserDashboard';

const UserDetails = () => {
  return (
<div>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderOne */}
      <HeaderThree category={false} />
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop"} />
      <UserDashboard></UserDashboard>
</div>
  );
};

export default UserDetails;