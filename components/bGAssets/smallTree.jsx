import kleinerBaum from "../../assets/smallTree.svg";
import { motion } from "framer-motion";

const SmallTree = (props) => {
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
            <img src={kleinerBaum.src} alt="Baum" />
        </motion.div>
    );
};

export default SmallTree;
