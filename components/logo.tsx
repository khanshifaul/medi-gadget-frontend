"use client";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  logoURL?: string;
}

const Logo = ({ logoURL = "/Images/Logo.png" }: LogoProps) => {
  return (
    <>
      <Link href="/">
        <div className="flex justify-center items-center">
          <Image
            src={logoURL}
            alt="Logo"
            width={150}
            height={150}
            className="object-contain object-center"
          />
        </div>
      </Link>
    </>
  );
};

export default Logo;
