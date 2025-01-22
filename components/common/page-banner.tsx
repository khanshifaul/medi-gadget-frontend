import Logo from "@/components/logo";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

interface PageTitle {
  title: string;
}

const PageBanner = ({ title }: PageTitle) => {
  return (
    <>
      <div className="bg-background flex flex-col items-center">
        <div className="flex-col overflow-hidden relative z-[1] flex w-full justify-center items-center -mt-1.5 px-16">
          <Image
            alt=""
            width="100"
            height="100"
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/32ed1ce3af615858513cca2e55f4e125a29a9aaf536d2c6a9375deeb03d6d325?apiKey=6ffec690802f40178600cdcc3bd58cc4&width=2000"
            className="absolute h-full w-full object-cover object-center inset-0 dark:backdrop-brightness-30"
          />
          <div className="relative flex max-w-full flex-col items-center mt-4 mb-9">
            <div className="my-5">
              <Logo />
            </div>
            <div className="text-forground text-5xl font-medium whitespace-nowrap max-md:text-4xl">
              {title}
            </div>
            <div className="flex gap-1.5 mt-6 justify-center items-center">
              <Link
                href="/"
                className="text-forground text-base font-medium self-center grow whitespace-nowrap my-auto"
              >
                Home
              </Link>
              <MdChevronRight className="text-foreground text-2xl" />
              <div className="text-forground text-base font-light self-center grow whitespace-nowrap my-auto">
                {title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBanner;
