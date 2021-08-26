import React, {ReactNode} from "react";

export default class ArticlesList extends React.Component {

    render(): ReactNode {
        return (
            <ul className="list">
                {this.props.children}
            </ul>
        );
    }

}