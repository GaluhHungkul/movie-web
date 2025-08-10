import { FC } from "react";
import { Input } from "../ui/input"

type Props = {
    type? : string;
    placeholder? : string;
    className? : string;
    errorMsg? : string | null
}

const AuthInputCard : FC<Props>= ({
    type="text",
    placeholder,
    className,
    errorMsg,
    ...res
}) => {
  return (
    <div className="space-y-1 relative">
        <Input required className={`${className} md:text-xl md:py-6`} placeholder={placeholder} type={type} {...res}/>
        <span className="text-red-500 text-sm md:text-lg">{errorMsg}</span>
    </div>
  )
}

export default AuthInputCard