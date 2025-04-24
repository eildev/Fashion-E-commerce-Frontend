import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSendContactMessageMutation } from "../redux/features/api/contactUsApi/contactUsApi";

const Contact = () => {
  const [sendContactMessage, { isLoading, error, isSuccess }] =
    useSendContactMessageMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    phone: "",

  });
  const [agreePolicy, setAgreePolicy] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Submitting formData:", formData);

    try {

      
      const result = await sendContactMessage(formData).unwrap();
      console.log("result", result);
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
       
      });
      setAgreePolicy(false);
    } catch (err) {
        console.log(err);
      console.error("Submission Error:", {
        message: err?.data?.message,
        status: err?.status,
        data: err?.data,
        error: err,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Message sent successfully!");
    }
    if (error) {
      alert("Failed to send message. Please try again.");
    }
  }, [isSuccess, error]);

  return (
    <section className="contact py-80">
      <div className="container container-lg">
        <div className="row gy-5">
          <div className="col-lg-8">
            <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
              <form onSubmit={handleSubmit}>
                <h6 className="mb-32">Make Custom Request</h6>
                <div className="row gy-4">
                  <div className="col-sm-6 col-xs-6">
                    <label
                      htmlFor="fullName"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      Full Name{" "}
                      <span className="text-danger text-xl line-height-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="common-input px-16"
                      id="fullName"
                      placeholder="Full name"
                      onChange={handleChange}
                      name="fullName"
                      value={formData.fullName}
                    />
                  </div>
                  <div className="col-sm-6 col-xs-6">
                    <label
                      htmlFor="email"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      Email Address{" "}
                      <span className="text-danger text-xl line-height-1">*</span>
                    </label>
                    <input
                      type="email"
                      className="common-input px-16"
                      id="email"
                      placeholder="Email address"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                    />
                  </div>
                  <div className="col-sm-6 col-xs-6">
                    <label
                      htmlFor="phone"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      Phone Number
                      <span className="text-danger text-xl line-height-1">*</span>
                    </label>
                    <input
                      type="tel" // Changed to tel for better semantics
                      className="common-input px-16"
                      id="phone"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      name="phone"
                      value={formData.phone}
                    />
                  </div>
                  <div className="col-sm-6 col-xs-6">
                    <label
                      htmlFor="subject"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      Subject
                      <span className="text-danger text-xl line-height-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="common-input px-16"
                      id="subject"
                      placeholder="Subject"
                      onChange={handleChange}
                      name="subject"
                      value={formData.subject}
                    />
                  </div>
                  <div className="col-sm-12">
                    <label
                      htmlFor="message"
                      className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                    >
                      Message
                      <span className="text-danger text-xl line-height-1">*</span>
                    </label>
                    <textarea
                      className="common-input px-16"
                      id="message"
                      placeholder="Type your message"
                      onChange={handleChange}
                      name="message"
                      value={formData.message}
                    />
                  </div>
                  <div className="col-sm-12 mt-32">
                    <button
                      type="submit"
                      className="btn btn-main py-18 px-32 rounded-8"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send"}
                    </button>
                    {isSuccess && (
                      <p style={{ color: "green" }}>Message sent successfully!</p>
                    )}
                    {error && (
                      <p style={{ color: "red" }}>
                        Failed to send message: {error?.data?.message || "Please try again."}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
              <h6 className="mb-48">Get In Touch</h6>
              <div className="flex-align gap-16 mb-16">
                <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                  <i className="ph-fill ph-phone-call" />
                </span>
                <Link
                  to="tel:+00123456789"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  +00 123 456 789
                </Link>
              </div>
              <div className="flex-align gap-16 mb-16">
                <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                  <i className="ph-fill ph-envelope" />
                </span>
                <Link
                  to="mailto:support24@marketpro.com"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  support24@marketpro.com
                </Link>
              </div>
              <div className="flex-align gap-16 mb-0">
                <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                  <i className="ph-fill ph-map-pin" />
                </span>
                <span className="text-md text-gray-900">
                  789 Inner Lane, California, USA
                </span>
              </div>
            </div>
            <div className="mt-24 flex-align flex-wrap gap-16">
              <Link
                to="#"
                className="bg-neutral-600 hover-bg-main-600 rounded-8 p-10 px-16 flex-between flex-wrap gap-8 flex-grow-1"
              >
                <span className="text-white fw-medium">Get Support On Call</span>
                <span className="w-36 h-36 bg-main-600 rounded-8 flex-center text-xl text-white">
                  <i className="ph ph-headset" />
                </span>
              </Link>
              <Link
                to="#"
                className="bg-neutral-600 hover-bg-main-600 rounded-8 p-10 px-16 flex-between flex-wrap gap-8 flex-grow-1"
              >
                <span className="text-white fw-medium">Get Direction</span>
                <span className="w-36 h-36 bg-main-600 rounded-8 flex-center text-xl text-white">
                  <i className="ph ph-map-pin" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;