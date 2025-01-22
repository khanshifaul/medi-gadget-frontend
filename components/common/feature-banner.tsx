import Image from "next/image";

const FeatureBanner = () => {
  return (
    <>
      <section className="bg-accent w-full p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-12 w-full mx-auto">
          <div className="basis-1/2 md:basis-1/4 flex justify-between items-center gap-2">
            <Image
              alt=""
              width="100"
              height="100"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a78db668b54cbedb234be712209fb7fd29af590e6fc9abe238ef527fa473f9f?apiKey=6ffec690802f40178600cdcc3bd58cc4&"
              className="object-contain object-center w-[60px] overflow-hidden shrink-0 max-w-full my-auto dark:mix-blend-plus-lighter dark:bg-blend-plus-lighter"
            />
            <div className="flex flex-grow flex-col flex-nowrap">
              <h3 className="text-accent-foreground text-2xl font-semibold ">
                High Quality
              </h3>
              <p className="text-zinc-500 text-xl font-medium ">
                crafted from top materials
              </p>
            </div>
          </div>
          <div className="basis-1/2 md:basis-1/4 flex justify-between items-center gap-2">
            <Image
              alt=""
              width="100"
              height="100"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/306b4eda71b9937266e5653625f9bbb4a3c5904b34491170d0cab5e95c5ed803?apiKey=6ffec690802f40178600cdcc3bd58cc4&"
              className="aspect-square object-contain object-center w-[60px] overflow-hidden shrink-0 max-w-full my-auto dark:mix-blend-plus-lighter dark:bg-blend-plus-lighter"
            />
            <div className="flex flex-grow  flex-col flex-nowrap">
              <h3 className="text-accent-foreground text-2xl font-semibold  ">
                Warranty Protection
              </h3>
              <p className="text-zinc-500 text-xl font-medium ">Over 2 years</p>
            </div>
          </div>
          <div className="basis-1/2 md:basis-1/4 flex justify-between items-center gap-2">
            <Image
              alt=""
              width="100"
              height="100"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3daf64c88d27d5e66d9d369c77d062b65cf942283b332829da06b35b26cb302?apiKey=6ffec690802f40178600cdcc3bd58cc4&"
              className="aspect-square object-contain object-center w-[60px] overflow-hidden shrink-0 max-w-full my-auto dark:mix-blend-plus-lighter dark:bg-blend-plus-lighter"
            />
            <div className="flex flex-grow flex-col flex-nowrap">
              <h3 className="text-accent-foreground text-2xl font-semibold  ">
                Free Shipping
              </h3>
              <p className="text-zinc-500 text-xl font-medium  ">
                Order over 150 $
              </p>
            </div>
          </div>
          <div className="basis-1/2 md:basis-1/4 flex justify-between items-center gap-2">
            <Image
              alt=""
              width="100"
              height="100"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4931226542fbf221d4ebf9a167f766c08c2e1eb0f497ca6290b4a27fbcb34e7b?apiKey=6ffec690802f40178600cdcc3bd58cc4&"
              className="aspect-square object-contain object-center w-[60px] overflow-hidden shrink-0 max-w-full my-auto dark:mix-blend-plus-lighter dark:bg-blend-plus-lighter"
            />
            <div className="flex flex-grow flex-col flex-nowrap">
              <h3 className="text-accent-foreground text-2xl font-semibold">
                24 / 7 Support
              </h3>
              <p className="text-zinc-500 text-xl font-medium  ">
                Dedicated support
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureBanner;
