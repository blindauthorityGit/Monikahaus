import React, { useState, useEffect, useContext } from "react";
import MainContainer from "../layout/mainContainer";
import { testData } from "../../dev";
import { KugelColor, UserList } from "../../helper/context";
import ReactPaginate from "react-paginate";
import ListItem from "./listItem";
import { isBrowser, isMobile } from "react-device-detect";

const DonatorList = () => {
    const { kugelColor, setKugelColor } = useContext(KugelColor);
    const { userList, setUserList } = useContext(UserList);

    const [itemsAll, setItemsAll] = useState(userList);
    const [items, setItems] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener("resize", handleWindowResize);
        console.log(windowSize.innerHeight);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const itemsPerPage = windowSize.innerHeight <= 640 ? 4 : 5;

    function sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    useEffect(() => {
        setItems(sliceIntoChunks(itemsAll, itemsPerPage));
    }, []);

    const claimedArr = Array.from(document.querySelectorAll(".kugel"));

    const onHover = (e) => {
        setKugelColor({ ...kugelColor, id: e.currentTarget.dataset.id });
        claimedArr[e.currentTarget.dataset.id].classList.add(
            "outline",
            "outline-offset-2",
            "outline-pink-500",
            "heartbeat"
        );
    };

    const onLeave = (e) => {
        claimedArr[e.currentTarget.dataset.id].classList.remove(
            "outline",
            "outline-offset-2",
            "outline-pink-500",
            "heartbeat"
        );
    };

    return (
        <MainContainer width="fixed relative h-full">
            <div className="col-span-12 pt-10 sm:pt-0">
                {items && (
                    <>
                        {items[currentPage].map((e, i) => {
                            if (i < itemsPerPage) {
                                return <ListItem onHover={onHover} onLeave={onLeave} e={e}></ListItem>;
                            }
                        })}
                    </>
                )}
            </div>
            <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={Math.ceil(itemsAll.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination border flex justify-center items-center mt-5 absolute bottom-0 w-full"}
                pageClassName={"page-item border p-2 w-10 text-center opacity-50"}
                pageLinkClassName={"page-link "}
                previousClassName={"page-item pr-5"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item pl-5"}
                nextLinkClassName={"page-link"}
                activeClassName={"active font-bold opacity-100"}
            />
        </MainContainer>
    );
};

export default DonatorList;
