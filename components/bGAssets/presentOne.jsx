import Present1 from "../../assets/present1.svg";
import { motion } from "framer-motion";

const PresentOne = (props) => {
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
            <img src={Present1.src} alt="Geschenk" />
        </motion.div>
    );
};

export default PresentOne;
