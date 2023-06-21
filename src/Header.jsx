import React from "react";
import { SuccessToast } from "./ToastMsg";

const Header = () => {
    return (
        <div className="card card__section mb-4">
            <div className="card-body py-3 d-flex justify-content-between">
                <div className="d-flex align-items-center p-2">
                    <img
                        src="/logo.png"
                        alt="logo"
                        style={{ height: "40px", width: "60px", marginRight: "10px" }}
                    />
                    <span className="fw-bold"> A.T Links</span>
                </div>
                <div
                    className="search__box col-4 d-flex align-items-center"
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
                <div className="d-flex">
                    <div
                        className="d-flex align-items-center"
                        style={{ marginRight: "20px" }}
                    >
                        <div
                            style={{
                                display: "inline-block",
                                borderRadius: "50%",
                                overflow: "hidden",
                                width: "40px",
                                height: "40px",
                            }}
                        >
                            <img
                                src="/logo.png"
                                alt="logo"
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down-fill"
                            viewBox="0 0 16 16"
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => SuccessToast("Coming Soon")}
                        >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </div>
                    <div className="d-flex align-items-center">
                        <div
                            style={{
                                display: "inline-block",
                                borderRadius: "50%",
                                overflow: "hidden",
                                width: "40px",
                                height: "40px",
                            }}
                        >
                            <img
                                src="/avatar.jpg"
                                alt="avatar"
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        <div className="d-flex flex-column align-items-center">
                            <span
                                className="fw-bold"
                                style={{ fontSize: "15px", cursor: "pointer" }}
                            >
                                User Admin
                            </span>
                            <span
                                style={{
                                    fontSize: "13px",
                                    color: "#c0c0c0",
                                    cursor: "pointer",
                                }}
                            >
                                admin@gmail.com
                            </span>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-caret-down-fill"
                            viewBox="0 0 16 16"
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => SuccessToast("Coming Soon")}
                        >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
