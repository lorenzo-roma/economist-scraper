import React, {ReactNode} from "react";
import Article from "../../models/article";
import ArticleListItem from "./list-item";

type ComponentProps = {items: Article[]}
export default class ArticlesList extends React.Component<ComponentProps> {

    render(): ReactNode {

        const listItems = this.props.items.map(a=><ArticleListItem article={a} />);
        return (
            <ul className="list">
                {listItems}
            </ul>
        );
    }

}
