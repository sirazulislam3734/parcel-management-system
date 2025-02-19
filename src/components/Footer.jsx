/* eslint-disable react/no-unknown-property */
import footerImg from '../assets/images-removebg-preview.png'
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <div className="p-4 lg:px-20 bg-base-200 md:px-10 md:py-5">
      <div className="container mx-auto">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <img src={footerImg} alt="" className='w-16' />
              <span className="ml-2 text-2xl font-bold tracking-wide text-primary uppercase">
              Parcel Management
              </span>
            </a>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-800">
              I am thrilled to share my latest project: Parcel Management System. This web application is designed to streamline the parcel management process, offering a seamless and intuitive experience for users. Whether tracking parcels or managing deliveries, this app does it all!
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-primary">
              Contacts
            </p>
            <div className="flex">
              <p className="mr-1 text-gray-800 font-semibold">Phone:</p>
              <a
                href="tel:850-123-5021"
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                +8801869-921351
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800 font-semibold">Email:</p>
              <a
                href="mailto:info@lorem.mail"
                aria-label="Our email"
                title="Our email"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                sirazulislam3734@gmail.com
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800 font-semibold">Address:</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our address"
                title="Our address"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
               Kosba, Brahmanbaria , Bangladesh
              </a>
            </div>
          </div>
          <div>
            <span className="text-base font-bold tracking-wide text-primary">
              Social
            </span>
            <div className="flex items-center mt-1 space-x-3">
              <SocialLinks></SocialLinks>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Bacon ipsum dolor amet short ribs pig sausage prosciutto chicken
              spare ribs salami.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600">
            © Copyright 2025 Inc. All rights reserved.
          </p>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <a
                href="/"
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                F.A.Q
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
