import ContactForm from "@/components/common/contact-form";
import FeatureBanner from "@/components/common/feature-banner";
import PageBanner from "@/components/common/page-banner";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact",
};
const Contact = () => {
  return (
    <div className="md:container mx-auto">
      <PageBanner title="Contact" />
      <section className="flex flex-col items-center gap-5 my-12">
        <Card className="flex flex-col items-center w-full">
          <CardContent className="p-6">
            <h2 className="text-center text-4xl font-semibold whitespace-nowrap max-md:mt-10">
              Get In Touch With Us
            </h2>
            <p className="text-neutral-400 text-center text-base mt-7 max-md:max-w-full">
              For More Information About Our Product & Services. Please Feel
              Free To Drop Us An Email. Our Staff Always Be There To Help You
              Out. Do Not Hesitate!
            </p>
          </CardContent>
        </Card>
        <div className="w-full max-md:max-w-full">
          <div className="flex flex-col md:flex-row justify-between gap-5 my-6">
            <Card className="w-full">
              <CardContent className="p-6">
                <ContactForm />
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="p-6">
                <div className="flex w-full max-md:ml-0">
                  <div className="flex w-full flex-col mx-auto max-md:mt-10 max-md:px-5">
                    <div className="flex justify-between gap-5 items-start">
                      <FaMapMarkerAlt className="text-2xl mt-1" />
                      <div className="flex grow basis-0 flex-col gap-2">
                        <div className="text-2xl font-medium">Address</div>
                        <div className="text-base">
                          236 5th SE Avenue, New York <br /> NY 10000, United
                          States
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-5 mt-12 items-start">
                      <FaPhoneAlt className="text-2xl mt-1" />
                      <div className="flex grow basis-[0%] flex-col gap-2">
                        <div className="text-2xl font-medium">Phone</div>
                        <div className="text-base">
                          Mobile:
                          <Link href={"tel:+(84) 546-6789"}>
                            +(84) 546-6789
                          </Link>
                          <br />
                          Hotline:{" "}
                          <Link href={"tel:+(84) 456-6789"}>
                            +(84) 456-6789
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-5 mt-12 mb-7 items-start">
                      <FaClock className="text-2xl mt-1" />
                      <div className="flex grow basis-0 flex-col items-stretch gap-2">
                        <div className=" text-2xl font-medium">
                          Working Time
                        </div>
                        <div className=" text-base">
                          Monday-Friday: 9:00 - 22:00 <br />
                          Saturday-Sunday: 9:00 - 21:00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <FeatureBanner />
    </div>
  );
};

export default Contact;
