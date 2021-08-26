import React, { ReactNode } from "react";
import {Link} from "react-router-dom";

export default class ArticleDetailScreen extends React.Component {

    render() : ReactNode {
        return (
            <div>
                <h1>Detail</h1>
                <Link to="/">List</Link>
            </div>
        );
    }
}