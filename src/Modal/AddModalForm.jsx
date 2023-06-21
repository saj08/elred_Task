import React, { useEffect, useState } from "react";
import { SuccessToast } from "../ToastMsg";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { OrdersActions } from "../store/Orders";
import { OrdersListActions } from "../store/OrderList";

const AddModalForm = (props) => {
    const ordersList = useSelector((state) => state.orderList.ordersList);
    const [activeIndexPackaging, setActiveIndexPackaging] = useState(0);
    const [activeIndexPackagingData, setActiveIndexPackagingData] = useState(
        props.data.variants[0]
    );
    const [orderData, setOrderData] = useState(ordersList);
    const dispatch = useDispatch();
    console.log(ordersList);
    // const [activeIndexColor, setActiveIndexColor] = useState(0);
    // const [activeIndexColorData, setActiveIndexColorData] = useState(
    //     props.data.variants[0]
    // );

    const handleButtonClickPackaging = (index, variant) => {
        setActiveIndexPackagingData(variant);
        setActiveIndexPackaging(index);
    };

    // const handleButtonClickColor = (index, variant) => {
    //     setActiveIndexColorData(variant);
    //     setActiveIndexColor(index);
    // };

    const editUserSchema = Yup.object().shape({
        quantity: Yup.number()
            .min(12, "Minimum Quantity Should be 12")
            .max(100, "Maximum Quantity Should be 100")
            .required("Quantity is required"),
    });

    const [userForEdit] = useState({
        quantity: undefined,
    });

    const formik = useFormik({
        initialValues: userForEdit,
        validationSchema: editUserSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const orderToUpdate = orderData.find(
                    (order) => order.id === activeIndexPackagingData.variantId
                );
                if (orderToUpdate) {
                    const updatedOrder = { ...orderToUpdate };
                    updatedOrder.quantity += values.quantity;
                    const updatedOrderData = orderData.map((order) =>
                        order.id === activeIndexPackagingData.variantId
                            ? updatedOrder
                            : order
                    );
                    setOrderData(updatedOrderData);
                } else {
                    const newOrder = {
                        parentData: props.data,
                        activeIndexPackagingData,
                        quantity: values.quantity,
                        imageUrl: props.data.productImages[0],
                        id: activeIndexPackagingData.variantId,
                        currency: props.data.currency,
                        name: props.data.itemDescription,
                        activeIndexPackaging,
                    };
                    setOrderData((prev) => [...prev, newOrder]);
                }
                formik.setFieldValue("quantity", "");
            } catch (ex) {
                console.error(ex);
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        dispatch(OrdersListActions.onAddOrdersList({ items: orderData }));
    }, [orderData]);

    const handleAddToCart = () => {
        dispatch(OrdersActions.onAddOrders({ items: orderData }));
        SuccessToast("Items has been added to the cart");
        props.isModalClosed();
    };

    return (
        <>
            <form
                id="kt_modal_add_user_form"
                className="form row"
                onSubmit={formik.handleSubmit}
                noValidate
            >
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
                    <div>
                        <div className="fw-bold">{props.data.itemDescription}</div>
                        <div
                            className="d-flex justify-content-end"
                            style={{
                                color: "red",
                                cursor: "pointer",
                            }}
                            onClick={() => SuccessToast("Comming Soon")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-heart"
                                viewBox="0 0 16 16"
                            >
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg>
                        </div>
                        <div className="d-flex justify-content-center">
                            <img
                                src={
                                    props.data.productImages.length === 0
                                        ? "/product2.png"
                                        : props.data.productImages[0]
                                }
                                alt="gallery"
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <div style={{ color: "#c0c0c0" }}>
                            {activeIndexPackagingData.bpCatalogNumber}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">{props.data.itemDescription}</div>
                            <div>
                                {props.data.currency.symbol}{" "}
                                {activeIndexPackagingData.grossPrice}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2" style={{ color: "#c0c0c0" }}>
                        {activeIndexPackagingData.saleDescription}
                    </div>
                    <div className="mt-4">
                        <div className="fw-bold">Please Select Color Description</div>
                        <div className="row">
                            <div className="col">
                                <div
                                    className="scrollable-container"
                                    style={{ maxHeight: "200px", overflowY: "scroll" }}
                                >
                                    <div className="d-flex flex-wrap">
                                        {props.data.variants.map((variant, index) => (
                                            <div className="p-2" key={index}>
                                                <button
                                                    type="button"
                                                    className={`btn btn-outline-danger ${index === activeIndexPackaging ? "active" : ""
                                                        }`}
                                                    onClick={() =>
                                                        handleButtonClickPackaging(index, variant)
                                                    }
                                                >
                                                    {variant.colorDescription}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="fw-bold">Please Select Packaging Description</div>
                        <div className="row">
                            <div className="col">
                                <div
                                    className="scrollable-container"
                                    style={{ maxHeight: "200px", overflowY: "scroll" }}
                                >
                                    <div className="d-flex flex-wrap">
                                        {props.data.variants.map((variant, index) => (
                                            <div className="p-2" key={index}>
                                                <button
                                                    type="button"
                                                    className={`btn btn-outline-danger ${index === activeIndexPackaging ? "active" : ""
                                                        }`}
                                                    onClick={() =>
                                                        handleButtonClickPackaging(index, variant)
                                                    }
                                                >
                                                    {variant.packingDescription}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fv-row mt-4">
                        {/* begin::Label */}
                        <label className="required fw-bold fs-6 mb-2">Enter Quantity</label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                            placeholder="Quantity"
                            {...formik.getFieldProps("quantity")}
                            type="number"
                            name="quantity"
                            className={clsx(
                                "form-control form-control-solid mb-3 mb-lg-0",
                                {
                                    "is-invalid":
                                        formik.touched.quantity && formik.errors.quantity,
                                },
                                {
                                    "is-valid":
                                        formik.touched.quantity && !formik.errors.quantity,
                                }
                            )}
                            autoComplete="off"
                            disabled={formik.isSubmitting}
                        />
                        {formik.touched.quantity && formik.errors.quantity && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert" style={{ color: "red" }}>
                                        {formik.errors.quantity}
                                    </span>
                                </div>
                            </div>
                        )}
                        {/* end::Input */}
                    </div>
                    <div className="form-check mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" for="flexCheckDefault">
                            Need Urgent Order
                        </label>
                    </div>
                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="btn btn-outline-danger btn-lg"
                            style={{ padding: "0.5rem 9rem" }}
                            data-kt-users-modal-action="submit"
                            disabled={
                                formik.isSubmitting || !formik.isValid || !formik.touched
                            }
                        >
                            <span className="indicator-label">Add</span>
                            {formik.isSubmitting && (
                                <span className="indicator-progress">
                                    Please wait...{" "}
                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            )}
                        </button>
                    </div>
                </div>
                <div className="col">
                    <div className="fw-bold">Order List</div>
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
                            {orderData.map((order) => (
                                <tr key={order.id} className="table-row">
                                    <td>
                                        <img
                                            src={
                                                props.data.productImages.length === 0
                                                    ? "/product2.png"
                                                    : props.data.productImages[0]
                                            }
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
                                    <td
                                        className="table-data-list"
                                        style={{ color: "red", cursor: "pointer" }}
                                        onClick={() => {
                                            const newList = orderData.filter(
                                                (oldorder) => oldorder.id !== order.id
                                            );
                                            setOrderData(newList);
                                            dispatch(
                                                OrdersListActions.onAddOrdersList({ items: newList })
                                            );
                                            dispatch(OrdersActions.onAddOrders({ items: newList }));
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="10"
                                            height="10"
                                            fill="currentColor"
                                            class="bi bi-x-lg"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div
                        className="text-center"
                        style={{ marginTop: "5rem" }}
                        onClick={handleAddToCart}
                    >
                        <button
                            type="button"
                            class="btn btn-danger"
                            style={{ padding: "0.5rem 9rem" }}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
                {/* end::Scroll */}

                {/* begin::Actions */}

                {/* end::Actions */}
            </form>
        </>
    );
};

export { AddModalForm };
