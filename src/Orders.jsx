import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddQModal } from "./Modal/AddModal";
import { EditModal } from "./Modal/EditModal";
import { SeeAllModal } from "./Modal/SeeAllModal";
import { OrdersListActions } from "./store/OrderList";
import { OrdersActions } from "./store/Orders";
import { SuccessToast } from "./ToastMsg";

const Orders = (props) => {
    const orders = useSelector((state) => state.orders.orders);
    const [showSeeAllModal, setShowSeeAllModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const closeSeeAllModal = () => {
        setShowSeeAllModal(false);
    };

    const closeEditModal = () => {
        setEditModal(false);
    };
    const dispatch = useDispatch();

    return (
        <>
            {editModal && <EditModal isModalClosed={closeEditModal} />}
            {showSeeAllModal && <SeeAllModal isModalClosed={closeSeeAllModal} />}
            {orders && orders.length > 0 ? (
                <div className="section-3 col" style={props.style}>
                    <div className="card card__section" style={{ height: "38vh" }}>
                        <div
                            className="card-body py-3 image__container"
                            style={{ height: "35vh", overflow: "auto" }}
                        >
                            <table className="table__list">
                                <thead>
                                    <tr>
                                        <td className="table-header-list"></td>
                                        <td className="table-header-list">Product</td>
                                        <td className="table-header-list">Quantity</td>
                                        <td className="table-header-list">Price</td>
                                        <td
                                            className="table-header-list"
                                            style={{ color: "red", cursor: "pointer" }}
                                            onClick={() => setEditModal(true)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                fill="currentColor"
                                                class="bi bi-pencil"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                            </svg>{" "}
                                            Edit
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="table-row">
                                            <td>
                                                <img
                                                    src={
                                                        order.imageUrl ? order.imageUrl : "/product2.png"
                                                    }
                                                    alt="Product"
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        marginRight: "10px",
                                                        alignSelf: "center",
                                                    }}
                                                />
                                            </td>
                                            <td style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                <div className="d-flex">
                                                    <div className="d-flex flex-column">
                                                        <span>{order.name.slice(0, 20)}</span>
                                                        <span
                                                            style={{ fontSize: "10px", color: "#c0c0c0" }}
                                                        >
                                                            {order.activeIndexPackagingData.saleDescription
                                                                .slice(0, 20)
                                                                .split(" ")
                                                                .join(" | ")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                className="table-data-list"
                                                style={{ fontSize: "13px" }}
                                            >
                                                {order.quantity}
                                            </td>
                                            <td
                                                className="table-data-list"
                                                style={{ fontSize: "13px" }}
                                            >
                                                {order.currency.symbol}{" "}
                                                {order.quantity *
                                                    order.activeIndexPackagingData.grossPrice}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <span
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "10px",
                                marginBottom: "10px",
                                fontSize: "15px",
                                color: "red",
                                cursor: "pointer",
                            }}
                            onClick={() => setShowSeeAllModal(true)}
                        >
                            See all{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                fill="currentColor"
                                class="bi bi-arrow-right"
                                viewBox="0 0 16 16"
                                style={{ marginLeft: "8px" }}
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="d-flex justify-content-between mt-2 mb-2">
                        <span>Other Instructions</span>
                        <span
                            style={{
                                color: "red",
                                cursor: "pointer",
                            }}
                            onClick={() => SuccessToast("Coming Soon")}
                        >
                            Add
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                fill="currentColor"
                                class="bi bi-arrow-right"
                                viewBox="0 0 16 16"
                                style={{ marginLeft: "8px" }}
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="card card__section" style={{ height: "45vh" }}>
                        <div className="card-body py-3">
                            <div className="fv-row" style={{ fontSize: "14px" }}>
                                <label className="required fw-bold mb-2">
                                    Purchase Order Number
                                </label>
                                <input
                                    placeholder="Purchase Order Number"
                                    type="number"
                                    name="Purchase Order Number"
                                    className="form-control form-control-solid mb-3 mb-lg-0"
                                    autoComplete="off"
                                    value={1011564321}
                                    disabled
                                />
                            </div>
                            <div
                                className="d-flex justify-content-between mt-2 mb-2 "
                                style={{ fontSize: "14px" }}
                            >
                                <span>Addresses:</span>
                                <span
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => SuccessToast("Coming Soon")}
                                >
                                    View
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        fill="currentColor"
                                        class="bi bi-arrow-right"
                                        viewBox="0 0 16 16"
                                        style={{ marginLeft: "8px" }}
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div style={{ color: "#c0c0c0", fontSize: "14px" }}>
                                Office : 28 Rajasthan Udyog Nagar,G.T Kamal.....
                            </div>
                            <div
                                style={{ color: "#c0c0c0", marginTop: "5px", fontSize: "14px" }}
                            >
                                <div className="d-flex justify-content-between">
                                    <span>Items Total</span>
                                    <span>
                                        {orders[0].currency.symbol}
                                        {orders.reduce(
                                            (total, order) =>
                                                total +
                                                parseFloat(order.activeIndexPackagingData.grossPrice) *
                                                order.quantity,
                                            0
                                        )}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>SGST (9%)</span>
                                    <span>
                                        {orders[0].currency.symbol}
                                        {orders.reduce(
                                            (total, order) =>
                                                total +
                                                parseFloat(order.activeIndexPackagingData.grossPrice) *
                                                order.quantity,
                                            0
                                        ) * 0.09}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>CGST (9%)</span>
                                    <span>
                                        {orders[0].currency.symbol}
                                        {orders.reduce(
                                            (total, order) =>
                                                total +
                                                parseFloat(order.activeIndexPackagingData.grossPrice) *
                                                order.quantity,
                                            0
                                        ) * 0.09}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>IGST (9%)</span>
                                    <span>
                                        {orders[0].currency.symbol}
                                        {orders.reduce(
                                            (total, order) =>
                                                total +
                                                parseFloat(order.activeIndexPackagingData.grossPrice) *
                                                order.quantity,
                                            0
                                        ) * 0.09}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Taxable Amount</span>
                                    <span>
                                        {orders[0].currency.symbol}
                                        {orders.reduce(
                                            (total, order) =>
                                                total +
                                                parseFloat(order.activeIndexPackagingData.grossPrice) *
                                                order.quantity,
                                            0
                                        ) *
                                            0.09 +
                                            orders.reduce(
                                                (total, order) =>
                                                    total +
                                                    parseFloat(
                                                        order.activeIndexPackagingData.grossPrice
                                                    ) *
                                                    order.quantity,
                                                0
                                            ) *
                                            0.09 +
                                            orders.reduce(
                                                (total, order) =>
                                                    total +
                                                    parseFloat(
                                                        order.activeIndexPackagingData.grossPrice
                                                    ) *
                                                    order.quantity,
                                                0
                                            ) *
                                            0.09}
                                    </span>
                                </div>
                                <p className="horizontal__line"></p>
                                <div
                                    className="d-flex justify-content-between"
                                    style={{ color: "black" }}
                                >
                                    <span>Order Total</span>
                                    <span>
                                        {orders[0].currency.symbol}
                                        {orders.reduce(
                                            (total, order) =>
                                                total +
                                                parseFloat(order.activeIndexPackagingData.grossPrice) *
                                                order.quantity,
                                            0
                                        ) +
                                            orders.reduce(
                                                (total, order) =>
                                                    total +
                                                    parseFloat(
                                                        order.activeIndexPackagingData.grossPrice
                                                    ) *
                                                    order.quantity,
                                                0
                                            ) *
                                            0.09 *
                                            3}
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <button
                                    type="button"
                                    class="btn btn-outline-secondary"
                                    style={{ padding: "0.5rem 3rem" }}
                                    onClick={() => {
                                        dispatch(OrdersActions.onClearOrder());
                                        dispatch(OrdersListActions.onClearOrderList());
                                    }}
                                >
                                    Clear Cart
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-outline-danger active"
                                    style={{ padding: "0.5rem 3rem" }}
                                    onClick={() => {
                                        SuccessToast("Your Order has been placed");
                                        dispatch(OrdersActions.onClearOrder());
                                        dispatch(OrdersListActions.onClearOrderList());
                                    }}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="section-3 col" style={props.style}>
                    <div className="card card__section" style={{ height: "85vh" }}>
                        <div className="card-body py-3 image__container d-flex justify-content-center align-items-center">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    fill="currentColor"
                                    class="bi bi-cart"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                                    Items not added yet
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Orders;
