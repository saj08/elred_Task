import React, { useState } from "react";
import { SuccessToast } from "../ToastMsg";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { OrdersActions } from "../store/Orders";

const SeeAll = (props) => {
    const orders = useSelector((state) => state.orders.orders);

    return (
        <>
            <form id="kt_modal_add_user_form" className="form row" noValidate>
                <div
                    className="d-flex flex-column scroll-y me-n7 pe-7 col"
                    id="kt_modal_add_user_scroll"
                    data-kt-scroll="true"
                    data-kt-scroll-activate="{default: false, lg: true}"
                    data-kt-scroll-max-height="auto"
                    data-kt-scroll-dependencies="#kt_modal_add_user_header"
                    data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
                    data-kt-scroll-offset="300px"
                >
                    <table className="table__list">
                        <thead>
                            <tr>
                                <td className="table-header-list"></td>
                                <td className="table-header-list">Product</td>
                                <td className="table-header-list">Quantity</td>
                                <td className="table-header-list">Price</td>
                                <td className="table-header-list"></td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="table-row">
                                    <td>
                                        <img
                                            src={order.imageUrl ? order.imageUrl : "/product2.png"}
                                            alt="Product"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                marginRight: "10px",
                                            }}
                                        />
                                    </td>
                                    <td style={{ fontWeight: "bold" }}>
                                        <div className="d-flex">
                                            <div className="d-flex flex-column">
                                                <span>{order.name.slice(0, 20)}</span>
                                                <span style={{ fontSize: "10px", color: "#c0c0c0" }}>
                                                    {order.activeIndexPackagingData.saleDescription
                                                        .slice(0, 20)
                                                        .split(" ")
                                                        .join(" | ")}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="table-data-list">{order.quantity}</td>
                                    <td className="table-data-list">
                                        {order.currency.symbol}{" "}
                                        {order.quantity * order.activeIndexPackagingData.grossPrice}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </>
    );
};

export { SeeAll };
