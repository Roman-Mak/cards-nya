import React, {ReactNode} from "react";
import styles from "./Table.module.css"
import {CardType} from "../../../dal/api-get-cards";

export type TableModelType = {
    title: string;
    render: (dataItem: CardType) => ReactNode;
};

type TablePropsType = {
    columns: Array<TableModelType>;
    items: Array<CardType>;
};

const Table = (props: TablePropsType) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {props.columns.map((m, index) => <div key={index}>{m.title}</div>)}
            </div>
            <div className={styles.rows}>
                {props.items.map((item) => {
                    return <div key={item._id} className={styles.row}>
                        {props.columns.map((m, index) => {
                            return (
                                <div key={index} className={styles.cell}>
                                    {m.render(item)}
                                </div>
                            )
                        })}
                    </div>
                })}
            </div>
        </div>
    )
};

export default Table;