import React from 'react';
import { Link } from 'react-router-dom';

const OrdersTable = ({ orders }) => {
    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'bg-success-100 text-success-600';
            case 'processing':
                return 'bg-warning-100 text-warning-600';
            case 'shipped':
                return 'bg-info-100 text-info-600';
            case 'cancelled':
                return 'bg-danger-100 text-danger-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="orders-table border border-gray-200 rounded-12 shadow-sm p-32 bg-white">
            <h3 className="text-xl fw-semibold mb-24 text-gray-900">Your Orders</h3>
            <div className="overflow-x-auto">
                <table className="table w-100">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-sm fw-semibold text-gray-600 py-16 px-24 text-left">Order ID</th>
                            <th className="text-sm fw-semibold text-gray-600 py-16 px-24 text-left">Date</th>
                            <th className="text-sm fw-semibold text-gray-600 py-16 px-24 text-left">Total</th>
                            <th className="text-sm fw-semibold text-gray-600 py-16 px-24 text-left">Status</th>
                            <th className="text-sm fw-semibold text-gray-600 py-16 px-24 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.length > 0 ? (
                            orders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="py-16 px-24 text-gray-900 text-sm fw-medium">
                                        #{order.id}
                                    </td>
                                    <td className="py-16 px-24 text-gray-600 text-sm">
                                        {new Date(order.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className="py-16 px-24 text-gray-900 text-sm fw-medium">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="py-16 px-24">
                                        <span
                                            className={`inline-block px-12 py-4 rounded-6 text-sm fw-medium ${getStatusBadgeClass(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-16 px-24">
                                        <Link
                                            to={`/order-details/${order.id}`}
                                            className="btn btn-outline-main-600 text-sm py-8 px-16 rounded-8 hover-bg-main-600 hover-text-white transition-all duration-200"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-32 text-gray-600 text-md">
                                    You have no orders yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;