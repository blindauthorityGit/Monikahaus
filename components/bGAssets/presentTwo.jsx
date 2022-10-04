import Present2 from "../../assets/present2.svg";
import { motion } from "framer-motion";

const PresentTwo = (props) => {
    return (
        <motion.div
            layout
            initial={{
                x: props.initialX,
                y: props.initialY,
                scale: props.initialScale,
                rotate: props.initialRotate,
            }}
            animate={{ x: props.x, y: props.y, scale: props.scale, rotate: props.rotate }}
            transition={{ duration: props.duration, delay: props.delay, type: props.type }}
            className={`absolute ${props.klasse}`}
        >
            <img src={Present2.src} alt="Geschenk" />
        </motion.div>
    );
};

export default PresentTwo;
