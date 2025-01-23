import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Logo from "../logo";

export const navLink = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Contact", path: "/contact" },
  { name: "Blog", path: "/blog" },
];

export const helpLink = [
  { name: "Payment Policy", path: "/payment" },
  { name: "Returns Policy", path: "/return" },
  { name: "Privacy Policy", path: "/privacy" },
];

const GuestFooter = () => {
  return (
    <div className="md:container mx-auto">
      <div className="md:flex md:flex-row items-start my-6 border-t-2 py-2">
        <div className="px-2 basis-1/2 flex flex-col gap-10 justify-start">
          <div className="flex justify-start">
            <Logo />
          </div>
          <p className="text-neutral-400 text-base">
            Kazi Nazrul Avenue, Banglamotor, <br /> Dhaka-1000, Bangladesh
          </p>
          <div className="flex gap-5">
            <Link href={"https://www.facebook.com/medigadget.bd"}>
              <FaFacebook className="text-2xl" />
            </Link>
            <Link href={"/"}>
              <FaInstagram className="text-2xl" />
            </Link>
          </div>
        </div>
        <div className="px-2 basis-1/2 flex flex-row items-start my-12 md:m-0">
          <div className="basis-1/2 flex flex-col gap-5">
            <h3 className="text-neutral-500 font-semibold">Links</h3>
            {navLink.map((link, index) => {
              return (
                <Link
                  href={link.path}
                  key={index}
                  className="hover:font-semibold"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="basis-1/2 flex flex-col gap-5">
            <h3 className="text-neutral-500 font-semibold">Help</h3>
            {helpLink.map((link, index) => {
              return (
                <Link
                  href={link.path}
                  key={index}
                  className="hover:font-semibold"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="md:flex md:justify-between items-center border-t-2 py-2">
        <p className="px-2 text-center">
          <span> {new Date().getFullYear()} &copy; </span>
          MediGadget. All rights reserved.
        </p>
        {/* <DevFooter /> */}
      </div>
    </div>
  );
};

export default GuestFooter;
