import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 py-10">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-bold mb-3">Contact Us</h2>
          <p className="flex md:items-center gap-2 justify-center md:justify-start">
            <FaPhoneAlt /> +880 1234-567890
          </p>
          <p className="flex md:items-center gap-2 mt-2 justify-center md:justify-start">
            <MdEmail /> info@decoranest.com
          </p>
          <p className="flex md:items-center gap-2 mt-2 justify-center md:justify-start">
            <MdLocationOn /> Dhaka, Bangladesh
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-bold mb-3">Follow Us</h2>
          <div className="flex items-center justify-center md:justify-start gap-4 text-2xl">
            <a href="https://www.facebook.com/" target="_blank"><FaFacebook /></a>
            <a href="https://www.instagram.com/" target="_blank"><FaInstagram /></a>
            <a href="https://www.youtube.com/" target="_blank"><FaYoutube /></a>
            <a href="https://x.com/" target="_blank"><FaXTwitter /></a>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h2 className="text-lg font-bold mb-3">Working Hours</h2>
          <p>Sun - Thu: 9:00 AM – 8:00 PM</p>
          <p>Saturday: 10:00 AM – 6:00 PM</p>
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
