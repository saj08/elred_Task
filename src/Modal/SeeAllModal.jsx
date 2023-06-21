import { useEffect, useState } from "react";
import { AddModalForm } from "./AddModalForm";
import { SeeAll } from "./SeeAll";

const SeeAllModal = (props) => {
    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    return (
        <>
            <div
                className="modal fade show d-block"
                id="kt_modal_add_user"
                role="dialog"
                tabIndex={-1}
                aria-modal="true"
            >
                {/* begin::Modal dialog */}
                <div
                    className="modal-dialog modal-dialog-centered"
                    style={{ maxWidth: "650px" }}
                >
                    {/* begin::Modal content */}
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-end">
                            <div
                                className="btn btn-icon btn-sm btn-active-icon-primary "
                                data-kt-users-modal-action="close"
                                onClick={props.isModalClosed}
                                style={{ cursor: "pointer" }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-x-lg"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </div>
                            {/* end::Close */}
                        </div>
                        {/* begin::Modal body */}
                        <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                            <SeeAll />
                        </div>
                        {/* end::Modal body */}
                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className="modal-backdrop fade show"></div>
            {/* end::Modal Backdrop */}
        </>
    );
};

export { SeeAllModal };
