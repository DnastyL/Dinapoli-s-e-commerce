import Image from "next/image";

export const DiNapoLiLogo = () => {
  return (
    <div>
      <p className="md:text-[26px] text-[16px]">Di Napoli</p>
      <Image
        src="/italy.svg"
        alt="dinapoli-logo"
        width={30}
        height={25}
        className="w-[30px] h-[25px]"
      />
    </div>
  );
};
