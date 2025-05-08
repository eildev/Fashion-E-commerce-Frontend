import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ColorInit from '../../helper/ColorInit';

import Preloader from '../../helper/Preloader';
import HeaderThree from '../HeaderThree';
import Breadcrumb from '../Breadcrumb';
import ScrollToTop from 'react-scroll-to-top';
import OrdersTable from './OrdersTabel';
import WishlistTable from './WishlistTable';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import { useGetUserInfoQuery } from '../../redux/features/api/auth/authApi';

const UserTabs = () => {
     const { token, user } = useSelector((state) => state.auth);
    const { tabId } = useParams();
      const userID = user?.id;
      const navigate = useNavigate();
    const { data, isLoading, isError } = useGetUserInfoQuery(userID, {
      skip: !userID,
    });
    const [activeTab, setActiveTab] = useState(tabId || 'edit-profile');

    useEffect(() => {
        if (tabId && tabs.find(tab => tab.id === tabId)) {
            setActiveTab(tabId);
        } else {
            setActiveTab('edit-profile'); // Default to edit-profile if tabId is invalid
        }
    }, [tabId]);

    const tabs = [
        { id: 'orders', label: 'Orders', icon: 'ph-shopping-cart' },
    
        { id: 'edit-profile', label: 'Edit Profile', icon: 'ph-user-gear' },
        { id: 'change-password', label: 'Change Password', icon: 'ph-lock-key' },
        { id: 'addresses', label: 'Addresses', icon: 'ph-map-pin' },
        { id: 'wishlist', label: 'Wish List', icon: 'ph-heart' },
 
        { id: 'transactions', label: 'Your Transactions', icon: 'ph-receipt' },
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        navigate(`/user-tabs/${tabId}`); // Update the URL when switching tabs
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'edit-profile':
                return (
                  <EditProfile></EditProfile>
                );
            case 'orders':
                return <div className="tab-content p-4"><h3>Orders</h3><OrdersTable></OrdersTable></div>;
         
            case 'change-password':
                return (
                    <div className="tab-content p-4 ">
                        <h3>Change Password</h3>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Current Password *</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">New Password *</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm New Password *</label>
                                <input type="password" className="form-control" />
                            </div>
                            <button type="button" className="btn btn-primary">Save Changes</button>
                        </form>
                    </div>
                );
            case 'addresses':
                return <div className="tab-content p-4"><h3>Addresses</h3><p>Your saved addresses will be displayed here.</p></div>;
            case 'wishlist':
                return <div className="tab-content p-4"><h3>Wish List</h3><WishlistTable></WishlistTable></div>;
           
            case 'transactions':
                return <div className="tab-content p-4"><h3>Your Transactions</h3><p>Your transaction history will be displayed here.</p></div>;
            default:
                return null;
        }
    };

    return (
        <div>
              {/* ColorInit */}

            <section className="user-details py-20">
                <div className="container container-lg">
                <div className="d-flex align-items-center mb-20 ">
                                <button
                                    className="btn btn-outline-secondary me-3 bg-main-700"
                                    onClick={() => navigate('/user-details')}
                                >
                                    <i className="ph ph-arrow-left me-2 "></i> Back
                                </button>
                            </div>
                    <div className="row gy-5">
                        <div className="col-12">
                            <div className="user-details-header d-flex align-items-center justify-content-between mb-40">
                                <div className="d-flex align-items-center gap-16">
                                    <div className="avatar w-64 h-64 rounded-circle bg-gray-200 flex-center">
                                        <i className="ph ph-user text-2xl text-gray-500" />
                                    </div>
                                    
                                    <div>
                                        <h6 className="text-xl fw-bold mb-0"><span className='text-base fw-normal fs-6'>Hello,</span>  <br />
                                        {token &&  
                        `  ${data?.user?.name}`
                      }
                                           </h6>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-16">
                                    <span className="text-md fw-medium">Shoping Points: 0</span>
                                    {/* <span className="text-md fw-medium">Credit: 0</span> */}
                                </div>
                            </div>
                        
                            <div className="tabs mb-20 ">
                                <ul className="nav nav-tabs d-flex flex-wrap gap-2 ">
                                    {tabs.map(tab => (
                                        <li className="nav-item" key={tab.id}>
                                            <button
                                                className={`nav-link d-flex align-items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
                                                onClick={() => handleTabClick(tab.id)}
                                            >
                                                <i className={`ph ${tab.icon} text-xl`}></i>
                                                {tab.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="tab-content-wrapper mb-20 shadow-sm">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserTabs;