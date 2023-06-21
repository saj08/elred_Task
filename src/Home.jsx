import React, { useEffect, useState } from "react";
import { ErrorToast, SuccessToast } from "./ToastMsg";
import axios from "axios";
import Orders from "./Orders";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { SubCategorActions } from "./store/SubCategory";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const dispatch = useDispatch();

    const handleImageClick = async (index, categoryId) => {
        setActiveIndex(index);
        try {
            const res = await axios.get(
                `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${categoryId}.json`
            );
            setSubCategory(res.data.result);
            dispatch(SubCategorActions.onAddSubCategory({ items: res.data.result }));
        } catch (err) {
            ErrorToast("Something Went Wrong");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
                );
                setCategory(res.data.result);
            } catch (err) {
                ErrorToast("Something Went Wrong");
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    console.log(subCategory);
    return (
        <div className="section__Home-container row">
            <SideBar height="85vh" grid="col-2" />
            <div className="section-2 col-6" style={{ marginRight: "10px" }}>
                <div className="card card__section" style={{ height: "85vh" }}>
                    <div className="card-body py-3">
                        <div className="row mb-4">
                            <h3 className="fw-bold col">Print Heads</h3>
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

                        <div className="app__gallery-images" style={{ overflow: "auto" }}>
                            <div className="app__gallery-images_container">
                                {category &&
                                    category.map((item, index) => (
                                        <div
                                            className={`app__gallery-images_card ${activeIndex === index ? "active" : ""
                                                }`}
                                            key={item.categoryId}
                                            onClick={() => handleImageClick(index, item.categoryId)}
                                        >
                                            <img
                                                src={
                                                    item.categoryImageURL === ""
                                                        ? "https://mdbcdn.b-cdn.net/img/new/slides/017.webp"
                                                        : item.categoryImageURL
                                                }
                                                alt="gallery"
                                            />
                                            <div className="image-overlay">
                                                <div className="overlay-text">
                                                    <h2>{item.categoryName}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <hr></hr>
                        <div
                            className="container mt-5"
                            style={{
                                height: "400px",
                                overflow: "auto",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {subCategory && subCategory.length > 0 ? (
                                <div className="row">
                                    {subCategory.map((item, index) => (
                                        <div
                                            className="col-md-4 col-xs-12"
                                            key={item.subCategoryId}
                                            onClick={() => {
                                                dispatch(
                                                    SubCategorActions.onAddCategoryId({
                                                        CategoryId: item.subCategoryId,
                                                    })
                                                );
                                                navigate("/all");
                                            }}
                                        >
                                            <div className="app__gallery-images_card-subcategory">
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
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="d-flex justify-content-center align-items-center fw-bold"
                                    style={{ fontSize: "20px" }}
                                >
                                    No Items Found Please Select another category
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Orders />
        </div>
    );
};

export default Home;
