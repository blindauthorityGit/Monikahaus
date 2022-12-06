import React, { forwardRef } from "react";
import { TbFileInvoice } from "react-icons/tb";

const Choose = (props, ref) => {
    return (
        <div ref={ref} className="grid grid-cols-12">
            <hr className="col-span-12 mt-6" />
            <div className="text-white col-span-12 font-bold mt-6 mb-4 text-xl text-center">
                Benötigen Sie eine Spendenquittung?
            </div>
            <div onClick={props.onClickYes} className="right col-span-6 flex border p-3 text-white" id="quittung">
                <span className="text-4xl">
                    <TbFileInvoice></TbFileInvoice>
                </span>

                <div className="text-2xl  lg:text-lg">Ja</div>
            </div>
            <div onClick={props.onClickNo} className="left col-span-6 flex border p-3 text-white" id="anon">
                <span className="text-4xl">
                    <TbFileInvoice></TbFileInvoice>
                </span>
                <div className="text-2xl lg:text-lg">Nein</div>
            </div>
        </div>
    );
};

export default forwardRef(Choose);
