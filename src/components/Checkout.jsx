import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { districts, upazilasByDistrict } from '../utils/districtsAndUpazilas';

const Checkout = () => {
    const location = useLocation();
    const { coupon, cartTotals } = location.state || {};
    const { user } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
        resetField,
    } = useForm({
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            address: '',
            district: '',
            upazila: '',
            notes: '',
            payment: '',
        },
    });

    const selectedDistrict = watch('district');
    const selectedPayment = watch('payment');

  
    useEffect(() => {
        console.log('Current Form Data:', watch());
    }, [watch]);

  
    useEffect(() => {
        resetField('upazila');
    }, [selectedDistrict, resetField]);


    const filteredCartItems = cartItems.filter((item) =>
        user?.id ? item.user_id === user.id : item.user_id == null
    );

    const subTotalPrice = filteredCartItems.reduce((sum, item) => {
        const regularPrice = item?.regular_price || 0;
        const quantity = item?.quantity || 1;
        const discountValue = item?.product_variant_promotion?.coupon?.discount_value || 0;
        const discountType = item?.product_variant_promotion?.coupon?.discount_type;

        let finalPrice = regularPrice;
        if (discountType === 'fixed') {
            finalPrice = regularPrice - discountValue;
        } else if (discountType === 'percentage') {
            finalPrice = regularPrice - (regularPrice * discountValue) / 100;
        }
        finalPrice = Math.max(finalPrice, 0);

        return sum + finalPrice * quantity;
    }, 0);

 
    const shippingQuantity = filteredCartItems.reduce((sum, item) => sum + item.quantity, 0);
    const shippingPrice = filteredCartItems.length > 0 ? 80 + (shippingQuantity - 1) * 20 : 0;


    const taxRate = 0.02;
    const taxAmount = (subTotalPrice * taxRate).toFixed(2);

    const discountAmount = coupon
        ? coupon.discount_type === 'fixed'
            ? coupon.discount_value
            : (coupon.discount_value * subTotalPrice) / 100
        : 0;


    const grandTotal = (subTotalPrice - discountAmount + parseFloat(taxAmount) + shippingPrice).toFixed(2);

    const onSubmit = (data) => {
        const submissionData = {
            ...data,
            coupon: coupon || null,
            orderSummary: {
                subtotal: subTotalPrice,
                discount: discountAmount,
                shipping: shippingPrice,
                tax: taxAmount,
                grandTotal,
            },
            cartItems: filteredCartItems,
        };
        console.log('Form Data:', submissionData);
        reset();
        toast.success('Order placed successfully!');
    };

    const districtOptions = districts.map((district) => ({
        value: district,
        label: district,
    }));

    const upazilaOptions = selectedDistrict
        ? (upazilasByDistrict[selectedDistrict] || []).map((upazila) => ({
            value: upazila,
            label: upazila,
        }))
        : [];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            width: '100%',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#e5e7eb',
            },
        }),
        input: (provided) => ({
            ...provided,
            margin: 0,
            padding: 0,
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f3f4f6' : 'white',
            color: state.isSelected ? 'white' : '#374151',
            '&:hover': {
                backgroundColor: '#f3f4f6',
            },
        }),
    };

    return (
        <section className="checkout py-80">
            <div className="container container-lg">
                <div className="border border-gray-100 rounded-8 px-30 py-20 mb-40">
                    <span>
                        {coupon ? (
                            `Coupon Applied: ${coupon.code} (${coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `$${coupon.discount_value}`
                            })`
                        ) : (
                            <>
                                Have a coupon?{' '}
                                <Link
                                    to="/cart"
                                    className="fw-semibold text-gray-900 hover-text-decoration-underline hover-text-main-600"
                                >
                                    Click here to enter your code
                                </Link>
                            </>
                        )}
                    </span>
                </div>
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="pe-xl-5">
                            <div className="row gy-3">
                                <div className="col-12">
                                    <input
                                        type="text"
                                        className={`common-input border-gray-100 ${errors.fullName ? 'is-invalid' : ''}`}
                                        placeholder="Full Name"
                                        {...register('fullName', { required: 'Full Name is required' })}
                                    />
                                    {errors.fullName && (
                                        <div className="invalid-feedback">{errors.fullName.message}</div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <input
                                        type="number"
                                        className={`common-input border-gray-100 ${errors.phone ? 'is-invalid' : ''}`}
                                        placeholder="Phone Number"
                                        {...register('phone', { required: 'Phone Number is required' })}
                                    />
                                    {errors.phone && (
                                        <div className="invalid-feedback">{errors.phone.message}</div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <input
                                        type="email"
                                        className="common-input border-gray-100"
                                        placeholder="Email Address"
                                        {...register('email')}
                                    />
                                </div>
                                <div className="col-12">
                                    <input
                                        type="text"
                                        className={`common-input border-gray-100 ${errors.address ? 'is-invalid' : ''}`}
                                        placeholder="Address"
                                        {...register('address', { required: 'Address is required' })}
                                    />
                                    {errors.address && (
                                        <div className="invalid-feedback">{errors.address.message}</div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <Controller
                                        name="district"
                                        control={control}
                                        rules={{ required: 'District is required' }}
                                        render={({ field }) => (
                                            <Select
                                                Stock options={districtOptions}
                                                value={districtOptions.find((option) => option.value === field.value) || null}
                                                onChange={(option) => {
                                                    field.onChange(option ? option.value : '');
                                                    console.log('District changed:', option ? option.value : '');
                                                }}
                                                placeholder="Select District"
                                                styles={customStyles}
                                                isClearable
                                                isSearchable
                                                className={errors.district ? 'is-invalid' : ''}
                                            />
                                        )}
                                    />
                                    {errors.district && (
                                        <div className="invalid-feedback">{errors.district.message}</div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <Controller
                                        name="upazila"
                                        control={control}
                                        rules={{ required: 'Upazila is required' }}
                                        render={({ field }) => (
                                            <Select
                                                options={upazilaOptions}
                                                value={upazilaOptions.find((option) => option.value === field.value) || null}
                                                onChange={(option) => {
                                                    field.onChange(option ? option.value : '');
                                                    console.log('Upazila changed:', option ? option.value : '');
                                                }}
                                                placeholder="Select Upazila"
                                                styles={customStyles}
                                                isDisabled={!selectedDistrict}
                                                isClearable
                                                isSearchable
                                                className={errors.upazila ? 'is-invalid' : ''}
                                            />
                                        )}
                                    />
                                    {errors.upazila && (
                                        <div className="invalid-feedback">{errors.upazila.message}</div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <div className="my-40">
                                        <h6 className="text-lg mb-24">Additional Information</h6>
                                        <input
                                            type="text"
                                            className="common-input border-gray-100"
                                            placeholder="Notes about your order, e.g., special notes for delivery"
                                            {...register('notes')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <div className="checkout-sidebar">
                            <div className="bg-color-three rounded-8 p-24 text-center">
                                <span className="text-gray-900 text-xl fw-semibold">Your Orders</span>
                            </div>
                            <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
                                <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                                    <span className="text-gray-900 fw-medium text-xl font-heading-two">Product</span>
                                    <span className="text-gray-900 fw-medium text-xl font-heading-two">Subtotal</span>
                                </div>
                                {filteredCartItems.map((item, index) => (
                                    <div className="flex-between gap-24 mb-32" key={index}>
                                        <div className="flex-align gap-12">
                                            <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
                                                {item.product.product_name}
                                            </span>
                                            <span className="text-gray-900 fw-normal text-md font-heading-two">
                                                <i className="ph-bold ph-x" />
                                            </span>
                                            <span className="text-gray-900 fw-semibold text-md font-heading-two">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <span className="text-gray-900 fw-bold text-md font-heading-two">
                                            ${(item?.regular_price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="mt-32 pt-32 border-top border-gray-100">
                                    <div className="flex-between gap-8 mb-16">
                                        <span className="text-gray-900 fw-normal text-md font-heading-two">Subtotal</span>
                                        <span className="text-gray-900 fw-bold text-md font-heading-two">${subTotalPrice.toFixed(2)}</span>
                                    </div>
                                    {coupon && (
                                        <div className="flex-between gap-8 mb-16">
                                            <span className="text-gray-900 fw-normal text-md font-heading-two">Discount</span>
                                            <span className="text-gray-900 fw-bold text-md font-heading-two">-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex-between gap-8 mb-16">
                                        <span className="text-gray-900 fw-normal text-md font-heading-two">Shipping</span>
                                        <span className="text-gray-900 fw-bold text-md font-heading-two">${shippingPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex-between gap-8 mb-16">
                                        <span className="text-gray-900 fw-normal text-md font-heading-two">Tax (2%)</span>
                                        <span className="text-gray-900 fw-bold text-md font-heading-two">${taxAmount}</span>
                                    </div>
                                    <hr />
                                    <div className="flex-between gap-8">
                                        <span className="text-gray-900 fw-medium text-xl font-heading-two">Grand Total</span>
                                        <span className="text-gray-900 fw-bold text-xl font-heading-two">${grandTotal}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-32">
                                <div className="payment-item">
                                    <div className="form-check common-check common-radio py-16 mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="payment1"
                                            value="payment1"
                                            {...register('payment', { required: 'Payment method is required' })}
                                        />
                                        <label className="form-check-label fw-semibold text-neutral-600" htmlFor="payment1">
                                            Direct Bank Transfer
                                        </label>
                                    </div>
                                    {selectedPayment === 'payment1' && (
                                        <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block">
                                            <p className="text-gray-800">
                                                Make your payment directly into our bank account. Please use your Order ID as the
                                                payment reference.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="payment-item">
                                    <div className="form-check common-check common-radio py-16 mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="payment2"
                                            value="payment2"
                                            {...register('payment', { required: 'Payment method is required' })}
                                        />
                                        <label className="form-check-label fw-semibold text-neutral-600" htmlFor="payment2">
                                            Check Payments
                                        </label>
                                    </div>
                                    {selectedPayment === 'payment2' && (
                                        <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block">
                                            <p className="text-gray-800">
                                                Make your payment directly into our bank account. Please use your Order ID as the
                                                payment reference.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="payment-item">
                                    <div className="form-check common-check common-radio py-16 mb-0">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="payment3"
                                            value="payment3"
                                            {...register('payment', { required: 'Payment method is required' })}
                                        />
                                        <label className="form-check-label fw-semibold text-neutral-600" htmlFor="payment3">
                                            Cash on Delivery
                                        </label>
                                    </div>
                                    {selectedPayment === 'payment3' && (
                                        <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block">
                                            <p className="text-gray-800">
                                                Pay upon delivery.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {errors.payment && (
                                    <div className="invalid-feedback d-block">{errors.payment.message}</div>
                                )}
                            </div>
                            <div className="mt-32 pt-32 border-top border-gray-100">
                                <p className="text-gray-500">
                                    Your personal data will be used to process your order, support your experience throughout
                                    this website, and for other purposes described in our{' '}
                                    <Link to="#" className="text-main-600 text-decoration-underline">
                                        privacy policy
                                    </Link>
                                    .
                                </p>
                            </div>
                            <button
                                type="submit"
                                form="checkout-form"
                                className="btn btn-main mt-40 py-18 w-100 rounded-8"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;