import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react"
import Link from "next/link";
import { FC } from "react"

type Props = {
    icon : LucideIcon
    href : string;
    by : string;
    index : number;
}

const FilterBy  : FC<Props> = (props) => {

    const childVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        transition : {
            delay : (index:number) => index * 0.1
        },
        exit: (index: number) => ({
            opacity: 0,
            y: -20,
            transition: {
            delay: (index + 1) * 0.1, 
            duration: 0.3,
            },
        }),
    };

  return (
    <motion.div 
    variants={childVariants}
    custom={props.index}
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={{
        delay : props.index * .1
    }}
    >
        <Link href={props.href} className="px-4 flex gap-4 py-2 rounded hover:bg-slate-100/10">
            <props.icon />
            {props.by}
        </Link>
    </motion.div>
  )
}

export default FilterBy