import React, { useState, useEffect, useContext } from "react";
import MainContainer from "../layout/mainContainer";
import { testData } from "../../dev";
import { KugelColor, UserList } from "../../helper/context";
import ReactPaginate from "react-paginate";
import ListItem from "./listItem";

const DonatorList = () => {
    const { kugelColor, setKugelColor } = useContext(KugelColor);
    const { userList, setUserList } = useContext(UserList);

    const [itemsAll, setItemsAll] = useState(userList);
    const [items, setItems] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 7;

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
            <div className="col-span-12">
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
