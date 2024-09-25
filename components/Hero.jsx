import Image from "next/image"
import bgImage from "../assets/BG.png"
import { StarFilledIcon } from "@radix-ui/react-icons"
import avatar from "../assets/avatar.png"

function Hero() {
  return (
    <div className="w-2/5 hidden lg:block relative">
        <div className="z-0 w-full h-full ">
          <Image src={bgImage} style={{ width: "100%", objectFit: "cover" }} fill alt="background" />
        </div>
        <div className="z-10 py-32 px-20 2xl:py-40 2xl:px-32 ml-10 text-white absolute top-0 left-0 w-full h-full flex flex-col justify-between">
          <div className="max-w-[465px]">
            <h1 className="text-4xl 2xl:text-6xl font-bold mb-10">Welcome to <br />our community</h1>
            <p className="text-[#CBD5E1] font-thin text-sm 2xl:text-base">Clarity gives you the blocks & components you need to create a truly professional website.</p>
          </div>
          <div className="flex flex-col gap-6 max-w-[465px]">
            <div className="flex gap-2 text-yellow-300">
              <StarFilledIcon height={20} width={20} />
              <StarFilledIcon height={20} width={20} />
              <StarFilledIcon height={20} width={20} />
              <StarFilledIcon height={20} width={20} />
              <StarFilledIcon height={20} width={20} />
            </div>
            <p className="text-base 2xl:text-lg">&quot;We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.&quot;</p>
            <div className="flex gap-4 justify-start items-center">
              <Image height={"20px"} width={"20px"} src={avatar} alt="avatar" />
              <div>
                <p className="font-bold">Devon Lane</p>
                <p className="text-[#CBD5E1]">Co-founder, Design.co</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Hero