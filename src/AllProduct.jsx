import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddQModal } from "./Modal/AddModal";
import Orders from "./Orders";
import SideBar from "./SideBar";
import { ErrorToast, SuccessToast } from "./ToastMsg";

const AllProduct = () => {
    const category = useSelector((state) => state.subCategory.subCategory);
    const categoryId = useSelector(
        (state) => state.subCategory.FirstClickedCategoryId
    );
    const [subData, setSubData] = useState(null);
    const [show, setShow] = useState(false);
    const [rowData, setRowData] = useState([]);

    const isModalClosed = () => {
        setShow(false);
        setRowData([]);
    };
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(
                    `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${categoryId}.json`
                );
                setSubData(resp.data.result);
            } catch (err) {
                ErrorToast("Something Went Wrong!!!");
            }
        };
        fetchData();
    }, [categoryId]);

    let activeIndex = 0;
    const navigate = useNavigate();
    return (
        <>
            {show === true && (
                <AddQModal data={rowData} isModalClosed={isModalClosed} />
            )}
            <div className="section__Home-container row">
                <div className="col-9">
                    <div className="row">
                        <SideBar height="70vh" grid="col-3" />
                        <div className="section-2 col-8">
                            <div className="card card__section" style={{ height: "70vh" }}>
                                <div className="card-body py-3">
                                    <div className="row mb-4">
                                        <h4 className="col mt-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-arrow-left"
                                                viewBox="0 0 16 16"
                                                style={{ marginRight: "10px", cursor: "pointer" }}
                                                onClick={() => navigate(-1)}
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                                />
                                            </svg>
                                            All Products
                                        </h4>
                                        <div className="col">
                                            <div className="row">
                                                <div
                                                    className="search__box col-8"
                                                    onClick={() => SuccessToast("Coming Soon")}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-search"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                    </svg>
                                                    <span className="search__box__text">Search</span>
                                                </div>
                                                <div className="empty-box col-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="container mt-5 image__container"
                                        style={{
                                            height: "450px",
                                            overflow: "auto",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {subData && subData.length > 0 ? (
                                            <div className="row">
                                               
                                                {subData.map((item, index) => (
                                                    <div
                                                        className="col-md-4 col-xs-12"
                                                        key={item.productId}
                                                        onClick={() => {
                                                            setRowData(item);
                                                            setShow(true);
                                                        }}
                                                    >
                                                        <div className="app__gallery-images_card-subcategory_product">
                                                            <div
                                                                className="d-flex justify-content-end"
                                                                style={{
                                                                    marginRight: "20px",
                                                                    marginTop: "10px",
                                                                    color: "red",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => SuccessToast("Coming Soon")}
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

                                                            <div className="app__gallery-images_card-subcategory_product-container">
                                                                <img
                                                                    src={
                                                                        item.productImages.length === 0
                                                                            ? "/product2.png"
                                                                            : item.productImages[0]
                                                                    }
                                                                    alt="gallery"
                                                                />
                                                            </div>
                                                            <div className="image-overlay-subcategory_product">
                                                                <div className="overlay-text-subcategory_product">
                                                                    <h2>{item.itemDescription}</h2>
                                                                    <p>
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipiscing elit, sed do eiusmod tempor
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-11 mt-2">
                        <div className="card card__section" style={{ height: "14vh" }}>
                            <div
                                className="card-body py-3 d-flex image__container"
                                style={{ overflow: "auto" }}
                            >
                                <div
                                    className="empty-box col-1"
                                    onClick={() => {
                                        SuccessToast("Comming Soon");
                                    }}
                                >
                                    <svg
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "0.5rem",
                                            cursor: "pointer",
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="70"
                                        height="70"
                                        fill="currentColor"
                                        class="bi bi-house-door-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                    </svg>
                                </div>
                                <div style={{ display: "flex" }}>
                                    {category &&
                                        category.map((item, index) => (
                                            <div
                                                className={`app__gallery-images_card-allProduct ${activeIndex === index ? "active" : ""
                                                    }`}
                                                key={item.subCategoryId}    
                                            // onClick={() => handleImageClick(index, item.categoryId)}
                                            >
                                                <img
                                                    src={
                                                        item.subCategoryImageURL === ""
                                                            ? "https://mdbcdn.b-cdn.net/img/new/slides/017.webp"
                                                            : item.subCategoryImageURL
                                                    }
                                                    alt="gallery"
                                                />
                                                <div className="image-overlay-subcategory">
                                                    <div className="overlay-text-subcategory">
                                                        <h2>{item.subCategoryName}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Orders style={{ marginLeft: "-60px" }} />
            </div>
        </>
    );
};

export default AllProduct;
