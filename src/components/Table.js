import React from "react";
import HeaderMovies from "./HeaderMovies";

const Table = ({ rows }) => {
    return (
        <div>
            <table
                style={{ width: "96%", margin: '30px', padding: 10, marginTop: 15, textOverflow: "ellipsis" }}
            >
                <HeaderMovies/>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default Table;
