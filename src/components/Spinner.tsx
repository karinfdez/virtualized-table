import { RingLoader } from "react-spinners";

export const Spinner = ({color, loading}:{color:string, loading:boolean}) => {

    return (
        //center spinner regardless of the parent layout
         <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">  
            <RingLoader
                color={color}  
                loading={loading}
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}