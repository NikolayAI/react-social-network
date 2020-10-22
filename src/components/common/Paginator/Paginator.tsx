import React from "react";
import style from "./Paginator.module.css";

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPageHandler: (page: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = ({totalUsersCount, pageSize, currentPage,
                                                            setCurrentPageHandler,...props}) => {

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pagesArr = []
    for (let i = 1; i <= pagesCount; i++) pagesArr.push(i)

    return <>
        {pagesArr.map(p => <span className={currentPage === p ? style.currentPage : ''}
                                 onClick={() => setCurrentPageHandler(p)}>{p}</span>)}
    </>
}