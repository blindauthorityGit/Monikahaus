import { colors } from "../../config";
import { motion } from "framer-motion";

const Kreis = (props) => {
    return (
        <motion.div
            layout
            initial={{
                scale: 0,
            }}
            animate={{ scale: 1 }}
            transition={{ duration: props.duration, delay: 1.5, type: "spring" }}
            className={`w-96 h-96 rounded-full absolute top-[20%] left-[40%] z-0  bg-[#f5f5f5]`}
        ></motion.div>
    );
    // return <div className={`w-96 h-96 rounded-full  bg-[${colors.primaryColor.toLowerCase()}]`}></div>;
};

export default Kreis;
