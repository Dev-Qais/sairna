import SairnaIcon from "../common/SairnaIcon";

function AnnouncementBar() {
    return ( 
        <div 
            className="
                min-h-[32px] 
                bg-[var(--dark-deep)] 
                text-[#d4f2ec] 
                text-[10px] 
                font-bold
                flex 
                items-center 
                justify-center
                gap-[8px]
                tracking-[0.1px]">
            <span className="w-[6px] h-[6px] bg-[#58d7bb] rounded-full shadow-[0_0_0_4px_rgba(88,215,187,.12)]"></span>
            رحلات بين المدن السورية، بخطوات بسيطة وواضحة
            <SairnaIcon className="w-[13px] h-[13px] text-[#58d7bb]" />
            
        </div>
     );
}

export default AnnouncementBar;