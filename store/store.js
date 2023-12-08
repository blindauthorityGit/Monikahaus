// store.js
import { create } from "zustand";
import Cookies from "js-cookie";

const useStore = create((set) => ({
    dimensions: { width: 0, height: 0 },
    setDimensions: (width, height) => set({ dimensions: { width, height } }),
    showUnclaimed: false,
    setShowUnclaimed: (value) => set({ showUnclaimed: value }),
    userList: [],
    setUserList: (users) => set({ userList: users }),
    showOverlay: false,
    setShowOverlay: (show) => set({ showOverlay: show }),
    isModalOpen: false,
    modalPosition: { x: 0, y: 0 },
    openModal: (x, y) => set({ isModalOpen: true, modalPosition: { x, y } }),
    closeModal: () => set({ isModalOpen: false }),
    setModalPosition: (x, y) => set({ modalPosition: { x, y } }),
    treeAnimationFinished: false,
    setTreeAnimationFinished: (value) => set({ treeAnimationFinished: value }),
    // Add the isSidebarOpen state with an initial value of false
    isSidebarOpen: false,
    // Add a setter function for isSidebarOpen
    setSidebarOpen: (value) => set({ isSidebarOpen: value }),
    listItemHeight: 0,
    setListItemHeight: (height) => set({ listItemHeight: height }),
    // Initially, userData is an empty object
    userData: {},
    setUserData: (data) => set({ userData: data }),
    resetUserData: () => set({ userData: {} }),
    // Initially, onBoarding is set to true
    // Define the onBoarding state
    onBoarding: true,
    // Initialize onBoarding state from the cookie if available
    initializeOnBoarding: () => {
        const cookieValue = Cookies.get("onBoarding");
        if (cookieValue !== undefined) {
            set({ onBoarding: cookieValue === "true" });
        }
    },
    // Custom action to set onBoarding state and cookie
    setOnBoardingAndCookie: (value) => {
        set({ onBoarding: value });

        // Set the cookie based on the onBoarding value
        const cookieValue = value ? "true" : "false";
        Cookies.set("onBoarding", cookieValue, {
            expires: new Date("9999-12-31T23:59:59Z"), // Set your preferred expiration date
            path: "/", // Adjust as needed
        });
    },

    modalHeight: null, // Default modal height, you can set any default value you want

    setModalHeight: (height) => set({ modalHeight: height }),
    showSuccess: false, // Default value is false
    setShowSuccess: (value) => set(() => ({ showSuccess: value })),
    // ANIMATION CLASS
    animateTree: "", // Default value is false
    setAnimateTree: (value) => set(() => ({ animateTree: value })),
    // Swipe COUNT
    swipeCount: 0, // Default value is false
    setSwipeCount: (value) => set(() => ({ swipeCount: value })),
    // ANIMATION END COUNT
    animationEndCounter: "",
    setAnimationEndCounter: (value) => set({ animationEndCounter: value }),
    // ANIMATION END COUNT
    tooltipOpen: false,
    setTooltipOpen: (value) => set({ tooltipOpen: value }),
    // GET TO LAST TREE
    getToLastTree: false,
    setGetToLastTree: (value) => set({ getToLastTree: value }),
}));

// Initialize onBoarding state from the cookie
useStore.getState().initializeOnBoarding();

export default useStore;
