import React, { useState } from 'react'
import style from './index.module.css'
import cn from 'classnames'

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onSetCurrentPage: (page: number) => void
    portionSize: number
}

export const Paginator: React.FC<PaginatorPropsType> = React.memo(
    ({ totalItemsCount, pageSize, currentPage, onSetCurrentPage, portionSize }) => {
        let [portionNumber, setPortionNumber] = useState<number>(1)

        const pagesCount = Math.ceil(totalItemsCount / pageSize)
        let pagesArr: Array<number> = []
        let portionCount = Math.ceil(pagesCount / portionSize)
        let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        let rightPortionPageNumber = portionNumber * portionSize

        for (let i = 1; i <= pagesCount; i++) pagesArr.push(i)

        return (
            <>
                <div className={style.paginator}>
                    {portionNumber > 1 && (
                        <button
                            onClick={() => {
                                setPortionNumber((prev) => prev - 1)
                            }}
                        >
                            PREV
                        </button>
                    )}
                    {pagesArr
                        .filter(
                            (p) =>
                                p >= leftPortionPageNumber && p <= rightPortionPageNumber
                        )
                        .map((p) => (
                            <span
                                className={cn(
                                    { [style.selectedPage]: currentPage === p },
                                    style.pageNumber
                                )}
                                key={p}
                                onClick={() => onSetCurrentPage(p)}
                            >
                                {p}
                            </span>
                        ))}
                    {portionCount > portionNumber && (
                        <button onClick={() => setPortionNumber((prev) => prev + 1)}>
                            NEXT
                        </button>
                    )}
                </div>
            </>
        )
    }
)
