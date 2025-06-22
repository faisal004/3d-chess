import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate=useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-t from-black to-zinc-700 w-full">
            <h1 className="text-7xl font-bold text-white font-mono">Chess</h1>
           
            <img src="./picture/hero-section.png" alt="hero-image"   />
            <div className="flex gap-4">
                <button onClick={()=>navigate("/game")} className="group cursor-pointer relative inline-flex h-12 bg-[#5d9948] items-center justify-center overflow-hidden rounded-md border border-green-200  px-6 font-medium text-white transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]">Play Chess</button>
            </div>

        </div>
    );
};

export default HeroSection;