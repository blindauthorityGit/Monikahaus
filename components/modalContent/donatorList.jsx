import React, { useState, useEffect } from "react";
import MainContainer from "../layout/MainContainer";
import { testData } from "../../dev";

const DonatorList = () => {
    return (
        <MainContainer width="fixed relative">
            <div className="col-span-12">
                {testData.map((e, i) => {
                    if (i < 8) {
                        return (
                            <div className="wrapper flex items-center mb-4">
                                <div className="left pr-6">
                                    <img className="rounded-full h-24" src="https://i.pravatar.cc/300" alt="" />
                                </div>
                                <div className="right w-64">
                                    <strong>{e.name}</strong>
                                    <br />
                                    Spende: {e.sum}
                                </div>
                                {e.comment && <div className="farRight border p-4 bg-[lightgray]">{e.comment}</div>}
                            </div>
                        );
                    }
                })}
            </div>
        </MainContainer>
    );
};

export default DonatorList;
