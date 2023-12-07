import React, { memo } from "react";

const HeaderMovies = () => {
    return (
        <thead>
            <tr style={{ color: "black" , backgroundColor:'red'}}>
                <th>Title</th>
                <th>Episode</th>
                <th>Release</th>
                <th>Director</th>
                <th>Producer</th>
                <th>Opening Crawl</th>
            </tr>
        </thead>
    );
}

export default memo(HeaderMovies);

