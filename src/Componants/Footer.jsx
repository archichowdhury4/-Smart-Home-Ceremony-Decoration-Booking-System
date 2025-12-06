import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 mt-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-bold mb-3">Contact Us</h2>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> +880 1234-567890
          </p>
          <p className="flex items-center gap-2 mt-2">
            <MdEmail /> info@decoranest.com
          </p>
          <p className="flex items-center gap-2 mt-2">
            <MdLocationOn /> Dhaka, Bangladesh
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-bold mb-3">Follow Us</h2>
          <div className="flex items-center gap-4 text-2xl">
            <Link to="https://www.facebook.com/"><FaFacebook /></Link>
            <Link to="https://www.instagram.com/accounts/login/?hl=en"><FaInstagram /></Link>
            <Link to="https://www.youtube.com/"><FaYoutube /></Link>
            <Link to="https://x.com/"><FaXTwitter /></Link>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h2 className="text-lg font-bold mb-3">Working Hours</h2>
          <p>Sun - thu: 9:00 AM  8:00 PM</p>
          <p>Saturday: 10:00 AM  6:00 PM</p>
          <p>Friday: Closed</p>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="text-center mt-10 border-t pt-5">
        <p>© {new Date().getFullYear()} DecoraNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
